import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const CmsComponent: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(false);
  const cmsRef = useRef<any>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedRef.current = true;

    const initializeCms = async () => {
      try {
        // Clear any previous error state
        setError(null);

        // Safety check for root element
        if (!rootRef.current) {
          console.warn('[CMS] Root element not found');
          return;
        }

        // Clean up any existing CMS instance
        if (cmsRef.current) {
          console.log('[CMS] Cleaning up previous instance');
          // Clear the root element safely
          if (rootRef.current) {
            rootRef.current.innerHTML = '';
          }
          cmsRef.current = null;
        }

        console.log('[CMS] Starting initialization...');

        // Import CMS dynamically
        const CMS = (await import('decap-cms-app')).default;

        if (!mountedRef.current) {
          console.log('[CMS] Component unmounted during initialization');
          return;
        }

        // Configure CMS
        const config = {
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth'
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

        // Initialize CMS with config
        console.log('[CMS] Initializing with config...');
        cmsRef.current = await CMS.init({ config });

        if (!mountedRef.current) {
          console.log('[CMS] Component unmounted after initialization');
          return;
        }

        console.log('[CMS] Initialization complete');
      } catch (err) {
        console.error('[CMS] Initialization failed:', err);
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Failed to initialize CMS'));
        }
      }
    };

    // Initialize only when the DOM is ready
    if (document.readyState === 'complete') {
      initializeCms();
    } else {
      const handleLoad = () => {
        if (mountedRef.current) {
          initializeCms();
        }
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }

    // Cleanup function
    return () => {
      mountedRef.current = false;
      if (cmsRef.current && rootRef.current) {
        console.log('[CMS] Cleaning up on unmount');
        try {
          // Safely clear the root element
          if (rootRef.current.firstChild) {
            rootRef.current.innerHTML = '';
          }
        } catch (err) {
          console.warn('[CMS] Cleanup error:', err);
        }
        cmsRef.current = null;
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
            if (mountedRef.current) {
              window.location.reload();
            }
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