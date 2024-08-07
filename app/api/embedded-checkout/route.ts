import { NextResponse } from 'next/server';
import { stripe } from '../../utils/stripe';

export async function POST(request: Request) {
    try {
        const { priceId, userId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            subscription_data: {
                trial_period_days: 7,
            },
            client_reference_id: userId,
            return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        console.log("Created session:", session);

        return NextResponse.json({ client_secret: session.client_secret });
    } catch (error: any) {
        console.error("Error creating session:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
