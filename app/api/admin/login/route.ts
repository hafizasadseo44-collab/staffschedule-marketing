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
      console.warn('--- DB INIT FAILED (Continuing Login Process) ---', dbInitError.message);
    }
    
    console.log('--- LOGIN ATTEMPT START ---');
    const body = await request.json();
    const { email, password } = body;
    console.log('Login request received for:', email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    console.log('Querying database for user...');
    
    // PRIORITY: Check .env credentials first (or hardcoded fallback since .env is gitignored)
    const envEmail = process.env.ADMIN_EMAIL || 'hafizasadullahseo@gmail.com';
    const envPassword = process.env.ADMIN_PASSWORD || '@4499Asad';


    if (email === envEmail && password === envPassword) {
      console.log('Login matched .env credentials (Super Admin).');
      
      let userId = 'env-admin';
      
      try {
        // Attempt to upsert into DB to ensure account management works
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.adminUser.upsert({
          where: { email },
          update: { password: hashedPassword },
          create: { email, password: hashedPassword }
        });
        userId = user.id;
      } catch (dbError: any) {
        console.warn('Super Admin DB Sync Failed (Continuing anyway):', dbError.message);
        // We continue with userId = 'env-admin' so they can still log in
      }

      const token = await signToken({ userId, email: envEmail });
      
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });

    }

    let user = await db.adminUser.findUnique({ where: { email } });

    // Seed FIRST admin user if database is completely empty (Convenience for SaaS setup)
    const count = await db.adminUser.count();
    if (count === 0) {
       console.log('No users found, seeding first admin...');
       const hashedPassword = await bcrypt.hash(password, 10);
       user = await db.adminUser.create({
          data: { email, password: hashedPassword }
       });
       console.log('Created first admin user automatically.');
    }

    if (!user) {
      console.log('User not found in database.');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Comparing passwords with bcryptjs...');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('Password mismatch.');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Signing JWT token...');
    const token = await signToken({ userId: user.id, email: user.email });
    
    console.log('Setting cookies...');
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log('Login successful.');
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('CRITICAL LOGIN ERROR:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

