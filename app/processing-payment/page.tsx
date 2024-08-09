import { redirect } from 'next/navigation';
import { stripe } from "../utils/stripe";

interface SearchParams {
  session_id: string;
  user_id: string;
}

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

// Funktion för att uppdatera användarens label till premium via din API
async function updateUserToPremium(userId: string) {
  const response = await fetch('http://stunote.se/api/updatelabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, label: 'premium' }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user label to premium');
  }

  return await response.json();
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const userId = searchParams.user_id;
  const session = await getSession(sessionId);

  if (session?.payment_status === "paid") {
    // Uppdatera användarens label till premium
    try {
      await updateUserToPremium(userId);
      // Omdirigera till return-sidan efter framgångsrik uppdatering
      redirect("/return");
    } catch (error) {
      console.error('Error updating user to premium:', error);
      // Hantera fel (t.ex. visa ett felmeddelande eller logga felet)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        {session?.payment_status === "unpaid" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
            <p className="text-red-500">Payment did not work. Please try again.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
            <p>Please wait while we process your payment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
