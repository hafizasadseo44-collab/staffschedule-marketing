import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ensureDatabase } from '@/lib/db-init';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const { id } = await params;
    
    // Get today's date at midnight for analytics grouping
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Increment overall post view count
    await db.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1
        }
      }
    });

    // Handle trending / daily analytics
    // Use upsert-like logic or try/catch since we don't have a unique constraint on postId + date
    const existingAnalytic = await db.postAnalytics.findFirst({
      where: {
        postId: id,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    if (existingAnalytic) {
      await db.postAnalytics.update({
        where: { id: existingAnalytic.id },
        data: {
          views: { increment: 1 },
          // A simplistic unique visitor counter would require IP tracking, 
          // but for basic internal tracking, we can just increment views for now.
        }
      });
    } else {
      await db.postAnalytics.create({
        data: {
          postId: id,
          date: today,
          views: 1,
          uniqueVisitors: 1
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("POST View Analytics Error:", error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
