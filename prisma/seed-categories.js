const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaults = [
  { name: 'Scheduling', slug: 'scheduling', color: '#6366f1' },
  { name: 'AI Intelligence', slug: 'ai-intelligence', color: '#8b5cf6' },
  { name: 'Productivity', slug: 'productivity', color: '#06b6d4' },
  { name: 'Legal & Compliance', slug: 'legal-compliance', color: '#f59e0b' },
  { name: 'Operations', slug: 'operations', color: '#10b981' },
];

async function main() {
  for (const cat of defaults) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Default categories seeded!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
