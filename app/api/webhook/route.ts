import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  ensureOrdersSchema,
  getPool,
  getStripe,
  getStripeWebhookSecret,
  logServerError,
} from "@/lib/server-services";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    event = getStripe().webhooks.constructEvent(body, signature, getStripeWebhookSecret());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown webhook error";
    console.error(`Webhook signature verification failed: ${message}`);

    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const stripeId = paymentIntent.id;

    try {
      await ensureOrdersSchema();
      await getPool().query(
        `
          UPDATE orders
          SET status = 'PROCESSING'::order_status
          WHERE stripe_intent_id = $1
        `,
        [stripeId]
      );
    } catch (dbError) {
      logServerError("Webhook database update failed:", dbError);

      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
