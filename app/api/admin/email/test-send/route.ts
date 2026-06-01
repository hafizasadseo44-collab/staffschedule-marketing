import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Sends a tiny branded test email and returns Resend's actual response/error
// so the admin can see WHY a send is failing (vs. silently failing in the
// background as it does on real subscribes/campaigns).

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const TEST_HTML = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F8FAFC;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border-radius:20px;border:1px solid #E2E8F0;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#6D5DF6 0%,#A855F7 100%);padding:32px;text-align:center;">
<h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.4px;">✓ Test Email</h1>
<p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">If you can read this, sending is working.</p>
</td></tr>
<tr><td style="padding:28px 32px;">
<p style="margin:0 0 12px;font-size:15px;color:#111827;line-height:1.6;">Hi there,</p>
<p style="margin:0 0 12px;font-size:15px;color:#64748B;line-height:1.6;">
This is a test from your StaffSchedule.io admin panel. The fact that you received it confirms that:
</p>
<ul style="margin:0 0 16px;padding-left:20px;font-size:14px;color:#64748B;line-height:1.7;">
<li>Your Resend API key is valid</li>
<li>Your domain is verified</li>
<li>Welcome emails, newsletters, and notifications will now deliver</li>
</ul>
<p style="margin:0;font-size:12px;color:#94A3B8;">Sent at ${new Date().toISOString()}</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const to = String(body.to || "").trim().toLowerCase();
    const sender =
      typeof body.sender === "string" && ["hello", "newsletter", "noreply"].includes(body.sender)
        ? body.sender
        : "noreply";

    if (!to || !EMAIL_RE.test(to)) {
      return NextResponse.json({ error: "Valid 'to' email required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "RESEND_API_KEY is not configured on this server.",
          hint: "Add it in Hostinger hPanel → Environment Variables, then restart.",
        },
        { status: 500 }
      );
    }

    const fromMap = {
      hello: process.env.RESEND_FROM_HELLO || "StaffSchedule.io <hello@staffschedule.io>",
      newsletter: process.env.RESEND_FROM_NEWSLETTER || "StaffSchedule.io Team <newsletter@staffschedule.io>",
      noreply: process.env.RESEND_FROM_NOREPLY || "StaffSchedule.io <noreply@staffschedule.io>",
    };
    const from = fromMap[sender as keyof typeof fromMap];

    const resend = new Resend(apiKey);
    try {
      const result = await resend.emails.send({
        from,
        to,
        subject: `Test from StaffSchedule.io [${sender}@]`,
        html: TEST_HTML,
      });
      // Resend SDK v6: returns { data, error } shape. Surface either.
      const data: any = result as any;
      if (data?.error) {
        return NextResponse.json(
          {
            ok: false,
            error: data.error.message || JSON.stringify(data.error),
            from,
            to,
            sender,
          },
          { status: 400 }
        );
      }
      return NextResponse.json({
        ok: true,
        id: data?.data?.id || data?.id,
        from,
        to,
        sender,
        message: `Test email sent from ${from} to ${to}. Check your inbox (and spam folder) within 30 seconds.`,
      });
    } catch (err: any) {
      console.error("[Test Send]", err);
      return NextResponse.json(
        {
          ok: false,
          error: err?.message || String(err),
          hint:
            err?.message?.includes("not verified") || err?.message?.includes("domain")
              ? "Verify staffschedule.io on Resend (https://resend.com/domains) before sending."
              : err?.message?.includes("API key")
              ? "API key is invalid. Generate a fresh one at https://resend.com/api-keys."
              : undefined,
          from,
          to,
          sender,
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
