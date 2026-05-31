import { NextResponse } from "next/server";
import { sendContactEmails, ContactSubmission } from "@/lib/email-service";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const VALID_FORM_TYPES = ["demo", "sales", "support", "general"] as const;
type FormType = (typeof VALID_FORM_TYPES)[number];

interface ContactPayload {
  formType?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  industry?: string;
  teamSize?: string;
  schedulingMethod?: string;
  category?: string;
  message?: string;
  features?: string[];
  sourcePage?: string;
  // Honeypot
  website?: string;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);
    // Tighter limit than newsletter: 3 contact submissions per minute per IP
    const limit = rateLimit(`contact:${ip}`, { limit: 3, windowMs: 60_000 });
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    // Honeypot: silently accept to confuse bots
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const formType: FormType = VALID_FORM_TYPES.includes(body.formType as any)
      ? (body.formType as FormType)
      : "general";

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email || !EMAIL_RE.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }
    if (!body.message?.trim()) {
      return NextResponse.json(
        { error: "Please tell us how we can help" },
        { status: 400 }
      );
    }

    const trim = (v: string | undefined | null, max = 200) =>
      typeof v === "string" ? v.trim().slice(0, max) || null : null;

    const submission: ContactSubmission = {
      formType,
      name: trim(body.name, 120)!,
      email: body.email.toLowerCase().trim(),
      phone: trim(body.phone, 40),
      company: trim(body.company, 120),
      jobTitle: trim(body.jobTitle, 120),
      industry: trim(body.industry, 60),
      teamSize: trim(body.teamSize, 40),
      schedulingMethod: trim(body.schedulingMethod, 80),
      category: trim(body.category, 80),
      message: trim(body.message, 5000)!,
      features: Array.isArray(body.features)
        ? body.features.map((f) => String(f).trim()).filter(Boolean).slice(0, 12)
        : undefined,
      sourcePage: trim(body.sourcePage, 200),
    };

    // Fire-and-await: we want to know if delivery failed, but we don't want
    // a Resend hiccup to make the user think their submission was lost.
    const result = await sendContactEmails(submission);

    return NextResponse.json({
      success: true,
      delivered: result.notificationSent,
    });
  } catch (err: any) {
    console.error("[Contact API]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email hello@staffschedule.io directly." },
      { status: 500 }
    );
  }
}
