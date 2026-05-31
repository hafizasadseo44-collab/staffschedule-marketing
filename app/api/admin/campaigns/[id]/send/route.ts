import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";
import { sendCustomCampaign } from "@/lib/email-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // allow longer for batched sends

export async function POST(
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
    if (campaign.status === "SENDING" || campaign.status === "SENT") {
      return NextResponse.json(
        { error: `Campaign already ${campaign.status}` },
        { status: 400 }
      );
    }

    const result = await sendCustomCampaign({ campaignId: id });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Campaign Send]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
