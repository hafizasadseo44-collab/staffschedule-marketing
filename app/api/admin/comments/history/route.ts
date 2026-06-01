import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// ─── GET /api/admin/comments/history?email=...|ip=... ────────────
//
// Returns every comment + summary for a single commenter so the moderator
// can decide whether to trust them, ban them, or just approve this one.
// Search by email (preferred) or by IP (for catching repeat anonymous offenders).
export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const email = url.searchParams.get("email")?.toLowerCase().trim();
    const ip = url.searchParams.get("ip");

    if (!email && !ip) {
      return NextResponse.json(
        { error: "email or ip required" },
        { status: 400 }
      );
    }

    const where: any = {};
    if (email) where.email = email;
    if (ip) where.ipAddress = ip;

    const [comments, byStatus] = await Promise.all([
      db.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
          post: { select: { id: true, title: true, slug: true } },
        },
      }),
      db.comment.groupBy({
        by: ["status"],
        where,
        _count: { _all: true },
      }),
    ]);

    const stats: Record<string, number> = {
      APPROVED: 0,
      PENDING: 0,
      SPAM: 0,
      REJECTED: 0,
    };
    for (const row of byStatus) {
      stats[row.status] = row._count._all;
    }

    // Profile snapshot from first comment (or earliest record)
    const earliest = comments[comments.length - 1];
    const latest = comments[0];
    const isTrusted = comments.some((c) => c.isTrusted);
    const avgSpamScore =
      comments.length > 0
        ? Math.round(
            comments.reduce((sum, c) => sum + (c.spamScore || 0), 0) /
              comments.length
          )
        : 0;
    const uniquePosts = new Set(comments.map((c) => c.postId)).size;

    return NextResponse.json({
      profile: {
        name: latest?.name || earliest?.name || null,
        email: latest?.email || earliest?.email || email,
        company: latest?.company || earliest?.company || null,
        avatar: latest?.avatar || earliest?.avatar || null,
        ipAddress: latest?.ipAddress || earliest?.ipAddress || ip,
        firstSeen: earliest?.createdAt || null,
        lastSeen: latest?.createdAt || null,
        isTrusted,
        avgSpamScore,
        uniquePosts,
      },
      stats: { ...stats, total: comments.length },
      comments,
    });
  } catch (err: any) {
    console.error("[Comments History]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
