
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
      const config = {
        backend: {
          name: 'github',
          repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
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
            folder: 'content/pages',
            create: true,
            fields: [
              { label: 'Title', name: 'title', widget: 'string', required: true },
              { label: 'Body', name: 'body', widget: 'markdown', required: true }
            ]
          }
        ]
      };

      CMS.init({ config });
    }
  }, []);

  return <ErrorBoundary><div id="nc-root" /></ErrorBoundary>;
};

export default CmsComponent;
