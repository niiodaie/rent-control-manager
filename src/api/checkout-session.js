import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { session_id } = req.query;
  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    // Expand line items + price + product so we can show plan details
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"],
    });

    const li = session?.line_items?.data?.[0];
    const price = li?.price;
    const product = price?.product;

    const out = {
      id: session.id,
      status: session.status,
      customer_email: session.customer_details?.email || session.customer_email || null,
      subscription_id: session.subscription || null,
      amount_total: session.amount_total, // in cents
      currency: session.currency,
      plan: price
        ? {
            price_id: price.id,
            lookup_key: price.lookup_key || null,
            interval: price.recurring?.interval || null,
            unit_amount: price.unit_amount, // in cents
            product_name: product?.name || null,
          }
        : null,
    };

    return res.status(200).json(out);
  } catch (err) {
    console.error("checkout-session fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch checkout session" });
  }
}
