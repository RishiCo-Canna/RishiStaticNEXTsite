import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  res.json({
    authenticated: !!session,
    session: session,
    clientId: process.env.OAUTH_CLIENT_ID ? "configured" : "missing",
    clientSecret: process.env.OAUTH_CLIENT_SECRET ? "configured" : "missing",
    repoName: process.env.GITHUB_REPO_FULL_NAME ? "configured" : "missing"
  });
}
