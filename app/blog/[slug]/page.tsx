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

  // Generate JSON-LD Schema
  let schemaDataStr = post.schemaData || '';
  if (!schemaDataStr) {
    // Generate default schema if empty
    const schemaObj = {
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
      }]
    };
    schemaDataStr = JSON.stringify(schemaObj);
  }

  return (
    <>
      {schemaDataStr && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaDataStr }}
        />
      )}
      <BlogPostClient post={serializedPost} relatedPosts={serializedRelated} />
    </>
  );
}
