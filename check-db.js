const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const authors = await prisma.author.findMany();
  console.log('--- Authors in Database ---');
  console.log(JSON.stringify(authors, null, 2));
  console.log('---------------------------');
  const posts = await prisma.post.findMany({ select: { slug: true, authorId: true } });
  console.log('--- Posts and their Author IDs ---');
  console.log(JSON.stringify(posts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
