import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailLayoutProps {
  preview: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  children: React.ReactNode;
}

const BRAND = {
  primary: "#6D5DF6",
  secondary: "#8B5CF6",
  accent: "#A855F7",
  bg: "#F8FAFC",
  text: "#111827",
  muted: "#64748B",
  border: "#E2E8F0",
};

export default function EmailLayout({
  preview,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
  children,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: BRAND.bg,
            fontFamily:
              "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
            color: BRAND.text,
          }}
        >
          <Container
            style={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "40px 20px",
            }}
          >
            {/* ─── Brand Header ─── */}
            <Section style={{ textAlign: "center", padding: "0 0 32px" }}>
              <Link
                href={siteUrl}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                  style={{ margin: "0 auto" }}
                >
                  <tr>
                    <td
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
                        borderRadius: 12,
                        padding: "8px 10px",
                        verticalAlign: "middle",
                      }}
                    >
                      <Text
                        style={{
                          margin: 0,
                          color: "#FFFFFF",
                          fontSize: 18,
                          fontWeight: 900,
                          letterSpacing: "-0.5px",
                          lineHeight: 1,
                        }}
                      >
                        SS
                      </Text>
                    </td>
                    <td style={{ paddingLeft: 12, verticalAlign: "middle" }}>
                      <Text
                        style={{
                          margin: 0,
                          color: BRAND.text,
                          fontSize: 22,
                          fontWeight: 800,
                          letterSpacing: "-0.5px",
                          lineHeight: 1,
                        }}
                      >
                        <span style={{ color: BRAND.text }}>Staff</span>
                        <span style={{ color: BRAND.primary }}>Schedule</span>
                        <span style={{ color: BRAND.text }}>.io</span>
                      </Text>
                    </td>
                  </tr>
                </table>
              </Link>
            </Section>

            {/* ─── Main Card ─── */}
            <Section
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
            >
              {children}
            </Section>

            {/* ─── Footer ─── */}
            <Section style={{ padding: "32px 8px 0", textAlign: "center" }}>
              <table
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={{ margin: "0 auto 24px" }}
              >
                <tr>
                  <td style={{ padding: "0 8px" }}>
                    <Link
                      href={`${siteUrl}/blog`}
                      style={{
                        fontSize: 13,
                        color: BRAND.muted,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Blog
                    </Link>
                  </td>
                  <td style={{ color: BRAND.border }}>·</td>
                  <td style={{ padding: "0 8px" }}>
                    <Link
                      href={`${siteUrl}/resources`}
                      style={{
                        fontSize: 13,
                        color: BRAND.muted,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Guides
                    </Link>
                  </td>
                  <td style={{ color: BRAND.border }}>·</td>
                  <td style={{ padding: "0 8px" }}>
                    <Link
                      href={`${siteUrl}/news`}
                      style={{
                        fontSize: 13,
                        color: BRAND.muted,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      News
                    </Link>
                  </td>
                  <td style={{ color: BRAND.border }}>·</td>
                  <td style={{ padding: "0 8px" }}>
                    <Link
                      href={`${siteUrl}/pricing`}
                      style={{
                        fontSize: 13,
                        color: BRAND.muted,
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Pricing
                    </Link>
                  </td>
                </tr>
              </table>

              <Text
                style={{
                  margin: "0 0 6px",
                  fontSize: 12,
                  color: BRAND.muted,
                  lineHeight: 1.6,
                }}
              >
                © {new Date().getFullYear()} StaffSchedule.io. The world&apos;s
                leading AI-driven workforce management platform.
              </Text>
              <Text
                style={{
                  margin: "0 0 16px",
                  fontSize: 12,
                  color: BRAND.muted,
                }}
              >
                You&apos;re receiving this because you subscribed to
                StaffSchedule.io updates.
              </Text>
              <Text style={{ margin: 0, fontSize: 12 }}>
                <Link
                  href={preferencesUrl}
                  style={{
                    color: BRAND.primary,
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  Manage preferences
                </Link>
                <span style={{ color: BRAND.muted, padding: "0 6px" }}>·</span>
                <Link
                  href={unsubscribeUrl}
                  style={{
                    color: BRAND.muted,
                    textDecoration: "underline",
                  }}
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export { BRAND };
