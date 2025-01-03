
import { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

interface GitHubErrorResponse {
  error: string;
  error_description?: string;
}

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (req.method === 'POST') {
    try {
      const { code } = JSON.parse(req.body);

      if (!code) {
        return res.status(400).json({ error: 'Missing code' });
      }

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
        return res.status(tokenResponse.status).json({
          error: 'Token exchange failed',
        });
      }

      const data = await tokenResponse.json();

      if (data.error) {
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
  } else if (req.method === 'GET') {
    // Handle the initial auth request
    res.redirect(307, `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
