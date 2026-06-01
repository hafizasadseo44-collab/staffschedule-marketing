import * as React from "react";
import { Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

interface CommentApprovedEmailProps {
  name: string;
  postTitle: string;
  postUrl: string;
  content: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export default function CommentApprovedEmail({
  name,
  postTitle,
  postUrl,
  content,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: CommentApprovedEmailProps) {
  const firstName = name?.trim().split(" ")[0] || "there";

  return (
    <EmailLayout
      preview={`Your comment on "${postTitle}" is now live`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {/* Hero */}
      <Section
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto 14px" }}>
          <tr>
            <td
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                padding: "5px 14px",
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
                💬 Comment Approved
              </Text>
            </td>
          </tr>
        </table>
        <Text
          style={{
            margin: "0 0 8px",
            color: "#FFFFFF",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.25,
          }}
        >
          Your comment is now live.
        </Text>
        <Text
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.85)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Thanks for adding to the discussion on StaffSchedule.io.
        </Text>
      </Section>

      <Section style={{ padding: "32px 32px 8px" }}>
        <Text
          style={{
            margin: "0 0 14px",
            fontSize: 16,
            fontWeight: 700,
            color: BRAND.text,
          }}
        >
          Hi {firstName},
        </Text>
        <Text
          style={{
            margin: "0 0 18px",
            fontSize: 15,
            color: BRAND.muted,
            lineHeight: 1.7,
          }}
        >
          Your comment on{" "}
          <a
            href={postUrl}
            style={{ color: BRAND.primary, fontWeight: 700, textDecoration: "none" }}
          >
            {postTitle}
          </a>{" "}
          was approved and is now visible to the community.
        </Text>

        <table
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          width="100%"
          style={{
            background: BRAND.bg,
            borderRadius: 12,
            border: `1px solid ${BRAND.border}`,
            borderLeft: `4px solid ${BRAND.primary}`,
            marginBottom: 24,
          }}
        >
          <tr>
            <td style={{ padding: "14px 18px" }}>
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

      <Section style={{ padding: "0 32px 36px", textAlign: "center" }}>
        <table cellPadding={0} cellSpacing={0} role="presentation" style={{ margin: "0 auto" }}>
          <tr>
            <td>
              <Button href={`${postUrl}#comments`} variant="primary">
                View the discussion →
              </Button>
            </td>
          </tr>
        </table>
      </Section>
    </EmailLayout>
  );
}
