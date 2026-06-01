// Subject-line linter for newsletter campaigns.
//
// Goal: warn the admin BEFORE they send a campaign that's likely to land
// in Gmail's Promotions tab or get flagged by Outlook/Apple Mail.
//
// Rules are based on documented + empirically observed deliverability
// triggers. None are absolute — a high score is a warning, not a block.

export interface SubjectIssue {
  severity: "warning" | "info";
  rule: string;
  message: string;
}

export interface SubjectAnalysis {
  score: number; // 0-100, higher = better
  level: "great" | "good" | "risky" | "bad";
  length: number;
  issues: SubjectIssue[];
  estimatedTab: "Primary" | "Promotions" | "Spam-risk";
}

// Words/phrases that strongly signal "marketing email" → Promotions tab
const PROMO_TRIGGER_WORDS = [
  "free", "discount", "sale", "deal", "promo", "promotion",
  "limited time", "act now", "buy now", "click here", "order now",
  "exclusive offer", "special offer", "save now", "% off", "$ off",
  "winner", "you won", "congratulations", "prize", "earn money",
  "make money", "extra cash", "guaranteed", "risk-free", "no obligation",
  "best price", "lowest price", "cheap", "bargain",
  "subscribe now", "sign up free", "join now",
];

// Words spam filters flag aggressively
const SPAM_TRIGGER_WORDS = [
  "viagra", "cialis", "casino", "porn", "xxx", "loan", "mortgage",
  "credit card", "ssn", "social security", "lottery", "inheritance",
];

// Cleaner, conversational words that tend to land in Primary
const PRIMARY_INDICATORS = [
  "question", "quick", "hi", "hey", "thanks", "thought", "wondering",
  "checking in", "follow-up", "follow up", "update", "your account",
];

