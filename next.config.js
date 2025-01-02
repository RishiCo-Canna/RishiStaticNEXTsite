/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./public/**/*']
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors 'self' https://*.repl.co https://*.repl.dev;",
              "default-src 'self' https://api.github.com https://github.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://unpkg.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "connect-src 'self' https://api.github.com https://*.repl.co https://*.repl.dev https://github.com;",
              "form-action 'self' https://github.com https://*.repl.co https://*.repl.dev;"
            ].join(' ')
          }
        ]
      }
    ]
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXTAUTH_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
  }
}

module.exports = nextConfig