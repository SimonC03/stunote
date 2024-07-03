"use client";

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamisk import av komponent som använder useSearchParams och useRouter
const VerificationPageContent = dynamic(() => import('@/components/ui/VerificationPageContent'), { ssr: false });

const VerificationPage: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerificationPageContent />
  </Suspense>
);

export default VerificationPage;
