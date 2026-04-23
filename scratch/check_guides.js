const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.guideCategory.findMany();
  console.log('Categories:', JSON.stringify(categories, null, 2));
  
  const guides = await prisma.guide.findMany();
  console.log('Guides:', JSON.stringify(guides, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
