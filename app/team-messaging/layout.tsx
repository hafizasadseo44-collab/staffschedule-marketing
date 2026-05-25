import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Team Messaging App | StaffSchedule.io — Workplace Chat for Shift Teams",
  description: "StaffSchedule.io team messaging keeps your entire workforce connected. Group chats, direct messages, and shift updates that live alongside your schedule — no personal phone numbers needed. Free 14-day trial.",
  keywords: [
    "team messaging app",
    "workplace messaging",
    "employee communication app",
    "team chat software",
    "shift messaging app",
    "group messaging for teams",
    "work chat app",
    "staff communication tool",
    "employee messaging platform",
    "internal team messaging",
    "shift-based team communication",
    "business messaging app",
  ],
  alternates: { canonical: `${BASE_URL}/team-messaging` },
  openGraph: {
    title: "Team Messaging App | StaffSchedule.io",
    description: "Workplace messaging built for shift-based teams. Group chats, direct messages, shift updates — all in one place alongside your schedule.",
    url: `${BASE_URL}/team-messaging`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "StaffSchedule.io Team Messaging App" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Messaging App | StaffSchedule.io",
    description: "No more lost group texts. Workplace messaging built for shift teams. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Team Messaging",
      url: `${BASE_URL}/team-messaging`,
      description: "Team messaging app for shift-based businesses. Group chats, direct messages, broadcast announcements, file sharing, and read receipts — all integrated with your employee schedule.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Group and direct messaging",
        "Broadcast announcements",
        "Shift update notifications",
        "File and media sharing",
        "Message read receipts",
        "Manager message controls",
        "Privacy protection — no personal numbers",
        "Full message history and audit trail",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a team messaging app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A team messaging app is a dedicated communication platform that lets employees send direct messages, participate in group chats, and receive shift-related announcements — all without using personal phone numbers or consumer chat apps. For shift-based businesses, team messaging apps integrate directly with scheduling software so updates about shifts, coverage, and changes reach everyone instantly.",
          },
        },
        {
          "@type": "Question",
          name: "How does team messaging help reduce employee no-shows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Team messaging reduces no-shows by ensuring every shift update, reminder, and schedule change reaches employees instantly through push notifications. With read receipts, managers know exactly who has seen critical messages. Teams using dedicated messaging apps see up to 3x fewer no-shows compared to those relying on personal group texts.",
          },
        },
        {
          "@type": "Question",
          name: "How does team messaging protect employee privacy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Team messaging software protects privacy by keeping all work communication inside a dedicated platform — so employees never need to share personal phone numbers with managers or coworkers. Messages are sent through the app, keeping personal and professional lives separate.",
          },
        },
        {
          "@type": "Question",
          name: "Can managers control or monitor team messages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Managers can configure who can message whom, create read-only announcement channels, pin critical messages, and review message history for compliance purposes. Broadcast announcements let managers reach the entire team — or a specific department — with one message and see read receipts in real time.",
          },
        },
        {
          "@type": "Question",
          name: "Does team messaging work on mobile phones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Fully. StaffSchedule.io team messaging is mobile-first. Employees get push notifications on iOS and Android, can send messages and share files, and access their schedule — all from the same app. No separate apps, no context switching.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between team messaging and a regular group text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Group texts have no structure, no oversight, and no privacy protection. Team messaging gives you organized channels by team or location, read receipts, message controls, audit trails, and file sharing — all with zero personal numbers exposed. It is built for work, not personal life.",
          },
        },
        {
          "@type": "Question",
          name: "Can I try the team messaging app for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io offers a free 14-day trial with full access to team messaging, employee scheduling, time tracking, and all other features. No credit card required. You can set up your team and send your first group message within minutes of signing up.",
          },
        },
      ],
    },
  ],
};

export default function TeamMessagingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
