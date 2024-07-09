'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    if (user) {
      await logout();
      setLoading(false);
      router.push('/sign-in'); // Omdirigera till inloggningssidan efter utloggning
    } else {
      console.error('User is not authenticated');
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} variant="default" size="sm" loading={loading}>
      Logout
    </Button>
  );
};

export default LogoutButton;
