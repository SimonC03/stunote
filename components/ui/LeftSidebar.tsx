'use client';

import { useEffect, useState } from 'react';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton';
import ProfileIcon from './ProfileIcon';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUserRole } from '@/lib/appwrite'; // Importera getUserRole

const LeftSidebar = () => {
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
    <ProtectedRoute>
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6'>
                <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
                    <Image src="/icons/logo.svg" alt="logo" width={27} height={27}/>
                    <h1 className="text-24 font-extrabold text-white max-lg:hidden">STUNOTE</h1>
                </Link>

                {sidebarLinks
                    .filter(link => !link.admin || (link.admin && isAdmin))
                    .map(({ route, label, imgURL }) => {
                        const isActive = pathname === route || pathname.startsWith(`${route}/`);

                        return (
                            <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                                'bg-nav-focus border-r-4 border-orange-1': isActive
                            })}>
                                <Image src={imgURL} alt={label} width={24} height={24}/>
                                <p>{label}</p>
                            </Link> 
                        );
                    })}
                
            </nav>
            
            <div className="flex flex-col gap-6 py-4 max-lg:px-4 justify-start">
                <ProfileIcon/>
                <div className='flex flex-col max-lg:mr-1 mr-10'>
                    <LogoutButton/>   
                </div>
            </div>  
        </section>
    </ProtectedRoute>
    );
}

export default LeftSidebar;
