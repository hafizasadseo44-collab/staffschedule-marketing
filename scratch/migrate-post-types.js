const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  
  for (const post of posts) {
    const cat = (post.category || "").toLowerCase();
    const title = (post.title || "").toLowerCase();
    
    let type = "ARTICLE";
    if (
      cat.includes("announcement") || 
      cat.includes("news") || 
      cat.includes("press") || 
      cat.includes("update") || 
      cat.includes("release") ||
      title.includes("update") ||
      title.includes("announcement") ||
      title.includes("news")
    ) {
      type = "NEWS";
    }
    
    await prisma.post.update({
      where: { id: post.id },
      data: { type }
    });
    console.log(`Updated "${post.title}" to type: ${type}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
