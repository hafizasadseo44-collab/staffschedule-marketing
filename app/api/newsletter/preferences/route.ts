import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

const PREF_KEYS = [
  "blog",
  "news",
  "guides",
  "productUpdates",
  "schedulingTips",
  "industryInsights",
  "featureReleases",
  "announcements",
  "weeklyDigest",
] as const;

type PrefKey = (typeof PREF_KEYS)[number];

export async function GET(request: Request) {
  try {
    await ensureDatabase();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token && !email) {
      return NextResponse.json(
        { error: "token or email required" },
        { status: 400 }
      );
    }

    const subscriber = token
      ? await db.subscriber.findUnique({ where: { unsubscribeToken: token } })
      : await db.subscriber.findUnique({
          where: { email: email!.toLowerCase().trim() },
        });

    if (!subscriber) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      email: subscriber.email,
      name: subscriber.name,
      status: subscriber.status,
      preferences: PREF_KEYS.reduce(
        (acc, k) => ({ ...acc, [k]: (subscriber as any)[k] }),
        {} as Record<PrefKey, boolean>
      ),
    });
  } catch (err: any) {
    console.error("[Preferences GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDatabase();
    const body = await request.json();
    const { token, preferences, name } = body;

    if (!token) {
      return NextResponse.json({ error: "token required" }, { status: 400 });
    }

    const subscriber = await db.subscriber.findUnique({
      where: { unsubscribeToken: token },
    });
    if (!subscriber) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    const patch: Record<string, any> = {};
    for (const key of PREF_KEYS) {
      if (typeof preferences?.[key] === "boolean") {
        patch[key] = preferences[key];
      }
    }
    if (typeof name === "string") patch.name = name.trim().slice(0, 80) || null;

    // If user unchecked everything, treat as unsubscribe
    const anyOptedIn = PREF_KEYS.some((k) =>
      patch[k] === undefined
        ? (subscriber as any)[k]
        : patch[k]
    );

    if (!anyOptedIn) {
      patch.active = false;
      patch.status = "UNSUBSCRIBED";
      patch.unsubscribedAt = new Date();
    } else if (subscriber.status === "UNSUBSCRIBED") {
      // re-activating via preferences page
      patch.active = true;
      patch.status = "ACTIVE";
      patch.unsubscribedAt = null;
    }

    const updated = await db.subscriber.update({
      where: { id: subscriber.id },
      data: patch,
    });

    return NextResponse.json({
      success: true,
      email: updated.email,
      status: updated.status,
    });
  } catch (err: any) {
    console.error("[Preferences PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
