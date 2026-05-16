import { db } from './db';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

let initialized = false;
let initializationPromise: Promise<void> | null = null;

/**
 * Ensures the SQLite database has all required tables.
 * Called once per server lifecycle. Safe to call multiple times.
 */
export async function ensureDatabase() {
  if (initialized) return;
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    try {
    // 1. Try to find the DB path from the connection string
    let dbPath = '';
    try {
      // In Next.js App Router / Prisma Client, this is a more reliable way to get the URL
      const resolvedUrl = (db as any)._activeDatasources?.db?.url || '';
      if (resolvedUrl.startsWith('file:')) {
        dbPath = resolvedUrl.replace('file:', '');
      }
    } catch (e) {}

    if (dbPath && fs.existsSync(dbPath)) {
       // Check if writable
       try {
         fs.accessSync(dbPath, fs.constants.W_OK);
       } catch (err) {
         try { fs.chmodSync(dbPath, 0o666); } catch (e) {}
       }
       
       // Check if parent directory is writable (needed for SQLite journal files)
       try {
         const dbDir = path.dirname(dbPath);
         fs.accessSync(dbDir, fs.constants.W_OK);
       } catch (err) {
         try { 
           const dbDir = path.dirname(dbPath);
           fs.chmodSync(dbDir, 0o777); 
         } catch (e) {}
       }
    }

    // Check for Post table
    await db.$queryRawUnsafe(`SELECT 1 FROM Post LIMIT 1`);
    
    // If it exists, we still need to check for newer columns (migration)
    await migrateSchema();
    
    initialized = true;
    console.log("[DB-INIT] Database initialized and verified.");
  } catch (e: any) {
    console.error("[DB-INIT] Error during init:", e.message);
    // Continue anyway - the app might still work for reading
  }

  try {
    // AdminUser
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AdminUser" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email")`);

    // Post
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Post" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "excerpt" TEXT,
        "image" TEXT,
        "category" TEXT DEFAULT 'Scheduling',
        "type" TEXT DEFAULT 'ARTICLE',
        "featured" INTEGER NOT NULL DEFAULT 0,
        "published" INTEGER NOT NULL DEFAULT 0,
        "focusKeyword" TEXT,
        "seoTitle" TEXT,
        "canonicalUrl" TEXT,
        "authorId" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug")`);

    // Author
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Author" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "bio" TEXT,
        "avatar" TEXT,
        "gender" TEXT DEFAULT 'not_specified',
        "twitter" TEXT,
        "linkedin" TEXT,
        "facebook" TEXT,
        "website" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Author_slug_key" ON "Author"("slug")`);

    // Category
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "color" TEXT NOT NULL DEFAULT '#6366f1',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name")`);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug")`);

    // Guide
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Guide" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT NOT NULL DEFAULT '',
        "content" TEXT,
        "excerpt" TEXT,
        "coverImage" TEXT,
        "pdfUrl" TEXT,
        "categoryId" TEXT,
        "categoryName" TEXT DEFAULT 'General',
        "isFeatured" INTEGER NOT NULL DEFAULT 0,
        "isPublished" INTEGER NOT NULL DEFAULT 1,
        "downloadCount" INTEGER NOT NULL DEFAULT 0,
        "viewCount" INTEGER NOT NULL DEFAULT 0,
        "seoTitle" TEXT,
        "seoDescription" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Guide_slug_key" ON "Guide"("slug")`);

    // GuideCategory
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "GuideCategory" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "GuideCategory_name_key" ON "GuideCategory"("name")`);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "GuideCategory_slug_key" ON "GuideCategory"("slug")`);

    // Subscriber
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Subscriber" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "blog" INTEGER NOT NULL DEFAULT 1,
        "news" INTEGER NOT NULL DEFAULT 1,
        "guides" INTEGER NOT NULL DEFAULT 1,
        "active" INTEGER NOT NULL DEFAULT 1,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")`);

    // Prisma migrations table (so Prisma doesn't complain)
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "checksum" TEXT NOT NULL,
        "finished_at" DATETIME,
        "migration_name" TEXT NOT NULL,
        "logs" TEXT,
        "rolled_back_at" DATETIME,
        "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "applied_steps_count" INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Seed default admin user if empty
    const adminCount = await db.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM AdminUser`) as any[];
    if (adminCount[0]?.cnt === 0) {
      // We need to create a hashed password. Use a pre-computed bcrypt hash for the default password.
      // This matches @4499Asad using bcryptjs with 10 rounds
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || '@4499Asad', 10);
      const now = new Date().toISOString();
      await db.$executeRawUnsafe(
        `INSERT INTO AdminUser (id, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        'admin-default-001',
        process.env.ADMIN_EMAIL || 'hafizasadullahseo@gmail.com',
        hash,
        now, now
      );
      console.log("[DB-INIT] Default admin user created.");
    }

    // Seed default categories if empty
    const catCount = await db.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM Category`) as any[];
    if (catCount[0]?.cnt === 0) {
      const now = new Date().toISOString();
      const cats = [
        { name: 'Scheduling', color: '#6366f1' },
        { name: 'AI Intelligence', color: '#8b5cf6' },
        { name: 'Workforce Management', color: '#06b6d4' },
        { name: 'Product Updates', color: '#10b981' },
        { name: 'Industry Insights', color: '#f59e0b' },
      ];
      for (const cat of cats) {
        const id = Math.random().toString(36).substring(2, 15);
        const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await db.$executeRawUnsafe(
          `INSERT INTO Category (id, name, slug, color, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
          id, cat.name, slug, cat.color, now, now
        );
      }
      console.log("[DB-INIT] Default categories seeded.");
    }

    initialized = true;
    console.log("[DB-INIT] Database schema created successfully.");
  } catch (error) {
    console.error("[DB-INIT] Failed to initialize database:", error);
    initializationPromise = null; // Reset to allow retry
    throw error;
  } finally {
    initializationPromise = null;
  }
})();

  return initializationPromise;
}

