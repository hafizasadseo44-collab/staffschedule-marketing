import * as React from "react";
import PersonalLayout, {
  PersonalLink,
  Signoff,
  P,
} from "./components/PersonalLayout";

interface PersonalCommentApprovedEmailProps {
  name: string;
  postTitle: string;
  postUrl: string;
  content: string;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

/**
 * Plain-text-style comment approval notification. Tells the commenter
 * their comment is live with a quick recap and a link back to the
 * discussion. Designed to land in Primary inbox.
 */
export default function PersonalCommentApprovedEmail({
  name,
  postTitle,
  postUrl,
  content,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: PersonalCommentApprovedEmailProps) {
  const firstName = name?.trim().split(" ")[0] || "there";

  return (
    <PersonalLayout
      preview={`Your comment on "${postTitle}" is now live`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
      primaryHint={false}
    >
      <P>Hi {firstName},</P>

      <P>
        Just letting you know — your comment on{" "}
        <PersonalLink href={postUrl}>{postTitle}</PersonalLink> is now approved
        and visible to the community. Thanks for adding your perspective.
      </P>

      <P>Here&apos;s what you posted:</P>

      <div
        style={{
          margin: "0 0 18px",
          padding: "12px 14px",
          background: "#F9FAFB",
          borderLeft: "3px solid #E5E7EB",
          borderRadius: 4,
          fontSize: 14,
          color: "#374151",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap" as any,
        }}
      >
        {content}
      </div>

      <P>
        Want to keep the discussion going?{" "}
        <PersonalLink href={`${postUrl}#comments`}>
          See the rest of the thread →
        </PersonalLink>
      </P>

      <Signoff />
    </PersonalLayout>
  );
}
