import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const AdminPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCMS = async () => {
      try {
        // Dynamically import the CMS
        const CMS = (await import('decap-cms-app')).default;
        console.log('CMS loaded successfully');

        // Initialize CMS
        await CMS.init({
          config: {
            backend: {
              name: 'github',
              repo: process.env.NEXT_PUBLIC_GITHUB_REPO_FULL_NAME,
              branch: 'main',
              base_url: window.location.origin,
              auth_endpoint: '/api/auth'
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
      } catch (err) {
        console.error('CMS initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize CMS');
        setLoading(false);
      }
    };

    loadCMS();
  }, []);

  return (
    <>
      <Head>
        <title>Admin | Content Manager</title>
      </Head>
      <div id="nc-root">
        {loading && (
          <div style={{ padding: '20px' }}>
            <h2>Loading CMS...</h2>
          </div>
        )}
        {error && (
          <div style={{ padding: '20px', color: 'red' }}>
            <h2>CMS Error</h2>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </>
  );
};

// Disable automatic static optimization for this page
export const getServerSideProps = () => {
  return { props: {} };
};

export default AdminPage;
