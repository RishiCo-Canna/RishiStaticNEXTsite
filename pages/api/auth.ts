import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';

// Generate a secure random state
const generateState = () => {
  return randomBytes(32).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing OAuth credentials');
    return res.status(500).json({ error: 'Missing OAuth credentials' });
  }

  // Only handle GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Auth endpoint called with URL:', req.url);
    const params = new URLSearchParams(req.url?.split('?')[1] || '');

    // If no code, initiate OAuth flow
    if (!params.get('code')) {
      // Generate and store state
      const state = generateState();
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&state=${state}`;

      // Set state cookie with same-site attribute
      res.setHeader('Set-Cookie', `github_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Secure`);

      console.log('Redirecting to GitHub OAuth:', authUrl);
      res.redirect(302, authUrl);
      return;
    }

    // Verify state parameter
    const stateCookie = req.cookies['github_oauth_state'];
    const stateParam = params.get('state');

    if (!stateCookie || !stateParam || stateCookie !== stateParam) {
      console.error('State verification failed:', {
        hasCookie: !!stateCookie,
        hasParam: !!stateParam,
        matches: stateCookie === stateParam
      });
      res.redirect(302, `/admin/#error=invalid-state`);
      return;
    }

    // Clear state cookie
    res.setHeader('Set-Cookie', 'github_oauth_state=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

    // Exchange code for token
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
          code: params.get('code'),
          state: stateParam
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log('Token exchange response:', { 
      hasError: !!tokenData.error, 
      hasToken: !!tokenData.access_token,
      scope: tokenData.scope 
    });

    if (tokenData.error) {
      console.error('Error exchanging code for token:', tokenData.error);
      res.redirect(302, `/admin/#error=${tokenData.error}`);
      return;
    }

    // Verify token has required scopes
    const scopes = tokenData.scope?.split(',') || [];
    if (!scopes.includes('repo')) {
      console.error('Missing required repo scope');
      res.redirect(302, `/admin/#error=insufficient-scope`);
      return;
    }

    console.log('Successfully obtained access token with scopes:', scopes);
    res.redirect(302, `/admin/#access_token=${tokenData.access_token}`);
  } catch (error) {
    console.error('Error during OAuth flow:', error);
    res.redirect(302, `/admin/#error=server-error`);
  }
}