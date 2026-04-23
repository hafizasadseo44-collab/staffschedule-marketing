import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q } },
          { slug: { contains: q } }
        ]
      },
      select: { 
        id: true, 
        title: true, 
        slug: true 
      },
      take: 10
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Search internal links Error:', error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
