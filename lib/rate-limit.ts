// Lightweight in-memory rate limiter.
// For multi-instance deployments swap with a Redis/Upstash backend, but for a
// single Hostinger Node process this is sufficient and adds zero dependencies.
//
// Why: protect /api/subscribe from bot spam without blocking legitimate users.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const fresh = { count: 1, resetAt: now + opts.windowMs };
    buckets.set(key, fresh);
    return { success: true, remaining: opts.limit - 1, resetAt: fresh.resetAt };
  }

  if (existing.count >= opts.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: opts.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

// Periodic cleanup to keep the map from growing unbounded
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}, 60_000).unref?.();

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
