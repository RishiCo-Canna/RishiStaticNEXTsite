import { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Missing OAuth credentials'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      details: 'Only POST requests are accepted'
    });
  }

  try {
    const { code, state } = JSON.parse(req.body);
    const next = req.query.next || '/admin';

    if (!code) {
      return res.status(400).json({ 
        error: 'Missing code',
        details: 'Authorization code is required'
      });
    }

    // Exchange code for access token with GitHub
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
          state,
          redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth?next=${encodeURIComponent(next)}`
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

    const tokenData = await tokenResponse.json();

    if ('error' in tokenData) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ 
        error: 'GitHub authentication failed',
        details: tokenData.error_description || tokenData.error
      });
    }

    // Return the access token in the format expected by Decap CMS
    console.log('Authentication successful');
    res.setHeader('Set-Cookie', `gh_token=${tokenData.access_token}; Path=/; HttpOnly; SameSite=Lax`);

    return res.json({
      token: tokenData.access_token,
      provider: 'github',
      next: next
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}