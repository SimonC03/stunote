"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamisk import av ResetPasswordFormContent för att säkerställa att den endast används på klientsidan
const ResetPasswordFormContent = dynamic(() => import('./ResetPasswordFormContent'), { ssr: false });

const ResetPasswordForm: React.FC = () => (
  <Suspense fallback={<div>Loading form...</div>}>
    <ResetPasswordFormContent />
  </Suspense>
);

export default ResetPasswordForm;
