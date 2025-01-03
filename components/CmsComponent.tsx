import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

const CmsComponent = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const initCMS = async () => {
      if (session) {
        console.log('Initializing CMS...')
        console.log('GitHub Repo:', process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME)
        console.log('Base URL:', window.location.origin)

        const CMS = (await import('decap-cms-app')).default
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

  return <div id="nc-root" />
}

export default CmsComponent