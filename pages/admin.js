import dynamic from 'next/dynamic'
import Head from 'next/head'

// Import CMS component with no SSR
const CMS = dynamic(
  () => import('decap-cms-app').then((cms) => {
    cms.default.init()
    return () => <div id="nc-root" />
  }),
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
      <CMS />
    </>
  )
}