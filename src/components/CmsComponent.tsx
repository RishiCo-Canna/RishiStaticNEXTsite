import React, { useEffect, useState } from 'react';
import type { CmsConfig } from 'decap-cms-core';
import ErrorBoundary from './ErrorBoundary';

const CmsComponent: React.FC = () => {
  const [cmsLoaded, setCmsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountRef = React.useRef(false);

  useEffect(() => {
    if (mountRef.current) return;
    mountRef.current = true;
    let mounted = true;

    const loadCms = async () => {
      try {
        console.log('Starting CMS initialization...');

        // Import CMS dynamically
        const CMS = (await import('decap-cms-app')).default;
        console.log('CMS module imported successfully');

        if (!mounted) return;

        if (!CMS) {
          throw new Error('Failed to load CMS module');
        }

        const config: CmsConfig = {
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME || 'RishiCo-Canna/RishiStaticNEXTsite',
            branch: 'main',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth',
            commit_messages: {
              create: 'Create {{collection}} "{{slug}}"',
              update: 'Update {{collection}} "{{slug}}"',
              delete: 'Delete {{collection}} "{{slug}}"',
              uploadMedia: 'Upload "{{path}}"',
              deleteMedia: 'Delete "{{path}}"'
            }
          },
          load_config_file: false,
          local_backend: process.env.NODE_ENV === 'development',
          publish_mode: 'editorial_workflow',
          media_folder: 'public/images',
          public_folder: '/images',
          collections: [
            {
              name: 'pages',
              label: 'Pages',
              folder: 'content/pages',
              create: true,
              slug: '{{slug}}',
              fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Body', name: 'body', widget: 'markdown' }
              ]
            }
          ]
        };

        console.log('Initializing CMS with config...');
        await CMS.init({ config });

        if (mounted) {
          console.log('CMS initialized successfully');
          setCmsLoaded(true);
        }
      } catch (error) {
        console.error('Failed to initialize CMS:', error);
        if (mounted) {
          setError(error as Error);
        }
      }
    };

    // Add a small delay to ensure the DOM is ready in webview context
    setTimeout(loadCms, 100);

    return () => {
      mounted = false;
      // Clean up CMS instance
      if (typeof window !== 'undefined' && (window as any).CMS) {
        try {
          (window as any).CMS = undefined;
          setCmsLoaded(false);
        } catch (error) {
          console.error('Error during CMS cleanup:', error);
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <pre className="text-red-600 whitespace-pre-wrap">{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div id="nc-root" className="min-h-screen" />
    </ErrorBoundary>
  );
};

export default CmsComponent;