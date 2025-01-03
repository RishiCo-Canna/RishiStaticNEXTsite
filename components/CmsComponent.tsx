import { useEffect } from 'react'
import CMS from 'decap-cms-app'

const CmsComponent = () => {
  useEffect(() => {
    // Add console log to debug initialization
    console.log('Initializing CMS...')

    if (window) {
      // Check if we have the required environment variables
      console.log('GitHub Repo:', process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME)
      console.log('Base URL:', window.location.origin)

      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME || '',
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth',
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
                    {
                      label: 'Title',
                      name: 'title',
                      widget: 'string'
                    },
                    {
                      label: 'Content',
                      name: 'content',
                      widget: 'markdown'
                    }
                  ]
                }
              ]
            }
          ]
        }
      })
    }
  }, [])

  return <div id="nc-root" />
}

export default CmsComponent