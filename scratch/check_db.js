const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.$queryRawUnsafe('SELECT id, title, type, category, published FROM Post');
    console.log('Total Posts:', posts.length);
    console.log('Sample Posts:', JSON.stringify(posts.slice(0, 5), null, 2));
  } catch (e) {
    console.error('Error querying DB:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
