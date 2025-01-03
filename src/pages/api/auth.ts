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
  console.log('Auth endpoint called with method:', req.method);
  console.log('Request body:', req.body);

  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Missing OAuth credentials'
    });
  }

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ 
      error: 'Method not allowed',
      details: 'Only POST requests are accepted'
    });
  }

  try {
    const { code } = JSON.parse(req.body);
    console.log('Received auth code:', code?.substring(0, 8) + '...');

    if (!code) {
      console.error('Missing authorization code');
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

    const tokenData: GitHubTokenResponse | GitHubErrorResponse = await tokenResponse.json();
    console.log('Token exchange response received');

    if ('error' in tokenData) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ 
        error: 'GitHub authentication failed',
        details: tokenData.error_description || tokenData.error
      });
    }

    console.log('Authentication successful, returning token');
    // Return the access token in the format expected by Decap CMS
    return res.json({
      token: tokenData.access_token,
      provider: 'github'
    });

  } catch (error: any) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}