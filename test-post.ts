import { ensureDatabase } from './lib/db-init';
import { db } from './lib/db';

async function testPost() {
  await ensureDatabase();
  console.log("Adding post via raw query fallback simulation...");
  
  const id = Math.random().toString(36).substring(2, 15);
  const title = "Test Post";
  const slug = "test-post-" + id;
  const content = "<p>Test</p>";
  const now = new Date().toISOString();
  
  try {
    await db.$executeRaw`
      INSERT INTO Post (id, title, slug, content, category, type, featured, published, createdAt, updatedAt)
      VALUES (${id}, ${title}, ${slug}, ${content}, "Scheduling", "ARTICLE", 0, 1, ${now}, ${now})
    `;
    console.log("Post inserted!");
  } catch (e) {
    console.error("Insert failed:", e);
  }
  
  const posts = await db.$queryRawUnsafe(`SELECT * FROM Post`) as any[];
  console.log("Total posts in DB:", posts.length);
}

testPost().finally(() => db.$disconnect());
