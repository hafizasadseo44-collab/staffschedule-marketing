const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const posts = await db.post.findMany({
    select: { id: true, title: true, image: true },
    where: { published: true, type: 'ARTICLE' },
    take: 6,
    orderBy: { createdAt: 'desc' }
  });
  console.log(JSON.stringify(posts, null, 2));
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
