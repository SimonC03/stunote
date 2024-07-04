import { Client, Account, Databases, Storage } from 'appwrite';

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

// Funktion för att hämta användarens roll via Labels
export const getUserRole = async (): Promise<string | null> => {
  try {
    const user = await account.get();

    if (user.labels.includes('admin')) {
      return 'admin';
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Failed to fetch user role:', error);
    throw new Error('Failed to fetch user role');
  }
};