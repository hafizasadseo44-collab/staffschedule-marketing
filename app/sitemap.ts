import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = "https://staffschedule.io";
  const now = new Date();

  // 1. Fetch dynamic blog posts
  let posts: any[] = [];
  try {
    posts = await db.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    // Fallback if db is empty or out of sync
    console.error("Sitemap Post Fetch Error:", e);
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 2. Fetch dynamic guides
  let guides: any[] = [];
  try {
    // Use raw query for guides to bypass Prisma Client sync issues
    guides = await db.$queryRawUnsafe(`SELECT slug, updatedAt FROM Guide WHERE isPublished = 1`) as any[];
  } catch (e) {
    console.error("Sitemap Guide Fetch Error:", e);
  }

  const guideEntries: MetadataRoute.Sitemap = (guides || []).map((guide) => ({
    url: `${BASE}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Static Entries
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/guides`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...baseEntries, ...postEntries, ...guideEntries];
}
