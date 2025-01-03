import { useEffect } from 'react'
import CMS from 'decap-cms-app'

const CmsComponent = () => {
  useEffect(() => {
    if (window) {
      CMS.init({
        config: {
          backend: {
            name: 'github',
            repo: process.env.GITHUB_REPO_FULL_NAME,
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth',
          },
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
