import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    console.log('--- LOGIN ATTEMPT START ---');
    const body = await request.json();
    const { email, password } = body;
    console.log('Login request received for:', email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    console.log('Querying database for user...');
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

