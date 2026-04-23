import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import PremiumFooter from "@/components/PremiumFooter";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://staffschedule.io"),
  title: {
    default: "StaffSchedule.io | #1 Staff Scheduling Software for Teams",
    template: "%s | StaffSchedule.io",
  },
  description:
    "The all-in-one workforce management platform. Build perfect shift schedules, cut labor costs by 18%, and keep your entire team in sync.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  ...(process.env.SITE_PRIVATE_MODE === 'true' && {
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }),
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
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Theme colour for mobile browsers */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-brand-primary/20" suppressHydrationWarning>
        {!isAdmin && <Navbar />}
        <main className="flex-1" role="main">
          {children}
        </main>
        {!isAdmin && <PremiumFooter />}
      </body>
    </html>
  );
}
