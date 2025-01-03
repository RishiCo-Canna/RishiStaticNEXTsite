import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
      authorization: {
        params: {
          // Add scopes needed for private repository access
          scope: 'repo user',
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
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
    async jwt({ token, account }) {
      // Persist the OAuth access_token and associated data to the token right after signin
      if (account) {
        console.log('Setting access token and additional data')
        token.accessToken = account.access_token
        token.provider = account.provider
        token.tokenType = account.token_type
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      console.log('Session Callback:', { 
        sessionExists: !!session,
        tokenExists: !!token,
        hasAccessToken: !!token.accessToken
      })
      if (session) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    error: '/admin', // Change this to the error page in your application
    signIn: '/admin'
  }
})