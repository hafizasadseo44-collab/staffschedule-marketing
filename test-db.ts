import { PrismaClient } from '@prisma/client';
import { ensureDatabase } from './lib/db-init';

const db = new PrismaClient();

async function test() {
  try {
    console.log("Ensuring DB...");
    await ensureDatabase();
    
    console.log("Fetching posts...");
    const rawPosts = await db.$queryRawUnsafe(`
      SELECT * FROM Post 
      ORDER BY createdAt DESC
    `) as any[];
    
    console.log("Posts length:", rawPosts.length);
    if (rawPosts.length > 0) {
      console.log("First post ID:", rawPosts[0].id);
    }
    
  } catch (e: any) {
    console.error("Test failed:", e);
  } finally {
    await db.$disconnect();
  }
}

test();
