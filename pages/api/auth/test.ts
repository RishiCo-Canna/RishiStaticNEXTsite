import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Basic environment variable check
    const config = {
      clientId: process.env.OAUTH_CLIENT_ID ? "configured" : "missing",
      clientSecret: process.env.OAUTH_CLIENT_SECRET ? "configured" : "missing",
      nextAuthSecret: process.env.NEXTAUTH_SECRET ? "configured" : "missing",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    };

    res.status(200).json({
      status: 'success',
      message: 'Auth test endpoint responding',
      config: config,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Auth test endpoint error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}