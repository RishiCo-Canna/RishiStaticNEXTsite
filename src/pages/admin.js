import dynamic from 'next/dynamic'
import Head from 'next/head'
import ErrorBoundary from '../components/ErrorBoundary'

// Import CMS component with no SSR
const CmsComponent = dynamic(() => 
  import('../components/CmsComponent').then((mod) => mod.default), 
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }
)

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ErrorBoundary>
        <CmsComponent />
      </ErrorBoundary>
    </>
  )
}