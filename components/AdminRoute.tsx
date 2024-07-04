'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/appwrite';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const role = await getUserRole();

        if (role !== 'admin') {
          router.push('/'); // Omdirigera om användaren inte är admin
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        router.push('/sign-in');
      }
    };

    checkAdminRole();
  }, [router]);

  if (!isAdmin) {
    return null; // Visa inget medan vi väntar på att kontrollera rollen
  }

  return <>{children}</>;
};

export default AdminRoute;
