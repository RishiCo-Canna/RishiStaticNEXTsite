/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
    NEXTAUTH_URL: process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME || 'RishiCo-Canna/RishiStaticNEXTsite',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.unpkg.com https://unpkg.com https://*.replit.dev https://api.github.com",
              "style-src 'self' 'unsafe-inline' https://*.unpkg.com https://unpkg.com https://*.replit.dev",
              "img-src 'self' data: blob: https: *",
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