"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamisk import av ResetPasswordForm för att säkerställa att den endast används på klientsidan
const ResetPasswordForm = dynamic(() => import('@/components/ui/ResetPasswordForm'), { ssr: false });

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto">
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
};

export default ResetPasswordPage;
