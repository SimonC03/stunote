import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center p-4 bg-transparent mt-auto w-full">
      <div className="flex space-x-20 mb-4">
        <Link href="https://www.instagram.com/stunote/" target="_blank" rel="noopener noreferrer">
          <Image src="/icons/instagramLogo.svg" width={25} height={25} alt="Instagram Icon" />
        </Link>
        <Link href="https://www.linkedin.com/company/stunote/" target="_blank" rel="noopener noreferrer">
          <Image src="/icons/linkedinLogo.svg" width={25} height={25} alt="LinkedIn Icon" />
        </Link>
      </div>
      <div className="text-xs sm:text-sm md:text-base text-white">
        <p>Stunote is not affiliated with or supported by any school, college, or university.</p>
        <p>Copyright © 2024 Stunote</p>
      </div>        
    </footer>
  );
};

export default Footer;
