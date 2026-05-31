import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// System templates — exposed read-only so the dashboard can show our built-in
// React Email templates alongside any user-saved custom HTML templates.
const SYSTEM_TEMPLATES = [
  {
    slug: "welcome",
    name: "Welcome Email",
    category: "WELCOME",
    description:
      "Sent immediately on subscription. Includes brand hero, quick wins, popular posts, and CTA to free trial.",
    subject: "Welcome to StaffSchedule.io 👋",
  },
  {
    slug: "blog-post",
    name: "Blog Post / News",
    category: "BLOG",
    description:
      "Auto-generated from a published article. Cover image, category, title, excerpt, author info and CTA.",
    subject: "✍️ New on the blog: {{post_title}}",
  },
  {
    slug: "weekly-digest",
    name: "Weekly Workforce Digest",
    category: "DIGEST",
    description:
      "Curated round-up of the last 7 days — featured article, more articles, guides, product updates.",
    subject: "📬 Your Weekly Workforce Digest",
  },
  {
    slug: "product-update",
    name: "Product Update",
    category: "PRODUCT",
    description:
      "Feature launch / release / announcement. Gradient hero, optional product image, feature bullets, CTA.",
    subject: "✨ {{title}}",
  },
];

export async function GET() {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const custom = await db.emailTemplate.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      system: SYSTEM_TEMPLATES,
      custom,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, slug, description, category, subject, preheader, html } = body;
    if (!name || !slug || !subject || !html) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const template = await db.emailTemplate.create({
      data: {
        name,
        slug,
        description,
        category: category || "CUSTOM",
        subject,
        preheader,
        html,
      },
    });
    return NextResponse.json(template);
  } catch (err: any) {
    if (err?.code === "P2002")
      return NextResponse.json(
        { error: "A template with that name or slug already exists" },
        { status: 400 }
      );
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
