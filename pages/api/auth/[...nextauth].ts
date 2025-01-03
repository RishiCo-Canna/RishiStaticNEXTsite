import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'repo,user'
        },
      },
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET || 'default-secret-key-change-in-production',
  logger: {
    error(code, ...message) {
      console.error('NextAuth Error:', code, message)
    },
    warn(code, ...message) {
      console.warn('NextAuth Warning:', code, message)
    },
    debug(code, ...message) {
      console.debug('NextAuth Debug:', code, message)
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn Callback:', { 
        user: user?.email,
        accountType: account?.provider,
        profileExists: !!profile 
      })
      return true
    },
    async session({ session, token }) {
      console.log('Session Callback:', { sessionExists: !!session, tokenExists: !!token })
      if (session) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    error: '/admin',
    signIn: '/admin'
  }
}

export default NextAuth(authOptions)