import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Why this endpoint exists:
// When emails silently don't send, the live admin gets ZERO feedback —
// /api/subscribe still returns 200, campaigns show in the list, but no
// mail actually arrives. This endpoint actively probes every link in the
// chain (env var present → key valid → domain verified) so the user can
// see exactly which step failed.

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const apiKey = process.env.RESEND_API_KEY || "";
    const fromHello = process.env.RESEND_FROM_HELLO || "(default) StaffSchedule.io <hello@staffschedule.io>";
    const fromNewsletter = process.env.RESEND_FROM_NEWSLETTER || "(default) StaffSchedule.io Team <newsletter@staffschedule.io>";
    const fromNoreply = process.env.RESEND_FROM_NOREPLY || "(default) StaffSchedule.io <noreply@staffschedule.io>";
    const contactInbox = process.env.CONTACT_INBOX || "(default) hello@staffschedule.io";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "(default) https://staffschedule.io";

    const apiKeySet = apiKey.length > 0;
    const apiKeyLooksValid = apiKey.startsWith("re_") && apiKey.length >= 16;

    const issues: Array<{ severity: "error" | "warning" | "info"; message: string; fix?: string }> = [];

    if (!apiKeySet) {
      issues.push({
        severity: "error",
        message: "RESEND_API_KEY is not set",
        fix: "Add RESEND_API_KEY to Hostinger hPanel → Node.js app → Environment Variables, then restart the app.",
      });
    } else if (!apiKeyLooksValid) {
      issues.push({
        severity: "error",
        message: "RESEND_API_KEY format looks invalid",
        fix: "Resend API keys start with 're_' and are 24+ characters. Generate a fresh one at https://resend.com/api-keys.",
      });
    }

    // Live probe — try to fetch verified domains from Resend
    let resendConnection: { ok: boolean; status?: number; error?: string } = { ok: false };
    let domains: Array<{ name: string; status: string; id: string; region?: string }> = [];

    if (apiKeySet && apiKeyLooksValid) {
      try {
        const r = await fetch("https://api.resend.com/domains", {
          headers: { Authorization: `Bearer ${apiKey}` },
          signal: AbortSignal.timeout(8000),
        });
        if (r.ok) {
          const data = (await r.json()) as any;
          resendConnection = { ok: true, status: r.status };
          domains = (data?.data || []).map((d: any) => ({
            id: d.id,
            name: d.name,
            status: d.status,
            region: d.region,
          }));
        } else {
          const txt = await r.text();
          resendConnection = { ok: false, status: r.status, error: txt };
          if (r.status === 401) {
            issues.push({
              severity: "error",
              message: "Resend rejected the API key (401 Unauthorized)",
              fix: "The key is wrong or has been revoked. Generate a fresh one at https://resend.com/api-keys.",
            });
          } else if (r.status === 403) {
            issues.push({
              severity: "error",
              message: "Resend rejected the request (403 Forbidden)",
              fix: "The API key may not have 'Sending access' permission. Recreate the key with full sending rights.",
            });
          } else {
            issues.push({
              severity: "error",
              message: `Resend API returned HTTP ${r.status}`,
              fix: "Check Resend status at https://status.resend.com and try again.",
            });
          }
        }
      } catch (err: any) {
        resendConnection = { ok: false, error: err.message };
        issues.push({
          severity: "error",
          message: `Cannot reach Resend API: ${err.message}`,
          fix: "Network issue from your server to api.resend.com. Try restarting the app or contact Hostinger support.",
        });
      }
    }

    // Domain verification check — derive the expected domain from each FROM address
    const expectedDomain = "staffschedule.io";
    const matchingDomain = domains.find(
      (d) => d.name.toLowerCase() === expectedDomain.toLowerCase()
    );

    if (apiKeySet && resendConnection.ok) {
      if (!matchingDomain) {
        issues.push({
          severity: "error",
          message: `Domain "${expectedDomain}" is not added to your Resend account`,
          fix: "Go to https://resend.com/domains → Add Domain → enter staffschedule.io → paste the DNS records into Hostinger DNS Zone Editor.",
        });
      } else if (matchingDomain.status !== "verified") {
        issues.push({
          severity: "error",
          message: `Domain "${expectedDomain}" is added but status is "${matchingDomain.status}" — not verified yet`,
          fix: "Open the domain in Resend, copy each DNS record into Hostinger DNS Zone, then click 'Verify DNS Records'. Usually takes 5–15 minutes after DNS propagation.",
        });
      }
    }

    if (issues.length === 0) {
      issues.push({
        severity: "info",
        message: "All checks passed — emails should be sending normally.",
      });
    }

    return NextResponse.json({
      configured: {
        apiKeySet,
        apiKeyLooksValid,
        apiKeyHint: apiKeySet ? `${apiKey.slice(0, 6)}…${apiKey.slice(-4)}` : null,
        fromHello,
        fromNewsletter,
        fromNoreply,
        contactInbox,
        siteUrl,
        turnstileConfigured: !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      },
      resendConnection,
      domains,
      expectedDomain,
      matchingDomain,
      issues,
      healthy:
        apiKeySet &&
        apiKeyLooksValid &&
        resendConnection.ok &&
        matchingDomain?.status === "verified",
    });
  } catch (err: any) {
    console.error("[Diagnose Email]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
