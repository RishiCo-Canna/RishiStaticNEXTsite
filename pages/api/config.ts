import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the actual site URL from environment variables
  const siteUrl = process.env.REPL_SLUG 
    ? `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co` 
    : 'http://localhost:3000'

  res.json({
    siteUrl,
    repl_owner: process.env.REPL_OWNER,
    repl_slug: process.env.REPL_SLUG,
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
    fullDomain: `${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co`,
    authCallback: `https://${process.env.REPL_SLUG}-${process.env.REPL_OWNER}.repl.co/api/auth/callback/github`
  })
}