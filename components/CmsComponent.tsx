import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

const CmsComponent = () => {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [initializationStage, setInitializationStage] = useState<string>('not-started')

  useEffect(() => {
    const initCMS = async () => {
      console.log('CMS Initialization Starting:', {
        sessionStatus: status,
        sessionExists: !!session,
        accessToken: session?.accessToken,
      })

      if (session?.accessToken) {
        try {
          setInitializationStage('loading-cms')
          console.log('Loading CMS with config:', {
            sessionExists: !!session,
            hasAccessToken: !!session.accessToken,
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            baseUrl: window.location.origin,
            oauth: {
              clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
              authScope: 'repo,user'
            }
          })

          const CMS = (await import('decap-cms-app')).default

          // Add event listeners for debugging
          window.addEventListener('error', (event) => {
            console.error('CMS error:', event.error)
            setError(event.error?.message || 'Unknown error occurred')
          })

          setInitializationStage('configuring-cms')
          CMS.init({
            config: {
              backend: {
                name: 'github',
                repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME || '',
                branch: 'main',
                auth_type: 'pkce',
                base_url: window.location.origin,
                auth_endpoint: 'api/auth',
                app_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
                auth_scope: 'repo,user',
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
          setInitializationStage('cms-initialized')
          console.log('CMS initialized successfully')
        } catch (err) {
          console.error('Failed to initialize CMS:', err)
          setError(err instanceof Error ? err.message : 'Failed to initialize CMS')
          setInitializationStage('error')
        }
      } else {
        console.log('No session or access token available:', {
          status,
          sessionExists: !!session,
          accessTokenExists: !!session?.accessToken
        })
      }
    }

    initCMS()
  }, [session, status])

  if (status === 'loading') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  if (!session) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Please Sign In</h2>
        <p>Authentication status: {status}</p>
        <button 
          onClick={() => {
            console.log('Initiating GitHub sign in')
            signIn('github', { callbackUrl: '/admin' })
          }} 
          style={{ 
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#24292e',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error Loading CMS</h2>
        <p>Current stage: {initializationStage}</p>
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