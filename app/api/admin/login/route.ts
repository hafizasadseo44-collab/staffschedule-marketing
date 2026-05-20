import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { ensureDatabase } from '@/lib/db-init';
 
export const dynamic = 'force-dynamic';


export async function POST(request: Request) {
  try {
    try {
      await ensureDatabase();
    } catch (dbInitError: any) {
      console.warn('DB init warning (continuing login):', dbInitError.message);
    }
    
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // PRIORITY: Check .env credentials first (super admin)
    const envEmail = process.env.ADMIN_EMAIL || 'hafizasadullahseo@gmail.com';
    const envPassword = process.env.ADMIN_PASSWORD || '@4499Asad';

    if (email === envEmail && password === envPassword) {
      let userId = 'env-admin';
      
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.adminUser.upsert({
          where: { email },
          update: { password: hashedPassword },
          create: { email, password: hashedPassword }
        });
        userId = user.id;
      } catch (dbError: any) {
        console.warn('Super Admin DB sync failed (continuing):', dbError.message);
      }

      const token = await signToken({ userId, email: envEmail, role: 'ADMIN' });
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
      });

      return NextResponse.json({ success: true });
    }

    let user = await db.adminUser.findUnique({ where: { email } });

    // Seed first admin if DB is empty
    const count = await db.adminUser.count();
    if (count === 0) {
       const hashedPassword = await bcrypt.hash(password, 10);
       user = await db.adminUser.create({
          data: { email, password: hashedPassword }
       });
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email, role: (user as any).role });
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Login error:', error.message);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
