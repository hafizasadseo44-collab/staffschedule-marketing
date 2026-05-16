import { PrismaClient } from '@prisma/client';
import path from 'path';

// Build an absolute path so the DB is always found regardless of
// which directory the Node.js process is started from on Hostinger.
const resolveDbUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  if (envUrl) {
    // If env var is set but uses a relative file path, make it absolute
    if (envUrl.startsWith('file:./') || envUrl.startsWith('file:../')) {
      const relativePath = envUrl.replace('file:', '');
      return `file:${path.resolve(process.cwd(), relativePath)}`;
    }
    return envUrl;
  }
  // Default: absolute path to prisma/dev.db from project root
  return `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;
};

const dbUrl = resolveDbUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Optimize Prisma for production by reducing log verbosity
export const db = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
