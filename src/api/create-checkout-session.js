import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

/**
 * POST /api/create-checkout-session
 * body: { planLookupKey: string; customerEmail?: string; customerId?: string; }
 * returns: { url: string }
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Basic env validation (helps catch misconfig in prod)
  if (!process.env.STRIPE_SECRET_KEY || !process.env.APP_URL) {
    return res.status(500).json({
      error:
        "Server not configured. Missing STRIPE_SECRET_KEY or APP_URL environment variables.",
    });
  }

  try {
    const { planLookupKey, customerEmail, customerId } = req.body || {};

    if (!planLookupKey) {
      return res.status(400).json({ error: "Missing planLookupKey" });
    }

    // Resolve lookup key -> Price
    const { data: prices } = await stripe.prices.list({
      lookup_keys: [planLookupKey],
      active: true,
      limit: 1,
      expand: ["data.product"],
    });

    if (!prices?.length) {
      return res.status(400).json({ error: "Invalid planLookupKey" });
    }

    const price = prices[0];

    // Prefer an existing Stripe customer when you have one; otherwise use email.
    // You can wire customerId from your users table if stored.
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      // one of these is fine; if you have a saved customer, pass customer:
      ...(customerId ? { customer: customerId } : {}),
      ...(customerEmail && !customerId ? { customer_email: customerEmail } : {}),
      allow_promotion_codes: true,
      billing_address_collection: "required",

      // Where to send users after success/cancel:
      success_url: `${process.env.APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/billing/cancel`,

      // Optional: metadata you want to receive on webhook events
      metadata: {
        plan_lookup_key: planLookupKey,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe create-checkout-session error:", err);
    // Avoid leaking internal errors to clients
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
