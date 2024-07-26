import React from 'react';
import { account } from '@/lib/appwrite';
import './GoogleAuthButton.css'

const GoogleAuthButton = () => {
  const handleSignup = async () => {
    account.createOAuth2Session(
      'google',
        'https://stunote.se/',
        'https://stunote.se/sign-up'
    );
  };

  return (
    <button 
      type="button" 
      className="login-with-google-btn mt-4" 
      onClick={handleSignup}
    >
      Sign up with Google
    </button>
  );
};

export default GoogleAuthButton;
