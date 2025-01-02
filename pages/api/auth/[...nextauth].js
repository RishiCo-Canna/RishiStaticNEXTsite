import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      scope: 'repo,user'
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl + "/admin"
    }
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)