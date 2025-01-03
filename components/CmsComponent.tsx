import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

// Extend Window interface to include CMS
declare global {
  interface Window {
    CMS?: any;
    CMS_MANUAL_INIT?: boolean;
  }
}

// Extend Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const CmsComponent = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const initCMS = async () => {
      if (session) {
        try {
          console.log('CMS Environment Variables:', {
            repoName: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
            clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
            hasAccessToken: !!session.accessToken
          });

          // Import CMS
          const CMS = (await import('decap-cms-app')).default;

          // Configure CMS
          if (typeof window !== 'undefined') {
            window.CMS = CMS;

            // Add debug logging
            window.CMS.registerEventListener({
              name: 'debug',
              handler: (event: { type: string; payload: any }) => {
                console.log(`CMS Event - ${event.type}:`, event.payload);
              },
            });
          }

          // Initialize CMS
          await CMS.init({
            config: {
              backend: {
                name: 'github',
                repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME || '',
                branch: 'main',
                base_url: process.env.NEXT_PUBLIC_SITE_URL,
                auth_endpoint: 'api/auth',
                auth_type: 'implicit',
                app_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
              },
              media_folder: 'public/uploads',
              public_folder: '/uploads',
              collections: [
                {
                  name: 'pages',
                  label: 'Pages',
                  files: [
                    {
                      name: 'home',
                      label: 'Home Page',
                      file: 'content/pages/home.md',
                      fields: [
                        { label: 'Title', name: 'title', widget: 'string' },
                        { label: 'Content', name: 'content', widget: 'markdown' }
                      ]
                    },
                    {
                      name: 'hello',
                      label: 'Hello World Page',
                      file: 'content/pages/hello.md',
                      fields: [
                        { label: 'Title', name: 'title', widget: 'string' },
                        { label: 'Content', name: 'content', widget: 'markdown' }
                      ]
                    }
                  ]
                }
              ]
            }
          });

          console.log('CMS initialized successfully');
        } catch (error) {
          console.error('Failed to initialize CMS:', error);
          const root = document.getElementById('nc-root');
          if (root) {
            root.innerHTML = `
              <div style="padding: 20px; color: red;">
                <h2>Error Initializing CMS</h2>
                <pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
                <p>Please check your configuration and try again.</p>
                <button onclick="window.location.reload()">Retry</button>
              </div>
            `;
          }
        }
      }
    };

    initCMS();
  }, [session]);

  if (!session) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1>Content Management System</h1>
        <button 
          onClick={() => signIn('github')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#24292e',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return <div id="nc-root" />;
};

export default CmsComponent;