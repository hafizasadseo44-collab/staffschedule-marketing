import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

// Logs a CLICK event tied to the originating SENT event, then 302-redirects
// to the original target URL. Wrapped by `wrapLinksForTracking` in
// lib/email-service.ts at send time.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const { id: eventId } = await params;
    const url = new URL(request.url);
    const target = url.searchParams.get("u") || "/";

    // Validate the target URL is well-formed and absolute. If anything looks
    // off, fall through to the safe homepage to avoid open-redirect abuse.
    let safeTarget = "https://staffschedule.io";
    try {
      const parsed = new URL(target);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        safeTarget = parsed.toString();
      }
    } catch {}

    try {
      const sentEvent = await db.emailEvent.findUnique({
        where: { id: eventId },
      });
      if (sentEvent && sentEvent.type === "SENT") {
        await db.emailEvent.create({
          data: {
            type: "CLICK",
            email: sentEvent.email,
            subscriberId: sentEvent.subscriberId,
            campaignId: sentEvent.campaignId,
            url: safeTarget,
            userAgent: request.headers.get("user-agent") || undefined,
          },
        });
        if (sentEvent.subscriberId) {
          await db.subscriber.update({
            where: { id: sentEvent.subscriberId },
            data: { emailsClicked: { increment: 1 } },
          });
        }
        if (sentEvent.campaignId) {
          await db.campaign.update({
            where: { id: sentEvent.campaignId },
            data: { totalClicked: { increment: 1 } },
          });
        }
      }
    } catch (err) {
      console.error("[Track Click] log failed:", err);
    }

    return NextResponse.redirect(safeTarget, { status: 302 });
  } catch (err) {
    console.error("[Track Click]", err);
    return NextResponse.redirect("https://staffschedule.io", { status: 302 });
  }
}
