import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { host } = req.headers;
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
    const params = new URLSearchParams(req.url?.split('?')[1]);
    const code = params.get('code');

    if (!code) {
      console.error('No code provided in callback');
      res.redirect(302, `/admin/#error=invalid-code`);
      return;
    }

    console.log('Exchanging code for token...');
    const tokenResponse = await fetch(
      `https://github.com/login/oauth/access_token`,
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
    console.log('Token exchange response:', { hasError: !!tokenData.error, hasToken: !!tokenData.access_token });

    if (tokenData.error) {
      console.error('Error exchanging code for token:', tokenData.error);
      res.redirect(302, `/admin/#error=${tokenData.error}`);
      return;
    }

    console.log('Successfully obtained access token');
    res.redirect(302, `/admin/#access_token=${tokenData.access_token}`);
  } catch (error) {
    console.error('Error during OAuth flow:', error);
    res.redirect(302, `/admin/#error=server-error`);
  }
}