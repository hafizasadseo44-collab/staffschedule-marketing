import * as React from "react";
import PersonalLayout, {
  PersonalLink,
  Signoff,
  P,
} from "./components/PersonalLayout";

interface PersonalBlogPostEmailProps {
  postTitle: string;
  postExcerpt: string;
  postUrl: string;
  category?: string | null;
  authorName?: string | null;
  readingTime?: number | null;
  type?: "blog" | "news" | "guide";
  recipientFirstName?: string | null;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

/**
 * Plain-text-style blog post notification.
 *
 * Looks like a colleague forwarding you an article — single hook line,
 * brief excerpt, one inline link, sign-off. No hero image, no big CTA
 * button. Optimized to land in Gmail's Primary inbox.
 */
export default function PersonalBlogPostEmail({
  postTitle,
  postExcerpt,
  postUrl,
  authorName,
  readingTime,
  type = "blog",
  recipientFirstName,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: PersonalBlogPostEmailProps) {
  const greeting = recipientFirstName ? `Hi ${recipientFirstName},` : "Hi there,";

  const lead =
    type === "guide"
      ? "Just published a new guide that I think you'll find useful:"
      : type === "news"
      ? "Quick update on something happening at StaffSchedule.io:"
      : "Wanted to share something new we published on the blog:";

  const readingMeta =
    readingTime && readingTime > 0
      ? ` (${readingTime} min read${authorName ? `, by ${authorName}` : ""})`
      : authorName
      ? ` (by ${authorName})`
      : "";

  return (
    <PersonalLayout
      preview={postExcerpt.slice(0, 140)}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      <P>{greeting}</P>
      <P>{lead}</P>

      <P>
        <strong>
          <PersonalLink href={postUrl}>{postTitle}</PersonalLink>
        </strong>
        {readingMeta}
      </P>

      {postExcerpt && (
        <P>
          {/* Truncate to a reasonable preview */}
          {postExcerpt.length > 320
            ? postExcerpt.slice(0, 320).trim() + "…"
            : postExcerpt}
        </P>
      )}

      <P>
        <PersonalLink href={postUrl}>Read the full article →</PersonalLink>
      </P>

      <P>If it&apos;s not for you, just delete this email — no worries.</P>

      <Signoff />
    </PersonalLayout>
  );
}
