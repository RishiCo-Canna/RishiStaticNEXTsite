import { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing OAuth credentials' });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = JSON.parse(req.body);

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    // Exchange code for access token with GitHub
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

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    // Get user data to validate the token
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Return the access token in the format expected by Decap CMS
    return res.json({
      token: tokenData.access_token,
      provider: 'github',
    });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}