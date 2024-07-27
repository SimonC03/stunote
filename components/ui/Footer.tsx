'use client';

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center p-4 bg-transparent mt-auto w-full">
      <div className="flex space-x-10 sm:space-x-20 mb-4">
        <Link href="https://www.instagram.com/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="w-6 h-6 sm:w-8 sm:h-8">
            <Image src="/icons/instagramLogo.svg" width={25} height={25} alt="Instagram Icon" />
          </div>
        </Link>
        <Link href="https://www.linkedin.com/company/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="w-6 h-6 sm:w-8 sm:h-8">
            <Image src="/icons/linkedinLogo.svg" width={25} height={25} alt="LinkedIn Icon" />
          </div>
        </Link>
        <Link href="https://www.trustpilot.com/review/stunote.se" target="_blank" rel="noopener noreferrer">
          <div className="w-24 h-6 sm:w-32 sm:h-8">
            <Image src="/icons/trustpilotLogo.svg" width={100} height={25} alt="Trustpilot Icon" />
          </div>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-5 mb-2 items-center sm:items-start">
        <div className="text-white text-sm sm:text-base mt-2 sm:mt-0">
          © 2024 StuNote. All Rights Reserved.
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-5 mt-2 sm:mt-0">
          <Link href="/terms" rel="noopener noreferrer">
            <p className="text-white text-sm sm:text-base mt-2 sm:mt-0">Terms Of Service</p>
          </Link>
          <Link href="/privacy-policy" rel="noopener noreferrer">
            <p className="text-white text-sm sm:text-base mt-2 sm:mt-0">Privacy Policy</p>
          </Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
