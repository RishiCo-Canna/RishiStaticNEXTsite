
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
)

export default function AdminPage() {
  return (
    <SessionProvider>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CmsComponent />
    </SessionProvider>
  )
}
