import Head from 'next/head'
import { useEffect } from 'react'

const AdminPage = () => {
  useEffect(() => {
    (async () => {
      const CMS = (await import('decap-cms-app')).default
      CMS.init()
      
      // Initialize auth
      const { GitHubBackend } = await import('decap-cms-backend-github')
      CMS.registerBackend('github', GitHubBackend)
    })()
  }, [])

  return (
    <>
      <Head>
        <title>Content Manager</title>
        <meta name="robots" content="noindex" />
        {/* Import Decap CMS styles */}
        <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
      </Head>
      {/* Decap CMS will mount itself here */}
      <div id="nc-root" />
    </>
  )
}

export default AdminPage
