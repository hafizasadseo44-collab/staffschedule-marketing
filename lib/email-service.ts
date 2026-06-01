import { Resend } from "resend";
import { render } from "@react-email/render";
import { randomUUID } from "crypto";
import * as React from "react";
import { db } from "./db";
import WelcomeEmail from "@/emails/WelcomeEmail";
import BlogPostEmail from "@/emails/BlogPostEmail";
import WeeklyDigestEmail, {
  DigestArticle,
  DigestGuide,
} from "@/emails/WeeklyDigestEmail";
import ProductUpdateEmail from "@/emails/ProductUpdateEmail";
import ContactReplyEmail from "@/emails/ContactReplyEmail";
import ContactNotificationEmail from "@/emails/ContactNotificationEmail";
import CommentNotificationEmail from "@/emails/CommentNotificationEmail";
import CommentApprovedEmail from "@/emails/CommentApprovedEmail";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

// ───────────────────────────────────────────────────────────────────
// Business email senders
// ───────────────────────────────────────────────────────────────────
// We use three dedicated sender addresses to keep brand voice and
// deliverability reputation cleanly separated:
//
//   hello@      — human, two-way conversations (contact form, sales replies)
//   newsletter@ — broadcast marketing content (newsletter, blog, digests)
//   noreply@    — automated system messages (welcome, password reset, alerts)
//
// Each is independently configurable via env, with sensible defaults so the
// app works the moment the Resend domain is verified.

export const SENDER = {
  hello: process.env.RESEND_FROM_HELLO || "StaffSchedule.io <hello@staffschedule.io>",
  newsletter:
    process.env.RESEND_FROM_NEWSLETTER ||
    "StaffSchedule.io Team <newsletter@staffschedule.io>",
  noreply:
    process.env.RESEND_FROM_NOREPLY || "StaffSchedule.io <noreply@staffschedule.io>",
} as const;

// Reply-To for marketing emails so subscribers who hit "reply" go to a real
// human inbox rather than the broadcast address.
export const REPLY_TO = {
  newsletter: process.env.RESEND_REPLY_TO_NEWSLETTER || "hello@staffschedule.io",
  noreply: process.env.RESEND_REPLY_TO_NOREPLY || "hello@staffschedule.io",
} as const;

// Where contact-form submissions are routed (your inbox).
export const CONTACT_INBOX = process.env.CONTACT_INBOX || "hello@staffschedule.io";

// Back-compat: legacy code paths used `FROM_EMAIL`. Default to noreply since
// that's the safest sender for automated/transactional messages.
const FROM_EMAIL = SENDER.noreply;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://staffschedule.io";
const BATCH_SIZE = 50;

// Lazy client — Resend SDK throws on construction if the key looks bogus,
// so we hold off until first send call.
let _client: Resend | null = null;
function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  if (!_client) _client = new Resend(RESEND_API_KEY);
  return _client;
}

// ───────────────────────────────────────────────────────────────────
// URL helpers
// ───────────────────────────────────────────────────────────────────

export function buildUnsubscribeUrl(token: string, campaignId?: string) {
  const q = new URLSearchParams({ token });
  if (campaignId) q.set("c", campaignId);
  return `${SITE_URL}/unsubscribe?${q.toString()}`;
}

export function buildPreferencesUrl(token: string) {
  return `${SITE_URL}/preferences?token=${token}`;
}

export function buildTrackingPixelUrl(eventId: string) {
  return `${SITE_URL}/api/email/track/open/${eventId}.gif`;
}

export function buildClickWrappedUrl(eventId: string, targetUrl: string) {
  return `${SITE_URL}/api/email/track/click/${eventId}?u=${encodeURIComponent(
    targetUrl
  )}`;
}

// ───────────────────────────────────────────────────────────────────
// Tracking pixel + click wrap
// ───────────────────────────────────────────────────────────────────

/**
 * Append a transparent 1x1 tracking pixel to the rendered HTML.
 * The eventId is the EmailEvent.id we generated when queuing the SENT event.
 */
