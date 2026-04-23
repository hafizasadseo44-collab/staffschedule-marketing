const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({ select: { slug: true }, take: 5 });
  console.log(posts);
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
