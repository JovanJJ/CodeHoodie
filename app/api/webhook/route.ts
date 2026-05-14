import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Pool } from "pg"; // Import your Postgres connection

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16", // Use the latest API version
});

export async function POST(req: Request) {
    // 1. Get the raw body and Stripe signature
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
        // 2. Verify the event (Security Check)
        // This ensures no one can "fake" a payment by just calling your API
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 3. Handle the specific event type
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const stripeId = paymentIntent.id;

        console.log(`✅ Success! Payment for ${stripeId} was received.`);

        // 4. Update your Database
        // We find the order using the Stripe ID we saved during the "Draft" stage
        try {
            const sql = `
        UPDATE orders 
        SET status = 'PROCESSING'::order_status 
        WHERE stripe_intent_id = $1
      `;
            await pool.query(sql, [stripeId]);

            // Here is where you would also:
            // - Send a confirmation email
            // - Reduce your stock/inventory
        } catch (dbError) {
            console.error("Database update failed:", dbError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
    }

    // 5. Always return a 200 OK to Stripe
    // If you don't respond, Stripe will keep trying to send the message for 3 days!
    return NextResponse.json({ received: true });
}