function injectTrackingPixel(html: string, eventId: string): string {
  const pixel = `<img src="${buildTrackingPixelUrl(eventId)}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />`;
  if (html.includes("</body>")) {
    return html.replace("</body>", `${pixel}</body>`);
  }
  return html + pixel;
}

/**
 * Wrap all <a href="..."> in click-tracking redirects, EXCEPT unsubscribe/preferences/mailto.
 */
function wrapLinksForTracking(html: string, eventId: string): string {
  return html.replace(/href="([^"]+)"/g, (match, url) => {
    if (
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("#") ||
      url.includes("/unsubscribe") ||
      url.includes("/preferences") ||
      url.includes("/api/email/track")
    ) {
      return match;
    }
    return `href="${buildClickWrappedUrl(eventId, url)}"`;
  });
}

// ───────────────────────────────────────────────────────────────────
// Token management
// ───────────────────────────────────────────────────────────────────

export async function ensureUnsubscribeToken(
  subscriberId: string,
  existingToken: string | null
): Promise<string> {
  if (existingToken) return existingToken;
  const token = randomUUID();
  await db.subscriber.update({
    where: { id: subscriberId },
    data: { unsubscribeToken: token },
  });
  return token;
}

// ───────────────────────────────────────────────────────────────────
// Audience selection
// ───────────────────────────────────────────────────────────────────

export interface AudienceFilter {
  preferences?: Array<
    | "blog"
    | "news"
    | "guides"
    | "productUpdates"
    | "schedulingTips"
    | "industryInsights"
    | "featureReleases"
    | "announcements"
    | "weeklyDigest"
  >;
  tags?: string[];
}

export async function resolveAudience(filter: AudienceFilter) {
  const where: any = { active: true, status: "ACTIVE" };

  if (filter.preferences && filter.preferences.length > 0) {
    where.OR = filter.preferences.map((p) => ({ [p]: true }));
  }

  const subscribers = await db.subscriber.findMany({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      unsubscribeToken: true,
      tags: true,
    },
  });

  // Tag filter (in-memory because SQLite stores them comma-separated)
  if (filter.tags && filter.tags.length > 0) {
    const wanted = new Set(filter.tags.map((t) => t.toLowerCase().trim()));
    return subscribers.filter((s) => {
      if (!s.tags) return false;
      const subTags = s.tags
        .toLowerCase()
        .split(",")
        .map((t) => t.trim());
      return subTags.some((t) => wanted.has(t));
    });
  }
  return subscribers;
}

