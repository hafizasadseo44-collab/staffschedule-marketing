import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface PersonalLayoutProps {
  preview: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  children: React.ReactNode;
  /** Show the "drag to Primary" line above the footer */
  primaryHint?: boolean;
}

/**
 * Shared layout for every "to-user" email.
 *
 * Why plain-text-styled HTML:
 * Gmail's tab classifier reads visual signals — gradient banners, multiple
 * columns, big colored CTAs and image-heavy layouts all trigger Promotions.
 * To consistently land in Primary, every customer-facing email uses this
 * single-column, mostly-text layout with inline text links (no buttons),
 * personal sign-off, and a minimal footer.
 *
 * Hard rules embedded here:
 * - No background color (white only)
 * - No box-shadow, no border-radius on the body container
 * - No images or logos in the header
 * - One column, 560px max width
 * - 15px body text, line-height 1.65
 * - Footer is small grey text, never colored or boxed
 *
 * If you find yourself wanting to add a gradient or hero banner, use the
 * old `EmailLayout` instead — but understand it will land in Promotions.
 */
export default function PersonalLayout({
  preview,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
  children,
  primaryHint = true,
}: PersonalLayoutProps) {
  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#FFFFFF",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
          color: "#1F2937",
          fontSize: 15,
          lineHeight: 1.65,
        }}
      >
        <Container
          style={{
            maxWidth: 560,
            margin: "0 auto",
            padding: "32px 20px",
          }}
        >
          {children}

          {primaryHint && (
            <Text
              style={{
                margin: "24px 0 0",
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 1.6,
              }}
            >
              P.S. If this landed in your Promotions tab, drag it to Primary so
              future updates don&apos;t get lost.
            </Text>
          )}

          <Text
            style={{
              margin: "28px 0 0",
              fontSize: 12,
              color: "#9CA3AF",
              borderTop: "1px solid #E5E7EB",
              paddingTop: 16,
              lineHeight: 1.6,
            }}
          >
            Sent by{" "}
            <Link
              href={siteUrl}
              style={{ color: "#9CA3AF", textDecoration: "underline" }}
            >
              StaffSchedule.io
            </Link>
            .{" "}
            <Link
              href={preferencesUrl}
              style={{ color: "#9CA3AF", textDecoration: "underline" }}
            >
              Manage preferences
            </Link>{" "}
            ·{" "}
            <Link
              href={unsubscribeUrl}
              style={{ color: "#9CA3AF", textDecoration: "underline" }}
            >
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** Inline text link styled like a personal email's link — no button chrome. */
export function PersonalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{ color: "#4F46E5", textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}

/** Personal sign-off block. Keep names + role short, no fancy styling. */
export function Signoff({
  name = "Hafiz",
  role = "Founder, StaffSchedule.io",
  closing = "Talk soon",
}: {
  name?: string;
  role?: string;
  closing?: string;
}) {
  return (
    <>
      <Text style={{ margin: "0 0 4px", fontSize: 15, color: "#1F2937" }}>
        {closing},
      </Text>
      <Text style={{ margin: 0, fontSize: 15, color: "#1F2937" }}>{name}</Text>
      <Text style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>{role}</Text>
    </>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 14px",
        fontSize: 15,
        color: "#1F2937",
        lineHeight: 1.65,
      }}
    >
      {children}
    </Text>
  );
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 6px",
        fontSize: 15,
        color: "#1F2937",
        lineHeight: 1.65,
      }}
    >
      · {children}
    </Text>
  );
}
