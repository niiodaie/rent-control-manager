import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CreditCard, Shield, ArrowLeft } from 'lucide-react';
import { mockRedirectToCheckout } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';
import { PLANS } from '../config/plans';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const planId = searchParams.get('plan');
  const interval = searchParams.get('interval') || 'monthly';
  
  const plan = PLANS[planId];

  useEffect(() => {
    if (!plan || !user) {
      navigate('/choose-plan');
      return;
    }

    // Auto-redirect to Stripe Checkout
    const initiateCheckout = async () => {
      try {
        setLoading(true);
        const lookupKey = interval === 'yearly' ? plan.yearlyLookupKey : plan.lookupKey;
        
        if (!lookupKey) {
          throw new Error('Invalid plan configuration');
        }

        await mockRedirectToCheckout(lookupKey, user.email);
      } catch (err) {
        console.error('Checkout error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Small delay to show the loading state
    const timer = setTimeout(initiateCheckout, 1500);
    return () => clearTimeout(timer);
  }, [plan, user, interval, navigate]);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <button
            onClick={() => navigate('/choose-plan')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Choose a Plan
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = () => {
    if (plan.price === 'Custom') return 'Custom';
    if (plan.price === 0) return 'Free';
    
    const price = interval === 'yearly' ? plan.price * 10 : plan.price;
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/choose-plan')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600">
            You're subscribing to the {plan.name} plan
          </p>
        </div>

        {/* Plan Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 capitalize">{interval} billing</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice()}
                {plan.price !== 'Custom' && plan.price !== 0 && (
                  <span className="text-sm font-normal text-gray-600">
                    /{interval === 'yearly' ? 'year' : 'month'}
                  </span>
                )}
              </div>
              {interval === 'yearly' && plan.price !== 'Custom' && plan.price !== 0 && (
                <p className="text-sm text-green-600">Save 20% with yearly billing</p>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
            <ul className="space-y-1">
              {plan.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-sm text-gray-500">
                  +{plan.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Loading/Error State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Redirecting to Secure Checkout
            </h3>
            <p className="text-gray-600 mb-4">
              Please wait while we prepare your payment...
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Stripe Powered
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/choose-plan')}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Back to Plans
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Your payment is processed securely by Stripe. We never store your payment information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

