'use client'

import { useEffect, useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "./LogoutButton"
import ProfileIcon from "./ProfileIcon"
import { getUserRole } from '@/lib/appwrite'; // Importera getUserRole

const MobileNav = () => {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRoles = async () => {
        try {
            const roles = await getUserRole();
            // Sätt isAdmin till true om 'admin' finns i rollerna
            setIsAdmin(roles.includes('admin'));
        } catch (error) {
            console.error('Failed to fetch user roles:', error);
            // Hantera eventuella fel här
        }
    };

    fetchUserRoles();
}, []);

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
            <Image src="/icons/logo.svg" alt="logo" width={27} height={27}/>
            <h1 className="text-24 font-extrabold text-white-1 ml-2">STUNOTE</h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks
                  .filter(link => !link.admin || (link.admin && isAdmin))
                  .map(({ route, label, imgURL }) => {
                    const isActive = pathname === route || pathname.startsWith(`${route}/`);

                    return (
                      <SheetClose asChild key={route}>
                        <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                          'bg-nav-focus border-r-4 border-orange-1': isActive
                        })}>
                          <Image src={imgURL} alt={label} width={24} height={24}/>
                          <p>{label}</p>
                        </Link>
                      </SheetClose>
                    );
                  })}
              </nav>
            </SheetClose>
            <div className="flex flex-col gap-6 py-4 max-lg:px-4 justify-start text-white-1 mb-14">
              <ProfileIcon/>
              <LogoutButton/>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav;
