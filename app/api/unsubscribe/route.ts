import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// GET handles legacy email-based links AND new token-based links. We always
// render an HTML page so it works straight from email clients.
export async function GET(request: Request) {
  return handleUnsubscribe(request);
}

// RFC 8058 "one-click" support — Gmail, Outlook, etc. POST to the
// List-Unsubscribe-Post URL when the user clicks "Unsubscribe" in the chrome.
export async function POST(request: Request) {
  return handleUnsubscribe(request);
}

async function handleUnsubscribe(request: Request) {
  try {
    await ensureDatabase();
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");
    const campaignId = url.searchParams.get("c");

    if (!token && !email) {
      return new Response(
        unsubscribePage("Missing token or email parameter.", false),
        { headers: { "Content-Type": "text/html" }, status: 400 }
      );
    }

    let subscriber = null as Awaited<
      ReturnType<typeof db.subscriber.findUnique>
    > | null;

    if (token) {
      subscriber = await db.subscriber.findUnique({
        where: { unsubscribeToken: token },
      });
    } else if (email) {
      subscriber = await db.subscriber.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
    }

    if (!subscriber) {
      // For legacy email links where we never had a record (or it was deleted),
      // still show success — don't leak that the email isn't in our DB.
      return new Response(
        unsubscribePage(
          email || "Your subscription",
          true,
          /* alreadyUnsubscribed */ true
        ),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    if (subscriber.status !== "UNSUBSCRIBED") {
      await db.subscriber.update({
        where: { id: subscriber.id },
        data: {
          active: false,
          status: "UNSUBSCRIBED",
          unsubscribedAt: new Date(),
        },
      });
    }

    // Log event for analytics
    try {
      await db.emailEvent.create({
        data: {
          type: "UNSUBSCRIBE",
          email: subscriber.email,
          subscriberId: subscriber.id,
          campaignId: campaignId || undefined,
        },
      });
      if (campaignId) {
        await db.campaign.update({
          where: { id: campaignId },
          data: { totalUnsubscribed: { increment: 1 } },
        });
      }
    } catch {}

    const preferencesUrl = subscriber.unsubscribeToken
      ? `/preferences?token=${subscriber.unsubscribeToken}`
      : null;

    return new Response(
      unsubscribePage(subscriber.email, true, false, preferencesUrl),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error: any) {
    console.error("Unsubscribe Error:", error);
    return new Response(unsubscribePage("Something went wrong.", false), {
      headers: { "Content-Type": "text/html" },
      status: 500,
    });
  }
}

function unsubscribePage(
  emailOrMessage: string,
  success: boolean,
  alreadyUnsubscribed = false,
  preferencesUrl: string | null = null
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? "Unsubscribed" : "Error"} · StaffSchedule.io</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%); display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: white; border-radius: 28px; padding: 56px 48px; max-width: 480px; width: 100%; text-align: center; border: 1px solid #E2E8F0; box-shadow: 0 20px 60px -20px rgba(109, 93, 246, 0.15); }
    .icon { width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; font-size: 32px; }
    .icon.success { background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); }
    .icon.error { background: #FEF2F2; }
    h1 { font-size: 26px; font-weight: 800; color: #0F172A; margin-bottom: 14px; letter-spacing: -0.5px; }
    p { font-size: 15px; color: #64748B; line-height: 1.7; margin-bottom: 8px; }
    .email { font-weight: 700; color: #0F172A; }
    .actions { display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 13px 28px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; transition: transform 0.15s; }
    .btn.primary { background: linear-gradient(135deg, #6D5DF6 0%, #A855F7 100%); color: white; box-shadow: 0 4px 14px rgba(109, 93, 246, 0.3); }
    .btn.secondary { background: white; color: #6D5DF6; border: 1.5px solid #6D5DF6; }
    .btn:hover { transform: translateY(-1px); }
    .brand { font-size: 13px; color: #94A3B8; margin-top: 36px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon ${success ? "success" : "error"}">${success ? "✓" : "✕"}</div>
    <h1>${success ? (alreadyUnsubscribed ? "All set" : "You've been unsubscribed") : "Oops!"}</h1>
    <p>${
      success
        ? `<span class="email">${emailOrMessage}</span> has been removed from our mailing list. You won't receive any more marketing emails from us.`
        : emailOrMessage
    }</p>
    ${
      success
        ? `<p style="font-size: 13px; margin-top: 16px;">Changed your mind, or only want to opt out of certain emails?</p>`
        : ""
    }
    <div class="actions">
      ${
        success && preferencesUrl
          ? `<a href="${preferencesUrl}" class="btn primary">Manage Preferences</a>`
          : ""
      }
      <a href="https://staffschedule.io" class="btn ${success && preferencesUrl ? "secondary" : "primary"}">Back to StaffSchedule.io</a>
    </div>
    <div class="brand">StaffSchedule.io · AI Workforce Management</div>
  </div>
</body>
</html>`;
}
