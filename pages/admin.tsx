import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Disable SSR for CMS component since it needs to run in browser
const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Redirect to GitHub sign-in if not authenticated
    if (status === 'unauthenticated') {
      signIn('github', { callbackUrl: '/admin' });
    }
  }, [status]);

  // Show loading state during authentication check
  if (!isClient || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Show authenticating state while redirecting to GitHub
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Redirecting to GitHub authentication...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Content Management</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="admin-container">
        <CmsComponent />
      </div>
    </>
  );
}