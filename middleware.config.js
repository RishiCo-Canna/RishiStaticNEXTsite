module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://workspace.mike516.repl.co',
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    GITHUB_REPO_FULL_NAME: process.env.GITHUB_REPO_FULL_NAME,
  },
}
