import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// ─── GET /api/admin/comments ─────────────────────────────────────
// Filters: ?status=PENDING|APPROVED|REJECTED|SPAM|ALL, ?search=, ?postId=
// Returns flat list with post info for the moderation table.
export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "ALL";
    const search = url.searchParams.get("search")?.trim();
    const postId = url.searchParams.get("postId");
    const limit = Math.min(Number(url.searchParams.get("limit") || 50), 200);
    const offset = Number(url.searchParams.get("offset") || 0);

    const where: any = {};
    if (status !== "ALL") where.status = status;
    if (postId) where.postId = postId;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const [items, total, stats] = await Promise.all([
      db.comment.findMany({
        where,
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        skip: offset,
        take: limit,
        include: {
          post: { select: { id: true, title: true, slug: true } },
          _count: { select: { replies: true } },
        },
      }),
      db.comment.count({ where }),
      // Sidebar counts
      Promise.all([
        db.comment.count({ where: { status: "APPROVED" } }),
        db.comment.count({ where: { status: "PENDING" } }),
        db.comment.count({ where: { status: "SPAM" } }),
        db.comment.count({ where: { status: "REJECTED" } }),
      ]).then(([approved, pending, spam, rejected]) => ({
        approved,
        pending,
        spam,
        rejected,
        all: approved + pending + spam + rejected,
      })),
    ]);

    return NextResponse.json({ items, total, stats, limit, offset });
  } catch (err: any) {
    console.error("[Admin Comments GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST /api/admin/comments ────────────────────────────────────
// Bulk action: { ids: string[], action: "approve" | "reject" | "spam" | "delete" | "pin" | "unpin" }
export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { ids, action } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No ids provided" }, { status: 400 });
    }

    let result: any = {};

    switch (action) {
      case "approve":
        result = await db.comment.updateMany({
          where: { id: { in: ids } },
          data: { status: "APPROVED" },
        });
        break;
      case "reject":
        result = await db.comment.updateMany({
          where: { id: { in: ids } },
          data: { status: "REJECTED" },
        });
        break;
      case "spam":
        result = await db.comment.updateMany({
          where: { id: { in: ids } },
          data: { status: "SPAM" },
        });
        break;
      case "pin":
        result = await db.comment.updateMany({
          where: { id: { in: ids } },
          data: { isPinned: true },
        });
        break;
      case "unpin":
        result = await db.comment.updateMany({
          where: { id: { in: ids } },
          data: { isPinned: false },
        });
        break;
      case "delete":
        result = await db.comment.deleteMany({ where: { id: { in: ids } } });
        break;
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, count: result.count });
  } catch (err: any) {
    console.error("[Admin Comments POST]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
