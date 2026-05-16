import { PrismaClient } from '@prisma/client';
import path from 'path';

// Build an absolute path so the DB is always found regardless of
// which directory the Node.js process is started from on Hostinger.
const resolveDbUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  
  // 1. If DATABASE_URL is set in environment (e.g. Hostinger Control Panel)
  if (envUrl) {
    if (envUrl.startsWith('file:./') || envUrl.startsWith('file:../')) {
      const relativePath = envUrl.replace('file:', '');
      return `file:${path.resolve(process.cwd(), relativePath)}`;
    }
    return envUrl;
  }

  // 2. Default: Absolute path to prisma/dev.db
  // We use multiple fallbacks to ensure the path is correct on Hostinger
  const pathsToTry = [
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.resolve(__dirname, '../../prisma/dev.db'), // Relative to lib/db.ts
    path.resolve('/home', process.env.USER || '', 'domains/staffschedule.io/public_html/prisma/dev.db'), // Common Hostinger path
  ];

  for (const p of pathsToTry) {
    // In production, we don't want to log every check, but we need an absolute path
    if (p.startsWith('/') || p.includes(':\\')) { // Simple absolute path check
       return `file:${p}`;
    }
  }

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
