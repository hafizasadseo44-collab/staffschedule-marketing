import * as React from "react";
import { Img, Link, Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

export interface DigestArticle {
  title: string;
  url: string;
  excerpt?: string;
  image?: string | null;
  category?: string | null;
  readingTime?: number | null;
}

export interface DigestGuide {
  title: string;
  url: string;
  description?: string;
  image?: string | null;
}

interface WeeklyDigestEmailProps {
  weekRange: string; // e.g. "Mar 1 — Mar 7"
  featuredArticle?: DigestArticle;
  articles: DigestArticle[];
  guides?: DigestGuide[];
  productUpdates?: { title: string; url: string }[];
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export default function WeeklyDigestEmail({
  weekRange,
  featuredArticle,
  articles = [],
  guides = [],
  productUpdates = [],
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: WeeklyDigestEmailProps) {
  return (
    <EmailLayout
      preview={`Your Weekly Workforce Management Digest · ${weekRange}`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {/* ─── Hero ─── */}
      <Section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
          padding: "44px 32px",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            margin: "0 0 8px",
            fontSize: 11,
            fontWeight: 800,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          📬 Weekly Digest · {weekRange}
        </Text>
        <Text
          style={{
            margin: "0 0 8px",
            fontSize: 30,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
          }}
        >
          Workforce Management Digest
        </Text>
        <Text
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          The best of scheduling, ops, and AI-driven workforce intelligence — this week.
        </Text>
      </Section>

      {/* ─── Featured Article ─── */}
      {featuredArticle && (
        <Section style={{ padding: "32px 32px 0" }}>
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
            ⭐ This Week&apos;s Pick
          </Text>
          <Link href={featuredArticle.url} style={{ textDecoration: "none" }}>
            {featuredArticle.image && (
              <Img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                width="576"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 14,
                  marginBottom: 16,
                }}
              />
            )}
            {featuredArticle.category && (
              <Text
                style={{
                  margin: "0 0 6px",
                  fontSize: 10,
                  fontWeight: 800,
                  color: BRAND.primary,
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                }}
              >
                {featuredArticle.category}
              </Text>
            )}
            <Text
              style={{
                margin: "0 0 10px",
                fontSize: 22,
                fontWeight: 800,
                color: BRAND.text,
                lineHeight: 1.3,
                letterSpacing: "-0.4px",
              }}
            >
              {featuredArticle.title}
            </Text>
            {featuredArticle.excerpt && (
              <Text
                style={{
                  margin: "0 0 14px",
                  fontSize: 14,
                  color: BRAND.muted,
                  lineHeight: 1.65,
                }}
              >
                {featuredArticle.excerpt}
              </Text>
            )}
            <Text
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                color: BRAND.primary,
              }}
            >
              Read article →
            </Text>
          </Link>
        </Section>
      )}

      {/* ─── More Articles ─── */}
      {articles.length > 0 && (
        <Section
          style={{
            padding: "32px 32px 8px",
            borderTop: featuredArticle ? `1px solid ${BRAND.border}` : "none",
            marginTop: featuredArticle ? 28 : 0,
          }}
        >
          <Text
            style={{
              margin: "0 0 18px",
              fontSize: 11,
              fontWeight: 800,
              color: BRAND.primary,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            📰 More Articles This Week
          </Text>
          {articles.map((a, i) => (
            <Link
              key={i}
              href={a.url}
              style={{
                display: "block",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom:
                  i < articles.length - 1 ? `1px solid ${BRAND.border}` : "none",
              }}
            >
              <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
                <tr>
                  {a.image && (
                    <td
                      style={{
                        width: 96,
                        verticalAlign: "top",
                        paddingRight: 16,
                      }}
                    >
                      <Img
                        src={a.image}
                        alt={a.title}
                        width="96"
                        height="72"
                        style={{
                          width: 96,
                          height: 72,
                          objectFit: "cover",
                          borderRadius: 10,
                          display: "block",
                        }}
                      />
                    </td>
                  )}
                  <td style={{ verticalAlign: "top" }}>
                    {a.category && (
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
                        {a.category}
                      </Text>
                    )}
                    <Text
                      style={{
                        margin: "0 0 4px",
                        fontSize: 15,
                        fontWeight: 700,
                        color: BRAND.text,
                        lineHeight: 1.4,
                      }}
                    >
                      {a.title}
                    </Text>
                    {a.readingTime ? (
                      <Text
                        style={{
                          margin: 0,
                          fontSize: 12,
                          color: BRAND.muted,
                        }}
                      >
                        {a.readingTime} min read
                      </Text>
                    ) : null}
                  </td>
                </tr>
              </table>
            </Link>
          ))}
        </Section>
      )}

      {/* ─── Guides ─── */}
      {guides.length > 0 && (
        <Section
          style={{
            padding: "32px 32px 0",
            borderTop: `1px solid ${BRAND.border}`,
            marginTop: 28,
          }}
        >
          <Text
            style={{
              margin: "0 0 18px",
              fontSize: 11,
              fontWeight: 800,
              color: BRAND.primary,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            📖 Featured Guides
          </Text>
          {guides.map((g, i) => (
            <Link
              key={i}
              href={g.url}
              style={{
                display: "block",
                textDecoration: "none",
                background: BRAND.bg,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  margin: "0 0 4px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: BRAND.text,
                  lineHeight: 1.4,
                }}
              >
                {g.title} →
              </Text>
              {g.description && (
                <Text
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: BRAND.muted,
                    lineHeight: 1.55,
                  }}
                >
                  {g.description}
                </Text>
              )}
            </Link>
          ))}
        </Section>
      )}

      {/* ─── Product Updates ─── */}
      {productUpdates.length > 0 && (
        <Section
          style={{
            padding: "32px 32px 0",
            borderTop: `1px solid ${BRAND.border}`,
            marginTop: 28,
          }}
        >
          <Text
            style={{
              margin: "0 0 14px",
              fontSize: 11,
              fontWeight: 800,
              color: BRAND.primary,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            🚀 Product Updates
          </Text>
          {productUpdates.map((u, i) => (
            <Text
              key={i}
              style={{
                margin: "0 0 8px",
                fontSize: 14,
                color: BRAND.text,
                lineHeight: 1.55,
              }}
            >
              ·{" "}
              <Link href={u.url} style={{ color: BRAND.primary, fontWeight: 600 }}>
                {u.title}
              </Link>
            </Text>
          ))}
        </Section>
      )}

      {/* ─── CTA ─── */}
      <Section
        style={{
          padding: "32px",
          borderTop: `1px solid ${BRAND.border}`,
          marginTop: 28,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            margin: "0 0 16px",
            fontSize: 14,
            color: BRAND.muted,
            lineHeight: 1.6,
          }}
        >
          Ready to stop wrestling spreadsheets?
        </Text>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            <td>
              <Button href={`${siteUrl}/pricing`} variant="primary">
                Try StaffSchedule Free →
              </Button>
            </td>
          </tr>
        </table>
      </Section>
    </EmailLayout>
  );
}
