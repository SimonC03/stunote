'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/UserContext';
import HomePage from './(root)/page'; // Justera sökvägen efter behov
import LandingPage from './(auth)/LandingPage'; // Justera sökvägen efter behov
import RootLayout from './(root)/layout';
import '@/components/animations/spinner.css'; // Importera CSS-filen

const MainPage: React.FC = () => {
  const { user, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); // Redirect to home page if user is logged in
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? (
    <RootLayout>
      <HomePage />
    </RootLayout>
  ) : (
    <LandingPage />
  );
};

export default MainPage;
