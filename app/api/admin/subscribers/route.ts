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
    const search = url.searchParams.get("search")?.trim();
    const status = url.searchParams.get("status"); // ACTIVE | UNSUBSCRIBED | ALL
    const tag = url.searchParams.get("tag");
    const source = url.searchParams.get("source");
    const limit = Math.min(Number(url.searchParams.get("limit") || 50), 500);
    const offset = Number(url.searchParams.get("offset") || 0);
    const format = url.searchParams.get("format");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
      ];
    }
    if (tag) where.tags = { contains: tag };
    if (source) where.sourcePage = { contains: source };

    if (format === "csv") {
      const all = await db.subscriber.findMany({
        where,
        orderBy: { subscribedAt: "desc" },
      });
      const header = [
        "email",
        "name",
        "status",
        "subscribedAt",
        "unsubscribedAt",
        "sourcePage",
        "tags",
        "emailsSent",
        "emailsOpened",
        "emailsClicked",
      ];
      const escape = (v: any) => {
        if (v == null) return "";
        const s = String(v).replace(/"/g, '""');
        return /[,"\n]/.test(s) ? `"${s}"` : s;
      };
      const rows = all
        .map((s) =>
          header
            .map((k) =>
              escape(
                (s as any)[k] instanceof Date
                  ? (s as any)[k].toISOString()
                  : (s as any)[k]
              )
            )
            .join(",")
        )
        .join("\n");
      const csv = `${header.join(",")}\n${rows}`;
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="subscribers-${new Date()
            .toISOString()
            .slice(0, 10)}.csv"`,
        },
      });
    }

    const [items, total] = await Promise.all([
      db.subscriber.findMany({
        where,
        orderBy: { subscribedAt: "desc" },
        skip: offset,
        take: limit,
      }),
      db.subscriber.count({ where }),
    ]);

    return NextResponse.json({ items, total, limit, offset });
  } catch (err: any) {
    console.error("[Subscribers GET]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
