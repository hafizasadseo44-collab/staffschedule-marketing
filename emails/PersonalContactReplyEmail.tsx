import * as React from "react";
import PersonalLayout, {
  PersonalLink,
  Signoff,
  P,
} from "./components/PersonalLayout";

interface PersonalContactReplyEmailProps {
  name: string;
  formType: "demo" | "sales" | "support" | "general";
  message: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

const COPY: Record<
  PersonalContactReplyEmailProps["formType"],
  { body: string; eta: string }
> = {
  demo: {
    body:
      "Thanks for asking for a demo of StaffSchedule.io. A product specialist will reach out to find a time that works for you — we'll do a 30-minute walkthrough tailored to your team and industry.",
    eta: "Expect to hear from us within 2 hours during business hours (9am–6pm EST).",
  },
  sales: {
    body:
      "Thanks for the inquiry. The enterprise team is reviewing your details and putting together a custom proposal — pricing, deployment timeline, security review and answers to anything you asked.",
    eta: "We'll be back with the full picture within 1 business day.",
  },
  support: {
    body:
      "Your support request just landed in our queue. We're reading it now and will reach out shortly with either a fix or follow-up questions.",
    eta: "Most tickets get resolved same-day, often within 30 minutes.",
  },
  general: {
    body:
      "Thanks for the note — it landed in our inbox and we'll get back to you shortly.",
    eta: "Usually within 1 business day.",
  },
};

/**
 * Plain-text-style auto-reply to a contact form submission. Looks like a
 * human answered an email, not a marketing autoresponder. Mirrors the
 * submitter's message back so they have a copy of what they sent.
 */
export default function PersonalContactReplyEmail({
  name,
  formType,
  message,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: PersonalContactReplyEmailProps) {
  const firstName = name?.trim().split(" ")[0] || "there";
  const copy = COPY[formType];

  return (
    <PersonalLayout
      preview={copy.eta}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
      primaryHint={false}
    >
      <P>Hi {firstName},</P>

      <P>{copy.body}</P>

      <P>{copy.eta}</P>

      <P>Here&apos;s a copy of what you sent so you have it on hand:</P>

      <div
        style={{
          margin: "0 0 18px",
          padding: "12px 14px",
          background: "#F9FAFB",
          borderLeft: "3px solid #E5E7EB",
          borderRadius: 4,
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap" as any,
        }}
      >
        {message}
      </div>

      <P>
        Want to look around in the meantime? Our{" "}
        <PersonalLink href={`${siteUrl}/pricing`}>plans page</PersonalLink> has
        pricing and you can try the platform free for 14 days — no card needed.
      </P>

      <P>If you have anything urgent, just hit reply to this email.</P>

      <Signoff />
    </PersonalLayout>
  );
}
