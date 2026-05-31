import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalSubscribers,
      activeSubscribers,
      unsubscribed,
      newLast30,
      newPrev30,
      campaignsTotal,
      campaignsSent,
      recentSubscribers,
      recentCampaigns,
      sentEvents30,
      openedEvents30,
      clickedEvents30,
    ] = await Promise.all([
      db.subscriber.count(),
      db.subscriber.count({ where: { status: "ACTIVE" } }),
      db.subscriber.count({ where: { status: "UNSUBSCRIBED" } }),
      db.subscriber.count({ where: { subscribedAt: { gte: thirtyDaysAgo } } }),
      db.subscriber.count({
        where: {
          subscribedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
        },
      }),
      db.campaign.count(),
      db.campaign.count({ where: { status: "SENT" } }),
      db.subscriber.findMany({
        orderBy: { subscribedAt: "desc" },
        take: 8,
        select: {
          id: true,
          email: true,
          name: true,
          status: true,
          subscribedAt: true,
          sourcePage: true,
        },
      }),
      db.campaign.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          name: true,
          subject: true,
          type: true,
          status: true,
          totalSent: true,
          totalOpened: true,
          totalClicked: true,
          sentAt: true,
          createdAt: true,
        },
      }),
      db.emailEvent.count({
        where: { type: "SENT", createdAt: { gte: thirtyDaysAgo } },
      }),
      db.emailEvent.count({
        where: { type: "OPEN", createdAt: { gte: thirtyDaysAgo } },
      }),
      db.emailEvent.count({
        where: { type: "CLICK", createdAt: { gte: thirtyDaysAgo } },
      }),
    ]);

    // 30-day growth time series (per day)
    const growthRaw = (await db.$queryRawUnsafe<any[]>(`
      SELECT DATE(subscribedAt) as day, COUNT(*) as count
      FROM Subscriber
      WHERE subscribedAt >= datetime('now', '-30 days')
      GROUP BY day
      ORDER BY day ASC
    `)) || [];

    // Fill missing days for smoother chart
    const growth: { day: string; count: number; cumulative: number }[] = [];
    const baseCount = totalSubscribers - newLast30;
    let cumulative = baseCount;
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const found = growthRaw.find((r) => r.day === iso);
      const c = found ? Number(found.count) : 0;
      cumulative += c;
      growth.push({
        day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: c,
        cumulative,
      });
    }

    const subscriberGrowthPct =
      newPrev30 === 0
        ? newLast30 > 0
          ? 100
          : 0
        : Math.round(((newLast30 - newPrev30) / newPrev30) * 100);

    const openRate =
      sentEvents30 === 0
        ? 0
        : Math.round((openedEvents30 / sentEvents30) * 100);
    const clickRate =
      sentEvents30 === 0
        ? 0
        : Math.round((clickedEvents30 / sentEvents30) * 100);

    return NextResponse.json({
      stats: {
        totalSubscribers,
        activeSubscribers,
        unsubscribed,
        newLast30,
        subscriberGrowthPct,
        campaignsTotal,
        campaignsSent,
        emailsSent30: sentEvents30,
        openRate,
        clickRate,
      },
      growth,
      recentSubscribers,
      recentCampaigns,
    });
  } catch (err: any) {
    console.error("[Admin Overview]", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
