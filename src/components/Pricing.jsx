import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check, Star, Loader2, Tag } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const pricingPlans = {
  monthly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      priceId: null, // Free plan
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
      trialDays: 0
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49.99,
      priceId: 'price_professional_monthly', // Replace with actual Stripe price ID
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
      trialDays: 14
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99.99,
      priceId: 'price_premium_monthly', // Replace with actual Stripe price ID
      description: 'For established property managers',
      features: [
        'Manage up to 50 properties',
        'Multi-language support',
        'Global payment processing',
        'Advanced automation',
        'Phone & chat support',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: false,
      trialDays: 14
    }
  ],
  yearly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      priceId: null,
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
      trialDays: 0
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 499.99,
      originalPrice: 599.88,
      priceId: 'price_professional_yearly', // Replace with actual Stripe price ID
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
      trialDays: 14,
      savings: '17% off'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999.99,
      originalPrice: 1199.88,
      priceId: 'price_premium_yearly', // Replace with actual Stripe price ID
      description: 'For established property managers',
      features: [
        'Manage up to 50 properties',
        'Multi-language support',
        'Global payment processing',
        'Advanced automation',
        'Phone & chat support',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: false,
      trialDays: 14,
      savings: '17% off'
    }
  ]
};

export function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const plans = pricingPlans[billingCycle];

  const handlePlanSelection = async (plan) => {
    if (plan.price === 0) {
      // Free plan - redirect to signup
      navigate('/signup');
      return;
    }

    setLoadingPlan(plan.id);

    try {
      // Create subscription checkout session
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payments/create-subscription-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          email: 'user@example.com', // In production, get from auth context
          trialDays: plan.trialDays,
          promoCode: promoCode || undefined,
          metadata: {
            plan: plan.id,
            billingCycle: billingCycle
          },
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/pricing`
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
              Yearly
              <Badge variant="secondary" className="ml-2">Save 17%</Badge>
            </span>
          </div>

          {/* Promo Code Section */}
          <div className="max-w-md mx-auto mb-8">
            {!showPromoInput ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPromoInput(true)}
                className="text-sm"
              >
                <Tag className="w-4 h-4 mr-2" />
                Have a promo code?
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPromoInput(false)}
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center mt-1">
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        ${plan.originalPrice}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {plan.savings}
                      </Badge>
                    </div>
                  )}
                  
                  {plan.trialDays > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.trialDays}-day free trial
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loadingPlan === plan.id}
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>
                Custom solutions for large property management companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Unlimited Everything</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Unlimited properties</li>
                    <li>• Unlimited users</li>
                    <li>• Custom integrations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Premium Support</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dedicated success manager</li>
                    <li>• 24/7 phone support</li>
                    <li>• Custom training</li>
                  </ul>
                </div>
              </div>
              <Button size="lg" onClick={() => navigate('/contact')}>
                {t('pricing.contactEnterprise')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, and bank transfers in 150+ currencies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
              <p className="text-sm text-muted-foreground">
                No setup fees. Start with our free trial and only pay when you're ready to upgrade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. No long-term contracts required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

