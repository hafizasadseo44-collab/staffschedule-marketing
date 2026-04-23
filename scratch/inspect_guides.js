const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const guides = await prisma.guide.findMany({
    select: { id: true, title: true, slug: true, content: true }
  });
  
  console.log(JSON.stringify(guides, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
