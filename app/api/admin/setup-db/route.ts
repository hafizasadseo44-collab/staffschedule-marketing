import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    console.log("Starting Database Self-Healing/Setup...");

    // 1. Create AdminUser table if missing
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AdminUser" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 2. Create Post table if missing
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
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 3. Create Author table if missing
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
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 4. Create Category table if missing
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "color" TEXT NOT NULL DEFAULT '#6366f1',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 5. Create Guide table if missing
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Guide" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT NOT NULL,
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
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 6. Create GuideCategory table if missing
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "GuideCategory" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "description" TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Create Subscriber table if missing
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Subscriber" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL,
        "blog" INTEGER NOT NULL DEFAULT 1,
        "news" INTEGER NOT NULL DEFAULT 1,
        "guides" INTEGER NOT NULL DEFAULT 1,
        "active" INTEGER NOT NULL DEFAULT 1,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);

    // 8. Ensure Unique Indexes (SQLite doesn't support IF NOT EXISTS for indexes easily in one command, so we try/catch)
    const indexes = [
      'CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_email_key" ON "AdminUser"("email")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Author_slug_key" ON "Author"("slug")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Guide_slug_key" ON "Guide"("slug")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "GuideCategory_name_key" ON "GuideCategory"("name")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "GuideCategory_slug_key" ON "GuideCategory"("slug")',
      'CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")'
    ];

    for (const sql of indexes) {
      try {
        await db.$executeRawUnsafe(sql);
      } catch (e) {
        console.warn("Index creation warning (likely already exists):", e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database initialized successfully. All tables and indexes are ready." 
    });

  } catch (error: any) {
    console.error("Database Setup Error:", error);
    return NextResponse.json({ 
      error: 'Failed to initialize database: ' + error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
