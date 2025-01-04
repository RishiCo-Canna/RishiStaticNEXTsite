import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import type CMS from 'decap-cms-app';
import { CmsConfig } from 'decap-cms-core';

const CmsComponent: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(false);
  const initializedRef = useRef(false);
  const cmsRef = useRef<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;

      const initializeCms = async () => {
        try {
          setError(null);

          if (!rootRef.current) {
            console.warn('[CMS] Root element not found');
            return;
          }

          // Skip if CMS is already initialized
          if (initializedRef.current || cmsRef.current) {
            console.log('[CMS] Already initialized, skipping');
            return;
          }

          console.log('[CMS] Starting initialization...');
          const CMS = (await import('decap-cms-app')).default;

          const config: CmsConfig = {
            backend: {
              name: 'github' as const,
              repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME!,
              branch: 'main',
              base_url: window.location.origin,
              auth_endpoint: '/api/auth'
            },
            load_config_file: true,
            media_folder: 'public/uploads',
            public_folder: '/uploads',
            local_backend: false,
            display_url: process.env.NEXT_PUBLIC_SITE_URL,
          };

          console.log('[CMS] Initializing with config...');
          // Let Decap CMS handle its own DOM manipulation
          cmsRef.current = await CMS.init({ config });
          initializedRef.current = true;
          console.log('[CMS] Initialization complete');

        } catch (err) {
          console.error('[CMS] Initialization failed:', err);
          if (mountedRef.current) {
            setError(err instanceof Error ? err : new Error('Failed to initialize CMS'));
          }
        }
      };

      initializeCms();
    }

    return () => {
      mountedRef.current = false;
      if (cmsRef.current) {
        console.log('[CMS] Cleaning up...');
        cmsRef.current = null;
      }
      initializedRef.current = false;
    };
  }, []); // Empty dependency array ensures single initialization

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <p className="text-red-600">{error.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          onClick={() => {
            setError(null);
            initializedRef.current = false;
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