import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import PremiumFooter from "@/components/PremiumFooter";
import CursorTrailProvider from "@/components/CursorTrailProvider";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://staffschedule.io"),
  title: {
    default: "StaffSchedule.io | #1 Staff Scheduling Software for Teams",
    template: "%s | StaffSchedule.io",
  },
  description: "The all-in-one workforce management platform. Build perfect shift schedules, cut labor costs by 18%, and keep your entire team in sync.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "StaffSchedule.io",
    title: "StaffSchedule.io | #1 Staff Scheduling Software for Teams",
    description: "The all-in-one workforce management platform. Build perfect shift schedules, cut labor costs by 18%, and keep your entire team in sync.",
    images: [{ url: "/staffschedule-dashboard.png", width: 1200, height: 630, alt: "StaffSchedule.io" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StaffSchedule.io | #1 Staff Scheduling Software for Teams",
    description: "Build perfect shift schedules, cut labor costs by 18%, and keep your entire team in sync.",
    images: ["/staffschedule-dashboard.png"],
  },
  keywords: ["staff scheduling", "employee scheduling", "workforce management", "shift planner", "labor cost optimization", "team communication"],
  // Controlled by SITE_PRIVATE_MODE env var.
  // Set SITE_PRIVATE_MODE=false to enable indexing on launch.
  robots: process.env.SITE_PRIVATE_MODE !== "false"
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4F46E5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={cn("h-full font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external image hosts */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload hero LCP image */}
        <link rel="preload" href="/staffschedule-dashboard.png" as="image" type="image/png" fetchPriority="high" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-brand-primary/20" suppressHydrationWarning>
        <CursorTrailProvider />
        {!isAdmin && <Navbar />}
        <main className="flex-1" role="main">
          {children}
        </main>
        {!isAdmin && <PremiumFooter />}
      </body>
    </html>
  );
}
