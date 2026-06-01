// DB-backed rate limits for comments. The in-memory rate limit in
// lib/rate-limit.ts is fine for newsletter signups but resets on every dyno
// restart. Comments need hourly/daily caps that survive restarts and apply
// per IP AND per email independently.
//
// Rules:
//   - 3 comments per hour per IP
//   - 10 comments per day per IP
//   - 3 comments per hour per email
//   - 10 comments per day per email

import { db } from "./db";

export interface RateLimitVerdict {
  allowed: boolean;
  reason?: string;
  retryAfterSec?: number;
}

const HOURLY_LIMIT = 3;
const DAILY_LIMIT = 10;

export async function checkCommentRateLimit(opts: {
  ip: string | null;
  email: string;
}): Promise<RateLimitVerdict> {
  const now = Date.now();
  const hourAgo = new Date(now - 60 * 60 * 1000);
  const dayAgo = new Date(now - 24 * 60 * 60 * 1000);

  try {
    const [ipHour, ipDay, emailHour, emailDay] = await Promise.all([
      opts.ip
        ? db.comment.count({
            where: { ipAddress: opts.ip, createdAt: { gte: hourAgo } },
          })
        : Promise.resolve(0),
      opts.ip
        ? db.comment.count({
            where: { ipAddress: opts.ip, createdAt: { gte: dayAgo } },
          })
        : Promise.resolve(0),
      db.comment.count({
        where: { email: opts.email, createdAt: { gte: hourAgo } },
      }),
      db.comment.count({
        where: { email: opts.email, createdAt: { gte: dayAgo } },
      }),
    ]);

    if (ipHour >= HOURLY_LIMIT) {
      return {
        allowed: false,
        reason: `Too many comments from this network in the last hour. Please try again later.`,
        retryAfterSec: 60 * 60,
      };
    }
    if (emailHour >= HOURLY_LIMIT) {
      return {
        allowed: false,
        reason: `You've reached the hourly comment limit. Please try again in an hour.`,
        retryAfterSec: 60 * 60,
      };
    }
    if (ipDay >= DAILY_LIMIT) {
      return {
        allowed: false,
        reason: `Daily comment limit reached for this network. Try again tomorrow.`,
        retryAfterSec: 24 * 60 * 60,
      };
    }
    if (emailDay >= DAILY_LIMIT) {
      return {
        allowed: false,
        reason: `Daily comment limit reached for this account. Try again tomorrow.`,
        retryAfterSec: 24 * 60 * 60,
      };
    }

    return { allowed: true };
  } catch (err) {
    // On DB error, fail open (don't block legitimate users) but log it.
    console.error("[CommentRateLimit] error:", err);
    return { allowed: true };
  }
}
