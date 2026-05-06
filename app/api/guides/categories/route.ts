import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ensureDatabase } from '@/lib/db-init';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensureDatabase();
    // Using Raw SQL to avoid Prisma Client generation issues on Windows
    const categories = await db.$queryRawUnsafe(`
      SELECT 
        c.*, 
        (SELECT COUNT(*) FROM Guide WHERE categoryId = c.id AND isPublished = 1) as guideCount 
      FROM GuideCategory c 
      ORDER BY name ASC
    `) as any[];
    
    // Normalize BigInts and potential issues
    const normalized = categories.map(cat => ({
      ...cat,
      guideCount: Number(cat.guideCount || 0)
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("GET Categories Error:", error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, description, icon } = body;
    
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = Math.random().toString(36).substring(2, 15);

    await db.$executeRawUnsafe(`
      INSERT INTO GuideCategory (id, name, slug, description, icon)
      VALUES (?, ?, ?, ?, ?)
    `, id, name, slug, description || null, icon || null);

    return NextResponse.json({ id, name, slug });
  } catch (error: any) {
    console.error("POST Category Error:", error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
