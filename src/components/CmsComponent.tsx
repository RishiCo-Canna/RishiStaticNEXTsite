import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import type CMS from 'decap-cms-app';
import { CmsConfig } from 'decap-cms-core';
import invariant from 'tiny-invariant';

const CmsComponent: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(false);
  const cmsRef = useRef<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedRef.current = true;
    let cmsInstance: any = null;

    const initializeCms = async () => {
      try {
        setError(null);

        if (!rootRef.current) {
          console.warn('[CMS] Root element not found');
          return;
        }

        console.log('[CMS] Starting initialization...');
        // Dynamically import CMS to avoid SSR issues
        const CMS = (await import('decap-cms-app')).default;

        if (!mountedRef.current) return;

        // Enhanced configuration with better error handling
        const config: CmsConfig = {
          backend: {
            name: 'github',
            repo: 'RishiCo-Canna/RishiStaticNEXTsite',
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth'
          },
          load_config_file: false,
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
                { label: 'Product Name', name: 'title', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'markdown' },
                { label: 'Price', name: 'price', widget: 'number', value_type: 'float' }
              ]
            }
          ]
        };

        console.log('[CMS] Initializing with config:', config);

        try {
          cmsRef.current = await CMS.init({ config });
          console.log('[CMS] Initialization complete');
        } catch (initError) {
          console.error('[CMS] Initialization failed:', initError);
          throw new Error(`CMS initialization failed: ${initError.message}`);
        }

      } catch (err) {
        console.error('[CMS] Setup error:', err);
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Failed to initialize CMS'));
        }
      }
    };

    // Initialize when the component mounts
    initializeCms();

    return () => {
      mountedRef.current = false;
      if (cmsInstance) {
        try {
          cmsInstance.close();
        } catch (err) {
          console.warn('[CMS] Cleanup error:', err);
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <p className="text-red-600">{error.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          onClick={() => {
            setError(null);
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div ref={rootRef} id="nc-root" className="min-h-screen" />
    </ErrorBoundary>
  );
};

export default CmsComponent;