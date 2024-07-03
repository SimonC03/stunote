'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-l from-blue-400 to-blue-800 text-white p-8">
      <div className="absolute top-14 left-14 max-lg:hidden">
      <p style={{
        fontFamily: 'Popplins, sans-serif',
        fontSize: '2em',
        fontWeight: 'bold',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
      }}>
        STUNOTE
      </p>
      </div>
      <div className="flex flex-col justify-center flex-1 text-left mt-20 ml-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-orange-1 w-full max-w-3xl">CREATED BY STUDENTS</h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 w-full max-w-3xl">FOR STUDENTS!</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Welcome to StuNote - your ultimate global student platform! We make studying easier by offering high-quality, course-relevant content. Join us today and let’s learn together!
        </p>
        <div className="flex space-x-4 mb-8 ">
          <Link href="/sign-in">
          <Button variant="default" size="lg">
              LOGIN
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default" size="lg">
              SIGN UP
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
