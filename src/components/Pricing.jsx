import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Check, Star, Loader2, Sparkles } from 'lucide-react';
import { createCheckoutSession, redirectToCheckout, STRIPE_PRICES } from '../lib/stripe';

const pricingPlans = {
  monthly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      description: 'Perfect for individual property owners',
      features: [
        'Manage up to 1 property',
        'Basic tenant management',
        'Online rent collection',
        'Email support',
        'Mobile app access',
        'Basic reporting'
      ],
      cta: 'Start Free',
      popular: false,
      stripePrice: null // Free plan
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49.99,
      description: 'Ideal for growing property portfolios',
      features: [
        'Manage up to 10 properties',
        'Advanced tenant portal',
        'Multi-currency support',
        'Maintenance workflows',
        'Priority email support',
        'Advanced analytics',
        'API access',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      popular: true,
      stripePrice: STRIPE_PRICES.professional.monthly
    },
    {
      id: 'enterprise',
      name: 'Premium',
      price: 99.99,
      description: 'For established property managers',
      features: [
        'Manage up to 50 properties',
        'Multi-language support',
        'Global payment processing',
        'Advanced automation',
        'Phone support',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: false,
      stripePrice: STRIPE_PRICES.enterprise.monthly
    }
  ],
  yearly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      description: 'Perfect for individual property owners',
      features: [
        'Manage up to 1 property',
        'Basic tenant management',
        'Online rent collection',
        'Email support',
        'Mobile app access',
        'Basic reporting'
      ],
      cta: 'Start Free',
      popular: false,
      stripePrice: null // Free plan
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 39.99,
      originalPrice: 49.99,
      description: 'Ideal for growing property portfolios',
      features: [
        'Manage up to 10 properties',
        'Advanced tenant portal',
        'Multi-currency support',
        'Maintenance workflows',
        'Priority email support',
        'Advanced analytics',
        'API access',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      popular: true,
      stripePrice: STRIPE_PRICES.professional.yearly
    },
    {
      id: 'enterprise',
      name: 'Premium',
      price: 79.99,
      originalPrice: 99.99,
      description: 'For established property managers',
      features: [
        'Manage up to 50 properties',
        'Multi-language support',
        'Global payment processing',
        'Advanced automation',
        'Phone support',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: false,
      stripePrice: STRIPE_PRICES.enterprise.yearly
    }
  ]
};

export function Pricing() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePlanSelect = async (plan) => {
    if (!user) {
      // Redirect to signup if not authenticated
      navigate('/signup');
      return;
    }

    if (plan.price === 0) {
      // Free plan - redirect to dashboard
      if (user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/resident/dashboard');
      }
      return;
    }

    if (!plan.stripePrice) {
      console.error('No Stripe price ID configured for plan:', plan.id);
      return;
    }

    setLoadingPlan(plan.id);

    try {
      const sessionId = await createCheckoutSession(
        plan.stripePrice,
        user.id,
        user.email
      );
      
      await redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Error processing payment:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = pricingPlans[billingCycle];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300 rounded-full border-0">
            💎 Simple, Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            Simple, Transparent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600">
              Global Pricing
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Choose the perfect plan for your property management needs. All plans include a 14-day free trial with no credit card required.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 shadow-2xl scale-105'
                  : 'bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{plan.description}</p>
                
                <div className="mb-8">
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-slate-400 line-through">
                        ${plan.originalPrice}
                      </span>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1 rounded-full font-bold">
                        Save ${(plan.originalPrice - plan.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
                      : plan.price === 0
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-slate-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-slate-600'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      {plan.popular && <Sparkles className="w-5 h-5 ml-2" />}
                    </>
                  )}
                </Button>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative gradient border for popular plan */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl -z-10 blur-xl"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 mb-6 text-lg font-semibold text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300 rounded-2xl border-0">
            🎉 Free plan available forever - No credit card required
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">24/7 global support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

