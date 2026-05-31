import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const type = url.searchParams.get("type");
    const limit = Math.min(Number(url.searchParams.get("limit") || 50), 200);

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const items = await db.campaign.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("[Campaigns GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const {
      type = "CUSTOM",
      name,
      subject,
      preheader,
      fromName,
      fromEmail,
      contentHtml = "",
      contentJson,
      audience,
      scheduledFor,
      postId,
      guideId,
    } = body;

    if (!name || !subject) {
      return NextResponse.json(
        { error: "Name and subject are required" },
        { status: 400 }
      );
    }

    const campaign = await db.campaign.create({
      data: {
        type,
        name,
        subject,
        preheader: preheader || null,
        fromName: fromName || undefined,
        fromEmail: fromEmail || undefined,
        contentHtml,
        contentJson: contentJson ? JSON.stringify(contentJson) : null,
        audience: typeof audience === "string" ? audience : JSON.stringify(audience || {}),
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        status: scheduledFor ? "SCHEDULED" : "DRAFT",
        postId: postId || null,
        guideId: guideId || null,
      },
    });
    return NextResponse.json(campaign);
  } catch (err: any) {
    console.error("[Campaigns POST]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
