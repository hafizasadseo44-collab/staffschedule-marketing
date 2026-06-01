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
    const rawEmail = body.email;
    const rawPassword = body.password;

    if (!rawEmail || !rawPassword) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // Normalize inputs. Env vars on Hostinger often pick up trailing newlines
    // when pasted; matching on raw === raw was breaking login silently. We
    // lowercase the email and trim both sides to make the comparison robust.
    const email = String(rawEmail).trim().toLowerCase();
    const password = String(rawPassword);

    // PRIORITY: Check .env credentials first (super admin backdoor for
    // emergency access — works even if the AdminUser row is corrupted).
    const envEmail = (process.env.ADMIN_EMAIL || 'hafizasadullahseo@gmail.com').trim().toLowerCase();
    const envPassword = (process.env.ADMIN_PASSWORD || '@4499Asad').trim();

    if (email === envEmail && password === envPassword) {
      let userId = 'env-admin';
      
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let timeoutId: NodeJS.Timeout;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Prisma timeout')), 3000);
        });
        const user = await Promise.race([
          db.adminUser.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: { email, password: hashedPassword }
          }),
          timeoutPromise
        ]) as any;
        clearTimeout(timeoutId!);
        userId = user.id;
      } catch (dbError: any) {
        console.warn('Super Admin DB sync failed or timed out (continuing):', dbError.message);
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

    // Fallback: look up the user in the DB (case-insensitive email match).
    // We can't use findUnique with a contains/insensitive filter on SQLite via
    // Prisma's unique index, so we use findFirst which scans by indexed field.
    let timeoutId2: NodeJS.Timeout;
    const timeoutPromise2 = new Promise((_, reject) => {
      timeoutId2 = setTimeout(() => reject(new Error('Prisma timeout')), 3000);
    });
    let user: any = null;
    try {
      user = await Promise.race([
        db.adminUser.findFirst({ where: { email: { equals: email } } }),
        timeoutPromise2
      ]);
      clearTimeout(timeoutId2!);
    } catch (err: any) {
      console.error('DB fetch user error/timeout:', err.message);
      return NextResponse.json({ error: 'Database connection failed, please try again later' }, { status: 500 });
    }

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
