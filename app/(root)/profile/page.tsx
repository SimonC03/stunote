'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '@/context/UserContext';
import {
  account, isPhoneVerified, isEmailVerified, updatePhoneNumber,
  updateEmail, updateUsername, verifyEmail, getUserRole, getUser
} from '@/lib/appwrite';
import { toast } from 'react-hot-toast';
import { getSchools, getEducations } from '@/lib/schools';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getUserData, updateEducation, UserProfile } from '@/lib/api';

const ProfilePage: React.FC = () => {
  const { user, loading } = useUserContext();
  const [profile, setProfile] = useState<any | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [educations, setEducations] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  const [memberType, setMemberType] = useState<string | null>(null);
  const [showPhoneVerificationField, setShowPhoneVerificationField] = useState<boolean>(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userInfo = await getUser();
          
          setUserId(userInfo.$id);

          const userData = await getUserData(userInfo.$id);
          setUserData(userData);

          const userRoles = await getUserRole();
          const hasPremiumRole = userRoles.includes('premium');
          setMemberType(hasPremiumRole ? 'premium' : 'free');

          const emailVerifiedStatus = await isEmailVerified();
          const phoneVerifiedStatus = await isPhoneVerified();
          setEmailVerified(emailVerifiedStatus);
          setPhoneVerified(phoneVerifiedStatus);

          setProfile({
            username: user.name,
            email: user.email,
            phoneNumber: user.phone || '',
            school: userData.school || '',
            education: userData.education || '',
          });
          setPhoneNumber(user.phone || '');
          setSelectedSchool(userData.school || '');
          setSelectedEducation(userData.education || '');
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
    };

    const fetchSchools = async () => {
      try {
        const schoolsData = await getSchools();
        setSchools(schoolsData);
      } catch (error) {
        console.error('Failed to fetch schools', error);
      }
    };

    if (!loading) {
      fetchUserData();
      fetchSchools();
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchEducations = async () => {
      if (selectedSchool) {
        try {
          const educationsData = await getEducations(selectedSchool);
          setEducations(educationsData);
        } catch (error) {
          console.error('Failed to fetch educations', error);
        }
      }
    };

    fetchEducations();
  }, [selectedSchool]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file?.name.split('.').pop()?.toLowerCase();

    if (file && fileExtension && validImageExtensions.includes(fileExtension)) {
      // saveProfilePicture(file);  // Update this function to match your requirements
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(e.target.value);
    setSelectedEducation('');
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEducation(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profile && userId) {
      setLoadingButton(true);
      try {
        if (profile.username !== user?.name) {
          await updateUsername(profile.username);
        }
        if (profile.phoneNumber !== phoneNumber) {
          await updatePhoneNumber(phoneNumber, password, userId);
        }
        if (profile.email !== user.email) {
          await updateEmail(profile.email, password, userId);
        }
        if (selectedSchool && selectedEducation) {
          await updateEducation(selectedSchool, selectedEducation, userId);
        }

        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error('Failed to update profile');
        console.error('Failed to update profile', error);
      } finally {
        setLoadingButton(false);
      }
    }
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.startsWith('46')) {
      return '+' + cleaned.slice(0, 11);
    } else if (cleaned.startsWith('0')) {
      return '+46' + cleaned.slice(1, 10);
    } else {
      return '+46' + cleaned.slice(0, 9);
    }
  };

  const verifyPhoneNumber = async () => {
    try {
      await account.createPhoneVerification();
      toast.success('Verification SMS sent');
      setShowPhoneVerificationField(true);
    } catch (error) {
      toast.error('Failed to send verification SMS');
      console.error('Failed to send verification SMS', error);
    }
  };

  const handlePhoneVerification = async () => {
    try {
      await account.updatePhoneVerification(userId!, phoneVerificationCode);
      toast.success('Phone verification successful');
      setPhoneVerified(true);
      setShowPhoneVerificationField(false);
    } catch (error) {
      toast.error('Phone verification failed');
      console.error('Phone verification failed', error);
    }
  };

  if (loading || !profile) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const getStyles = (): { [key: string]: React.CSSProperties } => {
    return isMobile ? { ...styles, ...mobileStyles } : styles;
  };

  return (
    <div style={getStyles().profileContainer}>
      <div style={getStyles().profileSidebar}>
        <div style={getStyles().profileImageContainer}>
          <Image
            src={profile.iconUrl || '/icons/avatar.svg'}
            alt="Profile"
            style={getStyles().profileImage}
            width={150}
            height={150}
          />
          <Button
            variant="default"
            size="xs"
            style={getStyles().changePictureButton}
            onClick={() => fileInputRef.current?.click()}
          >
            Change Profile Picture
          </Button>
          <input
            type="file"
            id="iconUrl"
            name="iconUrl"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
        <div style={getStyles().subscriptionPlan}>
          <div style={getStyles().subscriptionText}>
            Account: {memberType === 'premium' ? 'Premium' : 'Free'}
          </div>
        </div>
      </div>
      <div style={getStyles().profileFormContainer}>
        <form onSubmit={handleSubmit} style={getStyles().profileForm}>
          <div style={getStyles().formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              required
              style={getStyles().formInput}
            />
          </div>
          <div style={getStyles().formGroup}>
            <label htmlFor="email">Email</label>
            <div style={getStyles().inputWrapper}>
              <input
                type="text"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                readOnly={emailVerified}
                style={getStyles().formInput}
              />
              {emailVerified ? (
                <span style={getStyles().verifiedBadge}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4 10.586a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              ) : (
                <Button type="button" variant="default" size="sm" style={getStyles().verifyButton} onClick={verifyEmail}>Verify</Button>
              )}
            </div>
          </div>
          <div style={getStyles().formGroup}>
            <label htmlFor="phone">Phone</label>
            <div style={getStyles().inputWrapper}>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                readOnly={phoneVerified}
                style={getStyles().formInput}
              />
              {phoneNumber ? (
                phoneVerified ? (
                  <span style={getStyles().verifiedBadge}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4 10.586a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                ) : (
                  phoneNumber && (
                    <Button type="button" variant="default" size="sm" style={getStyles().verifyButton} onClick={verifyPhoneNumber}>
                      Verify
                    </Button>
                  )
                )
              ) : null}
            </div>
          </div>
          {showPhoneVerificationField && (
            <div style={getStyles().formGroup}>
              <label htmlFor="phone">Enter verification code</label>
              <div style={getStyles().inputWrapper}>
                <input
                  type="text"
                  value={phoneVerificationCode}
                  onChange={(e) => setPhoneVerificationCode(e.target.value)}
                  style={getStyles().formInput}
                />
                <Button
                  type="button"
                  style={getStyles().verifyButton}
                  onClick={handlePhoneVerification}
                  size="sm"
                >
                  Enter
                </Button>
              </div>
            </div>
          )}
          <div style={getStyles().formGroup}>
            <label htmlFor="school">School</label>
            <select
              id="school"
              name="school"
              value={selectedSchool}
              onChange={handleSchoolChange}
              style={getStyles().formInput}
            >
              <option value="">Select a school</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
          <div style={getStyles().formGroup}>
            <label htmlFor="education">Education</label>
            <select
              id="education"
              name="education"
              value={selectedEducation}
              onChange={handleEducationChange}
              style={getStyles().formInput}
              disabled={!selectedSchool}
            >
              <option value="">Select an education</option>
              {educations.map((education) => (
                <option key={education} value={education}>
                  {education}
                </option>
              ))}
            </select>
          </div>
          <div style={getStyles().formGroupRow}>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={getStyles().passwordInput}
              required
            />
            <Button
              type="submit"
              variant="default"
              size="default"
              loading={loadingButton}
              style={getStyles().saveButton}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  profileContainer: {
    display: 'flex',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    marginTop: '20%',
  },
  profileSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRight: '1px solid #ddd',
  },
  profileImageContainer: {
    position: 'relative',
    width: '150px',
    height: '150px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  changePictureButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px auto 0',
    width: '80%',
    boxSizing: 'border-box',
    fontSize: '10px',
  },
  subscriptionPlan: {
    textAlign: 'center',
    marginTop: '60px',
    fontWeight: 'bold',
  },
  subscriptionInput: {
    width: '100px',
    margin: '10px 0',
    padding: '5px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  profileFormContainer: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginLeft: '20px',
  },
  profileForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  verifyButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '11px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formGroupRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordInput: {
    marginRight: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

const mobileStyles: { [key: string]: React.CSSProperties } = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    marginTop: '10%',
  },
  profileSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderRight: 'none',
    borderBottom: '1px solid #ddd',
  },
  profileImageContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  changePictureButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px auto 0',
    width: '100px',
    fontSize: '8px',
  },
  subscriptionPlan: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  subscriptionInput: {
    width: '80px',
    margin: '10px 0',
    padding: '5px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  profileFormContainer: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginLeft: '0',
    marginTop: '20px',
  },
  profileForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  verifiedBadge: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  verifyButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  formGroupRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  passwordInput: {
    marginRight: '0',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
};

export default ProfilePage;
