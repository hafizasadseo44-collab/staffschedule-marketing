/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: 'standalone'` was removed. Hostinger's managed Next.js
  // deployment runs the app itself (via next start), and standalone mode does
  // NOT serve /public images or .next/static client JS unless those folders
  // are manually copied next to the standalone server — which Hostinger's
  // pipeline doesn't do. That caused images to 404 and client animations to
  // never hydrate. A normal build serves all static assets correctly.

  // Treat Prisma as an external (non-bundled) package so its query-engine
  // binary is loaded from node_modules at runtime instead of being bundled
  // by webpack (which can drop the native engine and cause 500s on the server).
  serverExternalPackages: ['@prisma/client', 'prisma', 'bcryptjs'],

  // ── Production Performance ────────────────────────────────────
  compress: true,            // Enable gzip/br compression on responses
  poweredByHeader: false,    // Remove X-Powered-By header (security + minor perf)

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // ── Image Optimization ────────────────────────────────────────
  // unoptimized: true bypasses the /_next/image?url=... endpoint and serves
  // images directly from /public (or remote URLs) via plain <img>. The
  // built-in optimizer was returning 0-byte responses in this environment —
  // every <Image> rendered as a broken thumbnail with only the alt text
  // visible. With unoptimized: true, images render correctly everywhere
  // (dev + Hostinger prod) at the cost of skipping AVIF/WebP transcoding.
  // Source files in /public are already reasonably sized, so the trade-off
  // is correct rendering for slightly larger downloads.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  // ── HTTP Headers ─────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Long-term cache for Next.js static assets
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public assets (images, fonts, etc.)
        source: '/(.*)\\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
