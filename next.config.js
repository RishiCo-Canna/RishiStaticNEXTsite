/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    return config;
  },
  // Allow all hostnames in development
  images: {
    domains: ['*'],
  },
  // Ensure proper hostname handling
  webSocketServerOptions: {
    hostname: '0.0.0.0',
  }
}

module.exports = nextConfig