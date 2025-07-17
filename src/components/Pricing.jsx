import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Check, Star, Loader2 } from 'lucide-react';
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {t('pricing.save20')}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {t('pricing.mostPopular')}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through mr-2">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingCycle === 'monthly' ? t('pricing.month') : t('pricing.year')}
                  </span>
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            {t('pricing.freeForever')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('pricing.noSetupFees')} • {t('pricing.cancelAnytime')} • {t('pricing.support247')}
          </p>
        </div>
      </div>
    </section>
  );
}

