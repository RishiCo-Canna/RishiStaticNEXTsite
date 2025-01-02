/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure proper host handling for Replit
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
  // Allow images from any domain in development
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Required for Replit - ensures proper port binding
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./public/**/*']
    }
  },
  // Expose environment variables to the browser
  env: {
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
  }
}

module.exports = nextConfig