
import { useEffect } from 'react';
import CMS from 'decap-cms-app';
import ErrorBoundary from './ErrorBoundary';

declare global {
  interface Window {
    CMS_MANUAL_INIT?: boolean;
  }
}

const CmsComponent = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.CMS_MANUAL_INIT) {
      window.CMS_MANUAL_INIT = true;

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
  }, []);

  return (
    <div id="nc-root" />
  );
};

export default CmsComponent;
