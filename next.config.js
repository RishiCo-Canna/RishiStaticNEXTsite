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
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.repl.co https://*.repl.dev; default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https: wss:;"
          }
        ]
      }
    ]
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID
  }
}

module.exports = nextConfig