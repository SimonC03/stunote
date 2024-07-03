'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../lib/appwrite';

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await account.get();
        setUser(userDetails);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
