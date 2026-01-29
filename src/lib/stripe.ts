import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "STRIPE_SECRET_KEY is missing. Stripe functionality will not work.",
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "dummy_key", {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
} as unknown as Stripe.StripeConfig);