export function analyzeSubject(subject: string): SubjectAnalysis {
  const s = subject.trim();
  const lower = s.toLowerCase();
  const issues: SubjectIssue[] = [];
  let score = 100;
  let promoSignals = 0;
  let primarySignals = 0;

  // ─── Length ───────────────────────────────
  if (s.length === 0) {
    return {
      score: 0,
      level: "bad",
      length: 0,
      issues: [{ severity: "warning", rule: "empty", message: "Subject is empty." }],
      estimatedTab: "Spam-risk",
    };
  }
  if (s.length < 10) {
    score -= 15;
    issues.push({
      severity: "warning",
      rule: "too_short",
      message: "Very short subject. Aim for 30–60 chars for context + clarity.",
    });
  } else if (s.length > 70) {
    score -= 10;
    issues.push({
      severity: "warning",
      rule: "too_long",
      message: "Over 70 chars — most clients truncate. Aim for under 60.",
    });
  } else if (s.length >= 30 && s.length <= 60) {
    // Sweet spot — no penalty
  }

  // ─── Emojis ────────────────────────────────
  // Emoji unicode ranges via regex (basic + extended)
  const emojiCount = (s.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) || []).length;
  if (emojiCount >= 1) {
    promoSignals++;
    score -= emojiCount * 8;
    issues.push({
      severity: "warning",
      rule: "emoji",
      message: `${emojiCount} emoji${emojiCount > 1 ? "s" : ""} detected. Emojis push to Promotions. Try removing them for Primary inbox.`,
    });
  }

  // ─── ALL CAPS ──────────────────────────────
  const upperRatio =
    s.replace(/[^A-Z]/g, "").length / Math.max(1, s.replace(/[^A-Za-z]/g, "").length);
  if (upperRatio > 0.5 && s.length > 10) {
    promoSignals++;
    score -= 20;
    issues.push({
      severity: "warning",
      rule: "all_caps",
      message: "Too many capitals. ALL CAPS is a strong spam/promotions signal.",
    });
  }

  // ─── Exclamation overuse ────────────────────
  const exclaim = (s.match(/!/g) || []).length;
  if (exclaim >= 2) {
    promoSignals++;
    score -= 12;
    issues.push({
      severity: "warning",
      rule: "exclamations",
      message: `${exclaim} exclamation marks. Multiple "!" reads as marketing/spam.`,
    });
  } else if (exclaim === 1) {
    score -= 3;
  }

  // ─── Promo trigger words ───────────────────
  const promoHits: string[] = [];
  for (const w of PROMO_TRIGGER_WORDS) {
    if (lower.includes(w)) promoHits.push(w);
  }
  if (promoHits.length > 0) {
    promoSignals += promoHits.length;
    score -= Math.min(40, promoHits.length * 12);
    issues.push({
      severity: "warning",
      rule: "promo_words",
      message: `Trigger word${promoHits.length > 1 ? "s" : ""}: "${promoHits.slice(0, 3).join('", "')}"${promoHits.length > 3 ? ` (+${promoHits.length - 3} more)` : ""}. These nearly always push to Promotions.`,
    });
  }

  // ─── Spam trigger words ────────────────────
  for (const w of SPAM_TRIGGER_WORDS) {
    if (lower.includes(w)) {
      score -= 40;
      promoSignals += 3;
      issues.push({
        severity: "warning",
        rule: "spam_word",
        message: `"${w}" is a hard spam-filter trigger.`,
      });
    }
  }

  // ─── Money / pricing signals ───────────────
  if (/[\$₹€£]\s*\d+|\d+\s*%|\d+\s*off/i.test(s)) {
    promoSignals++;
    score -= 15;
    issues.push({
      severity: "warning",
      rule: "money_signal",
      message: "Prices, percentages or discounts in subject → strong Promotions signal.",
    });
  }

  // ─── Primary-friendly indicators (boost) ───
  for (const w of PRIMARY_INDICATORS) {
    if (lower.includes(w)) primarySignals++;
  }
  if (primarySignals > 0) {
    score += Math.min(15, primarySignals * 5);
  }

  // Personal address (Hi/Hey + name placeholder OR direct question)
  if (/^(hi|hey|hello)\b/i.test(s) || /\?\s*$/.test(s)) {
    primarySignals++;
    score += 5;
  }

  // ─── Clamp + classify ──────────────────────
  score = Math.max(0, Math.min(100, score));

  const level: SubjectAnalysis["level"] =
    score >= 75 ? "great" : score >= 55 ? "good" : score >= 30 ? "risky" : "bad";

  const estimatedTab: SubjectAnalysis["estimatedTab"] =
    promoSignals >= 3
      ? "Spam-risk"
      : promoSignals >= 1
      ? "Promotions"
      : primarySignals >= 1 || score >= 75
      ? "Primary"
      : "Promotions";

  return {
    score,
    level,
    length: s.length,
    issues,
    estimatedTab,
  };
}

/**
 * Suggest 2-3 rewrites for a Promotions-y subject that aim for Primary tab.
 * Heuristic only — not LLM-backed.
 */
export function suggestRewrites(subject: string): string[] {
  const cleaned = subject
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/!{2,}/g, "!")
    .replace(/\s+/g, " ")
    .trim();

  const lower = cleaned.toLowerCase();
  const out: string[] = [];

  if (lower.startsWith("new on the blog:")) {
    const rest = cleaned.replace(/^new on the blog:\s*/i, "");
    out.push(`Thought you'd find this useful: ${rest}`);
    out.push(`Quick read: ${rest}`);
  }
  if (lower.includes("welcome to staffschedule")) {
    out.push("Quick hello from StaffSchedule.io");
    out.push("Thanks for subscribing");
  }
  if (lower.includes("digest")) {
    out.push("This week's workforce reads");
    out.push("A few things worth your time this week");
  }
  if (out.length === 0) {
    out.push(cleaned.replace(/[!]+$/g, ""));
    out.push(`Quick note: ${cleaned}`);
  }
  return out.slice(0, 3);
}
