/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.REPL_SLUG && process.env.REPL_OWNER
      ? `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: 'RishiCo-Canna/RishiStaticNEXTsite',
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXTAUTH_URL: process.env.REPL_SLUG && process.env.REPL_OWNER
      ? `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*', // Serve static files from public/admin
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://*.github.com https://*.githubusercontent.com https://*.repl.co https://*.unpkg.com https://unpkg.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.unpkg.com https://unpkg.com https://identity.netlify.com",
              "style-src 'self' 'unsafe-inline' https://*.unpkg.com https://unpkg.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https: wss:",
              "form-action 'self' https://github.com",
              "frame-ancestors 'none'",
              "base-uri 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;