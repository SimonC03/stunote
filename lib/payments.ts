import { ID, Permission, Role, Query } from 'appwrite';
import { databases } from './appwrite';

// Hämta miljövariabler för databas och kollektion
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const paymentsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PAYMENTS_COLLECTION_ID!;

export interface PaymentData {
    userId: string;
    StripeCustomerId: string;
    sessionId: string;
    payment_status: string;
    payment_method: string;
    created_at: string;
}

export const savePaymentData = async (paymentData: PaymentData): Promise<void> => {
    try {
        // Kontrollera att created_at är i ISO 8601-format
        if (!paymentData.created_at) {
            paymentData.created_at = new Date().toISOString(); // Generera ISO 8601-tid om det saknas
        }

        // Skapa nytt dokument om det inte redan finns
        const response = await databases.createDocument(
            databaseId,
            paymentsCollectionId,
            ID.unique(),
            {
                userId: paymentData.userId,
                StripeCustomerId: paymentData.StripeCustomerId,
                sessionId: paymentData.sessionId,
                payment_status: paymentData.payment_status,
                payment_method: paymentData.payment_method,
                created_at: paymentData.created_at, // Inkludera korrekt formaterat created_at
            },
            [
                Permission.read(Role.any()),  // Tillåt vem som helst att läsa dokumentet
                Permission.write(Role.any()), // Tillåt vem som helst att skriva dokumentet
            ]
        );

        console.log('Payment data saved successfully:', response);
    } catch (error: any) {
        console.error('Failed to save payment data:', error);
        throw new Error('Failed to save payment data');
    }
};

export const doesUserIdExist = async (userId: string): Promise<boolean> => {
    try {
        console.log(`Checking if userId ${userId} exists in the database...`);

        const existingDocuments = await databases.listDocuments(
            databaseId,
            paymentsCollectionId,
            [Query.equal('userId', userId)]
        );

        console.log(`Documents found: ${existingDocuments.total}`);

        return existingDocuments.total > 0;
    } catch (error: any) {
        console.error('Failed to check if userId exists:', error.message);
        throw new Error('Failed to check if userId exists');
    }
};