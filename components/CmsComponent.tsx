import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

const CmsComponent = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    // If we have a session, redirect to the static admin page
    if (session?.accessToken) {
      window.location.href = '/admin';
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

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

  return <div>Redirecting to admin interface...</div>;
};

export default CmsComponent;