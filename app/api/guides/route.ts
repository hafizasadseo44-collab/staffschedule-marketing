import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { sendNotificationEmails } from '@/lib/email';
import { ensureDatabase } from '@/lib/db-init';


export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const featuredOnly = searchParams.get('featured') === 'true';
    const categorySlug = searchParams.get('categorySlug');

    let query = `SELECT g.*, c.name as categoryName, c.slug as categorySlug 
                 FROM Guide g 
                 LEFT JOIN GuideCategory c ON g.categoryId = c.id`;
    
    const conditions = [];
    const params = [];

    if (publishedOnly) conditions.push('g.isPublished = 1');
    if (featuredOnly) conditions.push('g.isFeatured = 1');
    if (categorySlug) {
      conditions.push('c.slug = ?');
      params.push(categorySlug);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    query += ` ORDER BY g.createdAt DESC`;

    const rawGuides = await db.$queryRawUnsafe(query, ...params) as any[];

    // Normalize
    const guides = rawGuides.map(g => ({
      ...g,
      isPublished: !!g.isPublished,
      isFeatured: !!g.isFeatured,
    }));

    return NextResponse.json(guides);
  } catch (error: any) {
    console.error("GET Guides Error:", error);
    return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { 
      title, slug, description, content, excerpt, 
      coverImage, pdfUrl, categoryId, categoryName, isFeatured, isPublished,
      seoTitle, seoDescription
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (isFeatured) {
      await db.$executeRawUnsafe(`UPDATE Guide SET isFeatured = 0 WHERE isFeatured = 1`);
    }

    const now = new Date().toISOString();
    const id = Math.random().toString(36).substring(2, 15);
    
    await db.$executeRawUnsafe(`
      INSERT INTO Guide (
        id, title, slug, description, content, excerpt, 
        coverImage, pdfUrl, categoryId, categoryName, isFeatured, isPublished, 
        downloadCount, viewCount, seoTitle, seoDescription, createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?)
    `, id, title, slug, description || "", content || "", excerpt || "", 
       coverImage || null, pdfUrl || null, categoryId || null, categoryName || "General", 
       !!isFeatured ? 1 : 0, !!isPublished ? 1 : 0, 
       seoTitle || null, seoDescription || null, now, now);

    // Automated Email Notification Trigger
    if (!!isPublished) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staffschedule.io';
      
      // Fire and forget
      sendNotificationEmails({
        type: 'guide',
        title: title,
        description: excerpt || description || "A new guide from StaffSchedule.io",
        url: `${siteUrl}/guides/${slug}`,
        imageUrl: coverImage || undefined
      }).catch(err => console.error('[Notification Error]:', err));
    }

    return NextResponse.json({ id, title, slug });

  } catch (error: any) {
    console.error("POST Guide Error:", error);
    return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
  }
}
