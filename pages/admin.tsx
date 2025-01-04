import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Disable SSR for CMS component
const CmsComponent = dynamic(
  () => import('../src/components/CmsComponent'),
  { ssr: false }
);

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (status === 'unauthenticated') {
      signIn('github');
    }
  }, [status]);

  // Show loading state during SSR or authentication
  if (!isClient || status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Authenticating...</div>;
  }

  return (
    <>
      <Script 
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="beforeInteractive"
      />
      <div className="admin-container">
        <CmsComponent />
      </div>
    </>
  );
}