const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const columns = await prisma.$queryRaw`PRAGMA table_info(Post)`;
    console.log('Columns in Post table:');
    console.table(columns);
  } catch (e) {
    console.error('Error fetching columns:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
