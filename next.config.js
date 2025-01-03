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
              "frame-ancestors 'self' https://*.repl.co https://*.repl.dev https://*.replit.dev;",
              "default-src 'self' https://api.github.com https://github.com https://unpkg.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;",
              "style-src 'self' 'unsafe-inline' https://unpkg.com;",
              "img-src 'self' data: https: blob:;",
              "connect-src 'self' https://api.github.com https://*.repl.co https://*.repl.dev https://github.com https://unpkg.com;",
              "form-action 'self' https://github.com https://*.repl.co https://*.repl.dev;",
              "frame-src 'self' https://*.repl.co https://*.repl.dev https://*.replit.dev;"
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