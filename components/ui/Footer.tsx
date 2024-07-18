'use client';

import Link from "next/link";
import Image from "next/image";
import TrustpilotLogo from '/public/icons/trustpilotLogo.svg';  // Anpassa sökvägen till var du har sparat SVG-filen

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center p-4 bg-transparent mt-auto w-full">
      <div className="flex space-x-10 sm:space-x-20 mb-4">
        <Link href="https://www.instagram.com/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="social-icon w-4 h-4 sm:w-6 sm:h-6">
            <Image src="/icons/instagramLogo.svg" width={25} height={25} alt="Instagram Icon" />
          </div>
        </Link>
        <Link href="https://www.linkedin.com/company/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="social-icon w-4 h-4 sm:w-6 sm:h-6">
            <Image src="/icons/linkedinLogo.svg" width={25} height={25} alt="LinkedIn Icon" />
          </div>
        </Link>
        <Link href="https://www.trustpilot.com/review/stunote.se" target="_blank" rel="noopener noreferrer">
          <div className="social-icon w-4 h-4 sm:w-6 sm:h-6">
            <Image src={TrustpilotLogo} height={25} alt="Trustpilot Icon" />
          </div>
        </Link>
      </div>
      <div className="text-white text-sm sm:text-base mt-4">
        © 2023 StuNote. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
