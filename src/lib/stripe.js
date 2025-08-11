import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

export { stripePromise };

// Stripe API helper functions
export const createCheckoutSession = async (planLookupKey, customerEmail) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planLookupKey,
        customerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (planLookupKey, customerEmail) => {
  try {
    const checkoutUrl = await createCheckoutSession(planLookupKey, customerEmail);
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

// Mock implementation for development
export const mockCreateCheckoutSession = async (planLookupKey, customerEmail) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock success URL for development
  const mockSessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9);
  return `${window.location.origin}/billing/success?session_id=${mockSessionId}`;
};

export const mockRedirectToCheckout = async (planLookupKey, customerEmail) => {
  try {
    const checkoutUrl = await mockCreateCheckoutSession(planLookupKey, customerEmail);
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Error with mock checkout:', error);
    throw error;
  }
};

