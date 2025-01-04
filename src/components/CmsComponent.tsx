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
    const initializeCms = async () => {
      try {
        // Skip if already initialized or unmounted
        if (initializedRef.current || !mountedRef.current || !rootRef.current) {
          return;
        }

        console.log('[CMS] Starting initialization...');
        const CMS = (await import('decap-cms-app')).default;

        // Set initialization flag before init to prevent double initialization
        initializedRef.current = true;

        // Let config.yml handle the configuration
        await CMS.init({
          config: {
            load_config_file: true,
            local_backend: false,
          }
        });

        console.log('[CMS] Initialization complete');
      } catch (err) {
        console.error('[CMS] Initialization failed:', err);
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Failed to initialize CMS'));
        }
      }
    };

    // Set mounted flag
    mountedRef.current = true;

    // Initialize CMS
    initializeCms();

    return () => {
      mountedRef.current = false;
      initializedRef.current = false;

      // Clean up by removing the CMS root element content
      if (rootRef.current) {
        rootRef.current.innerHTML = '';
      }
    };
  }, []); // Empty dependency array for single initialization

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
            if (rootRef.current) {
              rootRef.current.innerHTML = '';
            }
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