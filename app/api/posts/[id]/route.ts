import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { sendNotificationEmails } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const revalidate = 0;




export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    const body = await request.json();
    const { title, slug, content, excerpt, image, published, category, type, featured, authorId, focusKeyword, seoTitle, canonicalUrl } = body;

    // Check existing status to avoid duplicate emails
    const existingPost = await db.post.findUnique({
      where: { id },
      select: { published: true }
    });


    if (featured) {
      await db.post.updateMany({
        where: { 
          featured: true,
          NOT: { id }
        },
        data: { featured: false }
      });
    }

    let post;
    try {
      post = await db.post.update({
        where: { id },
        data: { 
          title, 
          slug, 
          content, 
          excerpt, 
          image, 
          category,
          type: type !== undefined ? type : undefined,
          featured: featured !== undefined ? !!featured : undefined,
          published: published !== undefined ? !!published : undefined,
          authorId: authorId !== undefined ? authorId : undefined,
          focusKeyword: focusKeyword !== undefined ? focusKeyword : undefined,
          seoTitle: seoTitle !== undefined ? seoTitle : undefined,
          canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : undefined
        } as any,
      });
    } catch (e: any) {
      // Fallback for out-of-sync Prisma Client
      const now = new Date().toISOString();
      const sExcerpt = excerpt || null;
      const sImage = image || null;
      const sFocus = focusKeyword || null;
      const sSeo = seoTitle || null;
      const sCanon = canonicalUrl || null;
      const sAuthorId = authorId && authorId !== "" ? authorId : null;
      
      try {
        await db.$executeRaw`
          UPDATE Post 
          SET title = ${title}, slug = ${slug}, content = ${content}, excerpt = ${sExcerpt}, image = ${sImage}, category = ${category || "Scheduling"}, type = ${type || "ARTICLE"}, featured = ${!!featured ? 1 : 0}, published = ${!!published ? 1 : 0}, authorId = ${sAuthorId}, focusKeyword = ${sFocus}, seoTitle = ${sSeo}, canonicalUrl = ${sCanon}, updatedAt = ${now}
          WHERE id = ${id}
        `;
      } catch (rawError: any) {
        // Fallback without new columns in case they don't exist
        await db.$executeRaw`
          UPDATE Post 
          SET title = ${title}, slug = ${slug}, content = ${content}, excerpt = ${sExcerpt}, image = ${sImage}, category = ${category || "Scheduling"}, featured = ${!!featured ? 1 : 0}, published = ${!!published ? 1 : 0}, authorId = ${sAuthorId}, updatedAt = ${now}
          WHERE id = ${id}
        `;
      }
      post = { id, title, slug };
    }

    // Automated Email Notification Trigger
    // Only send if it's being published NOW (wasn't published before)
    if (!!published && (!existingPost || !existingPost.published)) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://staffschedule.io';
      const postType = (type || 'ARTICLE') === 'NEWS' ? 'news' : 'blog';
      
      // Fire and forget
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
    return NextResponse.json({ error: 'Failed to update post: ' + (error.message || String(error)) }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    await db.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
