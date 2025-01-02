import { useEffect } from 'react'
import CMS from 'decap-cms-app'
import 'decap-cms-backend-github'

// Extend Window interface to include CMS_ENV
declare global {
  interface Window {
    CMS_ENV?: any;
  }
}

const CmsComponent = () => {
  useEffect(() => {
    // Initialize Decap CMS with proper configuration
    CMS.init({
      config: {
        backend: {
          name: 'github',
          repo: process.env.NEXT_PUBLIC_GITHUB_REPO || process.env.GITHUB_REPO_FULL_NAME,
          branch: 'main',
          base_url: 'https://09947623-be9f-4899-956d-87e3e868f824-00-qam5g0scl8i3.worf.replit.dev',
          auth_endpoint: 'api/auth'
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
  }, [])

  return null
}

export default CmsComponent