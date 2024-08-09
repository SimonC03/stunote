import { updateUserLabels } from "@/lib/sdk";
import { stripe } from "../utils/stripe";
import { redirect } from "next/navigation";

interface SearchParams {
  session_id: string;
  user_id: string; // Lägg till user_id här om det används på något annat sätt
}

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  // Använd session.client_reference_id som userId
  const userId = session?.client_reference_id;

  // Om betalningen är godkänd, uppdatera användarens etiketter
  if (session?.payment_status === "paid" && userId) {
    const labels = ["premium"]; // Lägg till 'premium'-etiketten

    try {
      await updateUserLabels(userId, labels);
      // Visa bekräftelsemeddelande om att betalningen är godkänd och premium är tillagd
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-green-500">Your payment was successful, and you have been upgraded to premium!</p>
            <p>Your Stripe customer ID is: <span className="font-mono">{session.customer as string}</span></p>
            <p>Your User ID is: <span className="font-mono">{userId}</span></p>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error updating user labels:", error);
      // Hantera felet här om etikettuppdateringen misslyckas
    }
  }

  // Rendera relevant information baserat på betalningsstatus om betalningen inte är godkänd eller är under behandling
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
