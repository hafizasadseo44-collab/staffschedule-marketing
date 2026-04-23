import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, preferences } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Upsert subscriber: update preferences if exists, create if new
    const subscriber = await db.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        blog: preferences?.blog ?? true,
        news: preferences?.news ?? true,
        guides: preferences?.guides ?? true,
        active: true,
      },
      create: {
        email: normalizedEmail,
        blog: preferences?.blog ?? true,
        news: preferences?.news ?? true,
        guides: preferences?.guides ?? true,
        active: true,
      },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 });
  }
}
