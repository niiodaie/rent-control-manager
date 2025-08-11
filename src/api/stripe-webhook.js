// Stripe webhook handler for subscription management
// This would typically be deployed as a serverless function or API endpoint

import Stripe from 'stripe';
import { supabase } from '../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleStripeWebhook = async (request) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return { status: 400, body: `Webhook Error: ${err.message}` };
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { status: 200, body: 'Webhook handled successfully' };
  } catch (error) {
    console.error('Error handling webhook:', error);
    return { status: 500, body: 'Internal server error' };
  }
};

const handleCheckoutCompleted = async (session) => {
  console.log('Checkout completed:', session.id);
  
  // The subscription will be handled by subscription.created event
  // This is mainly for logging and additional processing if needed
};

const handleSubscriptionUpdated = async (subscription) => {
  console.log('Subscription updated:', subscription.id);
  
  try {
    // Get the price and its metadata
    const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
    const planKey = price.metadata.plan_key;
    const limits = {
      properties: parseInt(price.metadata.properties_limit) || 1,
      unitsPerProperty: parseInt(price.metadata.units_per_property_limit) || 5,
      admins: parseInt(price.metadata.admins_limit) || 1,
      ads: price.metadata.ads === 'true',
      support: price.metadata.support || 'email'
    };

    // Get customer email to find user
    const customer = await stripe.customers.retrieve(subscription.customer);
    
    // Find user by email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;
    
    const user = userData.users.find(u => u.email === customer.email);
    if (!user) {
      console.error('User not found for email:', customer.email);
      return;
    }

    // Upsert subscription record
    const { error: upsertError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user.id,
        plan_key: planKey,
        plan_status: subscription.status,
        stripe_customer_id: subscription.customer,
        stripe_subscription_id: subscription.id,
        limits: limits,
        updated_at: new Date().toISOString()
      });

    if (upsertError) {
      console.error('Error upserting subscription:', upsertError);
      throw upsertError;
    }

    console.log(`Subscription updated for user ${user.id}: ${planKey}`);
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw error;
  }
};

const handleSubscriptionDeleted = async (subscription) => {
  console.log('Subscription deleted:', subscription.id);
  
  try {
    // Update subscription status to canceled
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating canceled subscription:', error);
      throw error;
    }

    console.log(`Subscription canceled: ${subscription.id}`);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
};

const handleInvoicePaid = async (invoice) => {
  console.log('Invoice paid:', invoice.id);
  
  // Additional processing for successful payments
  // Could update payment history, send confirmation emails, etc.
};

const handlePaymentFailed = async (invoice) => {
  console.log('Payment failed:', invoice.id);
  
  try {
    // Get subscription and update status if needed
    if (invoice.subscription) {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          plan_status: 'past_due',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_subscription_id', invoice.subscription);

      if (error) {
        console.error('Error updating subscription for failed payment:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
};

// Helper function to create checkout session
export const createCheckoutSession = async (planLookupKey, customerEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: planLookupKey, // Using lookup key instead of price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/choose-plan`,
      metadata: {
        customer_email: customerEmail,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Helper function to create customer portal session
export const createPortalSession = async (customerId) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.APP_URL}/billing`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

