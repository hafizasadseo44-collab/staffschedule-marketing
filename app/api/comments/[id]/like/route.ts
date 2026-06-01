import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Toggle like on a comment. The client sends a stable anonymous fingerprint
// (UUID stored in localStorage) so a single browser can like once per comment.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const ip = getClientIp(request.headers);
    const limit = rateLimit(`like:${ip}`, { limit: 30, windowMs: 60_000 });
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many likes — slow down" },
        { status: 429 }
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const fingerprint =
      typeof body.fingerprint === "string" && body.fingerprint.length >= 8
        ? body.fingerprint.slice(0, 80)
        : null;
    if (!fingerprint) {
      return NextResponse.json(
        { error: "Missing fingerprint" },
        { status: 400 }
      );
    }

    const comment = await db.comment.findUnique({ where: { id } });
    if (!comment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const existing = await db.commentLike.findUnique({
      where: { commentId_fingerprint: { commentId: id, fingerprint } },
    });

    if (existing) {
      // Unlike
      await db.commentLike.delete({ where: { id: existing.id } });
      const updated = await db.comment.update({
        where: { id },
        data: { likeCount: Math.max(0, comment.likeCount - 1) },
        select: { likeCount: true },
      });
      return NextResponse.json({ liked: false, likeCount: updated.likeCount });
    }

    await db.commentLike.create({
      data: { commentId: id, fingerprint, ipAddress: ip },
    });
    const updated = await db.comment.update({
      where: { id },
      data: { likeCount: { increment: 1 } },
      select: { likeCount: true },
    });
    return NextResponse.json({ liked: true, likeCount: updated.likeCount });
  } catch (err: any) {
    console.error("[Comment Like]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
