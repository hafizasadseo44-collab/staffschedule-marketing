import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const campaign = await db.campaign.findUnique({ where: { id } });
    if (!campaign)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Live counts from events
    const [sent, opened, clicked, unsubscribed] = await Promise.all([
      db.emailEvent.count({ where: { campaignId: id, type: "SENT" } }),
      db.emailEvent.count({ where: { campaignId: id, type: "OPEN" } }),
      db.emailEvent.count({ where: { campaignId: id, type: "CLICK" } }),
      db.emailEvent.count({ where: { campaignId: id, type: "UNSUBSCRIBE" } }),
    ]);

    return NextResponse.json({
      ...campaign,
      liveStats: { sent, opened, clicked, unsubscribed },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const patch: any = {};
    [
      "name",
      "subject",
      "preheader",
      "fromName",
      "fromEmail",
      "contentHtml",
      "type",
    ].forEach((k) => {
      if (typeof body[k] === "string") patch[k] = body[k];
    });
    if (body.audience !== undefined) {
      patch.audience =
        typeof body.audience === "string"
          ? body.audience
          : JSON.stringify(body.audience);
    }
    if (body.scheduledFor !== undefined) {
      patch.scheduledFor = body.scheduledFor
        ? new Date(body.scheduledFor)
        : null;
    }
    if (typeof body.status === "string") patch.status = body.status;

    const updated = await db.campaign.update({ where: { id }, data: patch });
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("[Campaign PUT]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await db.campaign.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
