import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // Return the access token that Decap CMS needs
  res.json({
    token: token.accessToken,
    provider: 'github'
  })
}
