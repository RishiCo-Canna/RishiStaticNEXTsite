import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
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
  }
}

export default NextAuth(authOptions)