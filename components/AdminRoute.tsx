'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/appwrite';
import '@/components/animations/spinner.css';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const roles = await getUserRole();
        setIsAdmin(roles.includes('admin'));

        if (!roles.includes('admin')) {
          router.push('/'); // Omdirigera om användaren inte är admin
        }
      } catch (error) {
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [router]);

  if (loading) {
    return <div className="spinner" style={{ borderRightColor: '#2268CD' }}></div>; // Visa en laddningsindikator medan vi väntar på att kontrollera rollen
  }

  if (!isAdmin) {
    return null; // Visa inget om användaren inte är admin
  }

  return <>{children}</>;
};

export default AdminRoute;
