import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
