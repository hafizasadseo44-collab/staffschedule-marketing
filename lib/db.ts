import { PrismaClient } from '@prisma/client';
import path from 'path';

// Build an absolute path so the DB is always found regardless of
// which directory the Node.js process is started from on Hostinger.
const resolveDbUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  
  // 1. If DATABASE_URL is set in environment (e.g. Hostinger Control Panel)
  // and it's already an absolute path, use it.
  if (envUrl && !envUrl.startsWith('file:.')) {
    return envUrl;
  }

  // 2. Default: Absolute path to prisma/dev.db from project root
  const projectRoot = process.cwd();
  const dbPath = path.join(projectRoot, 'prisma', 'dev.db');
  
  return `file:${dbPath}`;
};

export const dbUrl = resolveDbUrl();

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
