import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { gravatarUrl } from "@/lib/avatar";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Light spam filter: block payloads with these red-flag words. Keep
// permissive — heavy moderation is handled in the admin panel.
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|porn|xxx)\b/i,
  /https?:\/\/[^\s]+\s+https?:\/\/[^\s]+\s+https?:\/\/[^\s]+/i, // 3+ links
];

// Whether new comments need admin approval before going live. Default: false
// (publish immediately) to maximize engagement. Set MODERATE_COMMENTS=true
// in env if you want to gate publication.
const MODERATE = process.env.MODERATE_COMMENTS === "true";

// ─── GET /api/comments?postId=...|postSlug=... ─────────────────────
//
// Returns the approved comment tree for a given post, sorted: pinned first,
// then by creation desc. Replies are nested under their parent.
export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");
    const postSlug = url.searchParams.get("postSlug");
    const sort = url.searchParams.get("sort") || "newest"; // newest | oldest | popular

    if (!postId && !postSlug) {
      return NextResponse.json(
        { error: "postId or postSlug required" },
        { status: 400 }
      );
    }

    let resolvedPostId = postId;
    if (!resolvedPostId && postSlug) {
      const post = await db.post.findUnique({
        where: { slug: postSlug },
        select: { id: true },
      });
      if (!post) {
        return NextResponse.json({ comments: [], total: 0 });
      }
      resolvedPostId = post.id;
    }

    const orderBy: any =
      sort === "oldest"
        ? { createdAt: "asc" as const }
        : sort === "popular"
        ? { likeCount: "desc" as const }
        : { createdAt: "desc" as const };

    const all = await db.comment.findMany({
      where: { postId: resolvedPostId!, status: "APPROVED" },
      orderBy: [{ isPinned: "desc" }, orderBy],
    });

    // Group replies under parents in a single pass
    const byId = new Map<string, any>();
    const top: any[] = [];
    for (const c of all) {
      byId.set(c.id, { ...c, replies: [] });
    }
    for (const c of all) {
      const node = byId.get(c.id);
      if (c.parentId && byId.has(c.parentId)) {
        byId.get(c.parentId)!.replies.push(node);
      } else if (!c.parentId) {
        top.push(node);
      }
    }

    return NextResponse.json({ comments: top, total: all.length });
  } catch (err: any) {
    console.error("[Comments GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST /api/comments ────────────────────────────────────────────
//
// Submit a new comment or reply. Anonymous (name + email required).
// Returns the saved comment so the UI can render it optimistically.
export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const ip = getClientIp(request.headers);

    // Tighter than newsletter: 4 comments per minute per IP
    const limit = rateLimit(`comment:${ip}`, { limit: 4, windowMs: 60_000 });
    if (!limit.success) {
      return NextResponse.json(
        { error: "Slow down — too many comments. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      postId,
      postSlug,
      parentId,
      name,
      email,
      website,
      content,
      // honeypot
      url: honeypotUrl,
    } = body || {};

    // Honeypot triggered → silently accept (bot will think it worked)
    if (honeypotUrl && String(honeypotUrl).trim()) {
      return NextResponse.json({ success: true, silent: true });
    }

    // Resolve post
    let resolvedPostId = postId;
    if (!resolvedPostId && postSlug) {
      const post = await db.post.findUnique({
        where: { slug: postSlug },
        select: { id: true },
      });
      if (!post)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      resolvedPostId = post.id;
    }
    if (!resolvedPostId) {
      return NextResponse.json(
        { error: "postId or postSlug required" },
        { status: 400 }
      );
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name" },
        { status: 400 }
      );
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "string" || content.trim().length < 2) {
      return NextResponse.json(
        { error: "Please write a comment" },
        { status: 400 }
      );
    }
    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Comment is too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanName = name.trim().slice(0, 80);
    const cleanContent = content.trim().slice(0, 5000);
    const cleanWebsite =
      typeof website === "string" && website.trim()
        ? website.trim().slice(0, 200)
        : null;

    // Validate parent exists and belongs to same post if specified
    let validParentId: string | null = null;
    if (parentId) {
      const parent = await db.comment.findUnique({
        where: { id: parentId },
        select: { postId: true, parentId: true },
      });
      if (!parent || parent.postId !== resolvedPostId) {
        return NextResponse.json(
          { error: "Invalid parent comment" },
          { status: 400 }
        );
      }
      // Only allow one level of nesting — replies to replies attach to the top-level parent
      validParentId = parent.parentId || parentId;
    }

    // Spam scoring
    const isSpam = SPAM_PATTERNS.some((re) =>
      re.test(`${cleanName} ${cleanContent} ${cleanWebsite || ""}`)
    );

    const status = isSpam ? "SPAM" : MODERATE ? "PENDING" : "APPROVED";

    const comment = await db.comment.create({
      data: {
        postId: resolvedPostId,
        parentId: validParentId,
        name: cleanName,
        email: normalizedEmail,
        website: cleanWebsite,
        avatar: gravatarUrl(normalizedEmail, 120),
        content: cleanContent,
        status,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 200) || null,
      },
    });

    return NextResponse.json({
      success: true,
      comment: status === "APPROVED" ? comment : null,
      pending: status === "PENDING",
      spam: status === "SPAM",
    });
  } catch (err: any) {
    console.error("[Comments POST]", err);
    return NextResponse.json(
      { error: err.message || "Failed to post comment" },
      { status: 500 }
    );
  }
}
