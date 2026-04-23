import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, preferences } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Default preferences if not provided
    const blog = preferences?.blog ?? true;
    const news = preferences?.news ?? true;
    const guides = preferences?.guides ?? true;

    // Upsert the subscriber: create new or update existing
    const subscriber = await db.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        blog,
        news,
        guides,
        active: true, // reactivate if they were unsubscribed
      },
      create: {
        email: normalizedEmail,
        blog,
        news,
        guides,
        active: true,
      },
    });

    return NextResponse.json({ success: true, id: subscriber.id });
  } catch (error: any) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
