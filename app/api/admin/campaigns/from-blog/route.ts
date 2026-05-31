import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { ensureDatabase } from "@/lib/db-init";
import { sendBlogPostCampaign } from "@/lib/email-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    await ensureDatabase();
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { postId, audience } = body;
    if (!postId)
      return NextResponse.json({ error: "postId required" }, { status: 400 });

    const result = await sendBlogPostCampaign({ postId, audience });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Campaign FromBlog]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
