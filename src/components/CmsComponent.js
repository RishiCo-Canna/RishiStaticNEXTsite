
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CMS from 'decap-cms-app';
import { createRoot } from 'react-dom/client';

// Override CMS's default createRoot
window.createRoot = createRoot;

const CmsComponent = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      CMS.init({
        config: {
          load_config_file: false,
          backend: {
            name: 'github',
            repo: 'your-username/your-repo', // Replace with your GitHub username/repo
            branch: 'main',
            auth_type: 'pkce',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth'
          },
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
        }
      });
    }
  }, [session]);

  return null;
};

export default CmsComponent;
