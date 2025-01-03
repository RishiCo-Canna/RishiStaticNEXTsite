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
  env: {
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: `https://${process.env.REPL_SLUG}.worf.replit.dev`
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "frame-ancestors 'self';",
              "default-src 'self' https://api.github.com https://github.com https://unpkg.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "connect-src 'self' https://api.github.com https://*.repl.co https://*.repl.dev https://*.worf.replit.dev https://github.com;",
              "form-action 'self' https://github.com;"
            ].join(' ')
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin'
      }
    ]
  }
}

module.exports = nextConfig