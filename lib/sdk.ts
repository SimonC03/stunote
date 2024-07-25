import { Client, Users } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!);

const users = new Users(client);

export const addPremiumLabelToUser = async (userId: string) => {
  try {
    console.log("Running SDK")
    // Hämta användarens nuvarande etiketter
    const user = await users.get(userId);
    const currentLabels = user.labels || [];

    // Lägg till 'premium' etikett om den inte redan finns
    if (!currentLabels.includes('premium')) {
      currentLabels.push('premium');
    }

    // Uppdatera användarens etiketter
    const response = await users.updateLabels(userId, currentLabels);
    console.log(response);
    return true;
  } catch (error) {
    console.error('Failed to add premium label to user:', error);
    throw new Error('Failed to add premium label to user');
  }
};
