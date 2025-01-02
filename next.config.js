/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable proper host handling for Replit
  webpack: (config, { isServer }) => {
    return config;
  },
  // Allow all hostnames in development
  images: {
    domains: ['*'],
  },
  // Ensure the application is accessible
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      },
    ]
  }
}

module.exports = nextConfig