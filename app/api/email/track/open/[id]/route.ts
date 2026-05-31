import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// 1x1 transparent GIF (43 bytes). Email clients hit this when they render
// the message; that's our opens signal.
const PIXEL = Buffer.from([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00,
  0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02,
  0x44, 0x01, 0x00, 0x3b,
]);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const { id } = await params;
    // strip ".gif" extension if present
    const eventId = id.replace(/\.gif$/, "");

    // Find the original SENT event so we can log a derived OPEN against the
    // same subscriber + campaign. We don't fail the pixel response if anything
    // here errors — the user shouldn't see a broken image.
    const sentEvent = await db.emailEvent.findUnique({
      where: { id: eventId },
    });

    if (sentEvent && sentEvent.type === "SENT") {
      // De-dupe: only count the first open per recipient per campaign
      const existingOpen = await db.emailEvent.findFirst({
        where: {
          email: sentEvent.email,
          campaignId: sentEvent.campaignId,
          type: "OPEN",
        },
      });

      if (!existingOpen) {
        await db.emailEvent.create({
          data: {
            type: "OPEN",
            email: sentEvent.email,
            subscriberId: sentEvent.subscriberId,
            campaignId: sentEvent.campaignId,
            userAgent: request.headers.get("user-agent") || undefined,
          },
        });
        if (sentEvent.subscriberId) {
          await db.subscriber.update({
            where: { id: sentEvent.subscriberId },
            data: { emailsOpened: { increment: 1 } },
          });
        }
        if (sentEvent.campaignId) {
          await db.campaign.update({
            where: { id: sentEvent.campaignId },
            data: { totalOpened: { increment: 1 } },
          });
        }
      }
    }
  } catch (err) {
    console.error("[Track Open]", err);
  }

  return new Response(PIXEL, {
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(PIXEL.length),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
