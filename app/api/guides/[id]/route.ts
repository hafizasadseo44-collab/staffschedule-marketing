import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idOrSlug } = await params;
    console.log("GET Guide (Raw SQL) Request for:", idOrSlug);

    // Use Raw SQL to bypass out-of-sync Prisma Client types
    const rawGuides = await db.$queryRawUnsafe(`
      SELECT g.*, c.name as categoryName, c.slug as categorySlug 
      FROM Guide g 
      LEFT JOIN GuideCategory c ON g.categoryId = c.id
      WHERE g.id = ? OR g.slug = ?
      LIMIT 1
    `, idOrSlug, idOrSlug) as any[];
    
    const guide = rawGuides[0];

    if (!guide) {
      console.log("Guide NOT FOUND in DB (Raw SQL) for:", idOrSlug);
      return NextResponse.json({ error: 'Guide not found' }, { status: 404 });
    }

    if (idOrSlug === guide.slug) {
      await db.$executeRawUnsafe(`UPDATE Guide SET viewCount = viewCount + 1 WHERE id = ?`, guide.id);
    }

    // SQLite returns 1/0 for booleans, normalize for frontend
    const normalized = {
      ...guide,
      isPublished: !!guide.isPublished,
      isFeatured: !!guide.isFeatured,
      categoryName: guide.categoryName || "General",
      categorySlug: guide.categorySlug || null
    };

    return NextResponse.json(normalized);
  } catch (error: any) {
    console.error("GET Guide Error (Raw SQL):", error);
    return NextResponse.json({ error: 'Failed to fetch guide' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { 
      title, slug, description, content, excerpt, 
      coverImage, pdfUrl, categoryId, categoryName, isFeatured, isPublished,
      seoTitle, seoDescription
    } = body;

    if (body.incrementDownload) {
      await db.$executeRawUnsafe(`UPDATE Guide SET downloadCount = downloadCount + 1 WHERE id = ?`, id);
      return NextResponse.json({ success: true });
    }

    const featuredVal = isFeatured === undefined ? null : (!!isFeatured ? 1 : 0);
    const publishedVal = isPublished === undefined ? null : (!!isPublished ? 1 : 0);

    if (featuredVal === 1) {
      await db.$executeRawUnsafe(`UPDATE Guide SET isFeatured = 0 WHERE isFeatured = 1 AND id != ?`, id);
    }

    const now = new Date().toISOString();
    
    // We use Raw SQL with COALESCE to update only provided fields
    await db.$executeRawUnsafe(`
      UPDATE Guide 
      SET 
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        content = COALESCE(?, content),
        excerpt = COALESCE(?, excerpt),
        coverImage = COALESCE(?, coverImage),
        pdfUrl = COALESCE(?, pdfUrl),
        categoryId = COALESCE(?, categoryId),
        categoryName = COALESCE(?, categoryName),
        isFeatured = CASE WHEN ? IS NOT NULL THEN ? ELSE isFeatured END,
        isPublished = CASE WHEN ? IS NOT NULL THEN ? ELSE isPublished END,
        seoTitle = COALESCE(?, seoTitle),
        seoDescription = COALESCE(?, seoDescription),
        updatedAt = ?
      WHERE id = ?
    `, 
    title || null, slug || null, description || null, content || null, excerpt || null, 
    coverImage || null, pdfUrl || null, categoryId || null, categoryName || null,
    featuredVal, featuredVal, 
    publishedVal, publishedVal,
    seoTitle || null, seoDescription || null, now, id);

    return NextResponse.json({ id, success: true });
  } catch (error: any) {
    console.error("PATCH Guide Error (Raw SQL):", error);
    return NextResponse.json({ error: 'Failed to update guide: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    console.log("DELETING GUIDE ID (Raw SQL):", id);

    const result = await db.$executeRawUnsafe(`DELETE FROM Guide WHERE id = ?`, id);
    
    console.log("DELETE RESULT (rows affected):", result);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Guide Error (Raw SQL):", error);
    return NextResponse.json({ error: 'Failed to delete guide: ' + error.message }, { status: 500 });
  }
}
