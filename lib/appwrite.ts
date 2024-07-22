import { Client, Account, Databases, Storage } from 'appwrite';
import toast from 'react-hot-toast';

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Uppdatera användarens namn
export const updateUsername = async (name: string) => {
  try {
    await account.updateName(name);
    return true;
  } catch (error: any) {
    console.error('Failed to update username:', error);
    throw new Error('Failed to update username');
  }
};


// Kontrollera om användarens email är verifierat
export const isEmailVerified = async (): Promise<boolean> => {
  try {
    const response = await account.get();

    return response.emailVerification;
  } catch (error: any) {
    console.error('Failed to check email verification:', error);
    throw new Error('Failed to check email verification');
  }
};

// Kontrollera om användarens telefonnummer är verifierat
export const isPhoneVerified = async (): Promise<boolean> => {
  try {
    const response = await account.get();

    return response.phoneVerification;
  } catch (error: any) {
    console.error('Failed to check phone verification:', error);
    throw new Error('Failed to check phone verification');
  }
};

// Uppdatera användarens telefonnummer
export const updatePhoneNumber = async (phoneNumber: string, password: string, documentId: string) => {
  try {
    await account.updatePhone(phoneNumber, password);

    // Uppdatera telefonnummer i databasen
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      documentId,
      { phoneNumber: phoneNumber }
    );

    return true;
  } catch (error: any) {
    console.error('Failed to update phone number:', error);
    throw new Error('Failed to update phone number');
  }
};

// Uppdatera användarens email
export const updateEmail = async (email: string, password: string, documentId: string) => {
  try {
    await account.updateEmail(email, password);

    // Uppdatera email i databasen
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      documentId,
      { email: email }
    );

    return true;
  } catch (error: any) {
    console.error('Failed to update email:', error);
    throw new Error('Failed to update email');
  }
};

// Function for fetching all user roles via Labels
export const getUserRole = async (): Promise<string[]> => {
  try {
    const user = await account.get();
    const roles: string[] = [];

    if (user.labels.includes('admin')) {
      roles.push('admin');
    }
    if (user.labels.includes('premium')) {
      roles.push('premium');
    }
    
    return roles;
  } catch (error: any) {
    console.error('Failed to fetch user roles:', error);
    throw new Error('Failed to fetch user roles');
  }
};


export const verifyEmail = async (): Promise<boolean> => {
  try {
    const verificationUrl = process.env.NEXT_PUBLIC_APPWRITE_VERIFICATION_URL;
    if (!verificationUrl) {
      throw new Error('Verification URL is not defined');
    }
    await account.createVerification(verificationUrl);
    toast.success('Verification email sent');
    return true;
  } catch (error) {
    toast.error('Failed to send verification email');
    console.error('Failed to send verification email', error);
    return false;
  }
};

// Kontrollera om email är verifierad och vilken label användaren har
export const checkEmailVerificationAndLabel = async (): Promise<{ emailVerified: boolean, userLabel: string | null }> => {
  try {
    const user = await account.get();
    const emailVerified = user.emailVerification;
    const userLabel = user.labels.includes('premium') ? 'premium' : null;

    return { emailVerified, userLabel };
  } catch (error: any) {
    console.error('Failed to check email verification and user label:', error);
    throw new Error('Failed to check email verification and user label');
  }
};
