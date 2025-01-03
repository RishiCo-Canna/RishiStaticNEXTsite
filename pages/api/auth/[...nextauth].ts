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
  debug: true, // Enable debug logs
  logger: {
    error(code, ...message) {
      console.error(code, message)
    },
    warn(code, ...message) {
      console.warn(code, message)
    },
    debug(code, ...message) {
      console.debug(code, message)
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn Callback:', { user, account, profile, email })
      return true
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      console.log('JWT Callback:', { tokenExists: !!token, accountExists: !!account, profileExists: !!profile })
      if (account) {
        console.log('Setting access token:', account.access_token)
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client
      console.log('Session Callback:', { 
        sessionExists: !!session, 
        tokenExists: !!token, 
        userExists: !!user,
        accessTokenExists: !!token.accessToken 
      })
      session.accessToken = token.accessToken
      return session
    },
  },
})