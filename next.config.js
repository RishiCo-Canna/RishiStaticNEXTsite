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
            value: "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob:; style-src * 'unsafe-inline';"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;