// Cloudflare Turnstile verification — preferred over reCAPTCHA because:
//   1. Privacy-respecting (no Google tracking)
//   2. Free + unlimited
//   3. Usually invisible (no friction for real users)
//   4. Easy to configure
//
// Setup:
//   1. Go to https://dash.cloudflare.com/?to=/:account/turnstile
//   2. Add site → choose Managed mode
//   3. Add the domain (staffschedule.io)
//   4. Copy the Site Key into NEXT_PUBLIC_TURNSTILE_SITE_KEY
//   5. Copy the Secret Key into TURNSTILE_SECRET_KEY
//   6. Redeploy
//
// If TURNSTILE_SECRET_KEY is not set we skip verification gracefully so
// dev still works. Spam protection then relies on rate limit + scoring.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  success: boolean;
  // True when the env wasn't configured — caller should treat as "skip"
  skipped?: boolean;
  errorCodes?: string[];
}

export async function verifyTurnstile(opts: {
  token: string | null | undefined;
  remoteIp?: string | null;
}): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { success: true, skipped: true };
  }
  if (!opts.token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }
  try {
    const params = new URLSearchParams({
      secret,
      response: opts.token,
    });
    if (opts.remoteIp) params.set("remoteip", opts.remoteIp);

    const r = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // Don't block forever on a CAPTCHA outage
      signal: AbortSignal.timeout(6000),
    });
    const data = (await r.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    return {
      success: !!data.success,
      errorCodes: data["error-codes"],
    };
  } catch (err: any) {
    console.error("[Turnstile] verify error:", err.message);
    // Don't block legitimate users if Cloudflare is down
    return { success: true, skipped: true, errorCodes: ["network-error"] };
  }
}

export function isTurnstileConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
}
