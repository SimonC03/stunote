import Stripe from 'stripe';

// Kontrollera att miljövariabeln är definierad
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export { stripe };
