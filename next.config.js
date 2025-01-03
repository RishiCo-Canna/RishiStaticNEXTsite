/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
      {
        source: '/admin/',
        destination: '/admin/index.html',
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      config.module.rules.push({
        test: /\.(yml|yaml)$/,
        use: [
          'yaml-loader',
          {
            loader: 'string-replace-loader',
            options: {
              search: /\$\{([^}]+)\}/g,
              replace: (match, p1) => {
                const envVar = process.env[p1];
                if (!envVar) {
                  console.warn(`Warning: Environment variable ${p1} not found`);
                }
                return envVar || '';
              },
              flags: 'g'
            }
          }
        ]
      });
    }
    return config;
  }
};

module.exports = nextConfig;