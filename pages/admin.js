import dynamic from 'next/dynamic'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

// Import CMS component with no SSR
const CMS = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
)

export default function AdminPage() {
  return (
    <SessionProvider>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <CMS />
    </SessionProvider>
  )
}