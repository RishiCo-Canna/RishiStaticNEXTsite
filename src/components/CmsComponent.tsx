import { useEffect, useState } from 'react'
import CMS from 'decap-cms-app'
import 'decap-cms-backend-github'

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
  const [initializationAttempts, setInitializationAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;

  useEffect(() => {
    const validateConfig = () => {
      const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME;
      const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

      const missingConfigs = [];
      if (!repo) missingConfigs.push('NEXT_PUBLIC_GITHUB_REPO_FULL_NAME');
      if (!clientId) missingConfigs.push('NEXT_PUBLIC_OAUTH_CLIENT_ID');
      if (!siteUrl) missingConfigs.push('NEXT_PUBLIC_SITE_URL');

      if (missingConfigs.length > 0) {
        throw new Error(`Missing required configuration: ${missingConfigs.join(', ')}`);
      }

      return { repo, clientId, siteUrl };
    };

    const initCMS = async () => {
      try {
        const { repo, clientId, siteUrl } = validateConfig();

        const currentOrigin = window.location.origin;

        const config = {
          local_backend: false,
          backend: {
            name: 'github' as const,
            repo,
            branch: 'main',
            base_url: currentOrigin,
            auth_endpoint: 'api/auth',
            auth_scope: 'repo',
            app_id: clientId
          },
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

        await CMS.init({ config });
        setError(null);
      } catch (err: any) {
        const errorDetails: CMSError = {
          message: 'Failed to initialize CMS',
          details: err.message
        };

        setError(errorDetails);

        if (initializationAttempts < MAX_RETRY_ATTEMPTS - 1) {
          setInitializationAttempts(prev => prev + 1);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }
    };

    initCMS();
  }, [initializationAttempts]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <p className="text-red-600">{error.message}</p>
        {error.details && (
          <p className="text-red-500 text-sm mt-2">{error.details}</p>
        )}
        {initializationAttempts < MAX_RETRY_ATTEMPTS && (
          <button
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            onClick={() => setInitializationAttempts(prev => prev + 1)}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default CmsComponent;