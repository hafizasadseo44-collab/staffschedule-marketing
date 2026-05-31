import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";
import { sendWeeklyDigest } from "@/lib/email-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const result = await sendWeeklyDigest();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Digest Send]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
