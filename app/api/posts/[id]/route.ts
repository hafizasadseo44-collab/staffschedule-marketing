import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { sendNotificationEmails } from '@/lib/email';
import { ensureDatabase } from '@/lib/db-init';

export const dynamic = 'force-dynamic';
export const revalidate = 0;




export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { 
      title, slug, content, excerpt, image, category, type, featured, authorId, 
      focusKeyword, seoTitle, metaDescription, canonicalUrl, ogTitle, ogDescription, ogImage, twitterCard, robotsMeta,
      schemaType, schemaData, status, scheduledFor
    } = body;

    // Check existing status to avoid duplicate emails
    const existingPost = await db.post.findUnique({
      where: { id },
      select: { status: true, published: true }
    });

    if (featured) {
      await db.post.updateMany({
        where: { 
          featured: true,
          NOT: { id },
          type: type || 'ARTICLE'
        },
        data: { featured: false }
      });
    }

    let post;
    if (existingPost) {
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
          status: status !== undefined ? status : undefined,
          published: status !== undefined ? status === 'PUBLISHED' : undefined,
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
          authorId: authorId !== undefined ? authorId : undefined,
          focusKeyword: focusKeyword !== undefined ? focusKeyword : undefined,
          seoTitle: seoTitle !== undefined ? seoTitle : undefined,
          metaDescription: metaDescription !== undefined ? metaDescription : undefined,
          canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : undefined,
          ogTitle: ogTitle !== undefined ? ogTitle : undefined,
          ogDescription: ogDescription !== undefined ? ogDescription : undefined,
          ogImage: ogImage !== undefined ? ogImage : undefined,
          twitterCard: twitterCard !== undefined ? twitterCard : undefined,
          robotsMeta: robotsMeta !== undefined ? robotsMeta : undefined,
          schemaType: schemaType !== undefined ? schemaType : undefined,
          schemaData: schemaData !== undefined ? schemaData : undefined
        },
      });
    } else {
      const fallbackStatus = status || "DRAFT";
      post = await db.post.create({
        data: {
          id,
          title, 
          slug, 
          content, 
          excerpt: excerpt || null, 
          image: image || null, 
          category: category || "Scheduling",
          type: type || "ARTICLE",
          featured: !!featured,
          status: fallbackStatus,
          published: fallbackStatus === 'PUBLISHED',
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
        }
      });
    }

    // Create a revision.
    // NOTE: PostRevision.title is NOT NULL in the schema — omitting it caused
    // "Null constraint violation on the fields: (`title`)" and broke every
    // post update. We mirror the post's title/excerpt/image into the revision
    // so the revision is a self-contained snapshot of the saved state.
    await db.postRevision.create({
      data: {
        postId: id,
        title: post.title || title || "Untitled",
        content: content,
        excerpt: post.excerpt ?? (excerpt ?? null),
        image: post.image ?? (image ?? null),
        authorId: session.userId || null
      }
    });

    // Automated Email Notification Trigger
    // Only send if it's being published NOW (wasn't published before)
    if (status === 'PUBLISHED' && (!existingPost || existingPost.status !== 'PUBLISHED')) {
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
    console.error("PUT Post Error (Raw SQL):", error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update post: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await context.params;
    await db.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
