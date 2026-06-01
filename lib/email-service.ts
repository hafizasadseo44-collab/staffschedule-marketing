import { Resend } from "resend";
import { render } from "@react-email/render";
import { randomUUID } from "crypto";
import * as React from "react";
import { db } from "./db";
import WelcomeEmail from "@/emails/WelcomeEmail";
import PersonalWelcomeEmail from "@/emails/PersonalWelcomeEmail";
import BlogPostEmail from "@/emails/BlogPostEmail";
import PersonalBlogPostEmail from "@/emails/PersonalBlogPostEmail";
import WeeklyDigestEmail, {
  DigestArticle,
  DigestGuide,
} from "@/emails/WeeklyDigestEmail";
import PersonalDigestEmail from "@/emails/PersonalDigestEmail";
import ProductUpdateEmail from "@/emails/ProductUpdateEmail";
import ContactReplyEmail from "@/emails/ContactReplyEmail";
import PersonalContactReplyEmail from "@/emails/PersonalContactReplyEmail";
import ContactNotificationEmail from "@/emails/ContactNotificationEmail";
import CommentNotificationEmail from "@/emails/CommentNotificationEmail";
import CommentApprovedEmail from "@/emails/CommentApprovedEmail";
import PersonalCommentApprovedEmail from "@/emails/PersonalCommentApprovedEmail";

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

  const unsubscribeUrl = buildUnsubscribeUrl(opts.unsubscribeToken);
  const preferencesUrl = buildPreferencesUrl(opts.unsubscribeToken);

  // The welcome email uses the PERSONAL template (plain-text-style, no
  // gradient hero, single column, conversational) — designed to land in
  // Gmail's Primary tab rather than Promotions. Marketing-style design is
  // reserved for newsletter campaigns where Promotions is acceptable.
  //
  // We deliberately DO NOT inject the tracking pixel here. The pixel is a
  // strong signal to Gmail that this is a marketing email, which pushes it
  // to the Promotions tab. We still wrap click links because outbound clicks
  // are useful analytics that don't materially affect tab placement.
  const event = await db.emailEvent.create({
    data: {
      type: "SENT",
      email: opts.email,
      subscriberId: opts.subscriberId,
    },
  });

  let html = await render(
    React.createElement(PersonalWelcomeEmail, {
      name: opts.name,
      siteUrl: SITE_URL,
      unsubscribeUrl,
      preferencesUrl,
    })
  );
  html = wrapLinksForTracking(html, event.id);
  // No tracking pixel for welcome emails — Primary inbox > pixel signal

  const fromName =
    process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";
  const fromAddress = SENDER.hello.replace(/.*<|>.*/g, "").trim();
  const personalFrom = `${fromName} <${fromAddress}>`;

  try {
    await resend.emails.send({
      // Personal-style email uses hello@ (looks human) with a personal From
      // name. Reply-To matches so replies arrive at the team inbox.
      from: personalFrom,
      replyTo: fromAddress,
      to: opts.email,
      // Personal subject — no emojis, no shouting, conversational
      subject: opts.name?.trim()
        ? `Quick hello, ${opts.name.trim().split(" ")[0]}`
        : "Quick hello from StaffSchedule.io",
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
  /** When true, skip the 1x1 tracking pixel injection (Primary-inbox friendly) */
  noTrackingPixel?: boolean;
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

  // Default broadcast sender is hello@ (personal-looking) so messages look
  // like one-to-one mail and bias toward Primary inbox. We still allow the
  // caller to override with newsletter@ / noreply@ if they specifically want
  // those — useful for high-volume transactional sends where keeping the
  // newsletter@ reputation separate matters.
  const senderEmail = opts.fromEmail.includes("@")
    ? opts.fromEmail.replace(/.*<|>.*/g, "").trim()
    : SENDER.hello.replace(/.*<|>.*/g, "").trim();
  const senderName = opts.fromName || process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";
  const helloAddr = SENDER.hello.replace(/.*<|>.*/g, "").trim();
  const from = senderEmail.startsWith("hello@") ||
    senderEmail.startsWith("newsletter@") ||
    senderEmail.startsWith("noreply@")
    ? `${senderName} <${senderEmail}>`
    : `${senderName} <${helloAddr}>`;

  for (let i = 0; i < opts.recipients.length; i += BATCH_SIZE) {
    const batch = opts.recipients.slice(i, i + BATCH_SIZE);

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
        // Skip the 1x1 tracking pixel for personal-style emails. The pixel
        // is a strong Promotions-tab signal because almost no human-to-human
        // email contains one. We still get click attribution via the wrapped
        // links — that's enough for engagement metrics without sacrificing
        // inbox placement.
        if (!opts.noTrackingPixel) {
          html = injectTrackingPixel(html, event.id);
        }

        return {
          from,
          // Reply-To = hello@ so subscriber replies reach a human inbox
          replyTo: helloAddr,
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

  const personalName =
    process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";

  const campaign = await db.campaign.create({
    data: {
      type: type === "news" ? "NEWS" : "BLOG",
      name: post.title,
      // Conversational subject lines bias toward Primary inbox rather than
      // the Promotions tab. We avoid emojis and marketing lead-ins which
      // Gmail's classifier treats as bulk mail.
      subject:
        type === "news"
          ? `Update: ${post.title}`
          : `Thought you'd find this useful: ${post.title}`,
      preheader: post.excerpt || "",
      contentHtml: "",
      contentJson: JSON.stringify({ postId: post.id, audience }),
      audience: JSON.stringify(audience),
      status: "SENDING",
      postId: post.id,
      totalRecipients: recipients.length,
      fromName: personalName,
      fromEmail: SENDER.hello,
    },
  });

  const result = await sendCampaignBatch({
    campaignId: campaign.id,
    subject: campaign.subject,
    fromName: personalName,
    fromEmail: SENDER.hello,
    noTrackingPixel: true,
    recipients,
    renderForRecipient: ({ name, unsubscribeUrl, preferencesUrl }) =>
      React.createElement(PersonalBlogPostEmail, {
        postTitle: post.title,
        postExcerpt:
          post.excerpt || "A new update from StaffSchedule.io",
        postUrl,
        category: post.category,
        authorName: post.author?.name,
        readingTime: post.readingTime,
        type,
        recipientFirstName: name?.trim().split(" ")[0] || null,
        siteUrl: SITE_URL,
        unsubscribeUrl,
        preferencesUrl,
      }),
  });

  // Store a sample-rendered html for the dashboard preview
  try {
    const previewHtml = await render(
      React.createElement(PersonalBlogPostEmail, {
        postTitle: post.title,
        postExcerpt: post.excerpt || "",
        postUrl,
        category: post.category,
        authorName: post.author?.name,
        readingTime: post.readingTime,
        type,
        recipientFirstName: null,
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

  // Map shared DigestArticle / DigestGuide into the slimmer shape used
  // by the Primary-inbox-friendly PersonalDigestEmail.
  const personalArticles = restArticles.map((a) => ({
    title: a.title,
    url: a.url,
    excerpt: a.excerpt,
    readingTime: a.readingTime,
  }));
  const personalFeatured = featuredArticle && {
    title: featuredArticle.title,
    url: featuredArticle.url,
    excerpt: featuredArticle.excerpt,
    readingTime: featuredArticle.readingTime,
  };
  const personalGuides = digestGuides.map((g) => ({
    title: g.title,
    url: g.url,
  }));

  if (opts.dryRun) {
    const html = await render(
      React.createElement(PersonalDigestEmail, {
        weekRange,
        featuredArticle: personalFeatured,
        articles: personalArticles,
        guides: personalGuides,
        recipientFirstName: null,
        siteUrl: SITE_URL,
        unsubscribeUrl: `${SITE_URL}/unsubscribe`,
        preferencesUrl: `${SITE_URL}/preferences`,
      })
    );
    return { dryRun: true, html, recipientCount: 0 };
  }

  const recipients = await resolveAudience({ preferences: ["weeklyDigest"] });

  const personalName =
    process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";

  const campaign = await db.campaign.create({
    data: {
      type: "DIGEST",
      name: `Weekly Digest · ${weekRange}`,
      subject: `This week's workforce reads (${weekRange})`,
      preheader: `${articles.length} articles · ${guides.length} guides · this week`,
      contentHtml: "",
      contentJson: JSON.stringify({ weekRange, postIds: posts.map(p => p.slug) }),
      audience: JSON.stringify({ preferences: ["weeklyDigest"] }),
      status: "SENDING",
      totalRecipients: recipients.length,
      fromName: personalName,
      fromEmail: SENDER.hello,
    },
  });

  const result = await sendCampaignBatch({
    campaignId: campaign.id,
    subject: campaign.subject,
    fromName: personalName,
    fromEmail: SENDER.hello,
    noTrackingPixel: true,
    recipients,
    renderForRecipient: ({ name, unsubscribeUrl, preferencesUrl }) =>
      React.createElement(PersonalDigestEmail, {
        weekRange,
        featuredArticle: personalFeatured,
        articles: personalArticles,
        guides: personalGuides,
        recipientFirstName: name?.trim().split(" ")[0] || null,
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
  // Uses the plain-text-style template so the auto-reply looks like a
  // personal email and lands in Primary, not Promotions.
  const autoReplyHtml = await render(
    React.createElement(PersonalContactReplyEmail, {
      name: submission.name,
      formType: submission.formType,
      message: submission.message,
      siteUrl: SITE_URL,
      unsubscribeUrl: `${SITE_URL}/unsubscribe?email=${encodeURIComponent(submission.email)}`,
      preferencesUrl: `${SITE_URL}/preferences?email=${encodeURIComponent(submission.email)}`,
    })
  );

  // Personal-style subjects: no emojis, conversational, addressed to the person.
  const firstName = submission.name.trim().split(" ")[0];
  const subjectByType: Record<ContactSubmission["formType"], string> = {
    demo: `${firstName}, your StaffSchedule demo is on the way`,
    sales: `${firstName}, we're putting together your quote`,
    support: `${firstName}, we got your support request`,
    general: `Thanks for reaching out, ${firstName}`,
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

  // Use the personal From name on the auto-reply so it reads like a
  // real human just answered, biasing Gmail toward Primary placement.
  const helloAddr = SENDER.hello.replace(/.*<|>.*/g, "").trim();
  const personalName =
    process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";
  const personalFrom = `${personalName} <${helloAddr}>`;

  const [autoReplyResult, notifResult] = await Promise.allSettled([
    resend.emails.send({
      from: personalFrom,
      replyTo: helloAddr,
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
  // PersonalCommentApprovedEmail is plain-text-styled → lands in Primary
  // instead of Promotions.
  const html = await render(
    React.createElement(PersonalCommentApprovedEmail, {
      name: opts.commenterName,
      postTitle: opts.postTitle,
      postUrl,
      content: opts.content,
      siteUrl: SITE_URL,
      unsubscribeUrl: `${SITE_URL}/unsubscribe?email=${encodeURIComponent(opts.commenterEmail)}`,
      preferencesUrl: `${SITE_URL}/preferences?email=${encodeURIComponent(opts.commenterEmail)}`,
    })
  );

  const helloAddr = SENDER.hello.replace(/.*<|>.*/g, "").trim();
  const personalName =
    process.env.RESEND_FROM_PERSONAL_NAME || "Hafiz from StaffSchedule.io";

  try {
    await resend.emails.send({
      from: `${personalName} <${helloAddr}>`,
      replyTo: helloAddr,
      to: opts.commenterEmail,
      // Conversational subject — no quotes around the title (less marketing-y)
      subject: `Your comment on "${opts.postTitle}" is live`,
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
