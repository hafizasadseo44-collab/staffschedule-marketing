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
    if (typeof body.status === "string") patch.status = body.status;
    if (typeof body.isPinned === "boolean") patch.isPinned = body.isPinned;
    if (typeof body.isAuthor === "boolean") patch.isAuthor = body.isAuthor;
    if (typeof body.isAdmin === "boolean") patch.isAdmin = body.isAdmin;
    if (typeof body.content === "string")
      patch.content = body.content.slice(0, 5000);

    const updated = await db.comment.update({ where: { id }, data: patch });
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("[Admin Comment PATCH]", err);
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
    await db.comment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Admin Comment DELETE]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
