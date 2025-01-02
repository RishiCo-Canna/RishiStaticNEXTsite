import { useEffect } from 'react'

export default function CmsComponent() {
  useEffect(() => {
    (async () => {
      try {
        console.log('Loading Decap CMS...')
        const CMS = (await import('decap-cms-app')).default
        const { default: GitHubBackend } = await import('decap-cms-backend-github')

        // Register the GitHub backend
        CMS.registerBackend('github', GitHubBackend)

        // Initialize CMS
        CMS.init()
        console.log('CMS initialized successfully')
      } catch (error) {
        console.error('Error initializing CMS:', error)
      }
    })()
  }, [])

  return <div id="nc-root" />
}
