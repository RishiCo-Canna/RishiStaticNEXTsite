
import dynamic from 'next/dynamic';
import { createRoot } from 'react-dom/client';
import CMS from 'decap-cms-app';

const CmsComponent = () => {
  if (typeof window !== 'undefined') {
    // Initialize CMS config only once
    if (!window.CMS_MANUAL_INIT) {
      const config = {
        local_backend: false,
        backend: {
          name: 'github',
          repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
          branch: 'main',
          base_url: window.location.origin,
          auth_endpoint: 'api/auth',
          auth_scope: 'repo'
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
  }

  return <div id="nc-root" />;
};

export default dynamic(() => Promise.resolve(CmsComponent), {
  ssr: false
});
