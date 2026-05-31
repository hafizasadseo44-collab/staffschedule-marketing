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
    const days = Math.min(Number(url.searchParams.get("days") || 30), 90);

    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [
      sent,
      delivered,
      opened,
      clicked,
      unsubscribed,
      bounced,
      campaigns,
      topCampaigns,
      sourcePages,
    ] = await Promise.all([
      db.emailEvent.count({ where: { type: "SENT", createdAt: { gte: since } } }),
      db.emailEvent.count({ where: { type: "DELIVERED", createdAt: { gte: since } } }),
      db.emailEvent.count({ where: { type: "OPEN", createdAt: { gte: since } } }),
      db.emailEvent.count({ where: { type: "CLICK", createdAt: { gte: since } } }),
      db.emailEvent.count({ where: { type: "UNSUBSCRIBE", createdAt: { gte: since } } }),
      db.emailEvent.count({ where: { type: "BOUNCE", createdAt: { gte: since } } }),
      db.campaign.count({ where: { sentAt: { gte: since } } }),
      db.campaign.findMany({
        where: { sentAt: { gte: since } },
        orderBy: { totalOpened: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          subject: true,
          type: true,
          totalSent: true,
          totalOpened: true,
          totalClicked: true,
          sentAt: true,
        },
      }),
      db.$queryRawUnsafe<any[]>(`
        SELECT sourcePage as source, COUNT(*) as count
        FROM Subscriber
        WHERE subscribedAt >= datetime('now', '-${days} days') AND sourcePage IS NOT NULL
        GROUP BY sourcePage
        ORDER BY count DESC
        LIMIT 8
      `),
    ]);

    // Daily timeseries for opens/clicks/sent
    const series = (await db.$queryRawUnsafe<any[]>(`
      SELECT DATE(createdAt) as day, type, COUNT(*) as count
      FROM EmailEvent
      WHERE createdAt >= datetime('now', '-${days} days')
      GROUP BY day, type
      ORDER BY day ASC
    `)) || [];

    // Re-shape into per-day rows
    const byDay = new Map<
      string,
      { day: string; sent: number; opened: number; clicked: number }
    >();
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      byDay.set(iso, {
        day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sent: 0,
        opened: 0,
        clicked: 0,
      });
    }
    for (const r of series) {
      const row = byDay.get(r.day);
      if (!row) continue;
      const c = Number(r.count);
      if (r.type === "SENT") row.sent = c;
      else if (r.type === "OPEN") row.opened = c;
      else if (r.type === "CLICK") row.clicked = c;
    }

    const openRate = sent === 0 ? 0 : Math.round((opened / sent) * 1000) / 10;
    const clickRate = sent === 0 ? 0 : Math.round((clicked / sent) * 1000) / 10;
    const ctor = opened === 0 ? 0 : Math.round((clicked / opened) * 1000) / 10;

    return NextResponse.json({
      days,
      totals: {
        sent,
        delivered,
        opened,
        clicked,
        unsubscribed,
        bounced,
        campaigns,
        openRate,
        clickRate,
        ctor,
      },
      series: Array.from(byDay.values()),
      topCampaigns,
      sourcePages: sourcePages.map((s) => ({
        source: s.source,
        count: Number(s.count),
      })),
    });
  } catch (err: any) {
    console.error("[Analytics]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
