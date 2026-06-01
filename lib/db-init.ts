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
  console.log("ensureDatabase call: initialized=", initialized, "promise=", !!initializationPromise);
  if (initialized) return;
  if (initializationPromise) return initializationPromise;

  console.log("ensureDatabase starting initializationPromise...");
  initializationPromise = new Promise(async (resolve, reject) => {
    // Timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn("[DB-INIT] Initialization timed out after 3 seconds, continuing...");
      resolve();
    }, 3000);

    try {
    console.log("1. Finding DB path...");
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
        "name" TEXT,
        "active" INTEGER NOT NULL DEFAULT 1,
        "status" TEXT NOT NULL DEFAULT 'ACTIVE',
        "blog" INTEGER NOT NULL DEFAULT 1,
        "news" INTEGER NOT NULL DEFAULT 1,
        "guides" INTEGER NOT NULL DEFAULT 1,
        "productUpdates" INTEGER NOT NULL DEFAULT 1,
        "schedulingTips" INTEGER NOT NULL DEFAULT 1,
        "industryInsights" INTEGER NOT NULL DEFAULT 1,
        "featureReleases" INTEGER NOT NULL DEFAULT 1,
        "announcements" INTEGER NOT NULL DEFAULT 1,
        "weeklyDigest" INTEGER NOT NULL DEFAULT 1,
        "sourcePage" TEXT,
        "tags" TEXT,
        "subscribedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "unsubscribedAt" DATETIME,
        "lastEmailedAt" DATETIME,
        "emailsSent" INTEGER NOT NULL DEFAULT 0,
        "emailsOpened" INTEGER NOT NULL DEFAULT 0,
        "emailsClicked" INTEGER NOT NULL DEFAULT 0,
        "unsubscribeToken" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")`);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken")`);

    // Campaign
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Campaign" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" TEXT NOT NULL DEFAULT 'CUSTOM',
        "name" TEXT NOT NULL,
        "subject" TEXT NOT NULL,
        "preheader" TEXT,
        "fromName" TEXT NOT NULL DEFAULT 'StaffSchedule.io Team',
        "fromEmail" TEXT NOT NULL DEFAULT 'newsletter@staffschedule.io',
        "contentHtml" TEXT NOT NULL,
        "contentJson" TEXT,
        "audience" TEXT NOT NULL DEFAULT '{}',
        "status" TEXT NOT NULL DEFAULT 'DRAFT',
        "scheduledFor" DATETIME,
        "sentAt" DATETIME,
        "totalRecipients" INTEGER NOT NULL DEFAULT 0,
        "totalSent" INTEGER NOT NULL DEFAULT 0,
        "totalDelivered" INTEGER NOT NULL DEFAULT 0,
        "totalOpened" INTEGER NOT NULL DEFAULT 0,
        "totalClicked" INTEGER NOT NULL DEFAULT 0,
        "totalBounced" INTEGER NOT NULL DEFAULT 0,
        "totalUnsubscribed" INTEGER NOT NULL DEFAULT 0,
        "postId" TEXT,
        "guideId" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // EmailEvent
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "EmailEvent" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "campaignId" TEXT,
        "subscriberId" TEXT,
        "email" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "url" TEXT,
        "userAgent" TEXT,
        "ipAddress" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL,
        FOREIGN KEY("subscriberId") REFERENCES "Subscriber"("id") ON DELETE SET NULL
      )
    `);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "EmailEvent_campaignId_idx" ON "EmailEvent"("campaignId")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "EmailEvent_subscriberId_idx" ON "EmailEvent"("subscriberId")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "EmailEvent_email_idx" ON "EmailEvent"("email")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "EmailEvent_type_idx" ON "EmailEvent"("type")`);

    // Comment — threaded blog comments with moderation
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Comment" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "postId" TEXT NOT NULL,
        "parentId" TEXT,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "website" TEXT,
        "avatar" TEXT,
        "content" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'APPROVED',
        "isPinned" INTEGER NOT NULL DEFAULT 0,
        "isAuthor" INTEGER NOT NULL DEFAULT 0,
        "isAdmin" INTEGER NOT NULL DEFAULT 0,
        "likeCount" INTEGER NOT NULL DEFAULT 0,
        "ipAddress" TEXT,
        "userAgent" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY("postId") REFERENCES "Post"("id") ON DELETE CASCADE,
        FOREIGN KEY("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE
      )
    `);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Comment_postId_idx" ON "Comment"("postId")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Comment_status_idx" ON "Comment"("status")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Comment_parentId_idx" ON "Comment"("parentId")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Comment_createdAt_idx" ON "Comment"("createdAt")`);

    // CommentLike — anonymous fingerprint-based likes
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CommentLike" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "commentId" TEXT NOT NULL,
        "fingerprint" TEXT NOT NULL,
        "ipAddress" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "CommentLike_commentId_fingerprint_key" ON "CommentLike"("commentId", "fingerprint")`);
    await db.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "CommentLike_commentId_idx" ON "CommentLike"("commentId")`);

    // EmailTemplate
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "EmailTemplate" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT,
        "category" TEXT NOT NULL DEFAULT 'GENERAL',
        "subject" TEXT NOT NULL,
        "preheader" TEXT,
        "html" TEXT NOT NULL,
        "thumbnail" TEXT,
        "isSystem" INTEGER NOT NULL DEFAULT 0,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "EmailTemplate_name_key" ON "EmailTemplate"("name")`);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "EmailTemplate_slug_key" ON "EmailTemplate"("slug")`);

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

    // PostRevision
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PostRevision" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "postId" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "excerpt" TEXT,
        "image" TEXT,
        "authorId" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    // MediaAsset
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "MediaAsset" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "url" TEXT NOT NULL,
        "publicId" TEXT,
        "format" TEXT,
        "width" INTEGER,
        "height" INTEGER,
        "size" INTEGER,
        "provider" TEXT NOT NULL DEFAULT 'LOCAL',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // PostAnalytics
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PostAnalytics" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "postId" TEXT NOT NULL,
        "views" INTEGER NOT NULL DEFAULT 0,
        "uniqueViews" INTEGER NOT NULL DEFAULT 0,
        "date" DATETIME NOT NULL,
        FOREIGN KEY("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
    await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "PostAnalytics_postId_date_key" ON "PostAnalytics"("postId", "date")`);

    // Seed default admin user if empty
    const adminCount = await db.$queryRawUnsafe(`SELECT COUNT(*) as cnt FROM AdminUser`) as any[];
    const adminCountNum = adminCount[0] ? Number(adminCount[0].cnt ?? adminCount[0].count ?? 0) : 0;
    if (adminCountNum === 0) {
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
    const catCountNum = catCount[0] ? Number(catCount[0].cnt ?? catCount[0].count ?? 0) : 0;
    if (catCountNum === 0) {
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
    clearTimeout(timeout);
    resolve();
  } catch (error) {
    console.error("[DB-INIT] Failed to initialize database:", error);
    initialized = false;
    clearTimeout(timeout);
    resolve(); // Resolve anyway to not block
  }
  });

  return initializationPromise;
}

