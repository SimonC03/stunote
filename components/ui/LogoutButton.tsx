'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';
import { Button } from '@/components/ui/button';

const LogoutButton: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useUserContext();

  const handleLogout = async () => {
    if (user) {
      await logout();
      router.push('/sign-in'); // Omdirigera till inloggningssidan efter utloggning
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <Button onClick={handleLogout} variant="default" size="sm">
      Logout
    </Button>
  );
};

export default LogoutButton;
