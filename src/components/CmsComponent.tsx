import React, { useEffect, useState } from 'react';
import type { CmsConfig } from 'decap-cms-core';

declare global {
  interface Window {
    CMS: any;
  }
}

const CmsComponent = () => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCms = async () => {
      try {
        // Dynamic import of the CMS
        const CMS = await import('decap-cms-app');

        if (!CMS || !CMS.default) {
          throw new Error('Failed to load CMS module');
        }

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
        await CMS.default.init({ config });
        console.log('CMS initialized successfully');
      } catch (error) {
        console.error('Failed to initialize CMS:', error);
        setError(error as Error);
      }
    };

    loadCms();
  }, []);

  if (error) {
    return (
      <div className="cms-error">
        <h2>Error Loading CMS</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }

  return <div id="nc-root" />;
};

export default CmsComponent;