/**
 * Adds missing columns to existing tables for lightweight migrations.
 */
async function migrateSchema() {
  try {
    console.log("[DB-INIT] Running lightweight migrations...");
  
  // AdminUser Table Migrations
  const adminInfo = await db.$queryRawUnsafe(`PRAGMA table_info(AdminUser)`) as any[];
  const adminCols = adminInfo.map(c => c.name);
  if (!adminCols.includes("role")) {
    console.log(`[DB-INIT] Adding missing column role to AdminUser table...`);
    try { await db.$executeRawUnsafe(`ALTER TABLE "AdminUser" ADD COLUMN "role" TEXT DEFAULT 'ADMIN'`); } catch (e) {}
  }

  // Post Table Migrations
  const postInfo = await db.$queryRawUnsafe(`PRAGMA table_info(Post)`) as any[];
  const postCols = postInfo.map(c => c.name);
  
  const postMigrations = [
    { name: "focusKeyword", type: "TEXT" },
    { name: "seoTitle", type: "TEXT" },
    { name: "canonicalUrl", type: "TEXT" },
    { name: "authorId", type: "TEXT" },
    { name: "type", type: "TEXT DEFAULT 'ARTICLE'" },
    { name: "category", type: "TEXT DEFAULT 'Scheduling'" },
    { name: "status", type: "TEXT DEFAULT 'DRAFT'" },
    { name: "scheduledFor", type: "DATETIME" },
    { name: "metaDescription", type: "TEXT" },
    { name: "ogTitle", type: "TEXT" },
    { name: "ogDescription", type: "TEXT" },
    { name: "ogImage", type: "TEXT" },
    { name: "twitterCard", type: "TEXT DEFAULT 'summary_large_image'" },
    { name: "robotsMeta", type: "TEXT DEFAULT 'index, follow'" },
    { name: "schemaType", type: "TEXT DEFAULT 'Article'" },
    { name: "schemaData", type: "TEXT" },
    { name: "viewCount", type: "INTEGER DEFAULT 0" },
    { name: "readingTime", type: "INTEGER DEFAULT 0" }
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

  // PostRevision Table Migrations
  const postRevInfo = await db.$queryRawUnsafe(`PRAGMA table_info(PostRevision)`) as any[];
  const postRevCols = postRevInfo.map(c => c.name);
  if (!postRevCols.includes("authorId")) {
    console.log(`[DB-INIT] Adding missing column authorId to PostRevision table...`);
    try { await db.$executeRawUnsafe(`ALTER TABLE "PostRevision" ADD COLUMN "authorId" TEXT`); } catch (e) {}
  }

  // Subscriber Table Migrations — bring legacy rows up to the new marketing schema.
  // Existing live DB has only the original 8 columns; add the new ones idempotently.
  try {
    const subInfo = await db.$queryRawUnsafe(`PRAGMA table_info(Subscriber)`) as any[];
    const subCols = subInfo.map(c => c.name);
    const subMigrations = [
      { name: "name", type: "TEXT" },
      { name: "status", type: "TEXT NOT NULL DEFAULT 'ACTIVE'" },
      { name: "productUpdates", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "schedulingTips", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "industryInsights", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "featureReleases", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "announcements", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "weeklyDigest", type: "INTEGER NOT NULL DEFAULT 1" },
      { name: "sourcePage", type: "TEXT" },
      { name: "tags", type: "TEXT" },
      { name: "subscribedAt", type: "DATETIME" },
      { name: "unsubscribedAt", type: "DATETIME" },
      { name: "lastEmailedAt", type: "DATETIME" },
      { name: "emailsSent", type: "INTEGER NOT NULL DEFAULT 0" },
      { name: "emailsOpened", type: "INTEGER NOT NULL DEFAULT 0" },
      { name: "emailsClicked", type: "INTEGER NOT NULL DEFAULT 0" },
      { name: "unsubscribeToken", type: "TEXT" },
    ];
    for (const col of subMigrations) {
      if (!subCols.includes(col.name)) {
        console.log(`[DB-INIT] Adding missing column ${col.name} to Subscriber table...`);
        try { await db.$executeRawUnsafe(`ALTER TABLE "Subscriber" ADD COLUMN "${col.name}" ${col.type}`); } catch (e) { console.error(e); }
      }
    }
    // Backfill subscribedAt from createdAt for legacy rows
    try {
      await db.$executeRawUnsafe(`UPDATE "Subscriber" SET subscribedAt = createdAt WHERE subscribedAt IS NULL`);
    } catch (e) {}
    // Backfill status from active flag
    try {
      await db.$executeRawUnsafe(`UPDATE "Subscriber" SET status = CASE WHEN active = 1 THEN 'ACTIVE' ELSE 'UNSUBSCRIBED' END WHERE status IS NULL OR status = ''`);
    } catch (e) {}
    // Unique index for unsubscribeToken
    try { await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken")`); } catch (e) {}
  } catch (err) {
    console.error("[DB-INIT] Subscriber migration error:", err);
  }

  } catch (err: any) {
    console.error("[DB-INIT] Critical failure in migrateSchema:", err);
    // Don't rethrow, let the app try to run anyway
  }
  console.log("[DB-INIT] Migrations sequence finished.");
}
