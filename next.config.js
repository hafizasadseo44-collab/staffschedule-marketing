/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // ── Production Performance ────────────────────────────────────
  compress: true,            // Enable gzip/br compression on responses
  poweredByHeader: false,    // Remove X-Powered-By header (security + minor perf)

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // ── Image Optimization ────────────────────────────────────────
  images: {
    unoptimized: true, // Bypass Vercel Image Optimization limits/errors
    formats: ['image/avif', 'image/webp'], // Serve modern formats
    minimumCacheTTL: 3600,                 // Cache images 1hr at CDN layer
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
