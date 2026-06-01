import * as React from "react";
import PersonalLayout, {
  PersonalLink,
  Signoff,
  P,
  ListItem,
} from "./components/PersonalLayout";

interface PersonalWelcomeEmailProps {
  name?: string | null;
  siteUrl: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export default function PersonalWelcomeEmail({
  name,
  siteUrl,
  unsubscribeUrl,
  preferencesUrl,
}: PersonalWelcomeEmailProps) {
  const firstName = name?.trim().split(" ")[0] || "there";

  return (
    <PersonalLayout
      preview={`Quick hello, ${firstName} — thanks for subscribing`}
      siteUrl={siteUrl}
      unsubscribeUrl={unsubscribeUrl}
      preferencesUrl={preferencesUrl}
    >
      <P>Hi {firstName},</P>

      <P>
        Thanks for subscribing to the StaffSchedule.io newsletter — really
        appreciate it.
      </P>

      <P>
        Quick heads up on what you can expect: roughly one email a week, usually
        Monday morning, with our best scheduling tips and the most useful
        workforce management articles we&apos;ve published. No fluff, and
        definitely no spam.
      </P>

      <P>A few things that might be useful to start with:</P>

      <ListItem>
        <PersonalLink href={`${siteUrl}/blog`}>
          Our latest articles on the blog
        </PersonalLink>
      </ListItem>
      <ListItem>
        <PersonalLink href={`${siteUrl}/resources`}>
          Free guides and templates
        </PersonalLink>
      </ListItem>
      <ListItem>
        <PersonalLink href={`${siteUrl}/pricing`}>
          Try StaffSchedule free for 14 days
        </PersonalLink>{" "}
        (no card needed)
      </ListItem>

      <div style={{ height: 14 }} />

      <P>
        If you ever have a question or just want to chat about workforce
        scheduling, just hit reply — your message will come straight to my
        inbox.
      </P>

      <Signoff />
    </PersonalLayout>
  );
}
