'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
      } catch (error) {
        router.push('/sign-in');
      }
    };

    checkSession();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;