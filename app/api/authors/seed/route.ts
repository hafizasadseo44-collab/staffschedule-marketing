import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
 
export const dynamic = 'force-dynamic';


export async function POST() {
  try {
    // Temporarily disabled for seeding
    // const session = await getSession();
    // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    console.log('Seeding default author through API...');
    
    // 1. Create default author
    const defaultAuthor = await db.author.upsert({
      where: { slug: 'staffschedule-team' },
      update: {},
      create: {
        name: 'StaffSchedule Team',
        slug: 'staffschedule-team',
        bio: 'The core editorial team behind StaffSchedule.io, focusing on workforce intelligence and AI-driven efficiency.',
        gender: 'not_specified',
        website: 'https://staffschedule.io'
      }
    });

    // 2. Link all existing posts to this author
    const updatedPosts = await db.post.updateMany({
      where: { authorId: null },
      data: { authorId: defaultAuthor.id }
    });

    return NextResponse.json({ 
      message: 'Seed successful', 
      author: defaultAuthor, 
      postsUpdated: updatedPosts.count 
    });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Failed to seed authors', details: error.message }, { status: 500 });
  }
}
