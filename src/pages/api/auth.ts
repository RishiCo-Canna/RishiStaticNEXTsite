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
  // Validate environment variables
  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'Missing OAuth credentials. Please check environment variables.'
    });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      details: 'Only POST requests are accepted'
    });
  }

  try {
    let code: string;
    try {
      const body = JSON.parse(req.body);
      code = body.code;
    } catch (e) {
      return res.status(400).json({ 
        error: 'Invalid request body',
        details: 'Request body must be valid JSON with a code parameter'
      });
    }

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
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error('GitHub token exchange failed:', tokenResponse.statusText);
      return res.status(tokenResponse.status).json({
        error: 'Token exchange failed',
        details: `GitHub responded with ${tokenResponse.status}: ${tokenResponse.statusText}`
      });
    }

    const tokenData: GitHubTokenResponse | GitHubErrorResponse = await tokenResponse.json();

    if ('error' in tokenData) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ 
        error: 'GitHub authentication failed',
        details: tokenData.error_description || tokenData.error
      });
    }

    // Validate the token by making a test API call
    console.log('Validating token...');
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error('Token validation failed:', userResponse.statusText);
      return res.status(401).json({ 
        error: 'Invalid token',
        details: 'The token received from GitHub is invalid'
      });
    }

    // Return the access token in the format expected by Decap CMS
    console.log('Authentication successful');
    return res.json({
      token: tokenData.access_token,
      provider: 'github',
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}