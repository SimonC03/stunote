'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';

const NoProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        router.push('/'); // Omdirigera till hemsidan om användaren är inloggad
      } catch (error) {

      }
    };

    checkSession();
  }, [router]);

  return <>{children}</>;
};

export default NoProtectedRoute;
