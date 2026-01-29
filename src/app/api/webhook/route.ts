import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase/admin";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");
  // The webhook secret is required
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Webhook Secret or Signature missing", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (userId) {
          // Update Firestore
          await adminDb.collection("users").doc(userId).set(
            {
              isPro: true,
              subscriptionStatus: "active",
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              updatedAt: new Date().toISOString(),
            },
            { merge: true },
          );
          console.log(`User ${userId} upgraded to Pro.`);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        // Often we get customer ID here, we can look up user by stripeCustomerId
        const customerId = invoice.customer as string;
        const subscriptionId = (invoice as any).subscription as string;

        // If needed, we can update status based on invoice, but checkout.session.completed is usually enough for initial upgrade.
        // This is good for renewal updates.
        // We need to find the user with this customerId.
        const usersSnapshot = await adminDb
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .limit(1)
          .get();
        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          if (userDoc) {
            await userDoc.ref.update({
              subscriptionStatus: "active",
              stripeSubscriptionId: subscriptionId,
              updatedAt: new Date().toISOString(),
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const usersSnapshot = await adminDb
          .collection("users")
          .where("stripeCustomerId", "==", customerId)
          .limit(1)
          .get();
        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          if (userDoc) {
            await userDoc.ref.update({
              isPro: false,
              subscriptionStatus: "canceled",
              updatedAt: new Date().toISOString(),
            });
            console.log(
              `Subscription canceled for user document ${userDoc.id}`,
            );
          }
        }
        break;
      }

      // Handle other events like invoice.payment_failed if needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook processing failed", { status: 500 });
  }

  return new NextResponse("Webhook received", { status: 200 });
}
