'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AuthBoxProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  buttonText: string;
}

const AuthBox: React.FC<AuthBoxProps> = ({ children, title, subtitle, linkText, linkHref, buttonText }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Created by students, for students!</h1>
        </div>
        <section className="auth-box bg-white shadow-md rounded-lg overflow-hidden flex h-[500px] w-[900px]">
          <div className="auth-left p-8 flex-1 flex flex-col justify-between">
            <Link href="/" className="flex items-center gap-1 mb-6">
              <Image src="/icons/logo.svg" alt="logo" width={70} height={70} />
            </Link>
            <div className="flex flex-col items-center justify-center flex-1">
              <h2 className="text-3xl font-semibold mb-4">{title}</h2>
              {children}
            </div>
          </div>
          <div className="auth-right flex flex-col items-center justify-center bg-gradient-to-l from-blue-500 to-blue-600 text-white p-8 rounded-r-lg">
            <h2 className="text-3xl font-bold">Hello, Student!</h2>
            <p className="mt-4 text-center">{subtitle}</p>
            <Link href={linkHref} className="mt-8">
              <Button type="submit" variant="inverted" size="default" className="w-full">{buttonText}</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthBox;
