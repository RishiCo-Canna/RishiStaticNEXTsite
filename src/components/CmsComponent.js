import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

export default function CmsComponent() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.accessToken) {
      (async () => {
        try {
          console.log('Loading Decap CMS with session token...')
          const CMS = (await import('decap-cms-app')).default

          // Initialize CMS with GitHub backend
          await CMS.init({
            config: {
              load_config_file: false,
              backend: {
                name: 'github',
                repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
                branch: 'main',
                auth_type: 'github',
                base_url: window.location.origin,
                auth_endpoint: 'api/auth',
                commit_messages: {
                  create: 'Create {{collection}} "{{slug}}"',
                  update: 'Update {{collection}} "{{slug}}"',
                  delete: 'Delete {{collection}} "{{slug}}"',
                  uploadMedia: 'Upload "{{path}}"',
                  deleteMedia: 'Delete "{{path}}"'
                }
              },
              media_folder: 'public/uploads',
              public_folder: '/uploads',
              collections: [
                {
                  name: 'pages',
                  label: 'Pages',
                  folder: 'content/pages',
                  create: true,
                  fields: [
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Body', name: 'body', widget: 'markdown' }
                  ]
                },
                {
                  name: 'products',
                  label: 'Products',
                  folder: 'content/products',
                  create: true,
                  fields: [
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Image', name: 'image', widget: 'image' },
                    { label: 'Description', name: 'description', widget: 'markdown' },
                    { label: 'Price', name: 'price', widget: 'number', value_type: 'float' }
                  ]
                }
              ]
            }
          })
          console.log('CMS initialized successfully')
        } catch (error) {
          console.error('Error initializing CMS:', error)
        }
      })()
    } else if (status === "unauthenticated") {
      signIn('github')
    }
  }, [session, status])

  if (status === "loading") {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading authentication...</h2>
      </div>
    )
  }

  if (!session) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Admin Access Required</h2>
        <p>Please sign in with GitHub to access the admin panel</p>
        <button 
          onClick={() => signIn('github')}
          style={{
            background: '#24292e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    )
  }

  return <div id="nc-root" />
}