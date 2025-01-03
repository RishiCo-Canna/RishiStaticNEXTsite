import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'repo user',  // Ensure we have private repository access
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and scope to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.scope = account.scope
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      session.scope = token.scope
      return session
    }
  },
  pages: {
    signIn: '/admin',
    error: '/admin',  // Error code passed in query string as ?error=
    signOut: '/admin'
  }
})