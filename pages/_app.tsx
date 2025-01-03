import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AdminPage = dynamic(
  () => import('../components/CmsComponent'),
  { ssr: false }
)

export default function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith('/admin')) {
    return <AdminPage />
  }
  return <Component {...pageProps} />
}
