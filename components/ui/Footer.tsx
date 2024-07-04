'use client';

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center p-4 bg-transparent mt-auto w-full">
      <div className="flex space-x-20 mb-4">
        <Link href="https://www.instagram.com/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="social-icon">
            <Image src="/icons/instagramLogo.svg" width={25} height={25} alt="Instagram Icon" />
          </div>
        </Link>
        <Link href="https://www.linkedin.com/company/stunote/" target="_blank" rel="noopener noreferrer">
          <div className="social-icon">
            <Image src="/icons/linkedinLogo.svg" width={25} height={25} alt="LinkedIn Icon" />
          </div>
        </Link>
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white">
        <p>Stunote is not affiliated with or supported by any school, college, or university.</p>
        <p>Copyright © 2024 Stunote</p>
      </div>
      <style jsx>{`
        .social-icon {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .social-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
