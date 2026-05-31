import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { ensureDatabase } from "@/lib/db-init";
import { sendWelcomeEmail } from "@/lib/email-service";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Strict RFC-compatible-ish email regex with minimum-viable-shape checks.
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Disposable + obvious-spam domains to bounce instantly.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "throwaway.email",
  "yopmail.com",
  "dispostable.com",
  "trashmail.com",
  "fakeinbox.com",
  "getnada.com",
  "sharklasers.com",
]);

interface SubscribePayload {
  email?: string;
  name?: string;
  sourcePage?: string;
  tags?: string[];
  // Honeypot field — bots fill anything, humans never see it
  website?: string;
  // Legacy preferences
  preferences?: {
    blog?: boolean;
    news?: boolean;
    guides?: boolean;
    productUpdates?: boolean;
    schedulingTips?: boolean;
    industryInsights?: boolean;
    featureReleases?: boolean;
    announcements?: boolean;
    weeklyDigest?: boolean;
  };
}

export async function POST(request: Request) {
  try {
    await ensureDatabase();

    const ip = getClientIp(request.headers);
    const limit = rateLimit(`subscribe:${ip}`, {
      limit: 5,
      windowMs: 60_000,
    });
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as SubscribePayload;
    const { email, name, sourcePage, tags, website, preferences } = body;

    // Honeypot triggered = silently 200 to confuse bots
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const domain = normalizedEmail.split("@")[1];

    if (DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: "Please use a permanent email address." },
        { status: 400 }
      );
    }

    const cleanName = name?.trim().slice(0, 80) || null;
    const cleanSource = sourcePage?.trim().slice(0, 200) || null;
    const cleanTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean).join(",")
      : null;

    // Default: opt into everything unless explicitly opted out (no double opt-in).
    const prefs = {
      blog: preferences?.blog ?? true,
      news: preferences?.news ?? true,
      guides: preferences?.guides ?? true,
      productUpdates: preferences?.productUpdates ?? true,
      schedulingTips: preferences?.schedulingTips ?? true,
      industryInsights: preferences?.industryInsights ?? true,
      featureReleases: preferences?.featureReleases ?? true,
      announcements: preferences?.announcements ?? true,
      weeklyDigest: preferences?.weeklyDigest ?? true,
    };

    // Look up existing — we treat re-subscribe as a reactivation, not a new signup.
    const existing = await db.subscriber.findUnique({
      where: { email: normalizedEmail },
    });

    const isReactivation = existing && existing.status !== "ACTIVE";
    const isNewSubscriber = !existing;
    const unsubscribeToken = existing?.unsubscribeToken || randomUUID();

    const subscriber = await db.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        name: cleanName ?? existing?.name,
        ...prefs,
        active: true,
        status: "ACTIVE",
        unsubscribedAt: null,
        tags:
          cleanTags && existing?.tags
            ? Array.from(
                new Set([
                  ...existing.tags.split(",").map((t) => t.trim()),
                  ...cleanTags.split(","),
                ])
              )
                .filter(Boolean)
                .join(",")
            : cleanTags || existing?.tags,
        sourcePage: existing?.sourcePage || cleanSource,
        unsubscribeToken,
      },
      create: {
        email: normalizedEmail,
        name: cleanName,
        ...prefs,
        active: true,
        status: "ACTIVE",
        sourcePage: cleanSource,
        tags: cleanTags,
        unsubscribeToken,
      },
    });

    // Send welcome email for new subscribers and reactivations (fire-and-forget)
    if (isNewSubscriber || isReactivation) {
      sendWelcomeEmail({
        email: subscriber.email,
        name: subscriber.name,
        subscriberId: subscriber.id,
        unsubscribeToken,
      }).catch((err) => {
        console.error("[Subscribe] Welcome email failed:", err);
      });
    }

    return NextResponse.json({
      success: true,
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name,
        status: subscriber.status,
      },
      isNew: isNewSubscriber,
    });
  } catch (error: any) {
    console.error("Subscription Error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
