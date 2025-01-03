import { useEffect, useState } from 'react'
import CMS from 'decap-cms-app'
import 'decap-cms-backend-github'

interface Props {}

interface CMSError {
  message: string;
  details?: string;
}

const CmsComponent: React.FC<Props> = () => {
  const [error, setError] = useState<CMSError | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const initCMS = async () => {
      try {
        // Validate required environment variables
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME;
        const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!repo || !clientId || !siteUrl) {
          throw new Error(`Missing required environment variables: ${[
            !repo && 'NEXT_PUBLIC_GITHUB_REPO_FULL_NAME',
            !clientId && 'NEXT_PUBLIC_OAUTH_CLIENT_ID',
            !siteUrl && 'NEXT_PUBLIC_SITE_URL',
          ].filter(Boolean).join(', ')}`);
        }

        console.log('CMS Initialization starting with:', {
          repo,
          baseUrl: siteUrl,
          clientId: clientId.substring(0, 8) + '...'
        });

        // Initialize CMS with exact required configuration
        await CMS.init({
          config: {
            backend: {
              name: 'github',
              repo,
              branch: 'main',
              base_url: siteUrl,
              auth_endpoint: 'api/auth',
              auth_type: 'pkce',
              app_id: clientId
            },
            media_folder: 'public/uploads',
            public_folder: '/uploads',
            publish_mode: 'editorial_workflow',
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
          }
        });

        console.log('CMS initialization completed successfully');
        setInitialized(true);
        setError(null);
      } catch (err: any) {
        console.error('CMS initialization error:', err);
        setError({
          message: 'Failed to initialize CMS',
          details: err.message
        });
        setInitialized(false);
      }
    };

    initCMS();
  }, [initialized]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
        <p className="text-red-600">{error.message}</p>
        {error.details && (
          <p className="text-red-500 text-sm mt-2">{error.details}</p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          onClick={() => {
            setError(null);
            setInitialized(false);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
};

export default CmsComponent;