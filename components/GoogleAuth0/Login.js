import React from 'react';
import { account } from '@/lib/appwrite';
import './GoogleAuthButton.css';
import { toast } from 'react-hot-toast';

const GoogleAuthButton = () => {
  const handleLogin = async () => {
    try {
      // Försök att logga in med Google
      await account.createOAuth2Session(
        'google',
        'https://stunote.se/',
        'https://stunote.se/login'
      );
    } catch (error) {
      // Om det uppstår ett fel, visa ett felmeddelande
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <button 
      type="button" 
      className="login-with-google-btn mt-4" 
      onClick={handleLogin}
    >
      Login with Google
    </button>
  );
};

export default GoogleAuthButton;