/**
 * Adds missing columns to existing tables for lightweight migrations.
 */
async function migrateSchema() {
  try {
    console.log("[DB-INIT] Running lightweight migrations...");
  
  // Post Table Migrations
  const postInfo = await db.$queryRawUnsafe(`PRAGMA table_info(Post)`) as any[];
  const postCols = postInfo.map(c => c.name);
  
  const postMigrations = [
    { name: "focusKeyword", type: "TEXT" },
    { name: "seoTitle", type: "TEXT" },
    { name: "canonicalUrl", type: "TEXT" },
    { name: "authorId", type: "TEXT" },
    { name: "type", type: "TEXT DEFAULT 'ARTICLE'" },
    { name: "category", type: "TEXT DEFAULT 'Scheduling'" }
  ];

  for (const col of postMigrations) {
    if (!postCols.includes(col.name)) {
      console.log(`[DB-INIT] Adding missing column ${col.name} to Post table...`);
      try {
        await db.$executeRawUnsafe(`ALTER TABLE "Post" ADD COLUMN "${col.name}" ${col.type}`);
      } catch (err) {
        console.error(`[DB-INIT] Failed to add column ${col.name}:`, err);
      }
    }
  }

  // Guide Table Migrations
  const guideInfo = await db.$queryRawUnsafe(`PRAGMA table_info(Guide)`) as any[];
  const guideCols = guideInfo.map(c => c.name);

  const guideMigrations = [
    { name: "seoTitle", type: "TEXT" },
    { name: "seoDescription", type: "TEXT" },
    { name: "description", type: "TEXT NOT NULL DEFAULT ''" },
    { name: "content", type: "TEXT" },
    { name: "excerpt", type: "TEXT" }
  ];

  for (const col of guideMigrations) {
    if (!guideCols.includes(col.name)) {
      console.log(`[DB-INIT] Adding missing column ${col.name} to Guide table...`);
      try {
        await db.$executeRawUnsafe(`ALTER TABLE "Guide" ADD COLUMN "${col.name}" ${col.type}`);
      } catch (err) {
        console.error(`[DB-INIT] Failed to add column ${col.name}:`, err);
      }
    }
  }

  } catch (err: any) {
    console.error("[DB-INIT] Critical failure in migrateSchema:", err);
    // Don't rethrow, let the app try to run anyway
  }
  console.log("[DB-INIT] Migrations sequence finished.");
}
