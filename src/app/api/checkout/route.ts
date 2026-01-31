import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { adminAuth } from "@/lib/firebase/admin";
import { headers } from "next/headers";

export async function POST(_req: Request) {
  try {
    const authHeader = (await headers()).get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const email = decodedToken.email;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Dynamic success/cancel URLs based on the request origin or apphosting domain
    // For now, we use the origin header or fallback to localhost
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO;
    const origin = (await headers()).get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
      customer_email: email,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
