import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ensureDatabase } from '@/lib/db-init';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const revisions = await db.postRevision.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(revisions);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // This endpoint can be used to manually restore a revision
    // Basically it fetches the revision content and updates the Post.
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { revisionId } = body;

    const revision = await db.postRevision.findUnique({ where: { id: revisionId } });
    if (!revision || revision.postId !== id) {
      return NextResponse.json({ error: 'Revision not found' }, { status: 404 });
    }

    const post = await db.post.update({
      where: { id },
      data: {
        content: revision.content
      }
    });

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to restore revision' }, { status: 500 });
  }
}
