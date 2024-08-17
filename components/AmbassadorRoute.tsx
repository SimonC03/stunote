'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/appwrite';
import '@/components/animations/spinner.css';

const AmbassadorRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAmbassadorRole = async () => {
      try {
        const roles = await getUserRole();
        setIsAmbassador(roles.includes('ambassador'));

        if (!roles.includes('ambassador')) {
          router.push('/'); // Omdirigera om användaren inte är ambassadör
        }
      } catch (error) {
        router.push('/sign-in'); // Omdirigera till inloggningssidan vid fel
      } finally {
        setLoading(false);
      }
    };

    checkAmbassadorRole();
  }, [router]);

  if (loading) {
    return <div className="spinner" style={{ borderRightColor: '#2268CD' }}></div>; // Visa en laddningsindikator medan vi väntar på att kontrollera rollen
  }

  if (!isAmbassador) {
    return null; // Visa inget om användaren inte är ambassadör
  }

  return <>{children}</>;
};

export default AmbassadorRoute;
