"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/lib/firebase/auth-context";
import { trackEvent } from "@/lib/analytics/actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeButton() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (!user) {
      alert("Please login to upgrade.");
      return;
    }

    setLoading(true);

    try {
      await trackEvent("checkout_start");
      const token = await user.getIdToken();
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await (stripe as any).redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirect error:", error);
        }
      }

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold transition-colors hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : "Upgrade to Pro"}
    </button>
  );
}
