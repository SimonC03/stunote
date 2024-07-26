import React from 'react';
import { account } from '@/lib/appwrite';
import { toast } from 'react-hot-toast';

const LinkedinAuthButton = () => {
  const handleLogin = async () => {
    try {
      // Försök att logga in med LinkedIn
      await account.createOAuth2Session(
        'linkedin',
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
      className="mt-4"
      onClick={handleLogin}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        maxWidth: '16rem',
        padding: '0.5rem 1.5rem',
        textAlign: 'center',
        fontSize: '0.775rem',
        fontWeight: '500',
        color: '#1f2937',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e5e7eb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(100, 116, 139, 0.2)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = '#d1d5db';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      <svg 
        className="h-6 w-6 mr-2" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        viewBox="0 -2 44 44" 
        version="1.1"
        style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }}
      >
        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Color-" transform="translate(-702.000000, -265.000000)" fill="#007EBB">
            <path d="M746,305 L736.2754,305 L736.2754,290.9384 C736.2754,287.257796 734.754233,284.74515 731.409219,284.74515 C728.850659,284.74515 727.427799,286.440738 726.765522,288.074854 C726.517168,288.661395 726.555974,289.478453 726.555974,290.295511 L726.555974,305 L716.921919,305 C716.921919,305 717.046096,280.091247 716.921919,277.827047 L726.555974,277.827047 L726.555974,282.091631 C727.125118,280.226996 730.203669,277.565794 735.116416,277.565794 C741.21143,277.565794 746,281.474355 746,289.890824 L746,305 L746,305 Z M707.17921,274.428187 L707.117121,274.428187 C704.0127,274.428187 702,272.350964 702,269.717936 C702,267.033681 704.072201,265 707.238711,265 C710.402634,265 712.348071,267.028559 712.41016,269.710252 C712.41016,272.34328 710.402634,274.428187 707.17921,274.428187 L707.17921,274.428187 L707.17921,274.428187 Z M703.109831,277.827047 L711.685795,277.827047 L711.685795,305 L703.109831,305 L703.109831,277.827047 L703.109831,277.827047 Z" id="LinkedIn"/>
          </g>
        </g>
      </svg>
      <span>Continue with LinkedIn</span>
    </button>
  );
};

export default LinkedinAuthButton;
