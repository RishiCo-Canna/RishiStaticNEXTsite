import { useEffect } from 'react';
import type { CmsConfig } from 'decap-cms-core';

declare global {
  interface Window {
    CMS: any;
  }
}

const CmsComponent: React.FC = () => {
  useEffect(() => {
    const loadCms = async () => {
      try {
        // Import CMS dynamically
        const CMS = (await import('decap-cms-app')).default;

        // CMS Configuration
        const config: CmsConfig = {
          backend: {
            name: 'github',
            repo: 'RishiCo-Canna/RishiStaticNEXTsite',
            branch: 'main',
            auth_scope: 'repo',
            base_url: window.location.origin,
            auth_endpoint: '/api/auth'
          },
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
            },
            {
              name: 'blog',
              label: 'Blog Posts',
              folder: 'content/blog',
              create: true,
              fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Publish Date', name: 'date', widget: 'datetime' },
                { label: 'Featured Image', name: 'thumbnail', widget: 'image', required: false },
                { label: 'Body', name: 'body', widget: 'markdown' }
              ]
            }
          ]
        };

        // Initialize CMS with config
        await CMS.init({ config });
      } catch (error) {
        console.error('Failed to initialize CMS:', error);
      }
    };

    loadCms();
  }, []);

  return <div id="nc-root" />;
};

export default CmsComponent;