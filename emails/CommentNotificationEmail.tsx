import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { BRAND } from "./components/EmailLayout";

interface CommentNotificationEmailProps {
  commenterName: string;
  commenterEmail: string;
  commenterCompany?: string | null;
  content: string;
  postTitle: string;
  postUrl: string;
  spamScore: number;
  spamReasons?: string[];
  status: "PENDING" | "APPROVED" | "SPAM";
  ipAddress?: string | null;
  adminUrl: string;
  approveUrl?: string;
}

export default function CommentNotificationEmail({
  commenterName,
  commenterEmail,
  commenterCompany,
  content,
  postTitle,
  postUrl,
  spamScore,
  spamReasons = [],
  status,
  ipAddress,
  adminUrl,
  approveUrl,
}: CommentNotificationEmailProps) {
  const isPending = status === "PENDING";
  const isSpam = status === "SPAM";
  const badgeColor = isSpam ? "#EF4444" : isPending ? "#F59E0B" : "#10B981";
  const badgeBg = isSpam ? "#FEE2E2" : isPending ? "#FEF3C7" : "#D1FAE5";

  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Preview>{`New comment by ${commenterName} on "${postTitle}"`}</Preview>
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
          <Container style={{ maxWidth: 640, margin: "0 auto", padding: "32px 16px" }}>
            <Section
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Section
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
                  padding: "20px 28px",
                }}
              >
                <Text
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  💬 New Blog Comment
                </Text>
                <Text
                  style={{
                    margin: "4px 0 0",
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-0.3px",
                    lineHeight: 1.3,
                  }}
                >
                  on “{postTitle}”
                </Text>
              </Section>

              {/* Status pill */}
              <Section style={{ padding: "20px 28px 4px" }}>
                <table cellPadding={0} cellSpacing={0} role="presentation">
                  <tr>
                    <td
                      style={{
                        background: badgeBg,
                        border: `1px solid ${badgeColor}40`,
                        borderRadius: 999,
                        padding: "4px 12px",
                      }}
                    >
                      <Text
                        style={{
                          margin: 0,
                          fontSize: 10,
                          fontWeight: 800,
                          color: badgeColor,
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                        }}
                      >
                        {isSpam
                          ? `🚫 Auto-flagged as spam · ${spamScore}/100`
                          : isPending
                          ? `⏳ Awaiting your approval · risk ${spamScore}/100`
                          : `✅ Auto-approved (trusted)`}
                      </Text>
                    </td>
                  </tr>
                </table>
              </Section>

              {/* Commenter info */}
              <Section style={{ padding: "16px 28px 4px" }}>
                <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
                  <tbody>
                    <FieldRow label="From" value={commenterName} />
                    <FieldRow label="Email" value={commenterEmail} />
                    {commenterCompany && (
                      <FieldRow label="Company" value={commenterCompany} />
                    )}
                    {ipAddress && <FieldRow label="IP" value={ipAddress} />}
                  </tbody>
                </table>
              </Section>

              {/* Spam reasons (if any) */}
              {spamReasons.length > 0 && (
                <Section style={{ padding: "12px 28px 0" }}>
                  <Text
                    style={{
                      margin: "0 0 6px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: BRAND.muted,
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Detected signals
                  </Text>
                  <table cellPadding={0} cellSpacing={0} role="presentation">
                    <tr>
                      {spamReasons.slice(0, 6).map((r, i) => (
                        <td key={i} style={{ paddingRight: 6, paddingBottom: 6 }}>
                          <Text
                            style={{
                              margin: 0,
                              background: "#FEF3C7",
                              color: "#92400E",
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "3px 8px",
                              borderRadius: 6,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {r.replace(/_/g, " ")}
                          </Text>
                        </td>
                      ))}
                    </tr>
                  </table>
                </Section>
              )}

              {/* Comment body */}
              <Section style={{ padding: "20px 28px 4px" }}>
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
                  Comment
                </Text>
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                  width="100%"
                  style={{
                    background: BRAND.bg,
                    borderRadius: 10,
                    border: `1px solid ${BRAND.border}`,
                    borderLeft: `4px solid ${BRAND.primary}`,
                  }}
                >
                  <tr>
                    <td style={{ padding: "14px 16px" }}>
                      <Text
                        style={{
                          margin: 0,
                          fontSize: 14,
                          color: BRAND.text,
                          lineHeight: 1.65,
                          whiteSpace: "pre-wrap" as any,
                        }}
                      >
                        {content}
                      </Text>
                    </td>
                  </tr>
                </table>
              </Section>

              {/* Actions */}
              <Section
                style={{
                  padding: "20px 28px",
                  borderTop: `1px solid ${BRAND.border}`,
                  background: BRAND.bg,
                  textAlign: "center",
                }}
              >
                <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
                  <tr>
                    <td style={{ paddingRight: 10 }}>
                      <Link
                        href={adminUrl}
                        style={{
                          display: "inline-block",
                          padding: "10px 18px",
                          background: BRAND.primary,
                          color: "#FFFFFF",
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        Review in Admin →
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={postUrl}
                        style={{
                          display: "inline-block",
                          padding: "10px 18px",
                          background: "#FFFFFF",
                          color: BRAND.primary,
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: "none",
                          border: `1.5px solid ${BRAND.primary}`,
                        }}
                      >
                        View post
                      </Link>
                    </td>
                  </tr>
                </table>
              </Section>
            </Section>

            <Text
              style={{
                marginTop: 18,
                fontSize: 11,
                color: BRAND.muted,
                textAlign: "center",
              }}
            >
              You&apos;re receiving this because you&apos;re the moderator for staffschedule.io.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td
        style={{
          padding: "6px 14px 6px 0",
          color: BRAND.muted,
          fontSize: 12,
          fontWeight: 700,
          width: 90,
          verticalAlign: "top",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "6px 0",
          color: BRAND.text,
          fontSize: 13,
          fontWeight: 600,
          wordBreak: "break-word" as any,
        }}
      >
        {value}
      </td>
    </tr>
  );
}
