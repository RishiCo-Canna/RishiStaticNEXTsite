import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for required credentials
  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Handle POST request from Decap CMS
  if (req.method === 'POST') {
    try {
      const { code } = JSON.parse(req.body);

      if (!code) {
        return res.status(400).json({ error: 'Missing code' });
      }

      console.log('Exchanging code for token...');
      const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
          }),
        }
      );

      if (!tokenResponse.ok) {
        console.error('GitHub token exchange failed:', tokenResponse.statusText);
        return res.status(tokenResponse.status).json({
          error: 'Token exchange failed',
          details: `GitHub responded with ${tokenResponse.status}`
        });
      }

      const data = await tokenResponse.json();

      if (data.error) {
        console.error('GitHub OAuth error:', data.error);
        return res.status(400).json({ error: data.error });
      }

      return res.json({
        token: data.access_token,
        provider: 'github',
      });
    } catch (error: any) {
      console.error('Auth error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Return 405 for other methods
  return res.status(405).json({ error: 'Method not allowed' });
}