import { NextResponse } from "next/server";
import { ensureDatabase } from "@/lib/db-init";
import { sendWeeklyDigest } from "@/lib/email-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Public cron endpoint. Protect with CRON_SECRET to avoid abuse.
// Hostinger doesn't ship a cron scheduler for Node apps out of the box, so the
// cleanest way to fire this weekly is via cron-job.org or a similar free
// scheduler hitting:
//   GET https://staffschedule.io/api/cron/weekly-digest?secret=YOUR_CRON_SECRET
// every Monday at 09:00 UTC.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured on the server" },
      { status: 500 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await ensureDatabase();
    const result = await sendWeeklyDigest();
    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    console.error("[Cron Digest]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Also expose POST for cron services that prefer it (Vercel Cron, GitHub Actions, etc.)
export async function POST(request: Request) {
  return GET(request);
}
