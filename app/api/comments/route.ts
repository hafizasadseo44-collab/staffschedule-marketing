import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";
import { getClientIp } from "@/lib/rate-limit";
import { gravatarUrl } from "@/lib/avatar";
import { scoreComment, sanitizeContent } from "@/lib/comment-spam";
import { checkCommentRateLimit } from "@/lib/comment-rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendCommentNotification } from "@/lib/email-service";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Hard limits — gate before any DB / scoring work.
const MIN_CONTENT = 20;
const MAX_CONTENT = 1000;
const MAX_NAME = 60;
const MAX_COMPANY = 80;
const MAX_PER_PAGE = 50;
const DEFAULT_PAGE_SIZE = 10;

// Disposable / known spam-sink domains. We don't want to email-bomb these
// addresses with approval notifications and they're heavily abused by bots.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com",
  "throwaway.email", "yopmail.com", "dispostable.com", "trashmail.com",
  "fakeinbox.com", "getnada.com", "sharklasers.com", "maildrop.cc",
]);

// ─── GET /api/comments?postId=...|postSlug=...&page=1&pageSize=10 ─────
//
// Returns one page of approved comments. Comments are nested (parent + replies)
// so the page count refers to top-level threads, not individual comments.
export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const url = new URL(request.url);
    const postId = url.searchParams.get("postId");
    const postSlug = url.searchParams.get("postSlug");
    const sort = url.searchParams.get("sort") || "newest";
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const pageSize = Math.min(
      MAX_PER_PAGE,
      Math.max(1, Number(url.searchParams.get("pageSize") || DEFAULT_PAGE_SIZE))
    );

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
      if (!post) return NextResponse.json({ comments: [], total: 0, page, pageSize, hasMore: false });
      resolvedPostId = post.id;
    }

    const orderBy: any =
      sort === "oldest"
        ? { createdAt: "asc" as const }
        : sort === "popular"
        ? { likeCount: "desc" as const }
        : { createdAt: "desc" as const };

    // Get top-level threads for this page only — replies are loaded
    // together with their parent in a single query below.
    const [topLevel, totalThreads] = await Promise.all([
      db.comment.findMany({
        where: { postId: resolvedPostId!, status: "APPROVED", parentId: null },
        orderBy: [{ isPinned: "desc" }, orderBy],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: COMMENT_PUBLIC_SELECT,
      }),
      db.comment.count({
        where: { postId: resolvedPostId!, status: "APPROVED", parentId: null },
      }),
    ]);

    const parentIds = topLevel.map((c) => c.id);
    const replies = parentIds.length
      ? await db.comment.findMany({
          where: {
            postId: resolvedPostId!,
            status: "APPROVED",
            parentId: { in: parentIds },
          },
          orderBy: { createdAt: "asc" },
          select: COMMENT_PUBLIC_SELECT,
        })
      : [];

    const byParent = new Map<string, any[]>();
    for (const r of replies) {
      const key = r.parentId!;
      if (!byParent.has(key)) byParent.set(key, []);
      byParent.get(key)!.push(r);
    }
    const comments = topLevel.map((c) => ({
      ...c,
      replies: byParent.get(c.id) || [],
    }));

    const totalAll = await db.comment.count({
      where: { postId: resolvedPostId!, status: "APPROVED" },
    });

    return NextResponse.json({
      comments,
      total: totalAll,
      threadCount: totalThreads,
      page,
      pageSize,
      hasMore: page * pageSize < totalThreads,
    });
  } catch (err: any) {
    console.error("[Comments GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Public-safe field selection — never expose email/IP/userAgent to the client.
const COMMENT_PUBLIC_SELECT = {
  id: true,
  postId: true,
  parentId: true,
  name: true,
  company: true,
  avatar: true,
  content: true,
  status: true,
  isPinned: true,
  isAuthor: true,
  isAdmin: true,
  isTrusted: true,
  likeCount: true,
  createdAt: true,
} as const;

// ─── POST /api/comments ────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const ip = getClientIp(request.headers);
    const body = await request.json().catch(() => ({}));
    const {
      postId,
      postSlug,
      parentId,
      name,
      email,
      company,
      content,
      turnstileToken,
      // honeypot
      url: honeypotUrl,
      website: honeypotWebsite, // legacy bot trap
    } = body || {};

    // 1. Honeypots — silently accept
    if (
      (honeypotUrl && String(honeypotUrl).trim()) ||
      (honeypotWebsite && String(honeypotWebsite).trim())
    ) {
      return NextResponse.json({ success: true, silent: true });
    }

    // 2. Resolve post
    let resolvedPostId = postId;
    let resolvedPostTitle = "";
    let resolvedPostSlug = postSlug;
    if (!resolvedPostId && postSlug) {
      const post = await db.post.findUnique({
        where: { slug: postSlug },
        select: { id: true, title: true, slug: true },
      });
      if (!post)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      resolvedPostId = post.id;
      resolvedPostTitle = post.title;
      resolvedPostSlug = post.slug;
    } else if (resolvedPostId) {
      const post = await db.post.findUnique({
        where: { id: resolvedPostId },
        select: { title: true, slug: true },
      });
      if (post) {
        resolvedPostTitle = post.title;
        resolvedPostSlug = post.slug;
      }
    }
    if (!resolvedPostId) {
      return NextResponse.json(
        { error: "postId or postSlug required" },
        { status: 400 }
      );
    }

    // 3. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Please write a thoughtful comment." },
        { status: 400 }
      );
    }
    const cleanContent = sanitizeContent(content);
    if (cleanContent.length < MIN_CONTENT) {
      return NextResponse.json(
        {
          error: `Comments need at least ${MIN_CONTENT} characters. Share more of your thinking — what specifically resonated?`,
        },
        { status: 400 }
      );
    }
    if (cleanContent.length > MAX_CONTENT) {
      return NextResponse.json(
        { error: `Comments are limited to ${MAX_CONTENT} characters.` },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (DISPOSABLE_DOMAINS.has(normalizedEmail.split("@")[1])) {
      return NextResponse.json(
        { error: "Please use a permanent email address." },
        { status: 400 }
      );
    }
    const cleanName = name.trim().slice(0, MAX_NAME);
    const cleanCompany =
      typeof company === "string" && company.trim()
        ? company.trim().slice(0, MAX_COMPANY)
        : null;

    // 4. CAPTCHA (if configured)
    const turnstile = await verifyTurnstile({
      token: turnstileToken,
      remoteIp: ip,
    });
    if (!turnstile.success) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 400 }
      );
    }

    // 5. Rate limit (DB-backed: 3/hr + 10/day per IP and email)
    const rate = await checkCommentRateLimit({ ip, email: normalizedEmail });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: rate.reason || "Rate limit exceeded." },
        {
          status: 429,
          headers: rate.retryAfterSec
            ? { "Retry-After": String(rate.retryAfterSec) }
            : undefined,
        }
      );
    }

    // 6. Parent comment validation (single-level threading)
    let validParentId: string | null = null;
    if (parentId) {
      const parent = await db.comment.findUnique({
        where: { id: parentId },
        select: { postId: true, parentId: true, status: true },
      });
      if (!parent || parent.postId !== resolvedPostId) {
        return NextResponse.json(
          { error: "Invalid parent comment." },
          { status: 400 }
        );
      }
      if (parent.status !== "APPROVED") {
        return NextResponse.json(
          { error: "Cannot reply to an unapproved comment." },
          { status: 400 }
        );
      }
      // Flatten: replies-to-replies attach to the top-level parent
      validParentId = parent.parentId || parentId;
    }

    // 7. Spam scoring
    const report = await scoreComment({
      name: cleanName,
      email: normalizedEmail,
      company: cleanCompany,
      content: cleanContent,
      ip,
      postId: resolvedPostId,
    });

    // 8. Trust check — has this email had ≥1 approved comment marked as trusted by admin?
    const trustedRow = await db.comment.findFirst({
      where: { email: normalizedEmail, isTrusted: true },
      select: { id: true },
    });
    const isTrustedCommenter = !!trustedRow;

    // 9. Decide initial status:
    //    - trusted + low spam → APPROVED
    //    - high spam score   → SPAM
    //    - otherwise         → PENDING (admin review)
    let status: "APPROVED" | "PENDING" | "SPAM";
    if (report.shouldHide) status = "SPAM";
    else if (isTrustedCommenter && report.level === "low") status = "APPROVED";
    else status = "PENDING";

    const comment = await db.comment.create({
      data: {
        postId: resolvedPostId,
        parentId: validParentId,
        name: cleanName,
        email: normalizedEmail,
        company: cleanCompany,
        // website is now permanently rejected — never stored on new rows
        avatar: gravatarUrl(normalizedEmail, 120),
        content: cleanContent,
        status,
        spamScore: report.score,
        spamReasons: report.reasons.join(",") || null,
        isTrusted: isTrustedCommenter,
        ipAddress: ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 200) || null,
        approvedAt: status === "APPROVED" ? new Date() : null,
      },
      select: COMMENT_PUBLIC_SELECT,
    });

    // 10. Email moderator — OFF by default.
    // The admin sees pending comments in the dashboard sidebar count and the
    // /admin/comments view. Per-comment email notifications create too much
    // noise, so we only send them when COMMENT_ADMIN_NOTIFICATIONS=true.
    if (process.env.COMMENT_ADMIN_NOTIFICATIONS === "true") {
      sendCommentNotification({
        commenterName: cleanName,
        commenterEmail: normalizedEmail,
        commenterCompany: cleanCompany,
        content: cleanContent,
        postTitle: resolvedPostTitle || "Untitled",
        postSlug: resolvedPostSlug || "",
        spamScore: report.score,
        spamReasons: report.reasons,
        status,
        ipAddress: ip,
      }).catch((e) => console.error("[Comment] notif failed:", e));
    }

    return NextResponse.json({
      success: true,
      // Only return the comment object if it's immediately visible —
      // otherwise the client knows it's pending and shows a "thanks, awaiting
      // approval" message.
      comment: status === "APPROVED" ? comment : null,
      status,
      message:
        status === "APPROVED"
          ? "Comment posted!"
          : status === "PENDING"
          ? "Thanks! Your comment is awaiting moderation and will appear shortly."
          : "Comment received.",
    });
  } catch (err: any) {
    console.error("[Comments POST]", err);
    return NextResponse.json(
      { error: err.message || "Failed to post comment" },
      { status: 500 }
    );
  }
}
