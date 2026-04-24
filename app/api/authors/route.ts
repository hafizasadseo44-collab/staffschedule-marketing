import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authors = await db.author.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(authors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, slug, bio, avatar, gender, twitter, linkedin, facebook, website } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const author = await db.author.create({
      data: { name, slug, bio, avatar, gender: gender || "not_specified", twitter, linkedin, facebook, website } as any,
    });

    return NextResponse.json(author);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { id, name, slug, bio, avatar, gender, twitter, linkedin, facebook, website } = body;

    if (!id || !name || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const author = await db.author.update({
      where: { id },
      data: { name, slug, bio, avatar, gender, twitter, linkedin, facebook, website } as any,
    });

    return NextResponse.json(author);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 });
  }
}
