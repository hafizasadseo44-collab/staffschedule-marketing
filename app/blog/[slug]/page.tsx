import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostClient from '@/components/blog/BlogPostClient';
 
export const dynamic = 'force-dynamic';


interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let post: any;
  try {
    post = await db.post.findFirst({
      where: {
        OR: [
          { slug: slug },
          { slug: decodedSlug }
        ],
        status: 'PUBLISHED'
      },
      include: { author: true }
    });
  } catch (e) {
    post = null;
  }
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const finalTitle = post.seoTitle || post.ogTitle || `${post.title} | StaffSchedule.io Blog`;
  const finalDesc = post.metaDescription || post.ogDescription || post.excerpt || `Read ${post.title} on the StaffSchedule.io blog.`;

  // Respect the robots meta setting
  let robots = undefined;
  if (post.robotsMeta) {
    const parts = post.robotsMeta.split(',').map((s: string) => s.trim().toLowerCase());
    robots = {
      index: parts.includes('index'),
      follow: parts.includes('follow'),
      googleBot: {
        index: parts.includes('index'),
        follow: parts.includes('follow'),
        'max-video-preview': -1,
        'max-image-preview': 'large' as 'large',
        'max-snippet': -1,
      },
    };
  }

  return {
    title: finalTitle,
    description: finalDesc,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    alternates: {
      canonical: post.canonicalUrl || `https://staffschedule.io/blog/${slug}`,
    },
    robots: robots || { index: false, follow: false },
    openGraph: {
       images: post.ogImage || post.image ? [post.ogImage || post.image] : [],
       title: post.ogTitle || finalTitle,
       description: post.ogDescription || finalDesc,
       type: 'article',
       url: `https://staffschedule.io/blog/${slug}`,
       siteName: 'StaffSchedule.io',
    },
    twitter: {
      card: (post.twitterCard as any) || 'summary_large_image',
      title: post.ogTitle || finalTitle,
      description: post.ogDescription || finalDesc,
      images: post.ogImage || post.image ? [post.ogImage || post.image] : [],
      creator: '@staffschedule',
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  
  let post: any;
  try {
    post = await db.post.findFirst({
      where: {
        OR: [
          { slug: slug },
          { slug: decodedSlug }
        ],
        status: 'PUBLISHED'
      },
      include: { author: true }
    });
  } catch (e) {
    post = null;
  }

  if (!post) {
    notFound();
  }

  // Fetch 3 related posts (excluding current one)
  let relatedPosts: any[] = [];
  try {
    relatedPosts = await db.post.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: post.id },
        type: 'ARTICLE'
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true, title: true, slug: true, image: true, category: true, createdAt: true
      }
    });
  } catch (e) {
    console.error("Related posts error", e);
  }

  const serializedPost = {
    ...post,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString(),
  };

  const serializedRelated = relatedPosts.map(p => ({
    ...p,
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : p.createdAt.toISOString(),
  }));

  // ─── SSR initial comments ───────────────────────────────────────
  // Server-side fetch the first page so the initial HTML contains real
  // comment content (SEO + faster perceived load). The client component
  // then hydrates and handles pagination/likes/etc. from there.
  let initialComments: any[] = [];
  let commentsTotal = 0;
  let commentsHasMore = false;
  try {
    const PAGE_SIZE = 10;
    const [topLevel, totalThreads, totalAll] = await Promise.all([
      db.comment.findMany({
        where: { postId: post.id, status: 'APPROVED', parentId: null },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        take: PAGE_SIZE,
        select: {
          id: true, postId: true, parentId: true, name: true, company: true,
          avatar: true, content: true, status: true, isPinned: true,
          isAuthor: true, isAdmin: true, isTrusted: true, likeCount: true, createdAt: true,
        },
      }),
      db.comment.count({ where: { postId: post.id, status: 'APPROVED', parentId: null } }),
      db.comment.count({ where: { postId: post.id, status: 'APPROVED' } }),
    ]);
    const replies = topLevel.length
      ? await db.comment.findMany({
          where: { postId: post.id, status: 'APPROVED', parentId: { in: topLevel.map(c => c.id) } },
          orderBy: { createdAt: 'asc' },
          select: {
            id: true, postId: true, parentId: true, name: true, company: true,
            avatar: true, content: true, status: true, isPinned: true,
            isAuthor: true, isAdmin: true, isTrusted: true, likeCount: true, createdAt: true,
          },
        })
      : [];
    const byParent = new Map<string, any[]>();
    for (const r of replies) {
      if (!byParent.has(r.parentId!)) byParent.set(r.parentId!, []);
      byParent.get(r.parentId!)!.push({ ...r, createdAt: r.createdAt.toISOString() });
    }
    initialComments = topLevel.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      replies: byParent.get(c.id) || [],
    }));
    commentsTotal = totalAll;
    commentsHasMore = totalThreads > PAGE_SIZE;
  } catch (e) {
    console.error('SSR comments error', e);
  }

  // Generate JSON-LD Schema
  let schemaDataStr = post.schemaData || '';
  if (!schemaDataStr) {
    // Generate default schema if empty. We bake in commentCount so search
    // engines see the post has an active discussion thread.
    const schemaObj: any = {
      "@context": "https://schema.org",
      "@type": post.schemaType || "Article",
      "headline": post.seoTitle || post.title,
      "image": post.image ? [post.image] : [],
      "datePublished": typeof post.createdAt === 'string' ? post.createdAt : post.createdAt?.toISOString(),
      "dateModified": typeof post.updatedAt === 'string' ? post.updatedAt : post.updatedAt?.toISOString(),
      "author": [{
          "@type": "Person",
          "name": post.author?.name || "StaffSchedule Team",
          "url": `https://staffschedule.io/author/${post.author?.slug || ''}`
      }],
      "commentCount": commentsTotal,
    };
    schemaDataStr = JSON.stringify(schemaObj);
  }

  // Comment thread structured data — only emit if there ARE approved
  // comments so we don't tell Google about an empty discussion.
  let commentSchema: string | null = null;
  if (initialComments.length > 0) {
    commentSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "headline": post.title,
      "url": `https://staffschedule.io/blog/${post.slug}#comments`,
      "commentCount": commentsTotal,
      "comment": initialComments.slice(0, 5).map((c: any) => ({
        "@type": "Comment",
        "text": c.content,
        "dateCreated": c.createdAt,
        "author": { "@type": "Person", "name": c.name },
      })),
    });
  }

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;

  return (
    <>
      {schemaDataStr && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaDataStr }}
        />
      )}
      {commentSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: commentSchema }}
        />
      )}
      <BlogPostClient
        post={serializedPost}
        relatedPosts={serializedRelated}
        initialComments={initialComments}
        commentsTotal={commentsTotal}
        commentsHasMore={commentsHasMore}
        turnstileSiteKey={turnstileSiteKey}
      />
    </>
  );
}
