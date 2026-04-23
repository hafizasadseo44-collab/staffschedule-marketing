import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, preferences } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Default preferences if not provided
    const blog = preferences?.blog ?? true;
    const news = preferences?.news ?? true;
    const guides = preferences?.guides ?? true;

    // Upsert the subscriber: create new or update existing
    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: {
        blog,
        news,
        guides,
        active: true, // reactivate if they were unsubscribed
      },
      create: {
        email,
        blog,
        news,
        guides,
        active: true,
      },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
