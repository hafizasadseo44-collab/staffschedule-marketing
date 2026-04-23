import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { name, description, icon } = body;
    
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await db.$executeRawUnsafe(`
      UPDATE GuideCategory 
      SET name = ?, slug = ?, description = ?, icon = ? 
      WHERE id = ?
    `, name, slug, description || null, icon || null, id);

    return NextResponse.json({ id, name, slug });
  } catch (error) {
    console.error("PATCH Category Error:", error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
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
    console.log("DELETING CATEGORY ID ATTEMPT:", id);

    // Check if category has guides
    const guides = await db.$queryRawUnsafe(`SELECT id FROM Guide WHERE categoryId = ?`, id) as any[];
    if (guides.length > 0) {
      return NextResponse.json({ error: 'Cannot delete category with active guides. Please move or delete the guides first.' }, { status: 400 });
    }

    // Direct delete for string ID resilience
    await db.$executeRawUnsafe(`DELETE FROM GuideCategory WHERE id = '${id}'`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Category Error:", error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
