import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

export { stripePromise }

// Stripe pricing configuration
export const STRIPE_PRICES = {
  starter: {
    monthly: import.meta.env.VITE_STRIPE_STARTER_MONTHLY_PRICE_ID || 'price_starter_monthly',
    yearly: import.meta.env.VITE_STRIPE_STARTER_YEARLY_PRICE_ID || 'price_starter_yearly'
  },
  professional: {
    monthly: import.meta.env.VITE_STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || 'price_professional_monthly',
    yearly: import.meta.env.VITE_STRIPE_PROFESSIONAL_YEARLY_PRICE_ID || 'price_professional_yearly'
  },
  enterprise: {
    monthly: import.meta.env.VITE_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_enterprise_monthly',
    yearly: import.meta.env.VITE_STRIPE_ENTERPRISE_YEARLY_PRICE_ID || 'price_enterprise_yearly'
  }
}

// Helper function to create checkout session
export const createCheckoutSession = async (priceId, userId, userEmail) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        userEmail,
        successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    return sessionId
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Helper function to redirect to Stripe Checkout
export const redirectToCheckout = async (sessionId) => {
  try {
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) {
      console.error('Stripe redirect error:', error)
      throw error
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}

