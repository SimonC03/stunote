"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const VerificationPageContent = dynamic(() => import('@/components/ui/VerificationPageContent'), { ssr: false });

const VerificationPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationPageContent />
    </Suspense>
  );
};

export default VerificationPage;
