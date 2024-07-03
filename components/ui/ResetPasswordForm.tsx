"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ResetPasswordFormContent = dynamic(() => import('./ResetPasswordFormContent'), { ssr: false });

const ResetPasswordForm: React.FC = () => (
  <Suspense fallback={<div>Loading form...</div>}>
    <ResetPasswordFormContent />
  </Suspense>
);

export default ResetPasswordForm;
