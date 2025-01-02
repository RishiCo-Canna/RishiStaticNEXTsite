import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      scope: 'repo,user',
      callbackUrl: `https://${process.env.REPL_SLUG}.worf.replit.dev/api/auth/callback/github`
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'your-development-secret',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
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
    async signIn({ user, account, profile }) {
      return true // Add any additional validation here if needed
    }
  },
  pages: {
    signIn: '/admin',
    error: '/admin', // Error pages
    signOut: '/admin'
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)