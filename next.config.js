/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://github.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.netlify.com https://*.unpkg.com https://unpkg.com https://*.replit.dev https://github.com",
              "style-src 'self' 'unsafe-inline' https://*.netlify.com https://*.unpkg.com https://unpkg.com https://*.replit.dev",
              "img-src 'self' data: blob: https://*.githubusercontent.com https://*.github.com https://*.replit.dev",
              "media-src 'self' https:",
              "connect-src 'self' https: wss: https://*.replit.dev https://api.github.com https://github.com",
              "font-src 'self' data: https://*.replit.dev",
              "frame-src 'self' https://*.replit.dev https://github.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self' https://*.replit.dev https://github.com",
              "base-uri 'self'",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;