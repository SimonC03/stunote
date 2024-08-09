import { ID, Permission, Role } from 'appwrite';
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
        created_at: paymentData.created_at,
      },
      [
        Permission.read(Role.user(paymentData.userId)), // Tillåt användaren att läsa sin egen betalningsdata
        Permission.write(Role.user(paymentData.userId)), // Tillåt användaren att skriva sin egen betalningsdata (om det behövs)
        Permission.delete(Role.user(paymentData.userId)), // Tillåt användaren att radera sin egen betalningsdata (om det behövs)
      ]
    );

    console.log('Payment data saved successfully:', response);
  } catch (error: any) {
    console.error('Failed to save payment data:', error);
    throw new Error('Failed to save payment data');
  }
};