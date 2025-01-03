import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { SessionProvider } from 'next-auth/react'

// Load CmsComponent dynamically with SSR disabled
const AdminPage = dynamic(
  () => import('../components/CmsComponent'),
  { ssr: false }
)

export default function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  // Handle /admin route separately
  if (router.pathname.startsWith('/admin')) {
    return (
      <SessionProvider session={session}>
        <AdminPage />
      </SessionProvider>
    )
  }
  return <Component {...pageProps} />
}