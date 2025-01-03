import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { host } = req.headers;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing OAuth credentials' });
  }

  // Only handle GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const params = new URLSearchParams(req.url?.split('?')[1]);
    const code = params.get('code');
    
    if (!code) {
      res.redirect(302, `/admin/#error=invalid-code`);
      return;
    }

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

    if (tokenData.error) {
      res.redirect(302, `/admin/#error=${tokenData.error}`);
      return;
    }

    res.redirect(302, `/admin/#access_token=${tokenData.access_token}`);
  } catch (error) {
    console.error('Error during OAuth flow:', error);
    res.redirect(302, `/admin/#error=server-error`);
  }
}
