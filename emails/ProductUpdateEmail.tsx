import * as React from "react";
import { Img, Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

interface ProductUpdateEmailProps {
  title: string;
  subtitle?: string;
  description: string;
  image?: string | null;
  ctaLabel?: string;
  ctaUrl: string;
  features?: { icon?: string; title: string; body: string }[];
  type?: "feature" | "release" | "announcement";
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export default function ProductUpdateEmail({
  title,
  subtitle,
  description,
  image,
  ctaLabel = "Explore the Update",
  ctaUrl,
  features = [],
  type = "feature",
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: ProductUpdateEmailProps) {
  const badgeLabel =
    type === "release"
      ? "🚀 New Release"
      : type === "announcement"
      ? "📢 Announcement"
      : "✨ New Feature";

  return (
    <EmailLayout
      preview={subtitle || description.slice(0, 140)}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {/* Hero with gradient */}
      <Section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto 16px" }}>
          <tr>
            <td
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                padding: "5px 14px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {badgeLabel}
              </Text>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "0 0 10px",
            fontSize: 30,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.6px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.9)",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </Text>
        )}
      </Section>

      {image && (
        <Section style={{ padding: 0 }}>
          <Img
            src={image}
            alt={title}
            width="640"
            style={{ width: "100%", display: "block" }}
          />
        </Section>
      )}

      <Section style={{ padding: "32px 32px 24px" }}>
        <Text
          style={{
            margin: 0,
            fontSize: 15,
            color: BRAND.text,
            lineHeight: 1.7,
          }}
        >
          {description}
        </Text>
      </Section>

      {features.length > 0 && (
        <Section style={{ padding: "0 32px 8px" }}>
          {features.map((f, i) => (
            <table
              key={i}
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
              width="100%"
              style={{
                marginBottom: 12,
                background: BRAND.bg,
                borderRadius: 12,
                border: `1px solid ${BRAND.border}`,
              }}
            >
              <tr>
                <td style={{ padding: "14px 16px" }}>
                  <Text
                    style={{
                      margin: "0 0 4px",
                      fontSize: 14,
                      fontWeight: 700,
                      color: BRAND.text,
                    }}
                  >
                    {f.icon ? `${f.icon} ` : ""}
                    {f.title}
                  </Text>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: BRAND.muted,
                      lineHeight: 1.55,
                    }}
                  >
                    {f.body}
                  </Text>
                </td>
              </tr>
            </table>
          ))}
        </Section>
      )}

      <Section style={{ padding: "20px 32px 36px", textAlign: "center" }}>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            <td>
              <Button href={ctaUrl} variant="primary">
                {ctaLabel} →
              </Button>
            </td>
          </tr>
        </table>
      </Section>
    </EmailLayout>
  );
}
