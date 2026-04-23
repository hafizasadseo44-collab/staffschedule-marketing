import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(unsubscribePage("Missing email parameter.", false), {
        headers: { 'Content-Type': 'text/html' },
        status: 400,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await db.subscriber.updateMany({
      where: { email: normalizedEmail },
      data: { active: false },
    });

    return new Response(unsubscribePage(normalizedEmail, true), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error: any) {
    console.error("Unsubscribe Error:", error);
    return new Response(unsubscribePage("Something went wrong.", false), {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    });
  }
}

function unsubscribePage(emailOrMessage: string, success: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? 'Unsubscribed' : 'Error'} - StaffSchedule.io</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: white; border-radius: 24px; padding: 48px; max-width: 480px; width: 100%; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .icon { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; }
    .icon.success { background: #ecfdf5; }
    .icon.error { background: #fef2f2; }
    h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    p { font-size: 15px; color: #64748b; line-height: 1.6; }
    a { display: inline-block; margin-top: 24px; padding: 12px 28px; background: #4f46e5; color: white; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px; }
    a:hover { background: #4338ca; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon ${success ? 'success' : 'error'}">${success ? '✅' : '⚠️'}</div>
    <h1>${success ? "You've been unsubscribed" : 'Oops!'}</h1>
    <p>${success ? `<strong>${emailOrMessage}</strong> has been removed from our mailing list. You won't receive any more emails from us.` : emailOrMessage}</p>
    <a href="https://staffschedule.io">Back to StaffSchedule.io</a>
  </div>
</body>
</html>`;
}
