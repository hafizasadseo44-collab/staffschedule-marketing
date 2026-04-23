const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.count();
  const guides = await prisma.guide.count();
  const categories = await prisma.category.count();
  const guideCategories = await prisma.guideCategory.count();
  
  console.log(JSON.stringify({
    posts,
    guides,
    categories,
    guideCategories
  }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
