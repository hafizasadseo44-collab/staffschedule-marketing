import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
 
export const dynamic = 'force-dynamic';


export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await db.adminUser.findUnique({
      where: { id: session.userId as string },
      select: { id: true, email: true }
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { email, currentPassword, newPassword } = await request.json();

    const user = await db.adminUser.findUnique({
      where: { id: session.userId as string }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password required to set new password' }, { status: 400 });
      }
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
      }
    }

    const updateData: any = {};
    if (email) updateData.email = email;
    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await db.adminUser.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, email: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Account update error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
