import * as React from "react";
import PersonalLayout, {
  PersonalLink,
  Signoff,
  P,
} from "./components/PersonalLayout";

export interface PersonalDigestArticle {
  title: string;
  url: string;
  excerpt?: string;
  readingTime?: number | null;
}

interface PersonalDigestEmailProps {
  weekRange: string;
  featuredArticle?: PersonalDigestArticle;
  articles: PersonalDigestArticle[];
  guides?: { title: string; url: string }[];
  recipientFirstName?: string | null;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

/**
 * Plain-text-style weekly digest — looks like a friend curating reading
 * recommendations, not a marketing blast. The featured article gets a short
 * intro; the rest are tight bullet links. No images, no banners.
 */
export default function PersonalDigestEmail({
  weekRange,
  featuredArticle,
  articles = [],
  guides = [],
  recipientFirstName,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: PersonalDigestEmailProps) {
  const greeting = recipientFirstName ? `Hi ${recipientFirstName},` : "Hi there,";
  const allArticles = featuredArticle ? [featuredArticle, ...articles] : articles;

  return (
    <PersonalLayout
      preview={`This week's workforce reads · ${weekRange}`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      <P>{greeting}</P>

      <P>
        Here&apos;s what caught my attention from the StaffSchedule.io team this
        week ({weekRange}):
      </P>

      {featuredArticle && (
        <>
          <P>
            <strong>
              <PersonalLink href={featuredArticle.url}>
                {featuredArticle.title}
              </PersonalLink>
            </strong>
            {featuredArticle.readingTime
              ? ` (${featuredArticle.readingTime} min read)`
              : ""}
          </P>
          {featuredArticle.excerpt && (
            <P>
              {featuredArticle.excerpt.length > 280
                ? featuredArticle.excerpt.slice(0, 280).trim() + "…"
                : featuredArticle.excerpt}
            </P>
          )}
        </>
      )}

      {articles.length > 0 && (
        <>
          <P>A few more worth your time:</P>
          {articles.map((a, i) => (
            <P key={i}>
              ·{" "}
              <PersonalLink href={a.url}>{a.title}</PersonalLink>
              {a.readingTime ? ` — ${a.readingTime} min` : ""}
            </P>
          ))}
        </>
      )}

      {guides.length > 0 && (
        <>
          <P>And from the resource library:</P>
          {guides.map((g, i) => (
            <P key={i}>
              ·{" "}
              <PersonalLink href={g.url}>{g.title}</PersonalLink>
            </P>
          ))}
        </>
      )}

      <div style={{ height: 6 }} />

      <P>
        If anything sparks a question, just hit reply — I read every response.
      </P>

      <Signoff />
    </PersonalLayout>
  );
}
