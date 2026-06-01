import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { analyzeSubject, suggestRewrites } from "@/lib/subject-linter";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { subject } = await request.json();
    if (typeof subject !== "string") {
      return NextResponse.json({ error: "subject required" }, { status: 400 });
    }
    const analysis = analyzeSubject(subject);
    const suggestions =
      analysis.estimatedTab !== "Primary" ? suggestRewrites(subject) : [];
    return NextResponse.json({ ...analysis, suggestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
