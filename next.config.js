/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
    NEXTAUTH_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME || 'RishiCo-Canna/RishiStaticNEXTsite',
    NEXT_PUBLIC_CALLBACK_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev/api/auth/callback/github',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.unpkg.com https://unpkg.com https://*.replit.dev https://github.com",
              "style-src 'self' 'unsafe-inline' https://*.unpkg.com https://unpkg.com https://*.replit.dev",
              "img-src 'self' data: blob: https://*.githubusercontent.com https://*.github.com https://*.replit.dev",
              "media-src 'self' https:",
              "connect-src 'self' https: wss: https://*.replit.dev https://api.github.com https://github.com",
              "font-src 'self' data: https://*.replit.dev",
              "frame-src 'self' https://*.replit.dev https://github.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self' https://*.replit.dev https://github.com",
              "base-uri 'self'",
              "frame-ancestors 'self'"
            ].join('; ')
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;