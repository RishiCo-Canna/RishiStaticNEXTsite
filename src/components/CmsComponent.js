
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import CMS from 'decap-cms-app';

export default function CmsComponent() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      CMS.init({
        config: {
          load_config_file: false,
          backend: {
            name: 'github',
            repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
            branch: 'main',
            auth_type: 'pkce',
            base_url: window.location.origin,
            auth_endpoint: 'api/auth'
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
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Body', name: 'body', widget: 'markdown' }
              ]
            }
          ]
        }
      });
    }
  }, [session]);

  if (!session) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Admin Access Required</h2>
        <p>Please sign in with GitHub to access the admin panel</p>
        <button 
          onClick={() => signIn('github')}
          style={{
            background: '#24292e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return <div id="nc-root" />;
}
