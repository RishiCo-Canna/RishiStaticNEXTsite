
import React, { useEffect, useState } from 'react';
import type { CmsConfig } from 'decap-cms-core';

const CmsComponent = () => {
  const [cmsLoaded, setCmsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountRef = React.useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    let mounted = true;
    
    const loadCms = async () => {
      try {
        const CMS = await import('decap-cms-app');
        
        if (!mounted) return;
        
        if (!CMS || !CMS.default) {
          throw new Error('Failed to load CMS module');
        }

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
            }
          ]
        };

        await CMS.default.init({ config });
        setCmsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize CMS:', error);
        setError(error as Error);
      }
    };

    loadCms();

    return () => {
      mounted = false;
      if (window.CMS) {
        try {
          // Cleanup CMS instance
          window.CMS = undefined;
          setCmsLoaded(false);
        } catch (error) {
          console.error('Error during CMS cleanup:', error);
        }
      }
    };
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
