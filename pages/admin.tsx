
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const CmsComponent = dynamic(() => import('../src/components/CmsComponent'), {
  ssr: false
});

const AdminPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
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
