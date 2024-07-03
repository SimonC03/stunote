'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';
import Image from 'next/image';
import { getUserData, UserProfile } from '@/lib/api';

const ProfileIcon: React.FC = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [profileIconUrl, setProfileIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.$id) {
        try {
          const userData: UserProfile = await getUserData(user.$id);
          setProfileIconUrl(userData.iconUrl || '/icons/avatar.svg');
        } catch (error) {
          console.error('Failed to fetch user profile data:', error);
          setProfileIconUrl('/icons/avatar.svg');
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleProfileClick = () => {
    router.push('/profile');
  };

  if (!user) {
    return null; // Rendera ingenting om användaren inte är inloggad
  }

  return (
    <div onClick={handleProfileClick} className="flex items-center gap-3 py-4 max-lg:px-4 cursor-pointer">
      <Image
        src={profileIconUrl || '/icons/avatar.svg'} // Default profile image if user doesn't have one
        alt="Profile"
        width={24}
        height={24}
        className="rounded-full"
      />
      <p>Profile</p>
    </div>
  );
};

export default ProfileIcon;
