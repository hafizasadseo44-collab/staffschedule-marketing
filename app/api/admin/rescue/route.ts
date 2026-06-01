import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

/**
 * Emergency admin password rescue.
 *
 * Hit:  /api/admin/rescue?token=YOUR_RESCUE_TOKEN&email=foo@bar.com&newPassword=NewStrongPass
 *
 * To enable, set ADMIN_RESCUE_TOKEN in your Hostinger env. The token must be
 * 24+ chars. If the env var is missing or the token doesn't match, the
 * endpoint returns 404 (does not even acknowledge its existence) to avoid
 * being a permanent backdoor.
 *
 * This either creates the admin user (if missing) or resets the password on
 * the existing one. Use it when you've lost access and don't remember which
 * password was set during initial seed.
 */
async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const provided = url.searchParams.get("token");
    const expected = process.env.ADMIN_RESCUE_TOKEN;

    // Fail closed when the var isn't configured or is too short (a one-char
    // token would be trivial to brute force). Return 404 to hide existence.
    if (!expected || expected.length < 24 || !provided || provided !== expected) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const email =
      (url.searchParams.get("email") ||
        process.env.ADMIN_EMAIL ||
        "hafizasadullahseo@gmail.com")
        .trim()
        .toLowerCase();
    const newPassword = url.searchParams.get("newPassword") || process.env.ADMIN_PASSWORD;

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "newPassword must be 8+ chars (or set ADMIN_PASSWORD env var)" },
        { status: 400 }
      );
    }

    await ensureDatabase();

    const hash = await bcrypt.hash(newPassword, 10);
    const user = await db.adminUser.upsert({
      where: { email },
      update: { password: hash, role: "ADMIN" },
      create: { email, password: hash, role: "ADMIN" },
    });

    return NextResponse.json({
      success: true,
      email: user.email,
      message: "Admin password reset. You can now log in.",
    });
  } catch (err: any) {
    console.error("[Rescue]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handle(request);
}
export async function POST(request: Request) {
  return handle(request);
}
