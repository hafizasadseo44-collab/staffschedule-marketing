import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (process.env.SITE_PRIVATE_MODE === 'true') {
    return [];
  }

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
    // ── Core ──────────────────────────────────────────────────────
    { url: BASE,                                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/pricing`,                       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contact`,                       lastModified: now, changeFrequency: "yearly",  priority: 0.7 },

    // ── High-Value Landing Pages ───────────────────────────────────
    { url: `${BASE}/team-scheduling-software`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/employee-schedule-maker`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/time-clock-software`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/team-messaging`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // ── Features Hub + All Sub-Pages ──────────────────────────────
    { url: `${BASE}/features`,                      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/features/ai`,                   lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/analytics`,            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/announcements`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/attendance`,           lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/availability`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/communication`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/compliance`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/leave-management`,     lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/multi-location`,       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/open-shifts`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/payroll`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/features/reporting`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/features/shift-swaps`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── Solutions ─────────────────────────────────────────────────
    { url: `${BASE}/solutions/healthcare`,          lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/solutions/hospitality`,         lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/solutions/retail`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/solutions/security`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── Content & Resources ───────────────────────────────────────
    { url: `${BASE}/blog`,                          lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/guides`,                        lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/resources/guides`,              lastModified: now, changeFrequency: "weekly",  priority: 0.7 },

    // ── About ─────────────────────────────────────────────────────
    { url: `${BASE}/about`,                         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/mission`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/about/careers`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.6 },

    // ── Customer Success ──────────────────────────────────────────
    { url: `${BASE}/customer-success`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // ── Legal ─────────────────────────────────────────────────────
    { url: `${BASE}/privacy`,                       lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/terms`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
  ];

  return [...baseEntries, ...postEntries, ...guideEntries];
}
