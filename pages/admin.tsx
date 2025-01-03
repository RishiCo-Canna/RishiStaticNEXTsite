
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
);

export default function AdminPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('github');
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Authenticating...</div>;
  }

  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </Head>
      <CmsComponent />
    </>
  );
}
