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
    const results = await db.$queryRaw`
      SELECT title, excerpt, image, published, seoTitle, focusKeyword, canonicalUrl, type 
      FROM Post 
      WHERE (slug = ${slug} OR slug = ${decodedSlug}) AND published = 1
      LIMIT 1
    ` as any[];
    post = results[0];
  } catch (e) {
    post = null;
  }
  
  if (!post || !post.published) {
    return { title: 'Post Not Found' };
  }

  const finalTitle = post.seoTitle || `${post.title} | StaffSchedule.io Blog`;
  const finalDesc = post.excerpt || `Read ${post.title} on the StaffSchedule.io blog.`;

  return {
    title: finalTitle,
    description: finalDesc,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    alternates: {
      canonical: post.canonicalUrl || `https://staffschedule.io/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
       images: post.image ? [post.image] : [],
       title: finalTitle,
       description: finalDesc,
       type: 'article',
       url: `https://staffschedule.io/blog/${slug}`,
       siteName: 'StaffSchedule.io',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      images: post.image ? [post.image] : [],
      creator: '@staffschedule',
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  console.log('DEBUG: Visiting blog post with slug:', slug, 'decoded:', decodedSlug);
  
  let post: any;
  try {
    const results = await db.$queryRaw`
      SELECT p.*, a.name as authorName, a.avatar as authorAvatar, a.bio as authorBio, a.slug as authorSlug, a.gender as authorGender
      FROM Post p
      LEFT JOIN Author a ON p.authorId = a.id
      WHERE (p.slug = ${slug} OR p.slug = ${decodedSlug}) AND p.published = 1
      LIMIT 1
    ` as any[];
    
    if (results.length > 0) {
      const raw = results[0];
      post = {
        ...raw,
        author: raw.authorId ? {
          name: raw.authorName,
          avatar: raw.authorAvatar,
          bio: raw.authorBio,
          slug: raw.authorSlug,
          gender: raw.authorGender
        } : null
      };
    } else {
      post = null;
    }
  } catch (e) {
    post = null;
  }

  if (!post || !post.published) {
    notFound();
  }

  // Fetch 3 related posts (excluding current one)
  const relatedPosts = await db.$queryRaw`
    SELECT id, title, slug, image, category, createdAt 
    FROM Post 
    WHERE published = 1 AND id != ${post.id} AND type = 'ARTICLE'
    ORDER BY createdAt DESC 
    LIMIT 3
  ` as any[];

  const serializedPost = {
    ...post,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString(),
  };

  const serializedRelated = relatedPosts.map(p => ({
    ...p,
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : p.createdAt.toISOString(),
  }));

  return (
    <BlogPostClient post={serializedPost} relatedPosts={serializedRelated} />
  );
}
