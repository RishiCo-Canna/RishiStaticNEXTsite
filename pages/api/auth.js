import { randomBytes } from 'crypto';

export default async function handler(req, res) {
  if (!req.query.next) {
    res.status(400).json({ error: 'Missing next parameter' });
    return;
  }

  // Generate random state
  const state = randomBytes(32).toString('hex');
  
  // Redirect to GitHub OAuth flow
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || req.headers.origin}/api/auth/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: state,
    response_type: 'code',
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
