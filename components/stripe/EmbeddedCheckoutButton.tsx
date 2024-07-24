"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";

interface EmbeddedCheckoutButtonProps {
  priceId: string;
  featured: boolean;
}

const EmbeddedCheckoutButton: React.FC<EmbeddedCheckoutButtonProps> = ({ priceId, featured }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/embedded-checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("API response data:", data);
        if (data.client_secret) {
            return data.client_secret;
        } else {
            throw new Error("Missing client_secret in response");
        }
    })
    .catch((error) => {
        setError("Failed to fetch client secret");
        console.error("fetchClientSecret error:", error);
    });
}, [priceId]);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      handleCloseModal();
    }
  };

  return (
    <div id="checkout" className="my-4">
      <button className={`mt-12 w-full py-4 px-8 rounded-lg text-lg whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all flex justify-center items-center ${
        featured ? "bg-blue-500 hover:bg-blue-1 text-white-1 hover:scale-105 transform" : "bg-white text-blue-1 hover:bg-gray-50"
      }`} onClick={handleCheckoutClick}>
        Start your free trial
      </button>
      
      <dialog 
        ref={modalRef} 
        className="modal" 
        onClick={handleOutsideClick}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '600px',
          zIndex: 1000,
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '0.5rem'
        }}>
        <div className="modal-box">
          <div className="modal-header" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <h3 className="font-bold text-lg">Checkout</h3>
          </div>
          <div className="py-4">
            {error && <p className="text-red-500">{error}</p>}
            {showCheckout && (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmbeddedCheckoutButton;
