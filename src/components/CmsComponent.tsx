import { useEffect, useState } from 'react'
import CMS, { type CmsConfig } from 'decap-cms-app'
import 'decap-cms-backend-github'

// Extend Window interface to include CMS_ENV
declare global {
  interface Window {
    CMS_ENV?: any;
  }
}

interface CMSError {
  message: string;
  details?: string;
}

const CmsComponent = () => {
  const [error, setError] = useState<CMSError | null>(null);

  useEffect(() => {
    const validateConfig = () => {
      const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME;
      const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

      if (!repo) {
        throw new Error('Missing GitHub repository configuration (NEXT_PUBLIC_GITHUB_REPO_FULL_NAME)');
      }

      if (!clientId) {
        throw new Error('Missing OAuth client ID (NEXT_PUBLIC_OAUTH_CLIENT_ID)');
      }

      if (!siteUrl) {
        throw new Error('Missing site URL configuration (NEXT_PUBLIC_SITE_URL)');
      }

      return { repo, clientId, siteUrl };
    };

    const initCMS = async () => {
      try {
        // Validate configuration
        const { repo, clientId, siteUrl } = validateConfig();
        console.log('CMS Config Validation - OK');
        console.log('Repository:', repo);
        console.log('Base URL:', siteUrl);

        // Initialize Decap CMS configuration
        const config: CmsConfig = {
          backend: {
            name: 'github',
            repo,
            branch: 'main',
            base_url: siteUrl,
            auth_endpoint: '/api/auth', // Ensure leading slash
            auth_type: 'oauth',
            app_id: clientId,
          },
          local_backend: process.env.NODE_ENV === 'development',
          media_folder: 'public/uploads',
          public_folder: '/uploads',
          collections: [
            {
              name: 'pages',
              label: 'Pages',
              folder: 'content/pages',
              create: true,
              fields: [
                { label: 'Title', name: 'title', widget: 'string', required: true },
                { label: 'Body', name: 'body', widget: 'markdown', required: true }
              ]
            },
            {
              name: 'products',
              label: 'Products',
              folder: 'content/products',
              create: true,
              fields: [
                { label: 'Title', name: 'title', widget: 'string', required: true },
                { label: 'Image', name: 'image', widget: 'image', required: true },
                { label: 'Description', name: 'description', widget: 'markdown', required: true },
                { label: 'Price', name: 'price', widget: 'number', value_type: 'float', required: true }
              ]
            }
          ]
        };

        // Set development mode if needed
        if (process.env.NODE_ENV === 'development') {
          window.CMS_ENV = 'development';
          console.log('CMS Development Mode Enabled');
        }

        // Initialize CMS with config
        console.log('Initializing CMS...', config);
        await CMS.init({ config });
        console.log('CMS initialized successfully');
        setError(null);
      } catch (err: any) {
        console.error('CMS Initialization Error:', err);
        setError({
          message: 'Failed to initialize CMS',
          details: err.message
        });
      }
    };

    initCMS();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <p className="text-red-600">{error.message}</p>
        {error.details && (
          <p className="text-red-500 text-sm mt-2">{error.details}</p>
        )}
      </div>
    );
  }

  return null;
};

export default CmsComponent;