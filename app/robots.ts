import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Block all crawling when site is in private/staging mode.
  // Set SITE_PRIVATE_MODE=false in .env to enable indexing on launch.
  const isPrivate = process.env.SITE_PRIVATE_MODE !== "false";

  if (isPrivate) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: "https://staffschedule.io/sitemap.xml",
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
      },
    ],
    sitemap: "https://staffschedule.io/sitemap.xml",
  };
}
