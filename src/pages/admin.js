import dynamic from 'next/dynamic'
import Head from 'next/head'
import ErrorBoundary from '../components/ErrorBoundary'

// Import CMS component with no SSR
const CmsComponent = dynamic(() => 
  import('../components/CmsComponent').then((mod) => mod.default), 
  { ssr: false }
)

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <ErrorBoundary>
        <CmsComponent />
      </ErrorBoundary>
    </>
  )
}