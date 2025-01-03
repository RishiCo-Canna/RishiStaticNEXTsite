import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

const CmsComponent = () => {
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initCMS = async () => {
      if (session) {
        try {
          console.log('Initializing CMS with session:', {
            sessionExists: !!session,
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            baseUrl: window.location.origin
          });

          const CMS = (await import('decap-cms-app')).default

          // Add event listeners for debugging
          window.addEventListener('error', (event) => {
            console.error('CMS error:', event.error);
            setError(event.error?.message || 'Unknown error occurred');
          });

          CMS.init({
            config: {
              backend: {
                name: 'github',
                repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME || '',
                branch: 'main',
                base_url: window.location.origin,
                auth_endpoint: 'api/auth'
              },
              local_backend: process.env.NODE_ENV === 'development',
              media_folder: 'public/uploads',
              public_folder: '/uploads',
              collections: [
                {
                  name: 'pages',
                  label: 'Pages',
                  files: [
                    {
                      name: 'home',
                      label: 'Home Page',
                      file: 'content/pages/home.md',
                      fields: [
                        { label: 'Title', name: 'title', widget: 'string' },
                        { label: 'Content', name: 'content', widget: 'markdown' }
                      ]
                    }
                  ]
                }
              ]
            }
          })
          console.log('CMS initialized successfully');
        } catch (err) {
          console.error('Failed to initialize CMS:', err);
          setError(err instanceof Error ? err.message : 'Failed to initialize CMS');
        }
      }
    }

    initCMS()
  }, [session])

  if (!session) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Please Sign In</h2>
        <button onClick={() => signIn('github')} style={{ padding: '10px 20px' }}>
          Sign in with GitHub
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error Loading CMS</h2>
        <pre>{error}</pre>
        <button onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>
          Retry
        </button>
      </div>
    )
  }

  return <div id="nc-root" />
}

export default CmsComponent