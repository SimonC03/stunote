const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Ditt API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Ditt projekt-ID
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!); // Din API-nyckel

const users = new sdk.Users(client);

export async function updateUserLabels(userId: string, labels: string[]): Promise<void> {
    try {
        // Använd den korrekta metoden för att uppdatera användarens etiketter
        const response = await users.updateLabels(userId, { labels });
        console.log("User labels updated successfully:", response);
    } catch (error: any) {
        console.error("Failed to update user labels:", error.message || error);
        throw new Error(`Failed to update user labels for user ${userId}: ${error.message || error}`);
    }
}
