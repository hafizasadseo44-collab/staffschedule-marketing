import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { sendNotificationEmails } from '@/lib/email';


export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    // Use raw query to ensure we get ALL columns even if Prisma client is out of sync
    const rawPosts = await db.$queryRawUnsafe(`
      SELECT * FROM Post 
      ${publishedOnly ? 'WHERE published = 1' : ''}
      ORDER BY createdAt DESC
    `) as any[];

    // Normalize raw results (SQLite returns 1/0 for booleans)
    const posts = rawPosts.map(p => ({
      ...p,
      published: !!p.published,
      featured: !!p.featured,
      // Ensure type exists, default to ARTICLE if null
      type: p.type || 'ARTICLE'
    }));

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("GET Posts Error:", error);
    return NextResponse.json({ error: 'Failed to fetch posts: ' + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, slug, content, excerpt, image, published, category, type, featured, authorId, focusKeyword, seoTitle, canonicalUrl } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (featured) {
      await db.$executeRaw`
        UPDATE Post 
        SET featured = 0 
        WHERE featured = 1 AND type = ${type || 'ARTICLE'}
      `;
    }

    const sanitizedAuthorId = authorId && authorId !== "" ? authorId : null;
    let post;
    try {
      post = await db.post.create({
        data: { 
          title, 
          slug, 
          content, 
          excerpt: excerpt || null, 
          image: image || null, 
          category: category || "Scheduling",
          type: type || "ARTICLE",
          featured: !!featured,
          published: !!published,
          authorId: sanitizedAuthorId,
          focusKeyword: focusKeyword || null,
          seoTitle: seoTitle || null,
          canonicalUrl: canonicalUrl || null
        } as any,
      });
    } catch (e: any) {
      // Fallback for out-of-sync Prisma Client
      if (e.message?.includes('Unknown arg') || e.message?.includes('Invalid')) {
        const id = Math.random().toString(36).substring(2, 15);
        const now = new Date().toISOString();
        const sAuthorId = sanitizedAuthorId;
        const sExcerpt = excerpt || null;
        const sImage = image || null;
        const sFocus = focusKeyword || null;
        const sSeo = seoTitle || null;
        const sCanon = canonicalUrl || null;
        
        try {
          await db.$executeRaw`
            INSERT INTO Post (id, title, slug, content, excerpt, image, category, type, featured, published, authorId, focusKeyword, seoTitle, canonicalUrl, createdAt, updatedAt)
            VALUES (${id}, ${title}, ${slug}, ${content}, ${sExcerpt}, ${sImage}, ${category || "Scheduling"}, ${type || "ARTICLE"}, ${!!featured ? 1 : 0}, ${!!published ? 1 : 0}, ${sAuthorId}, ${sFocus}, ${sSeo}, ${sCanon}, ${now}, ${now})
          `;
        } catch (rawError: any) {
          // If even RAW SQL fails (e.g. 'type' column doesn't exist at all), try without it
          await db.$executeRaw`
            INSERT INTO Post (id, title, slug, content, excerpt, image, category, featured, published, authorId, focusKeyword, seoTitle, canonicalUrl, createdAt, updatedAt)
            VALUES (${id}, ${title}, ${slug}, ${content}, ${sExcerpt}, ${sImage}, ${category || "Scheduling"}, ${!!featured ? 1 : 0}, ${!!published ? 1 : 0}, ${sAuthorId}, ${sFocus}, ${sSeo}, ${sCanon}, ${now}, ${now})
          `;
        }
        post = { id, title, slug };
      } else {
        throw e;
      }
    }

    // Automated Email Notification Trigger
    if (!!published) {
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
    return NextResponse.json({ error: 'Failed to create post: ' + error.message }, { status: 500 });
  }
}
