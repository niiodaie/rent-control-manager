import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;

// API base URL for backend communication
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

// Stripe checkout session creation
export const createCheckoutSession = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Payment verification
export const verifyPayment = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify-payment?session_id=${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Currency formatting utility
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Stripe amounts are in cents
};

// Supported currencies for global payments
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
];

// Get user's preferred currency based on location
export const getUserCurrency = () => {
  // This could be enhanced with geolocation API
  const userLocale = navigator.language || 'en-US';
  const currencyMap = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-CA': 'CAD',
    'en-AU': 'AUD',
    'de': 'EUR',
    'fr': 'EUR',
    'es': 'EUR',
    'it': 'EUR',
    'ja': 'JPY',
    'sv': 'SEK',
    'no': 'NOK',
    'da': 'DKK',
  };

  return currencyMap[userLocale] || 'USD';
};

