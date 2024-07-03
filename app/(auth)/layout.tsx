import NoProtectedRoute from '@/components/NoProtectedRoute';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoProtectedRoute>
    <main className="auth-container">
      {children}
    </main>      
    </NoProtectedRoute>
  );
}
