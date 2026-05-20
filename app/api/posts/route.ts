import { NextResponse } from 'next/server';
import { db, dbUrl } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { sendNotificationEmails } from '@/lib/email';
import { ensureDatabase } from '@/lib/db-init';


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // DRAFT, PUBLISHED, SCHEDULED
    const publishedOnly = searchParams.get('published') === 'true' || status === 'PUBLISHED';

    const where: any = {};
    if (publishedOnly) {
      where.status = 'PUBLISHED';
    } else if (status) {
      where.status = status;
    }

    const posts = await db.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("GET Posts Error:", error);
    return NextResponse.json({ 
      error: 'Failed to fetch posts: ' + error.message,
      debug: { dbUrl } 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { 
      title, slug, content, excerpt, image, category, type, featured, authorId, 
      focusKeyword, seoTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage, twitterCard, robotsMeta,
      schemaType, schemaData, status, scheduledFor
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (featured) {
      await db.post.updateMany({
        where: { featured: true, type: type || 'ARTICLE' },
        data: { featured: false }
      });
    }

    const post = await db.post.create({
      data: { 
        title, 
        slug, 
        content, 
        excerpt: excerpt || null, 
        image: image || null, 
        category: category || "Scheduling",
        type: type || "ARTICLE",
        featured: !!featured,
        status: status || "DRAFT",
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        authorId: authorId && authorId !== "" ? authorId : null,
        focusKeyword: focusKeyword || null,
        seoTitle: seoTitle || null,
        metaDescription: metaDescription || null,
        canonicalUrl: canonicalUrl || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
        twitterCard: twitterCard || "summary_large_image",
        robotsMeta: robotsMeta || "index, follow",
        schemaType: schemaType || "Article",
        schemaData: schemaData || null
      },
    });

    // Automated Email Notification Trigger
    if (status === 'PUBLISHED') {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staffschedule.io';
      const postType = (type || 'ARTICLE') === 'NEWS' ? 'news' : 'blog';
      
      // Fire and forget (don't await to keep API fast)
      sendNotificationEmails({
        type: postType,
        title: title,
        description: excerpt || "A new update from StaffSchedule.io",
        url: `${siteUrl}/${postType === 'news' ? 'news' : 'blog'}/${slug}`,
        imageUrl: image || undefined
      }).catch(err => console.error('[Notification Error]:', err));
    }

    return NextResponse.json(post);

  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Failed to create post: ' + error.message,
      debug: { dbUrl }
    }, { status: 500 });
  }
}
