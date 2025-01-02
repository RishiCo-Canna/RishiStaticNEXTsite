import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

export default function CmsComponent() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      (async () => {
        try {
          console.log('Loading Decap CMS...')
          const CMS = (await import('decap-cms-app')).default
          const { default: GitHubBackend } = await import('decap-cms-backend-github')

          // Register the GitHub backend
          CMS.registerBackend('github', GitHubBackend)

          // Initialize CMS with auth token
          CMS.init({
            config: {
              backend: {
                name: 'github',
                repo: process.env.GITHUB_REPO_FULL_NAME,
                branch: 'main',
                auth_scope: 'repo'
              }
            }
          })
          console.log('CMS initialized successfully')
        } catch (error) {
          console.error('Error initializing CMS:', error)
        }
      })()
    } else {
      signIn('github')
    }
  }, [session])

  if (!session) {
    return <div>Please sign in to access the admin panel...</div>
  }

  return <div id="nc-root" />
}