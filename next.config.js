/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
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
              "frame-ancestors 'self' http://localhost:* https://*.repl.co https://*.repl.dev https://*.replit.dev;",
              "default-src 'self' https://api.github.com https://github.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "connect-src 'self' https://api.github.com http://localhost:* https://*.repl.co https://*.repl.dev https://github.com;",
              "form-action 'self' https://github.com http://localhost:* https://*.repl.co https://*.repl.dev;",
              "frame-src 'self' http://localhost:* https://*.repl.co https://*.repl.dev https://*.replit.dev;"
            ].join(' ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
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