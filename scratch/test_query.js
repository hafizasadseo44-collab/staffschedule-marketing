const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testQuery() {
  try {
    const publishedOnly = false;
    const rawPosts = await prisma.$queryRawUnsafe(`
      SELECT * FROM Post 
      ${publishedOnly ? 'WHERE published = 1' : ''}
      ORDER BY createdAt DESC
    `);
    console.log('Raw Posts Count:', rawPosts.length);
    console.log('Types:', [...new Set(rawPosts.map(p => p.type))]);
  } catch (e) {
    console.error('Query failed:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

testQuery();
