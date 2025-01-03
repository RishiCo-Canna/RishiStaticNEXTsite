/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Expose environment variables to the browser
    NEXT_PUBLIC_GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
    NEXT_PUBLIC_OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:3000',
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  // Add proper CORS headers for CMS API calls
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
    ]
  },
  // Process HTML files to inject environment variables
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      config.module.rules.push({
        test: /\.html$/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { 
                  search: '{{NEXT_PUBLIC_GITHUB_REPO_FULL_NAME}}', 
                  replace: process.env.GITHUB_REPO_FULL_NAME || '' 
                },
                { 
                  search: '{{NEXT_PUBLIC_OAUTH_CLIENT_ID}}', 
                  replace: process.env.OAUTH_CLIENT_ID || '' 
                },
                {
                  search: '{{NEXT_PUBLIC_SITE_URL}}',
                  replace: process.env.SITE_URL || process.env.REPL_SLUG 
                    ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
                    : 'http://localhost:3000'
                }
              ]
            }
          }
        ]
      });
    }
    return config;
  }
}

module.exports = nextConfig