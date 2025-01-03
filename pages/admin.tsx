import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import type { NextPage } from 'next';

const AdminPage: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = '/admin/index.html';
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Admin | Sign In</title>
        </Head>
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
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Admin | Loading...</title>
      </Head>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Loading CMS...</h2>
        <p className="mt-2 text-gray-600">Redirecting to content management system...</p>
      </div>
    </div>
  );
};

export default AdminPage;