// ───────────────────────────────────────────────────────────────────
// Welcome Email (immediate, single-recipient)
// ───────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(opts: {
  email: string;
  name?: string | null;
  subscriberId: string;
  unsubscribeToken: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY missing, skipping welcome email");
    return { sent: false, skipped: true };
  }

  // Fetch up to 3 most-recent published posts for "Popular Reads"
  let popularPosts: { title: string; url: string; category?: string }[] = [];
  try {
    const posts = await db.post.findMany({
      where: { published: true, type: "ARTICLE" },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { title: true, slug: true, category: true },
    });
    popularPosts = posts.map((p) => ({
      title: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      category: p.category || undefined,
    }));
  } catch {}

  const unsubscribeUrl = buildUnsubscribeUrl(opts.unsubscribeToken);
  const preferencesUrl = buildPreferencesUrl(opts.unsubscribeToken);

  // Pre-create a SENT event so we can embed its id in the pixel + click links
  const event = await db.emailEvent.create({
    data: {
      type: "SENT",
      email: opts.email,
      subscriberId: opts.subscriberId,
    },
  });

  let html = await render(
    React.createElement(WelcomeEmail, {
      name: opts.name,
      siteUrl: SITE_URL,
      unsubscribeUrl,
      preferencesUrl,
      popularPosts,
    })
  );
  html = wrapLinksForTracking(html, event.id);
  html = injectTrackingPixel(html, event.id);

  try {
    await resend.emails.send({
      // Welcome is technically transactional (triggered by user action), so
      // we send from noreply@ but set reply-to to hello@ for real replies.
      from: SENDER.noreply,
      replyTo: REPLY_TO.noreply,
      to: opts.email,
      subject: opts.name?.trim()
        ? `Welcome to StaffSchedule.io, ${opts.name.trim().split(" ")[0]} 👋`
        : "Welcome to StaffSchedule.io 👋",
      html,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    await db.subscriber.update({
      where: { id: opts.subscriberId },
      data: { emailsSent: { increment: 1 }, lastEmailedAt: new Date() },
    });
    return { sent: true };
  } catch (err: any) {
    console.error("[Email] Welcome send failed:", err.message);
    return { sent: false, error: err.message };
  }
}

// ───────────────────────────────────────────────────────────────────
// Generic campaign sender
// ───────────────────────────────────────────────────────────────────

/**
 * Render a React Email template per recipient (so tracking IDs + tokens vary),
 * then send via Resend.batch.send in chunks.
 *
 * `renderForRecipient` returns the React element. The service handles tracking
 * pixel injection, link wrapping, batching, event logging, and stat rollup.
 */
async function sendCampaignBatch(opts: {
  campaignId: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  recipients: Array<{
    id: string;
    email: string;
    name: string | null;
    unsubscribeToken: string | null;
  }>;
  renderForRecipient: (r: {
    email: string;
    name: string | null;
    unsubscribeUrl: string;
    preferencesUrl: string;
  }) => React.ReactElement;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY missing, marking campaign as FAILED");
    await db.campaign.update({
      where: { id: opts.campaignId },
      data: { status: "FAILED" },
    });
    return { sent: 0, failed: opts.recipients.length };
  }

  let totalSent = 0;
  let totalFailed = 0;

  // All broadcast campaigns send from newsletter@ for proper deliverability
  // separation. We ignore per-campaign fromName/fromEmail unless explicitly
  // overridden to a known-good sender — Resend rejects unverified addresses.
  const senderEmail = opts.fromEmail.includes("@")
    ? opts.fromEmail.replace(/.*<|>.*/g, "").trim()
    : SENDER.newsletter.replace(/.*<|>.*/g, "").trim();
  const senderName = opts.fromName || "StaffSchedule.io Team";
  const from = senderEmail.startsWith("hello@") ||
    senderEmail.startsWith("newsletter@") ||
    senderEmail.startsWith("noreply@")
    ? `${senderName} <${senderEmail}>`
    : SENDER.newsletter;

  for (let i = 0; i < opts.recipients.length; i += BATCH_SIZE) {
    const batch = opts.recipients.slice(i, i + BATCH_SIZE);

    // Per-recipient render so each gets its own tracking pixel + tokens
    const messages = await Promise.all(
      batch.map(async (r) => {
        const token = await ensureUnsubscribeToken(r.id, r.unsubscribeToken);
        const unsubscribeUrl = buildUnsubscribeUrl(token, opts.campaignId);
        const preferencesUrl = buildPreferencesUrl(token);

        const event = await db.emailEvent.create({
          data: {
            type: "SENT",
            email: r.email,
            subscriberId: r.id,
            campaignId: opts.campaignId,
          },
        });

        let html = await render(
          opts.renderForRecipient({
            email: r.email,
            name: r.name,
            unsubscribeUrl,
            preferencesUrl,
          })
        );
        html = wrapLinksForTracking(html, event.id);
        html = injectTrackingPixel(html, event.id);

        return {
          from,
          replyTo: REPLY_TO.newsletter,
          to: r.email,
          subject: opts.subject,
          html,
          headers: {
            "List-Unsubscribe": `<${unsubscribeUrl}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        };
      })
    );

    try {
      await resend.batch.send(messages);
      totalSent += batch.length;

      // Bulk-update subscriber stats
      await db.subscriber.updateMany({
        where: { id: { in: batch.map((b) => b.id) } },
        data: { lastEmailedAt: new Date() },
      });
      // Per-row increment requires individual updates (Prisma can't bulk increment)
      await Promise.all(
        batch.map((b) =>
          db.subscriber.update({
            where: { id: b.id },
            data: { emailsSent: { increment: 1 } },
          })
        )
      );
    } catch (err: any) {
      console.error(
        `[Email] Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`,
        err.message
      );
      totalFailed += batch.length;
    }

    if (i + BATCH_SIZE < opts.recipients.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  await db.campaign.update({
    where: { id: opts.campaignId },
    data: {
      totalSent,
      status: totalFailed === 0 ? "SENT" : totalSent === 0 ? "FAILED" : "SENT",
      sentAt: new Date(),
    },
  });

  return { sent: totalSent, failed: totalFailed };
}

// ───────────────────────────────────────────────────────────────────
// Blog Post Campaign (auto-generated from a Post)
// ───────────────────────────────────────────────────────────────────

export async function sendBlogPostCampaign(opts: {
  postId: string;
  audience?: AudienceFilter;
}) {
  const post = await db.post.findUnique({
    where: { id: opts.postId },
    include: { author: true },
  });
  if (!post) throw new Error("Post not found");

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const type: "blog" | "news" | "guide" =
    post.type === "NEWS" ? "news" : "blog";

  const audience: AudienceFilter = opts.audience || {
    preferences: type === "news" ? ["news"] : ["blog"],
  };
  const recipients = await resolveAudience(audience);

  const campaign = await db.campaign.create({
    data: {
      type: type === "news" ? "NEWS" : "BLOG",
      name: post.title,
      subject:
        type === "news"
          ? `📢 ${post.title}`
          : `✍️ New on the blog: ${post.title}`,
      preheader: post.excerpt || "",
      contentHtml: "", // populated after first render below
      contentJson: JSON.stringify({ postId: post.id, audience }),
      audience: JSON.stringify(audience),
      status: "SENDING",
      postId: post.id,
      totalRecipients: recipients.length,
      fromName: "StaffSchedule.io Team",
      fromEmail: SENDER.newsletter,
    },
  });

  const result = await sendCampaignBatch({
    campaignId: campaign.id,
    subject: campaign.subject,
    fromName: "StaffSchedule.io Team",
    fromEmail: SENDER.newsletter,
    recipients,
    renderForRecipient: ({ unsubscribeUrl, preferencesUrl }) =>
      React.createElement(BlogPostEmail, {
        postTitle: post.title,
        postExcerpt:
          post.excerpt || "A new update from StaffSchedule.io",
        postUrl,
        postImage: post.image,
        category: post.category,
        authorName: post.author?.name,
        authorAvatar: post.author?.avatar,
        readingTime: post.readingTime,
        type,
        siteUrl: SITE_URL,
        unsubscribeUrl,
        preferencesUrl,
      }),
  });

  // Store a sample-rendered html for the dashboard preview
  try {
    const previewHtml = await render(
      React.createElement(BlogPostEmail, {
        postTitle: post.title,
        postExcerpt: post.excerpt || "",
        postUrl,
        postImage: post.image,
        category: post.category,
        authorName: post.author?.name,
        authorAvatar: post.author?.avatar,
        readingTime: post.readingTime,
        type,
        siteUrl: SITE_URL,
        unsubscribeUrl: `${SITE_URL}/unsubscribe`,
        preferencesUrl: `${SITE_URL}/preferences`,
      })
    );
    await db.campaign.update({
      where: { id: campaign.id },
      data: { contentHtml: previewHtml },
    });
  } catch {}

  return { campaignId: campaign.id, ...result };
}

// ───────────────────────────────────────────────────────────────────
// Weekly Digest Campaign
// ───────────────────────────────────────────────────────────────────

export async function sendWeeklyDigest(opts: { dryRun?: boolean } = {}) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [posts, guides] = await Promise.all([
    db.post.findMany({
      where: { published: true, createdAt: { gte: weekAgo } },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 8,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        category: true,
        readingTime: true,
        type: true,
        featured: true,
      },
    }),
    db.guide.findMany({
      where: { isPublished: true, createdAt: { gte: weekAgo } },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        title: true,
        slug: true,
        description: true,
        coverImage: true,
      },
    }),
  ]);

  if (posts.length === 0 && guides.length === 0) {
    return { sent: 0, skipped: true, reason: "no_content" };
  }

  const articles: DigestArticle[] = posts.map((p) => ({
    title: p.title,
    url: `${SITE_URL}/${p.type === "NEWS" ? "news" : "blog"}/${p.slug}`,
    excerpt: p.excerpt || undefined,
    image: p.image,
    category: p.category,
    readingTime: p.readingTime,
  }));

  const featuredArticle =
    articles.find((_, i) => posts[i]?.featured) || articles[0];
  const restArticles = articles.filter((a) => a !== featuredArticle).slice(0, 5);

  const digestGuides: DigestGuide[] = guides.map((g) => ({
    title: g.title,
    url: `${SITE_URL}/resources/guides/${g.slug}`,
    description: g.description,
    image: g.coverImage,
  }));

  const weekRange = `${formatDate(weekAgo)} — ${formatDate(now)}`;

  if (opts.dryRun) {
    const html = await render(
      React.createElement(WeeklyDigestEmail, {
        weekRange,
        featuredArticle,
        articles: restArticles,
        guides: digestGuides,
        siteUrl: SITE_URL,
        unsubscribeUrl: `${SITE_URL}/unsubscribe`,
        preferencesUrl: `${SITE_URL}/preferences`,
      })
    );
    return { dryRun: true, html, recipientCount: 0 };
  }

  const recipients = await resolveAudience({ preferences: ["weeklyDigest"] });

  const campaign = await db.campaign.create({
    data: {
      type: "DIGEST",
      name: `Weekly Digest · ${weekRange}`,
      subject: `📬 Your Weekly Workforce Digest (${weekRange})`,
      preheader: `${articles.length} articles · ${guides.length} guides · this week`,
      contentHtml: "",
      contentJson: JSON.stringify({ weekRange, postIds: posts.map(p => p.slug) }),
      audience: JSON.stringify({ preferences: ["weeklyDigest"] }),
      status: "SENDING",
      totalRecipients: recipients.length,
      fromName: "StaffSchedule.io Team",
      fromEmail: SENDER.newsletter,
    },
  });

  const result = await sendCampaignBatch({
    campaignId: campaign.id,
    subject: campaign.subject,
    fromName: "StaffSchedule.io Team",
    fromEmail: SENDER.newsletter,
    recipients,
    renderForRecipient: ({ unsubscribeUrl, preferencesUrl }) =>
      React.createElement(WeeklyDigestEmail, {
        weekRange,
        featuredArticle,
        articles: restArticles,
        guides: digestGuides,
        siteUrl: SITE_URL,
        unsubscribeUrl,
        preferencesUrl,
      }),
  });

  return { campaignId: campaign.id, ...result };
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ───────────────────────────────────────────────────────────────────
// Generic Custom Campaign (admin-composed)
// ───────────────────────────────────────────────────────────────────

export async function sendCustomCampaign(opts: { campaignId: string }) {
  const campaign = await db.campaign.findUnique({
    where: { id: opts.campaignId },
  });
  if (!campaign) throw new Error("Campaign not found");

  let audience: AudienceFilter = {};
  try {
    audience = JSON.parse(campaign.audience || "{}");
  } catch {}

  const recipients = await resolveAudience(audience);

  await db.campaign.update({
    where: { id: campaign.id },
    data: { status: "SENDING", totalRecipients: recipients.length },
  });

  const result = await sendCampaignBatch({
    campaignId: campaign.id,
    subject: campaign.subject,
    fromName: campaign.fromName,
    fromEmail: campaign.fromEmail,
    recipients,
    // Custom campaigns are stored as pre-rendered HTML. We still inject
    // tracking and unsub URLs by string-replacing placeholders if present.
    renderForRecipient: ({ unsubscribeUrl, preferencesUrl }) => {
      const html = (campaign.contentHtml || "")
        .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl)
        .replace(/\{\{preferences_url\}\}/g, preferencesUrl);
      return React.createElement(
        "div",
        { dangerouslySetInnerHTML: { __html: html } }
      );
    },
  });

  return { campaignId: campaign.id, ...result };
}

// ───────────────────────────────────────────────────────────────────
// Product Update Helper
// ───────────────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────
// Contact-form handlers
// ───────────────────────────────────────────────────────────────────

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  industry?: string | null;
  teamSize?: string | null;
  schedulingMethod?: string | null;
  category?: string | null;
  message: string;
  formType: "demo" | "sales" | "support" | "general";
  features?: string[];
  sourcePage?: string | null;
}

/**
 * Two-email pattern for contact form submissions:
 *   1) Auto-reply to the submitter FROM hello@ (their "we got it" receipt)
 *   2) Notification to CONTACT_INBOX (the team) with all submission details
 *
 * Both run in parallel; we don't fail the response if either errors —
 * the submission still lands in the DB (caller's responsibility).
 */
export async function sendContactEmails(submission: ContactSubmission) {
  const resend = getResend();
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY missing, skipping contact emails");
    return { autoReplySent: false, notificationSent: false, skipped: true };
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  // ─── Auto-reply to submitter ───
  const autoReplyHtml = await render(
    React.createElement(ContactReplyEmail, {
      name: submission.name,
      formType: submission.formType,
      message: submission.message,
      siteUrl: SITE_URL,
      unsubscribeUrl: `${SITE_URL}/unsubscribe?email=${encodeURIComponent(submission.email)}`,
      preferencesUrl: `${SITE_URL}/preferences?email=${encodeURIComponent(submission.email)}`,
    })
  );

  const subjectByType: Record<ContactSubmission["formType"], string> = {
    demo: "Your StaffSchedule.io demo request — what happens next",
    sales: "Thanks — we're preparing your custom quote",
    support: "Support ticket received — we're on it",
    general: "Thanks for reaching out to StaffSchedule.io",
  };

  // ─── Internal notification ───
  const notifHtml = await render(
    React.createElement(ContactNotificationEmail, {
      ...submission,
      submittedAt,
      adminUrl: `${SITE_URL}/admin`,
    })
  );

  const typeLabel = {
    demo: "Demo",
    sales: "Sales",
    support: "Support",
    general: "Contact",
  }[submission.formType];

  const [autoReplyResult, notifResult] = await Promise.allSettled([
    resend.emails.send({
      from: SENDER.hello,
      replyTo: SENDER.hello.replace(/.*<|>.*/g, "").trim(),
      to: submission.email,
      subject: subjectByType[submission.formType],
      html: autoReplyHtml,
    }),
    resend.emails.send({
      from: SENDER.noreply,
      // CRUCIAL: replyTo is the submitter so the team can hit Reply and go
      // straight to them, not to noreply@.
      replyTo: submission.email,
      to: CONTACT_INBOX,
      subject: `[${typeLabel}] ${submission.name}${submission.company ? ` · ${submission.company}` : ""}`,
      html: notifHtml,
    }),
  ]);

  if (autoReplyResult.status === "rejected") {
    console.error("[Contact] Auto-reply failed:", autoReplyResult.reason);
  }
  if (notifResult.status === "rejected") {
    console.error("[Contact] Notification failed:", notifResult.reason);
  }

  return {
    autoReplySent: autoReplyResult.status === "fulfilled",
    notificationSent: notifResult.status === "fulfilled",
  };
}

// ───────────────────────────────────────────────────────────────────
// Comment notifications
// ───────────────────────────────────────────────────────────────────

export interface CommentNotificationPayload {
  commenterName: string;
  commenterEmail: string;
  commenterCompany?: string | null;
  content: string;
  postTitle: string;
  postSlug: string;
  spamScore: number;
  spamReasons?: string[];
  status: "PENDING" | "APPROVED" | "SPAM";
  ipAddress?: string | null;
}

/**
 * Notify the moderator inbox that a new comment landed. Uses hello@ as sender
 * so replies from the moderator can be sent directly to the team inbox if
 * forwarding is set up, and the submitter's email as Reply-To so the
 * moderator can hit Reply to engage them directly.
 */
export async function sendCommentNotification(p: CommentNotificationPayload) {
  const resend = getResend();
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY missing, skipping comment notif");
    return { sent: false, skipped: true };
  }

  const postUrl = `${SITE_URL}/blog/${p.postSlug}#comments`;
  const adminUrl = `${SITE_URL}/admin`;

  const html = await render(
    React.createElement(CommentNotificationEmail, {
      commenterName: p.commenterName,
      commenterEmail: p.commenterEmail,
      commenterCompany: p.commenterCompany,
      content: p.content,
      postTitle: p.postTitle,
      postUrl,
      spamScore: p.spamScore,
      spamReasons: p.spamReasons,
      status: p.status,
      ipAddress: p.ipAddress,
      adminUrl,
    })
  );

  try {
    const typeLabel = p.status === "PENDING" ? "Pending" : p.status === "SPAM" ? "Spam" : "Approved";
    await resend.emails.send({
      from: SENDER.hello,
      replyTo: p.commenterEmail,
      to: CONTACT_INBOX,
      subject: `[${typeLabel} comment] ${p.commenterName} on "${p.postTitle}"`,
      html,
    });
    return { sent: true };
  } catch (err: any) {
    console.error("[Email] Comment notif failed:", err.message);
    return { sent: false, error: err.message };
  }
}

/**
 * Notify the commenter that their comment was approved and is now live.
 * Sent only on admin manual approval (not on auto-approval to avoid noise).
 */
export async function sendCommentApprovedEmail(opts: {
  commenterName: string;
  commenterEmail: string;
  content: string;
  postTitle: string;
  postSlug: string;
}) {
  const resend = getResend();
  if (!resend) return { sent: false, skipped: true };

  const postUrl = `${SITE_URL}/blog/${opts.postSlug}`;
  const html = await render(
    React.createElement(CommentApprovedEmail, {
      name: opts.commenterName,
      postTitle: opts.postTitle,
      postUrl,
      content: opts.content,
      siteUrl: SITE_URL,
      unsubscribeUrl: `${SITE_URL}/unsubscribe?email=${encodeURIComponent(opts.commenterEmail)}`,
      preferencesUrl: `${SITE_URL}/preferences?email=${encodeURIComponent(opts.commenterEmail)}`,
    })
  );

  try {
    await resend.emails.send({
      from: SENDER.hello,
      replyTo: SENDER.hello.replace(/.*<|>.*/g, "").trim(),
      to: opts.commenterEmail,
      subject: `Your comment is live on "${opts.postTitle}"`,
      html,
    });
    return { sent: true };
  } catch (err: any) {
    console.error("[Email] Comment approved email failed:", err.message);
    return { sent: false, error: err.message };
  }
}

export async function renderProductUpdateHtml(opts: {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  ctaLabel?: string;
  ctaUrl: string;
  features?: { icon?: string; title: string; body: string }[];
  type?: "feature" | "release" | "announcement";
}) {
  return render(
    React.createElement(ProductUpdateEmail, {
      ...opts,
      siteUrl: SITE_URL,
      unsubscribeUrl: "{{unsubscribe_url}}",
      preferencesUrl: "{{preferences_url}}",
    })
  );
}
