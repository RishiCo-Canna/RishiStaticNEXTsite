import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the Replit temporary URL
  const siteUrl = process.env.REPL_SLUG && process.env.REPL_OWNER
    ? `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co`
    : 'http://localhost:3000'

  res.json({
    siteUrl,
    repl_owner: process.env.REPL_OWNER,
    repl_slug: process.env.REPL_SLUG,
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
    authCallback: `${siteUrl}/api/auth/callback/github`
  })
}