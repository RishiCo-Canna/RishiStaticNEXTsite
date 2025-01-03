
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https: 'unsafe-inline' 'unsafe-eval' data: blob:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' https: data: blob:",
              "font-src 'self' https: data:",
              "connect-src 'self' https: wss:",
              "media-src 'self' https: data:",
              "worker-src 'self' blob:",
              "frame-src 'self' https:",
              "child-src 'self' blob:"
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
