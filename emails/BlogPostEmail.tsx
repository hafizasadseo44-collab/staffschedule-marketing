import * as React from "react";
import { Img, Section, Text } from "@react-email/components";
import EmailLayout, { BRAND } from "./components/EmailLayout";
import Button from "./components/Button";

interface BlogPostEmailProps {
  postTitle: string;
  postExcerpt: string;
  postUrl: string;
  postImage?: string | null;
  category?: string | null;
  authorName?: string | null;
  authorAvatar?: string | null;
  readingTime?: number | null;
  type?: "blog" | "news" | "guide";
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export default function BlogPostEmail({
  postTitle,
  postExcerpt,
  postUrl,
  postImage,
  category,
  authorName,
  authorAvatar,
  readingTime,
  type = "blog",
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: BlogPostEmailProps) {
  const tagLabel =
    type === "guide" ? "New Guide" : type === "news" ? "News" : "New Article";
  const ctaLabel =
    type === "guide" ? "Read the Guide" : type === "news" ? "Read Story" : "Read Full Article";

  return (
    <EmailLayout
      preview={postExcerpt.slice(0, 140)}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      {postImage && (
        <Section style={{ padding: 0 }}>
          <Img
            src={postImage}
            alt={postTitle}
            width="640"
            style={{
              width: "100%",
              maxWidth: 640,
              height: "auto",
              display: "block",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </Section>
      )}

      <Section style={{ padding: "32px 32px 24px" }}>
        {/* Category badge */}
        <table cellPadding={0} cellSpacing={0} role="presentation">
          <tr>
            <td
              style={{
                background: `linear-gradient(135deg, ${BRAND.primary}15 0%, ${BRAND.accent}15 100%)`,
                border: `1px solid ${BRAND.primary}30`,
                borderRadius: 999,
                padding: "5px 14px",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 800,
                  color: BRAND.primary,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                }}
              >
                {category || tagLabel}
              </Text>
            </td>
          </tr>
        </table>

        <Text
          style={{
            margin: "18px 0 14px",
            fontSize: 28,
            fontWeight: 800,
            color: BRAND.text,
            letterSpacing: "-0.6px",
            lineHeight: 1.25,
          }}
        >
          {postTitle}
        </Text>

        <Text
          style={{
            margin: "0 0 24px",
            fontSize: 15,
            color: BRAND.muted,
            lineHeight: 1.7,
          }}
        >
          {postExcerpt}
        </Text>

        {(authorName || readingTime) && (
          <table cellPadding={0} cellSpacing={0} role="presentation" style={{ marginBottom: 28 }}>
            <tr>
              {authorAvatar && (
                <td style={{ verticalAlign: "middle", paddingRight: 10 }}>
                  <Img
                    src={authorAvatar}
                    alt={authorName || ""}
                    width="32"
                    height="32"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "block",
                    }}
                  />
                </td>
              )}
              {authorName && (
                <td style={{ verticalAlign: "middle", paddingRight: 12 }}>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: BRAND.text,
                    }}
                  >
                    {authorName}
                  </Text>
                </td>
              )}
              {readingTime ? (
                <>
                  <td
                    style={{
                      color: BRAND.border,
                      verticalAlign: "middle",
                      padding: "0 8px",
                    }}
                  >
                    ·
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <Text
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: BRAND.muted,
                      }}
                    >
                      {readingTime} min read
                    </Text>
                  </td>
                </>
              ) : null}
            </tr>
          </table>
        )}

        <Button href={postUrl} variant="primary">
          {ctaLabel} →
        </Button>
      </Section>

      <Section
        style={{
          padding: "20px 32px 28px",
          borderTop: `1px solid ${BRAND.border}`,
          background: BRAND.bg,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: 13,
            color: BRAND.muted,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          💡 Loving these updates?{" "}
          <a
            href={`${siteUrl}/pricing`}
            style={{ color: BRAND.primary, fontWeight: 700, textDecoration: "none" }}
          >
            Try StaffSchedule.io free for 14 days →
          </a>
        </Text>
      </Section>
    </EmailLayout>
  );
}
