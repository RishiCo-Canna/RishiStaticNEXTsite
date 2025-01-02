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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/admin',
          destination: '/admin/index.html',
        },
      ],
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
              "frame-ancestors 'self' https://*.repl.co https://*.repl.dev https://*.worf.replit.dev;",
              "default-src 'self' https://api.github.com https://github.com;",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://unpkg.com;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "connect-src 'self' https://api.github.com https://*.repl.co https://*.repl.dev https://*.worf.replit.dev https://github.com;",
              "form-action 'self' https://github.com https://*.repl.co https://*.repl.dev https://*.worf.replit.dev;"
            ].join(' ')
          }
        ]
      }
    ]
  },
  env: {
    NEXTAUTH_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev'
  },
  serverRuntimeConfig: {
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  }
}

module.exports = nextConfig