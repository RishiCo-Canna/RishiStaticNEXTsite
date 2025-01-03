import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCMS = async () => {
      try {
        if (!session?.accessToken) {
          console.log('No session or access token, showing login');
          setLoading(false);
          return;
        }

        console.log('Session found, loading CMS...');
        const CMS = (await import('decap-cms-app')).default;

        // Get the current origin
        const origin = window.location.origin;
        console.log('Current origin:', origin);

        // Initialize CMS with the access token
        await CMS.init({
          config: {
            backend: {
              name: 'github',
              repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
              branch: 'main',
              base_url: origin,
              auth_type: 'pkce', // Use PKCE flow
              app_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
              token: session.accessToken
            },
            load_config_file: false,
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

        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('CMS initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize CMS');
        setLoading(false);
      }
    };

    loadCMS();
  }, [session]);

  // Show login button if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Content Management System
            </h2>
          </div>
          <div>
            <button
              onClick={() => signIn('github')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin | Content Manager</title>
      </Head>
      <div id="nc-root">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Loading CMS...</h2>
            </div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h2 className="text-red-800 font-semibold mb-2">CMS Error</h2>
            <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;

// Disable automatic static optimization for this page
export const getServerSideProps = () => {
  return { props: {} };
};