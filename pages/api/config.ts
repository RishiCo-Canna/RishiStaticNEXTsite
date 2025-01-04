import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Use the specific Replit URL
  const siteUrl = 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev'

  res.json({
    siteUrl,
    repl_owner: process.env.REPL_OWNER,
    repl_slug: process.env.REPL_SLUG,
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
    authCallback: `${siteUrl}/api/auth/callback/github`
  })
}