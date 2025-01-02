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
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://*.repl.co https://*.repl.dev" />
      </Head>
      <CmsComponent />
    </SessionProvider>
  )
}