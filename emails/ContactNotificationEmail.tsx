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

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  industry?: string | null;
  teamSize?: string | null;
  schedulingMethod?: string | null;
  category?: string | null;
  message: string;
  formType: "demo" | "sales" | "support" | "general";
  features?: string[];
  sourcePage?: string | null;
  submittedAt: string;
  adminUrl?: string;
}

const TYPE_META = {
  demo: { label: "Demo Request", emoji: "📅", color: "#6D5DF6" },
  sales: { label: "Sales Inquiry", emoji: "💼", color: "#10B981" },
  support: { label: "Support Ticket", emoji: "🛟", color: "#F59E0B" },
  general: { label: "Contact Form", emoji: "💬", color: "#6D5DF6" },
};

export default function ContactNotificationEmail({
  name,
  email,
  phone,
  company,
  jobTitle,
  industry,
  teamSize,
  schedulingMethod,
  category,
  message,
  formType,
  features,
  sourcePage,
  submittedAt,
  adminUrl,
}: ContactNotificationEmailProps) {
  const meta = TYPE_META[formType];

  const fields: { label: string; value: string | null | undefined }[] = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Company", value: company },
    { label: "Job Title", value: jobTitle },
    { label: "Industry", value: industry },
    { label: "Team Size", value: teamSize },
    { label: "Current Method", value: schedulingMethod },
    { label: "Issue Category", value: category },
    { label: "Source", value: sourcePage },
    { label: "Submitted", value: submittedAt },
  ].filter((f) => f.value);

  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Preview>{`[${meta.label}] ${name} from ${company || email}`}</Preview>
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
              {/* Header bar */}
              <Section
                style={{
                  background: `linear-gradient(135deg, ${meta.color} 0%, ${BRAND.accent} 100%)`,
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
                  {meta.emoji} New {meta.label}
                </Text>
                <Text
                  style={{
                    margin: "4px 0 0",
                    color: "#FFFFFF",
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: "-0.4px",
                  }}
                >
                  {name}{company ? ` · ${company}` : ""}
                </Text>
              </Section>

              {/* Message */}
              <Section style={{ padding: "24px 28px 8px" }}>
                <Text
                  style={{
                    margin: "0 0 8px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: meta.color,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                  }}
                >
                  Message
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
                        {message}
                      </Text>
                    </td>
                  </tr>
                </table>
              </Section>

              {/* Features (demo only) */}
              {features && features.length > 0 && (
                <Section style={{ padding: "20px 28px 0" }}>
                  <Text
                    style={{
                      margin: "0 0 8px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: meta.color,
                      textTransform: "uppercase",
                      letterSpacing: "1.2px",
                    }}
                  >
                    Interested in
                  </Text>
                  <Text style={{ margin: 0, fontSize: 14, color: BRAND.text }}>
                    {features.join(" · ")}
                  </Text>
                </Section>
              )}

              {/* Field table */}
              <Section style={{ padding: "20px 28px 24px" }}>
                <Text
                  style={{
                    margin: "0 0 10px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: meta.color,
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                  }}
                >
                  Details
                </Text>
                <table cellPadding={0} cellSpacing={0} role="presentation" width="100%">
                  <tbody>
                    {fields.map((f, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            padding: "8px 12px 8px 0",
                            borderBottom:
                              i < fields.length - 1 ? `1px solid ${BRAND.border}` : "none",
                            color: BRAND.muted,
                            fontSize: 12,
                            fontWeight: 700,
                            width: 130,
                            verticalAlign: "top",
                          }}
                        >
                          {f.label}
                        </td>
                        <td
                          style={{
                            padding: "8px 0",
                            borderBottom:
                              i < fields.length - 1 ? `1px solid ${BRAND.border}` : "none",
                            color: BRAND.text,
                            fontSize: 13,
                            fontWeight: 600,
                            wordBreak: "break-word" as any,
                          }}
                        >
                          {f.label === "Email" ? (
                            <Link
                              href={`mailto:${f.value}`}
                              style={{ color: meta.color, textDecoration: "none" }}
                            >
                              {f.value}
                            </Link>
                          ) : (
                            f.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>

              {/* Quick actions */}
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
                        href={`mailto:${email}`}
                        style={{
                          display: "inline-block",
                          padding: "10px 18px",
                          background: meta.color,
                          color: "#FFFFFF",
                          borderRadius: 10,
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        Reply to {name.split(" ")[0]}
                      </Link>
                    </td>
                    {adminUrl && (
                      <td>
                        <Link
                          href={adminUrl}
                          style={{
                            display: "inline-block",
                            padding: "10px 18px",
                            background: "#FFFFFF",
                            color: meta.color,
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 700,
                            textDecoration: "none",
                            border: `1.5px solid ${meta.color}`,
                          }}
                        >
                          Open Admin →
                        </Link>
                      </td>
                    )}
                  </tr>
                </table>
              </Section>
            </Section>

            <Text
              style={{
                marginTop: 20,
                fontSize: 11,
                color: BRAND.muted,
                textAlign: "center",
              }}
            >
              StaffSchedule.io Contact Notification · Sent from the website contact form
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
