import dynamic from 'next/dynamic'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

// Import CMS component with no SSR
const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
)

export default function AdminPage() {
  return (
    <SessionProvider>
      <Head>
        <title>Content Manager - Cannabis Industry Website</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://*.repl.co https://*.repl.dev; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://identity.netlify.com https://unpkg.com; connect-src 'self' https://api.github.com" />
        <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <CmsComponent />
    </SessionProvider>
  )
}