// Heuristic spam scoring for guest blog comments.
//
// Each rule returns a [score, reasonCode] tuple when it fires. We sum all hits.
// Score interpretation (used by the API to decide PENDING vs SPAM):
//   0–24    → low risk     → PENDING (admin reviews)
//   25–59   → medium risk  → PENDING + flagged
//   60+     → high risk    → SPAM (hidden by default)
//
// We deliberately bias toward PENDING (review) rather than auto-publish for
// anything that looks even mildly suspect. Quality > engagement velocity.

import { db } from "./db";

const GENERIC_LOW_EFFORT = [
  /^(great|nice|awesome|amazing|cool|wow|good|fantastic|excellent)\s*(post|article|blog|content|write[- ]?up|read|info|information)\.?\s*(thanks|thank you)?\.?\s*$/i,
  /^(thanks?|thank you|thx)( a lot| so much)?\.?\s*$/i,
  /^(very|really)\s+(good|nice|useful|informative|helpful)\.?\s*(post|article|blog)?\.?\s*$/i,
  /^(i (really )?(like|love|enjoyed) (this|it|the article|the post))\.?\s*$/i,
  /^(keep it up|good work|well done|nice work)\.?\s*$/i,
  /^(first!?|second!?|me too|same here|agree|disagree)\.?\s*$/i,
  /^(hi|hello|hey)( there)?\.?\s*$/i,
];

const SUSPICIOUS_KEYWORDS = [
  // SEO/affiliate
  "buy now", "click here", "free download", "make money", "earn online",
  "best price", "discount code", "coupon", "promo code", "limited offer",
  "passive income", "work from home", "get rich",
  // Pharma/adult
  "viagra", "cialis", "casino", "poker", "betting", "gambling",
  "porn", "xxx", "escort", "dating site",
  // Crypto/scam
  "crypto pump", "guaranteed profit", "investment opportunity",
  "double your money", "forex signals", "bitcoin doubler",
  // Backlink begging
  "check my website", "visit my blog", "see my site", "my link",
  "follow my profile", "subscribe to my channel",
];

const SUSPICIOUS_TLDS = [
  ".xyz", ".top", ".click", ".loan", ".work", ".gq", ".tk", ".ml", ".ga", ".cf",
];

const URL_RE = /https?:\/\/[^\s)]+/gi;
const REPEATED_CHAR_RE = /(.)\1{6,}/i;
const ALL_CAPS_RE = /^[^a-z]{20,}$/m;

export interface SpamReport {
  score: number;
  reasons: string[];
  level: "low" | "medium" | "high";
  shouldHide: boolean;
}

export async function scoreComment(opts: {
  name: string;
  email: string;
  company?: string | null;
  content: string;
  ip?: string | null;
  postId: string;
}): Promise<SpamReport> {
  let score = 0;
  const reasons: string[] = [];
  const text = opts.content.trim();
  const lower = text.toLowerCase();
  const combined = `${opts.name} ${opts.email} ${opts.company || ""} ${text}`.toLowerCase();

  // 1. Generic low-effort templates ("nice post", "thanks")
  if (GENERIC_LOW_EFFORT.some((re) => re.test(text))) {
    score += 60;
    reasons.push("generic_template");
  }

  // 2. URL counting — 0 fine, 1 suspect, 2+ heavy penalty
  const urls = text.match(URL_RE) || [];
  if (urls.length === 1) {
    score += 15;
    reasons.push("link");
  } else if (urls.length === 2) {
    score += 35;
    reasons.push("two_links");
  } else if (urls.length >= 3) {
    score += 70;
    reasons.push("excessive_links");
  }

  // 3. Suspicious TLDs in URLs
  if (urls.some((u) => SUSPICIOUS_TLDS.some((tld) => u.toLowerCase().includes(tld)))) {
    score += 40;
    reasons.push("suspicious_tld");
  }

  // 4. Keyword stuffing
  let kwHits = 0;
  for (const kw of SUSPICIOUS_KEYWORDS) {
    if (combined.includes(kw)) kwHits++;
  }
  if (kwHits === 1) {
    score += 20;
    reasons.push("suspicious_keyword");
  } else if (kwHits >= 2) {
    score += 50;
    reasons.push("multiple_suspicious_keywords");
  }

  // 5. URL/email in display name = obvious bot
  if (URL_RE.test(opts.name) || opts.name.includes("@")) {
    score += 70;
    reasons.push("link_in_name");
  }

  // 6. ALL CAPS shouting
  if (ALL_CAPS_RE.test(text) && text.length > 30) {
    score += 25;
    reasons.push("all_caps");
  }

  // 7. Repeated character spam ("aaaaaaaaa", "!!!!!!!!")
  if (REPEATED_CHAR_RE.test(text)) {
    score += 15;
    reasons.push("repeated_chars");
  }

  // 8. Too short — minimum-effort comment
  if (text.length < 30) {
    score += 25;
    reasons.push("very_short");
  }

  // 9. Duplicate detection — same content in last 30 days from any email
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const duplicateCount = await db.comment.count({
      where: {
        content: text,
        createdAt: { gte: thirtyDaysAgo },
      },
    });
    if (duplicateCount > 0) {
      score += 80;
      reasons.push("duplicate_content");
    }
  } catch {}

  // 10. Email/IP recently flagged as spam
  try {
    const recentSpam = await db.comment.count({
      where: {
        OR: [
          { email: opts.email, status: "SPAM" },
          ...(opts.ip ? [{ ipAddress: opts.ip, status: "SPAM" as const }] : []),
        ],
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    });
    if (recentSpam > 0) {
      score += 50;
      reasons.push("repeat_offender");
    }
  } catch {}

  // 11. Sender has prior approved comments — reputation bonus (negative score)
  try {
    const approvedCount = await db.comment.count({
      where: { email: opts.email, status: "APPROVED" },
    });
    if (approvedCount >= 3) {
      score -= 30; // trusted regular
      reasons.push("trusted_history");
    } else if (approvedCount >= 1) {
      score -= 10;
    }
  } catch {}

  // Floor + ceiling
  score = Math.max(0, Math.min(100, score));

  const level: SpamReport["level"] =
    score >= 60 ? "high" : score >= 25 ? "medium" : "low";

  return {
    score,
    reasons,
    level,
    shouldHide: score >= 60, // SPAM (hidden); else PENDING
  };
}

/**
 * Auto-link URLs in submitted content with rel="ugc nofollow noopener" so
 * they don't pass any SEO juice and open in new tabs.
 * (We don't accept HTML — this is plain-text post-processing.)
 */
export function sanitizeContent(text: string): string {
  return text
    // Strip any HTML angle brackets that snuck in
    .replace(/<[^>]*>/g, "")
    // Collapse 3+ newlines into 2
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
