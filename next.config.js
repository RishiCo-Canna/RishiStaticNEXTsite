/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.REPL_SLUG && process.env.REPL_OWNER
      ? `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: 'RishiCo-Canna/RishiStaticNEXTsite',
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.repl.co https://*.repl.dev https://*.replit.dev https://unpkg.com https://api.github.com https://github.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;",
              "style-src 'self' 'unsafe-inline' https://unpkg.com;",
              "img-src 'self' data: blob: https:;",
              "connect-src 'self' https://*.repl.co https://*.repl.dev https://*.replit.dev https://api.github.com https://github.com https://unpkg.com;",
              "frame-ancestors 'self' https://*.repl.co https://*.repl.dev https://*.replit.dev;"
            ].join(' ')
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      }
    ]
  }
}

module.exports = nextConfig