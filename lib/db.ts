import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

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
  let projectRoot = process.cwd();
  
  // Standalone mode detection & correction
  if (projectRoot.endsWith('standalone')) {
    projectRoot = path.join(projectRoot, '..', '..');
  } else if (projectRoot.includes('.next' + path.sep + 'standalone')) {
    projectRoot = projectRoot.split('.next' + path.sep + 'standalone')[0];
  } else if (projectRoot.includes('.next/standalone')) {
    projectRoot = projectRoot.split('.next/standalone')[0];
  }

  const dbDir = path.resolve(projectRoot, 'prisma');
  const dbPath = path.resolve(dbDir, 'dev.db');
  
  // CRITICAL: Ensure the directory exists so SQLite can create/access the file!
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log('[DATABASE] Created prisma directory at:', dbDir);
    } catch (e) {
      console.error('[DATABASE] Failed to create prisma directory:', e);
    }
  }

  // CRITICAL AUTO-REPAIR: If the database is missing or empty, push the schema
  const dbFileExists = fs.existsSync(dbPath);
  const dbIsEmpty = dbFileExists ? fs.statSync(dbPath).size === 0 : true;

  if (dbIsEmpty) {
    console.log('[DATABASE] Fresh/empty database detected. Schema will be initialized by db-init.ts on first request.');
  }
  
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
