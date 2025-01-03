
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CmsComponent = () => {
  const { data: session } = useSession();
  
  useEffect(() => {
    let isSubscribed = true;
    
    if (session?.accessToken && typeof window !== 'undefined') {
      const loadCMS = async () => {
        try {
          const CMS = (await import('decap-cms-app')).default;
          CMS.init();
        } catch (err) {
          console.error('Failed to initialize CMS:', err);
        }
      };
      
      if (isSubscribed) {
        loadCMS();
      }
    }
    
    return () => {
      isSubscribed = false;
    };
  }, [session]);

  if (!session) {
    return <div>Please sign in to access the CMS</div>;
  }

  return (
    <div>
      <style jsx global>{`
        iframe {
          width: 100%;
          height: 100vh;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CmsComponent;
