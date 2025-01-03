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

  useEffect(() => {
    const initCMS = async () => {
      try {
        // Validate required environment variables
        const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME;
        const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!repo || !clientId || !siteUrl) {
          throw new Error('Missing required environment variables');
        }

        console.log('Initializing CMS with:', { repo, siteUrl });

        // Initialize CMS with minimal required config
        CMS.init({
          config: {
            backend: {
              name: 'github',
              repo,
              branch: 'main',
              base_url: siteUrl,
              auth_endpoint: 'api/auth',
              app_id: clientId,
              auth_scope: 'repo'
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
          }
        });

        setError(null);
      } catch (err: any) {
        console.error('CMS initialization error:', err);
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