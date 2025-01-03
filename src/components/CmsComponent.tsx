
import { useEffect } from 'react';

declare global {
  interface Window {
    CMS: any;
  }
}

const CmsComponent = () => {
  useEffect(() => {
    const loadCms = async () => {
      try {
        const CMS = (await import('decap-cms-app')).default;
        
        const config = {
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth',
          },
          local_backend: true,
          media_folder: 'public/images',
          public_folder: '/images',
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
            }
          ]
        };

        CMS.init({ config });
      } catch (error) {
        console.error('CMS initialization error:', error);
      }
    };

    loadCms();
  }, []);

  return <div id="nc-root" style={{ height: '100vh' }} />;
};

export default CmsComponent;
