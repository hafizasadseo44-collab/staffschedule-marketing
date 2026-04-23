import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { priceId, planName } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.staffschedule.io";

    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not defined in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Use Stripe API directly via fetch (to avoid npm package issues in this environment)
    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        mode: "subscription",
        success_url: `${appUrl}/onboarding.php?session_id={CHECKOUT_SESSION_ID}&plan=${planName}`,
        cancel_url: `${appUrl}/billing.php?canceled=1`,
        // We set customer_creation to always so we can retrieve email later
        "subscription_data[metadata][planName]": planName,
      }),
    });

    const session = await stripeResponse.json();

    if (session.error) {
      console.error("Stripe Error:", session.error);
      return NextResponse.json({ error: session.error.message }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
