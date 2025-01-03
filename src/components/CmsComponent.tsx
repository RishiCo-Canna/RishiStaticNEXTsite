
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

declare global {
  interface Window {
    CMS_MANUAL_INIT?: boolean;
    CMS: any;
  }
}

const CmsComponent = () => {
  useEffect(() => {
    const loadCms = async () => {
      if (typeof window !== 'undefined' && !window.CMS_MANUAL_INIT) {
        window.CMS_MANUAL_INIT = true;
        const CMS = (await import('decap-cms-app')).default;

        const config = {
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth',
          },
          load_config_file: false,
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
      }
    };

    loadCms();
  }, []);

  return <div id="nc-root" />;
};

export default CmsComponent;
