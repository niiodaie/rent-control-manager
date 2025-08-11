// API endpoint for creating Stripe checkout sessions
// This would typically be deployed as a serverless function

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (request) => {
  if (request.method !== 'POST') {
    return {
      status: 405,
      body: { error: 'Method not allowed' }
    };
  }

  try {
    const { planLookupKey, customerEmail } = request.body;

    if (!planLookupKey) {
      return {
        status: 400,
        body: { error: 'Plan lookup key is required' }
      };
    }

    // Create checkout session using lookup key
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: planLookupKey, // Using lookup key instead of hardcoded price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/choose-plan`,
      metadata: {
        customer_email: customerEmail,
        plan_lookup_key: planLookupKey,
      },
      subscription_data: {
        metadata: {
          customer_email: customerEmail,
          plan_lookup_key: planLookupKey,
        },
      },
    });

    return {
      status: 200,
      body: { url: session.url }
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      status: 500,
      body: { error: 'Failed to create checkout session' }
    };
  }
};

// For Vercel deployment
export default async function handler(req, res) {
  const result = await createCheckoutSession({
    method: req.method,
    body: req.body
  });

  res.status(result.status).json(result.body);
}

