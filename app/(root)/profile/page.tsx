"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from '@/context/UserContext';
import { getUserData, uploadUserProfilePicture, updateUserProfile, UserProfile } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { account, isPhoneVerified, isEmailVerified, updatePhoneNumber, updateEmail, updateUsername } from '@/lib/appwrite';
import { toast } from 'react-hot-toast';
import { getSchools, getEducations } from '@/lib/schools';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const ProfilePage: React.FC = () => {
  const { user, loading } = useUserContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [educations, setEducations] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  const [showPhoneVerificationField, setShowPhoneVerificationField] = useState<boolean>(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.$id) {
        try {
          const data = await getUserData(user.$id);
          setProfile({
            $id: data.$id,
            username: data.username,
            email: data.email,
            userId: data.userId,
            memberType: data.memberType,
            education: data.education,
            school: data.school,
            iconUrl: data.iconUrl,
            iconId: data.iconId,
            documentId: data.documentId,
            phoneNumber: data.phoneNumber || '',
            subscriptions: data.subscriptions || [],
            favorite_courses: data.favorite_courses || [],
            favorite_documents: data.favorite_documents || [],
          });
          setPhoneNumber(data.phoneNumber || '');
          setSelectedSchool(data.school || '');
          setSelectedEducation(data.education || '');

          const emailVerifiedStatus = await isEmailVerified();
          const phoneVerifiedStatus = await isPhoneVerified();
          setEmailVerified(emailVerifiedStatus);
          setPhoneVerified(phoneVerifiedStatus);
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

  const saveProfilePicture = async (newProfilePicture: File) => {
    if (profile) {
      try {
        const uploadResult = await uploadUserProfilePicture(user.$id, newProfilePicture, profile.iconId);

        if (!uploadResult) {
          throw new Error('Upload result is undefined');
        }

        const updatedProfile = {
          ...profile,
          iconUrl: uploadResult.iconUrl,
          iconId: uploadResult.iconId,
        };

        await updateUserProfile(profile.documentId, {
          iconUrl: uploadResult.iconUrl,
          iconId: uploadResult.iconId,
        }, password);

        setProfile(updatedProfile);
        toast.success('Profile picture updated successfully');
      } catch (error) {
        toast.error('Failed to update profile picture');
        console.error('Failed to update profile picture', error);
      }
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      saveProfilePicture(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      saveProfilePicture(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    if (profile) {
      try {
        // Skapa ett objekt för uppdateringar med endast de fält som har ändrats
        const updatedProfileData: Partial<UserProfile> = {};
  
        if (profile.username !== user?.username) {
          updatedProfileData.username = profile.username;
          await updateUsername(profile.username);
        }
        if (profile.education !== selectedEducation) {
          updatedProfileData.education = selectedEducation;
        }
        if (profile.school !== selectedSchool) {
          updatedProfileData.school = selectedSchool;
        }
        if (profile.iconUrl && profile.iconUrl !== '') {
          updatedProfileData.iconUrl = profile.iconUrl;
        }
        if (profile.iconId && profile.iconId !== '') {
          updatedProfileData.iconId = profile.iconId;
        }
        if (profile.phoneNumber !== phoneNumber) {
          updatedProfileData.phoneNumber = phoneNumber;
        }
  
        // Kontrollera om det finns några ändringar att spara
        if (Object.keys(updatedProfileData).length > 0) {
          await updateUserProfile(profile.documentId, updatedProfileData, password);
          toast.success('Profile updated successfully');
        } else {
          toast.success('No changes to update');
        }
      } catch (error) {
        toast.error('Failed to update profile');
        console.error('Failed to update profile', error);
      }
  
      if (!phoneVerified && phoneNumber !== profile.phoneNumber) {
        try {
          await updatePhoneNumber(phoneNumber, password, profile.documentId);
          toast.success('Phone number updated successfully');
        } catch (error) {
          toast.error('Failed to update phone number');
          console.error('Failed to update phone number', error);
        }
      }
  
      if (!emailVerified && profile.email !== user.email) {
        try {
          await updateEmail(profile.email, password, profile.documentId);
          toast.success('Email updated successfully');
        } catch (error) {
          toast.error('Failed to update email');
          console.error('Failed to update email', error);
        }
      }
    }
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    // Tar bort alla icke-siffror
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Lägger till +46 prefixet och begränsar längden till 11 tecken (2 för landskod och 9 för numret)
    if (cleaned.startsWith('46')) {
      return '+' + cleaned.slice(0, 11); // +46 följt av 9 siffror
    } else if (cleaned.startsWith('0')) {
      return '+46' + cleaned.slice(1, 10); // +46 följt av 9 siffror
    } else {
      return '+46' + cleaned.slice(0, 9); // +46 följt av 9 siffror
    }
  };

  const verifyPhoneNumber = async () => {
    try {
      await account.createPhoneVerification(); // Inget argument behövs
      toast.success('Verification SMS sent');
      setShowPhoneVerificationField(true);
    } catch (error) {
      toast.error('Failed to send verification SMS');
      console.error('Failed to send verification SMS', error);
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const userId = profile?.userId; // Eller vad som passar din struktur
      if (!userId) {
        throw new Error('User ID is not defined');
      }
      await account.updatePhoneVerification(userId, phoneVerificationCode);
      toast.success('Phone verification successful');
      setPhoneVerified(true);
      setShowPhoneVerificationField(false);
    } catch (error) {
      toast.error('Phone verification failed');
      console.error('Phone verification failed', error);
    }
  };

  const verifyEmail = async () => {
    try {
      const verificationUrl = process.env.NEXT_PUBLIC_APPWRITE_VERIFICATION_URL;
      if (!verificationUrl) {
        throw new Error('Verification URL is not defined');
      }
      await account.createVerification(verificationUrl);
      toast.success('Verification email sent');
    } catch (error) {
      toast.error('Failed to send verification email');
      console.error('Failed to send verification email', error);
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
    <ProtectedRoute>
      <div style={getStyles().profileContainer}>
        <div style={getStyles().profileSidebar}>
          <div
            style={getStyles().profileImageContainer}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              id="iconUrl"
              name="iconUrl"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={getStyles().fileInput}
              ref={fileInputRef}
            />
            <Image
              src={profile.iconUrl || '/icons/avatar.svg'}
              alt="Profile"
              style={getStyles().profileImage}
              width={150}
              height={150}
            />
          </div>
          <div style={getStyles().subscriptionPlan}>
            <label>Membership</label>
            <div style={getStyles().subscriptionText}>{profile.memberType}</div>
            <button style={getStyles().changePlanButton}>Change plan</button>
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
                {phoneVerified ? (
                  <span style={getStyles().verifiedBadge}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 4 10.586a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                ) : (
                  <Button type="button" variant="default" size="sm" style={getStyles().verifyButton} onClick={verifyPhoneNumber}>Verify</Button>
                )}
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
                  <button type="button" onClick={handlePhoneVerification} style={getStyles().verifyButton}>
                    Enter
                  </button>
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
              <button type="submit" style={getStyles().saveButton}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
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
    marginBottom: '20px',
    cursor: 'pointer',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  subscriptionPlan: {
    textAlign: 'center',
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
  changePlanButton: {
    marginLeft: '10px',
    padding: '6px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '11px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
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
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  subscriptionPlan: {
    textAlign: 'center',
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
  changePlanButton: {
    marginLeft: '10px',
    padding: '6px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
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
