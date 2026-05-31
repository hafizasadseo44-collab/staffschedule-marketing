import * as React from "react";
import { Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

interface ContactReplyEmailProps {
  name: string;
  formType: "demo" | "sales" | "support" | "general";
  message: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

const COPY: Record<
  ContactReplyEmailProps["formType"],
  {
    badge: string;
    headline: string;
    bodyIntro: string;
    eta: string;
    nextSteps: { icon: string; title: string; body: string }[];
  }
> = {
  demo: {
    badge: "✨ Demo Requested",
    headline: "Your demo is on the way.",
    bodyIntro:
      "Thanks for requesting a personalized demo of StaffSchedule.io. A product specialist will reach out to schedule a 30-minute walkthrough tailored to your team and industry.",
    eta: "We typically respond within 2 hours during business hours (9am–6pm EST).",
    nextSteps: [
      { icon: "📅", title: "We'll reach out", body: "Within 2 hours to find a time that works for you." },
      { icon: "💡", title: "Tailored walkthrough", body: "Built around your team size, industry, and current pain points." },
      { icon: "🚀", title: "Free trial", body: "If it's a fit, you'll be live in your own workspace the same day." },
    ],
  },
  sales: {
    badge: "💼 Sales Inquiry Received",
    headline: "Thanks — we're preparing your quote.",
    bodyIntro:
      "Our enterprise team is reviewing your requirements and preparing a custom proposal. We'll come back with pricing, deployment timeline, and answers to anything you asked.",
    eta: "Expect a response within 1 business day.",
    nextSteps: [
      { icon: "📊", title: "Custom pricing", body: "Built around your team size, locations, and feature needs." },
      { icon: "🤝", title: "Implementation plan", body: "Including onboarding, training, and data migration timelines." },
      { icon: "🛡️", title: "Security review", body: "SOC2, GDPR docs and SSO options sent ahead if you need them." },
    ],
  },
  support: {
    badge: "🛟 Support Ticket Created",
    headline: "We've got your ticket.",
    bodyIntro:
      "Your support request is in our queue. Our team is triaging it now and will reach out with either a resolution or follow-up questions.",
    eta: "Average response time: under 30 minutes.",
    nextSteps: [
      { icon: "🔍", title: "We're investigating", body: "Reviewing your message and reproducing the issue." },
      { icon: "💬", title: "Updates by email", body: "Hit reply anytime to add context or screenshots." },
      { icon: "✅", title: "Resolution", body: "Most tickets resolve same-day. We'll confirm when you're back up." },
    ],
  },
  general: {
    badge: "👋 Message Received",
    headline: "Thanks for reaching out.",
    bodyIntro:
      "We received your message and someone from our team will get back to you shortly.",
    eta: "We typically respond within 1 business day.",
    nextSteps: [
      { icon: "👀", title: "We're reading it", body: "A real human is reviewing your message right now." },
      { icon: "💬", title: "We'll reply soon", body: "Direct from a team member's inbox, not an autoresponder." },
      { icon: "🚀", title: "Want to explore?", body: "Start a free trial anytime — no credit card needed." },
    ],
  },
};

export default function ContactReplyEmail({
  name,
  formType,
  message,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: ContactReplyEmailProps) {
  const copy = COPY[formType];
  const firstName = name?.trim().split(" ")[0] || "there";

  return (
    <EmailLayout
      preview={`${copy.headline} ${copy.eta}`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {/* Hero */}
      <Section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
          padding: "44px 32px",
          textAlign: "center",
        }}
      >
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto 16px" }}>
          <tr>
            <td
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                padding: "6px 14px",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {copy.badge}
              </Text>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "0 0 10px",
            color: "#FFFFFF",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
          }}
        >
          {copy.headline}
        </Text>
        <Text
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.85)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {copy.eta}
        </Text>
      </Section>

      {/* Greeting */}
      <Section style={{ padding: "36px 32px 8px" }}>
        <Text
          style={{
            margin: "0 0 14px",
            fontSize: 18,
            fontWeight: 700,
            color: BRAND.text,
            letterSpacing: "-0.2px",
          }}
        >
          Hi {firstName},
        </Text>
        <Text
          style={{
            margin: 0,
            fontSize: 15,
            color: BRAND.muted,
            lineHeight: 1.7,
          }}
        >
          {copy.bodyIntro}
        </Text>
      </Section>

      {/* Your message echo */}
      <Section style={{ padding: "16px 32px 0" }}>
        <table
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          width="100%"
          style={{
            background: BRAND.bg,
            border: `1px solid ${BRAND.border}`,
            borderRadius: 14,
            borderLeft: `4px solid ${BRAND.primary}`,
          }}
        >
          <tr>
            <td style={{ padding: "16px 20px" }}>
              <Text
                style={{
                  margin: "0 0 8px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: BRAND.primary,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                Your message
              </Text>
              <Text
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: BRAND.text,
                  lineHeight: 1.65,
                  whiteSpace: "pre-wrap" as any,
                }}
              >
                {message}
              </Text>
            </td>
          </tr>
        </table>
      </Section>

      {/* Next steps */}
      <Section style={{ padding: "32px 32px 8px" }}>
        <Text
          style={{
            margin: "0 0 16px",
            fontSize: 11,
            fontWeight: 800,
            color: BRAND.primary,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          ↓ What happens next
        </Text>
        {copy.nextSteps.map((step, i) => (
          <table
            key={i}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            width="100%"
            style={{
              marginBottom: 10,
              background: "#FFFFFF",
              borderRadius: 12,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <tr>
              <td style={{ padding: "14px 18px" }}>
                <table cellPadding={0} cellSpacing={0} role="presentation">
                  <tr>
                    <td
                      style={{
                        width: 40,
                        verticalAlign: "top",
                        paddingRight: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: BRAND.bg,
                          textAlign: "center",
                          fontSize: 18,
                          lineHeight: "36px",
                          border: `1px solid ${BRAND.border}`,
                        }}
                      >
                        {step.icon}
                      </div>
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <Text
                        style={{
                          margin: "0 0 4px",
                          fontSize: 14,
                          fontWeight: 700,
                          color: BRAND.text,
                        }}
                      >
                        {step.title}
                      </Text>
                      <Text
                        style={{
                          margin: 0,
                          fontSize: 13,
                          color: BRAND.muted,
                          lineHeight: 1.55,
                        }}
                      >
                        {step.body}
                      </Text>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      {/* CTA */}
      <Section style={{ padding: "24px 32px 36px", textAlign: "center" }}>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            <td>
              <Button href={`${siteUrl}/pricing`} variant="primary">
                Explore Plans →
              </Button>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "16px 0 0",
            fontSize: 12,
            color: BRAND.muted,
          }}
        >
          Need anything urgent? Just hit reply — this email goes to a real human.
        </Text>
      </Section>
    </EmailLayout>
  );
}
