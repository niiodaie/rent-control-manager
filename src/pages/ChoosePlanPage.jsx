import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Zap } from 'lucide-react';
import { PLANS } from '../config/plans';
import { mockRedirectToCheckout } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';

const ChoosePlanPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(null);
  const [billingInterval, setBillingInterval] = useState('monthly');

  const handlePlanSelection = async (plan) => {
    if (plan.id === 'free') {
      // Free plan - activate immediately and route to dashboard
      navigate('/admin/dashboard');
      return;
    }

    if (plan.id === 'enterprise') {
      // Enterprise plan - contact sales
      navigate('/contact');
      return;
    }

    // Paid plans - redirect to Stripe Checkout
    setLoading(plan.id);
    try {
      const lookupKey = billingInterval === 'yearly' ? plan.yearlyLookupKey : plan.lookupKey;
      const customerEmail = user?.email || '';
      
      await mockRedirectToCheckout(lookupKey, customerEmail);
    } catch (error) {
      console.error('Error processing plan selection:', error);
      setLoading(null);
    }
  };

  const formatPrice = (plan) => {
    if (plan.price === 'Custom') return 'Custom';
    if (plan.price === 0) return 'Free';
    
    const price = billingInterval === 'yearly' ? plan.price * 10 : plan.price; // 2 months free yearly
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Select the perfect plan for your property management needs
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingInterval === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingInterval === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.values(PLANS).map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {formatPrice(plan)}
                    {plan.price !== 'Custom' && plan.price !== 0 && (
                      <span className="text-lg font-normal text-gray-600">
                        /{billingInterval === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingInterval === 'yearly' && plan.price !== 'Custom' && plan.price !== 0 && (
                    <p className="text-sm text-green-600">
                      2 months free with yearly billing
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  } ${
                    loading === plan.id
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-lg'
                  }`}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    plan.cta
                  )}
                </button>

                {plan.id !== 'free' && plan.id !== 'enterprise' && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    14-day free trial • No credit card required
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Cancel anytime
            </div>
          </div>
          
          <p className="text-gray-500 mt-4">
            Need help choosing? <a href="/contact" className="text-blue-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanPage;

