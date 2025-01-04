
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const AdminPage = () => {
  useEffect(() => {
    ;(async () => {
      if (process.env.NODE_ENV === 'development') {
        const CMS = (await import('decap-cms-app')).default
        CMS.init()
      }
    })()
  }, [])

  return (
    <>
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <div id="nc-root"></div>
    </>
  )
}

export default AdminPage
