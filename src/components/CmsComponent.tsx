import React, { useEffect } from 'react';
import type { CmsConfig } from 'decap-cms-core';

declare global {
  interface Window {
    CMS: any;
  }
}

export const CmsComponent: React.FC = () => {
  useEffect(() => {
    const loadCms = async () => {
      try {
        const CMS = (await import('decap-cms-app')).default;

        // CMS Configuration
        const config: CmsConfig = {
          backend: {
            name: 'github',
            repo: 'RishiCo-Canna/RishiStaticNEXTsite',
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth'
          },
          local_backend: process.env.NODE_ENV === 'development',
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
        console.log('CMS initialized successfully');
      } catch (error) {
        console.error('Failed to initialize CMS:', error);
        throw error;
      }
    };

    loadCms();
  }, []);

  return <div id="nc-root" />;
};

// Ensure we have both named and default exports
export default CmsComponent;