import * as React from "react";
import { Link, Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

interface WelcomeEmailProps {
  name?: string | null;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  popularPosts?: { title: string; url: string; category?: string }[];
}

export default function WelcomeEmail({
  name,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
  popularPosts = [],
}: WelcomeEmailProps) {
  const firstName = name?.trim().split(" ")[0];
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  const tips = [
    {
      icon: "⚡",
      title: "Automate your scheduling",
      body: "Let AI build conflict-free rosters in seconds, not hours.",
    },
    {
      icon: "📊",
      title: "Forecast labor demand",
      body: "Pinpoint busy hours and staff exactly to demand — never over or under.",
    },
    {
      icon: "💬",
      title: "Cut no-shows by 40%",
      body: "Automated shift reminders + swap requests keep coverage tight.",
    },
  ];

  return (
    <EmailLayout
      preview="Welcome to StaffSchedule.io — your smarter scheduling journey starts now."
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {/* ─── Hero ─── */}
      <Section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
          padding: "48px 32px 56px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <table
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{ margin: "0 auto 18px" }}
        >
          <tr>
            <td
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "6px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
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
                ✨ Welcome aboard
              </Text>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "0 0 14px",
            color: "#FFFFFF",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.8px",
            lineHeight: 1.15,
          }}
        >
          You&apos;re in. Let&apos;s build smarter schedules.
        </Text>
        <Text
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.85)",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 460,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Thanks for joining 12,000+ operators who run their teams with
          StaffSchedule.io.
        </Text>
      </Section>

      {/* ─── Greeting ─── */}
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
          {greeting}
        </Text>
        <Text
          style={{
            margin: "0 0 18px",
            fontSize: 15,
            color: BRAND.muted,
            lineHeight: 1.7,
          }}
        >
          Welcome to <strong style={{ color: BRAND.text }}>StaffSchedule.io</strong> — the AI-powered
          workforce platform built for operators who&apos;ve had it with
          spreadsheets, no-shows, and last-minute scheduling chaos.
        </Text>
        <Text
          style={{
            margin: 0,
            fontSize: 15,
            color: BRAND.muted,
            lineHeight: 1.7,
          }}
        >
          You&apos;ll get a weekly digest of the best scheduling tips, product
          updates, and industry insights — straight to your inbox.
        </Text>
      </Section>

      {/* ─── Quick Wins ─── */}
      <Section style={{ padding: "24px 32px 8px" }}>
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
          ↓ Quick Wins to Get Started
        </Text>
        {tips.map((tip, i) => (
          <table
            key={i}
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            width="100%"
            style={{
              marginBottom: 12,
              background: BRAND.bg,
              borderRadius: 14,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <tr>
              <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
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
                          background: "#FFFFFF",
                          border: `1px solid ${BRAND.border}`,
                          display: "table-cell",
                          textAlign: "center",
                          verticalAlign: "middle",
                          fontSize: 18,
                          lineHeight: "36px",
                        }}
                      >
                        {tip.icon}
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
                        {tip.title}
                      </Text>
                      <Text
                        style={{
                          margin: 0,
                          fontSize: 13,
                          color: BRAND.muted,
                          lineHeight: 1.55,
                        }}
                      >
                        {tip.body}
                      </Text>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        ))}
      </Section>

      {/* ─── CTA ─── */}
      <Section style={{ padding: "24px 32px 32px", textAlign: "center" }}>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            <td>
              <Button href={`${siteUrl}/pricing`} variant="primary">
                Start Your Free Trial →
              </Button>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "14px 0 0",
            fontSize: 12,
            color: BRAND.muted,
          }}
        >
          14 days free · no credit card required
        </Text>
      </Section>

      {/* ─── Popular reads ─── */}
      {popularPosts.length > 0 && (
        <Section
          style={{
            padding: "8px 32px 32px",
            borderTop: `1px solid ${BRAND.border}`,
          }}
        >
          <Text
            style={{
              margin: "24px 0 16px",
              fontSize: 11,
              fontWeight: 800,
              color: BRAND.primary,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            📚 Popular Reads
          </Text>
          {popularPosts.slice(0, 3).map((p, i) => (
            <Link
              key={i}
              href={p.url}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom:
                  i < popularPosts.slice(0, 3).length - 1
                    ? `1px solid ${BRAND.border}`
                    : "none",
                textDecoration: "none",
              }}
            >
              {p.category && (
                <Text
                  style={{
                    margin: "0 0 4px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: BRAND.primary,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {p.category}
                </Text>
              )}
              <Text
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: BRAND.text,
                  lineHeight: 1.5,
                }}
              >
                {p.title} →
              </Text>
            </Link>
          ))}
        </Section>
      )}

      {/* ─── Social ─── */}
      <Section
        style={{
          padding: "24px 32px 36px",
          borderTop: `1px solid ${BRAND.border}`,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            margin: "0 0 14px",
            fontSize: 13,
            color: BRAND.muted,
            fontWeight: 600,
          }}
        >
          Follow along
        </Text>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            {[
              { name: "X", url: "https://twitter.com/staffschedule" },
              { name: "LI", url: "https://linkedin.com/company/staffschedule" },
              { name: "FB", url: "https://facebook.com/staffschedule" },
            ].map((s, i) => (
              <td key={i} style={{ padding: "0 6px" }}>
                <Link
                  href={s.url}
                  style={{
                    display: "inline-block",
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: BRAND.bg,
                    border: `1px solid ${BRAND.border}`,
                    color: BRAND.text,
                    fontSize: 12,
                    fontWeight: 800,
                    textAlign: "center",
                    lineHeight: "38px",
                    textDecoration: "none",
                  }}
                >
                  {s.name}
                </Link>
              </td>
            ))}
          </tr>
        </table>
      </Section>
    </EmailLayout>
  );
}
