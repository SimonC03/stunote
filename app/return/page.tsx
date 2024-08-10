import { updateUserLabels } from "@/lib/sdk";
import { stripe } from "../utils/stripe";
import { doesUserIdExist, PaymentData, savePaymentData } from "@/lib/payments";
import Link from "next/link";
import { checkEmailVerificationAndLabel } from "@/lib/appwrite";  // Importera funktionen för att kontrollera användarens etikett

interface SearchParams {
  session_id: string;
  user_id: string;
}

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  const userId = session?.client_reference_id;

  if (session?.payment_status === "paid" && userId) {
    const labels = ["premium"];
    const maxAttempts = 5;  // Max antal försök
    let attempt = 0;
    let isPremium = false;

    while (attempt < maxAttempts && !isPremium) {
      try {
        attempt += 1;
        console.log(`Attempt ${attempt} to update user labels...`);

        // Uppdatera användarens etiketter
        await updateUserLabels(userId, labels);

        // Kontrollera om användaren har "premium"-etiketten
        const { userLabel } = await checkEmailVerificationAndLabel();
        if (userLabel === "premium") {
          isPremium = true;
          console.log("User is confirmed as premium.");

          // Spara betalningsdata i databasen
          const paymentData: PaymentData = {
            userId: userId,
            StripeCustomerId: session.customer as string,
            sessionId: sessionId,
            payment_status: session.payment_status,
            payment_method: session.payment_method_types?.[0] || "unknown",
            created_at: new Date().toISOString(),
          };

          await savePaymentData(paymentData);

          // Visa bekräftelsemeddelande om att betalningen är godkänd och premium är tillagd
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="text-green-500">Your payment was successful!</p>
                <Link href="/" replace>
                  <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                    Continue
                  </a>
                </Link>
              </div>
            </div>
          );
        } else {
          console.warn("User is not yet premium, retrying...");
        }
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt >= maxAttempts) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-red-500">Failed to process your payment. Please contact support.</p>
              </div>
            </div>
          );
        }
      }
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
