/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.REPL_SLUG 
      ? `https://${process.env.REPL_ID}-${process.env.REPL_OWNER}.repl.dev`
      : 'http://localhost:3000',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME || 'RishiCo-Canna/RishiStaticNEXTsite',
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXTAUTH_URL: process.env.REPL_SLUG
      ? `https://${process.env.REPL_ID}-${process.env.REPL_OWNER}.repl.dev`
      : 'http://localhost:3000',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://*.repl.co https://*.replit.dev",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.unpkg.com https://unpkg.com https://*.repl.co https://*.replit.dev",
              "style-src 'self' 'unsafe-inline' https://*.unpkg.com https://unpkg.com https://*.repl.co https://*.replit.dev",
              "img-src 'self' data: blob: https: *",
              "media-src 'self' https:",
              "connect-src 'self' https: wss: https://*.repl.co https://*.replit.dev",
              "font-src 'self' data: https://*.repl.co https://*.replit.dev",
              "frame-src 'self' https://*.repl.co https://*.replit.dev",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self' https://*.repl.co https://*.replit.dev",
              "base-uri 'self'",
              "frame-ancestors 'self'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ];
  },
  webpack: (config, { isServer }) => {
    // Enable webpack performance hints
    config.performance = {
      hints: 'warning'
    };
    return config;
  }
};

module.exports = nextConfig;