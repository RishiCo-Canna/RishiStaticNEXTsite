import React, { useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';

const CmsComponent: React.FC = () => {
  const mounted = useRef(false);
  const initialized = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    mounted.current = true;

    const initializeCms = async () => {
      if (initialized.current) return;

      try {
        console.log('[CMS] Starting initialization...');

        // Clean up any existing CMS instance
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }

        // Clear any existing CMS root elements
        const existingRoot = document.getElementById('nc-root');
        if (existingRoot) {
          while (existingRoot.firstChild) {
            existingRoot.removeChild(existingRoot.firstChild);
          }
        }

        // Import CMS dynamically
        const CMS = (await import('decap-cms-app')).default;
        console.log('[CMS] Module imported successfully');

        if (!mounted.current) return;

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
        await CMS.init({ config });

        if (!mounted.current) return;

        initialized.current = true;
        console.log('[CMS] Initialization complete');

        // Store cleanup function
        cleanupRef.current = () => {
          console.log('[CMS] Cleaning up...');
          initialized.current = false;
          const root = document.getElementById('nc-root');
          if (root) {
            root.innerHTML = '';
          }
          // Add any additional cleanup needed by CMS
        };
      } catch (error) {
        console.error('[CMS] Initialization failed:', error);
        if (mounted.current) {
          // Reset initialization flag on error
          initialized.current = false;
        }
      }
    };

    // Ensure DOM is ready before initialization
    if (document.readyState === 'complete') {
      initializeCms();
    } else {
      window.addEventListener('load', initializeCms);
      return () => window.removeEventListener('load', initializeCms);
    }

    return () => {
      mounted.current = false;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <div id="nc-root" className="min-h-screen" />
    </ErrorBoundary>
  );
};

export default CmsComponent;