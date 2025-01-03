/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || 
      (process.env.REPL_SLUG && process.env.REPL_OWNER) 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : 'http://localhost:3000',
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
    // Only process files during client-side builds
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