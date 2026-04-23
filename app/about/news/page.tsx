import { Metadata } from 'next';
import { db } from '@/lib/db';
import NewsroomClient from '@/components/news/NewsroomClient';

export const metadata: Metadata = {
  title: 'Newsroom | StaffSchedule.io Press & Announcements',
  description: 'The latest official news, press releases, and corporate announcements from StaffSchedule.io.',
  openGraph: {
    title: 'StaffSchedule.io Newsroom',
    description: 'Official corporate updates and media toolkit for StaffSchedule.io.',
    type: 'website',
  },
};

export default async function NewsroomPage() {
  let posts: any[] = [];
  
  try {
    // Fetch posts and normalize
    // Use raw query to ensure we get ALL columns even if Prisma client is out of sync
    const rawPosts = await db.$queryRaw`
      SELECT * FROM Post 
      WHERE published = 1
      ORDER BY createdAt DESC
    ` as any[];

    // Resilient filtering for newsroom
    posts = rawPosts.filter(p => {
      const isNewsType = p.type === 'NEWS';
      const isNewsCategory = ['Announcement', 'Company Announcement', 'Product Update', 'Press Release'].includes(p.category || '');
      return isNewsType || isNewsCategory;
    });
  } catch (e) {
    console.error('Failed to fetch newsroom posts:', e);
  }

  // Serialize for client component
  const serializedPosts = posts.map(post => ({
    ...post,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString(),
  }));

  return <NewsroomClient posts={serializedPosts} />;
}
