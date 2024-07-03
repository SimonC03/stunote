"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { toast } from 'react-hot-toast';

const VerificationPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'rateLimit' | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (userId && secret) {
        try {
          await account.updateVerification(userId, secret);
          toast.success('Verification successful');
          setVerificationStatus('success');
          // Omdirigera till profilsidan efter en kort fördröjning
          setTimeout(() => {
            router.push('/profile');
          }, 3000); // Fördröjning på 3 sekunder innan omdirigering
        } catch (error: any) {
          if (error.code === 429) {
            toast.error('Rate limit exceeded. Please try again later.');
            setVerificationStatus('rateLimit');
          } else {
            toast.error('Verification failed');
            setVerificationStatus('failed');
          }
          console.error('Verification failed', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setVerificationStatus('failed');
      }
    };

    verify();
  }, [userId, secret, router]);

  const renderContent = () => {
    if (loading) {
      return <p>Verifying...</p>;
    }

    switch (verificationStatus) {
      case 'success':
        return <p>Verification successful! Redirecting to your profile...</p>;
      case 'rateLimit':
        return <p>Rate limit exceeded. Please try again later.</p>;
      case 'failed':
        return <p>Verification failed. Please check the link and try again.</p>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Email Verification</h1>
        {renderContent()}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#2268CD',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
};

export default VerificationPageContent;
