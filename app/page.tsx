import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { db } from "@/lib/db";
 
export const revalidate = 600; // revalidate every 10 minutes

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Core ─────────────────────────────────────────────────────
  title: {
    default: "StaffSchedule.io | #1 Staff Scheduling Software for Teams",
    template: "%s | StaffSchedule.io",
  },
  description:
    "StaffSchedule.io is the all-in-one workforce management platform. Build perfect shift schedules in minutes, cut labor costs by 18%, eliminate no-shows, and keep your entire team in sync — from any device.",

  keywords: [
    "staff scheduling software",
    "employee scheduling app",
    "workforce management",
    "shift scheduling tool",
    "online rota planner",
    "team scheduling platform",
    "restaurant staff scheduling",
    "retail workforce management",
    "labor cost management",
    "shift swap app",
    "employee time tracking",
    "free scheduling software",
  ],

  // ── Canonical ─────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ────────
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "StaffSchedule.io",
    title: "StaffSchedule.io — Staff Scheduling Made Simple",
    description:
      "The all-in-one workforce platform for modern businesses. Schedule faster, communicate better, and cut labor costs by 18%. Trusted by 10,000+ managers.",
    images: [
      {
        url: `${BASE_URL}/hero-mockup.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Staff Scheduling Dashboard on PC and Mobile",
      },
    ],
    locale: "en_US",
  },

  // ── Twitter / X Card ──────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@staffscheduleio",
    creator: "@staffscheduleio",
    title: "StaffSchedule.io — Staff Scheduling Made Simple",
    description:
      "Build perfect shift schedules in minutes. Eliminate no-shows, cut labor costs by 18%, and keep your whole team in sync.",
    images: [`${BASE_URL}/hero-mockup.png`],
  },

  // ── Robots ────────────────────────────────────────────────────
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ── App info ──────────────────────────────────────────────────
  applicationName: "StaffSchedule.io",
  authors: [{ name: "StaffSchedule.io Team", url: BASE_URL }],
  category: "Business Software",

  // ── Verification (add your codes once verified) ───────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  // },
};

// ── JSON-LD Structured Data ──────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io",
      url: BASE_URL,
      description:
        "All-in-one staff scheduling, workforce management, shift coordination, and team communication platform for modern businesses.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free 14-day trial, no credit card required.",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1038",
        bestRating: "5",
        worstRating: "1",
      },
      screenshot: `${BASE_URL}/hero-mockup.png`,
    },
    {
      "@type": "Organization",
      name: "StaffSchedule.io",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      sameAs: [
        "https://twitter.com/staffscheduleio",
        "https://linkedin.com/company/staffscheduleio",
      ],
    },
    {
      "@type": "WebSite",
      url: BASE_URL,
      name: "StaffSchedule.io",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is StaffSchedule.io free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! StaffSchedule.io offers a free 14-day full-access trial with no credit card required. Paid plans start after the trial.",
          },
        },
        {
          "@type": "Question",
          name: "How long does setup take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most teams are up and running within 10 minutes. Simply sign up, import your team roster, and publish your first schedule.",
          },
        },
        {
          "@type": "Question",
          name: "Does StaffSchedule.io have a mobile app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io is available on iOS and Android, allowing staff to view shifts, request swaps, and communicate on the go.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage multiple locations?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. StaffSchedule.io supports unlimited locations on business plans, with shared staff pools and per-location analytics.",
          },
        },
      ],
    },
  ],
};

export default async function Home() {
  let latestBlogs: any[] = [];
  
  try {
    const { ensureDatabase } = await import("@/lib/db-init");
    await ensureDatabase();

    const rawPosts = await db.$queryRaw`
      SELECT * FROM Post 
      WHERE published = 1 AND (type = 'ARTICLE' OR type = 'NEWS')
      ORDER BY createdAt DESC
      LIMIT 6
    ` as any[];


    latestBlogs = rawPosts.map(post => ({
      ...post,
      createdAt: typeof post.createdAt === 'string' ? post.createdAt : post.createdAt.toISOString(),
    }));
  } catch (e) {
    console.error('Failed to fetch latest blogs for home page:', e);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient latestBlogs={latestBlogs} />
    </>
  );
}
