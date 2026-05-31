import { Resend } from 'resend';
import { db } from '@/lib/db';

// Initialize lazily to avoid build-time errors if ENV is missing
const getResendClient = () => new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://staffschedule.io';
// Legacy notifier: marketing-style content uses the newsletter@ sender.
const FROM_EMAIL =
  process.env.RESEND_FROM_NEWSLETTER ||
  process.env.RESEND_FROM_EMAIL ||
  'StaffSchedule.io Team <newsletter@staffschedule.io>';
const REPLY_TO = process.env.RESEND_REPLY_TO_NEWSLETTER || 'hello@staffschedule.io';
const BATCH_SIZE = 50; // Resend batch limit

// ─── Email Template (inline HTML for maximum compatibility) ───

interface EmailContent {
  type: 'blog' | 'news' | 'guide';
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

function buildEmailHtml(content: EmailContent, recipientEmail: string): string {
  const { type, title, description, url, imageUrl } = content;

  const ctaText =
    type === 'guide' ? 'Read Guide' :
    type === 'news' ? 'Read More' :
    'Read Full Article';

  const tagLabel =
    type === 'guide' ? 'New Guide' :
    type === 'news' ? 'News Update' :
    'New Article';

  const tagColor =
    type === 'guide' ? '#10b981' :
    type === 'news' ? '#f59e0b' :
    '#6366f1';

  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(recipientEmail)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo Header -->
          <tr>
            <td style="padding:0 0 32px 0;text-align:center;">
              <span style="font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Staff</span><span style="font-size:22px;font-weight:800;color:#6366f1;letter-spacing:-0.5px;">Schedule</span><span style="font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">.io</span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">

              ${imageUrl ? `
              <!-- Cover Image -->
              <div style="width:100%;height:0;padding-bottom:50%;position:relative;overflow:hidden;">
                <img src="${imageUrl}" alt="${title}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;" />
              </div>
              ` : ''}

              <!-- Content -->
              <div style="padding:32px 32px 40px 32px;">

                <!-- Tag Badge -->
                <table cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="background:${tagColor}15;border:1px solid ${tagColor}30;border-radius:999px;padding:4px 14px;">
                      <span style="font-size:11px;font-weight:700;color:${tagColor};text-transform:uppercase;letter-spacing:1px;">${tagLabel}</span>
                    </td>
                  </tr>
                </table>

                <!-- Title -->
                <h1 style="margin:20px 0 12px;font-size:24px;font-weight:700;color:#0f172a;line-height:1.3;letter-spacing:-0.3px;">${title}</h1>

                <!-- Description -->
                <p style="margin:0 0 28px;font-size:16px;color:#64748b;line-height:1.6;">${description}</p>

                <!-- CTA Button -->
                <table cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="background:#6366f1;border-radius:12px;">
                      <a href="${url}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">${ctaText} →</a>
                    </td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 0 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;">You received this because you subscribed to StaffSchedule.io updates.</p>
              <a href="${unsubscribeUrl}" style="font-size:13px;color:#94a3b8;text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Sending Logic ───

export async function sendNotificationEmails(content: EmailContent) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not set, skipping email send.');
    return { sent: 0, skipped: true };
  }

  try {
    // Determine which subscribers to target
    const whereClause: any = { active: true };
    if (content.type === 'blog') whereClause.blog = true;
    if (content.type === 'news') whereClause.news = true;
    if (content.type === 'guide') whereClause.guides = true;

    const subscribers = await db.subscriber.findMany({
      where: whereClause,
      select: { email: true },
    });

    if (subscribers.length === 0) {
      console.log('[Email] No subscribers found for type:', content.type);
      return { sent: 0, skipped: false };
    }

    console.log(`[Email] Sending to ${subscribers.length} ${content.type} subscribers...`);

    let totalSent = 0;

    // Send in batches
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      const batchEmails = batch.map((sub) => ({
        from: FROM_EMAIL,
        replyTo: REPLY_TO,
        to: sub.email,
        subject: content.type === 'news'
          ? `📢 ${content.title}`
          : content.type === 'guide'
          ? `📖 New Guide: ${content.title}`
          : `✍️ New Post: ${content.title}`,
        html: buildEmailHtml(content, sub.email),
      }));

      try {
        const resend = getResendClient();
        await resend.batch.send(batchEmails);
        totalSent += batch.length;

      } catch (batchError: any) {
        console.error(`[Email] Batch ${i / BATCH_SIZE + 1} failed:`, batchError.message);
      }

      // Small delay between batches to avoid rate limits
      if (i + BATCH_SIZE < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`[Email] Successfully queued ${totalSent} emails.`);
    return { sent: totalSent, skipped: false };
  } catch (error: any) {
    console.error('[Email] Failed to send notification emails:', error.message);
    return { sent: 0, skipped: false, error: error.message };
  }
}
