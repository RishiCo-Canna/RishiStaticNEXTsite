import dynamic from 'next/dynamic'
import Head from 'next/head'

// Import CMS component with no SSR to avoid window undefined issues
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
      <CmsComponent />
    </>
  )
}