'use client';

import Link from "next/link";
import Image from "next/image";

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
       <div className="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6698a6bb4f3dfbc3a06f8906" data-style-height="25px" data-style-width="50%">
          <div href="https://www.trustpilot.com/review/stunote.se" target="_blank" rel="noopener">
            <Image src="/icons/trustpilotLogo.svg" width={25} height={25} alt="Trustpilot Icon" />
          </div>
      </div>
      </div>
      <div className="text-xxs sm:text-xs md:text-sm text-white">
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
        .text-xxs {
          font-size: 0.625rem; /* Equivalent to 10px */
        }
      `}</style>
    </footer>
  );
};

export default Footer;
