'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';
import Counter from '@/components/animations/counter/count';
import { FaUserFriends } from 'react-icons/fa';
import { IoDocumentTextOutline } from "react-icons/io5";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen text-white p-8">
      <div className="absolute top-14 left-14 max-lg:hidden">
        <p style={{
          fontFamily: 'Poppins, sans-serif',
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
      <div className="flex flex-col justify-center flex-1 text-left mt-10 md:mt-20 ml-2 md:ml-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-orange-1 w-full max-w-3xl">CREATED BY STUDENTS</h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 w-full max-w-3xl">FOR STUDENTS!</h2>
        <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 max-w-2xl">
          Welcome to StuNote - The best student platform! Access high-quality, course-relevant content and buy or sell used textbooks.<br/>Join us and learn together!
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '60px' }}>
          <Counter icon={<FaUserFriends />} endValue={100} text="Students" />
          <Counter icon={<IoDocumentTextOutline />} endValue={200} text="Documents" />
        </div>
        <div className="flex space-x-4 mb-8">
          <Link href="/sign-in">
            <Button variant="default" className="lg:hidden" size="sm">
              LOGIN
            </Button>
            <Button variant="default" className="hidden lg:block" size="xlg">
              LOGIN
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default" className="lg:hidden" size="sm">
              SIGN UP
            </Button>
            <Button variant="default" className="hidden lg:block" size="xlg">
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
