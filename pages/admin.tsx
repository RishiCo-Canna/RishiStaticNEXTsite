
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
);

const AdminPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Admin | Loading...</title>
        </Head>
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Admin | Sign In</title>
        </Head>
        <button
          onClick={() => signIn('github')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin | CMS</title>
      </Head>
      <CmsComponent />
    </>
  );
};

export default AdminPage;
