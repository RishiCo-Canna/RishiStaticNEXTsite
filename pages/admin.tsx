import dynamic from 'next/dynamic'

// Import CmsComponent dynamically with SSR disabled
const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
)

const AdminPage = () => {
  return (
    <>
      <head>
        <title>Content Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <CmsComponent />
    </>
  )
}

export default AdminPage