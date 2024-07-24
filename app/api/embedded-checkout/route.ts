// app/api/embedded-checkout/route.ts
import { NextResponse } from 'next/server';
import { stripe } from '../../utils/stripe';

export async function POST(request: Request) {
    try {
        const { priceId } = await request.json();
        console.log("Received priceId:", priceId);

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription', // Ändra till 'payment' om det är en engångsbetalning
            return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        console.log("Created session:", session);

        return NextResponse.json({ client_secret: session.client_secret });
    } catch (error: any) {
        console.error("Error creating session:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
