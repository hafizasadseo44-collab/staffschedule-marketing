import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

export async function PATCH(
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

    if (typeof body.name === "string") patch.name = body.name.trim() || null;
    if (typeof body.tags === "string") patch.tags = body.tags;
    if (Array.isArray(body.tags))
      patch.tags = body.tags.map((t: any) => String(t).trim()).filter(Boolean).join(",");
    if (typeof body.status === "string") {
      patch.status = body.status;
      patch.active = body.status === "ACTIVE";
      if (body.status === "UNSUBSCRIBED") patch.unsubscribedAt = new Date();
    }

    const updated = await db.subscriber.update({
      where: { id },
      data: patch,
    });
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("[Subscriber PATCH]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await db.subscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Subscriber DELETE]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
