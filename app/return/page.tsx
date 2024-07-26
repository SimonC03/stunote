import { stripe } from "../utils/stripe";

interface SearchParams {
  session_id: string;
  user_id: string; // Lägg till user_id här
}

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const userId = searchParams.user_id; // Hämta userId från searchParams
  const session = await getSession(sessionId);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        {session?.payment_status === "unpaid" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
            <p className="text-red-500">Payment did not work. Please try again.</p>
          </div>
        ) : session?.payment_status === "paid" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-green-500">We appreciate your subscription!</p>
            <p>Your Stripe customer ID is: <span className="font-mono">{session.customer as string}</span></p>
            <p>Your User ID is: <span className="font-mono">{userId}</span></p>
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
