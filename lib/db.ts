import { PrismaClient } from '@prisma/client';
import path from 'path';

import fs from 'fs';

// Build an absolute path so the DB is always found regardless of
// which directory the Node.js process is started from on Hostinger.
const resolveDbUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  
  // 1. If DATABASE_URL is set in environment (e.g. Hostinger Control Panel)
  if (envUrl && !envUrl.includes('./')) {
    return envUrl;
  }

  // 2. Try to find the DB file in common locations
  // We prioritize locations where the file actually exists
  const projectRoot = process.cwd();
  const pathsToTry = [
    path.join(projectRoot, 'prisma', 'dev.db'),
    path.resolve(__dirname, '../../prisma/dev.db'),
    // Fallback for Hostinger shared hosting structures
    path.join(projectRoot, 'public_html', 'prisma', 'dev.db'),
  ];

  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      return `file:${p}`;
    }
  }

  // 3. If none exist, use the most likely absolute path (project root)
  return `file:${path.join(projectRoot, 'prisma', 'dev.db')}`;
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
