import { db } from '@/lib/db';
import BlogClientPage from '@/components/blog/BlogClientPage';

export const metadata = {
  title: 'Blog | StaffSchedule.io',
  description: 'Latest news, tips, and insights on AI staffing and schedule optimization.',
  openGraph: {
    title: 'StaffSchedule.io Blog',
    description: 'Expert insights on the future of workforce management and AI scheduling.',
    type: 'website',
  }
};

export default async function BlogListing() {
  let posts: any[] = [];
  
  try {
    const rawPosts = await db.$queryRaw`
      SELECT * FROM Post 
      WHERE published = 1
      ORDER BY createdAt DESC
    ` as any[];

    posts = rawPosts.filter(p => {
      const type = p.type || 'ARTICLE';
      const category = p.category || '';
      
      const isArticle = type === 'ARTICLE' || (!['NEWS'].includes(type) && !['Announcement', 'Company Announcement', 'Product Update', 'Press Release'].includes(category));
      return isArticle;
    });
  } catch (e) {
    console.error('Failed to fetch blog posts:', e);
  }

  // Serialize dates for Client Component if necessary (Prisma returns Date objects, raw SQLite might return strings)
  const serializedPosts = posts.map(post => ({
    ...post,
    createdAt: typeof post.createdAt === 'string' ? post.createdAt : (post.createdAt?.toISOString() || new Date().toISOString()),
  }));

  return (
    <BlogClientPage posts={serializedPosts} />
  );
}

