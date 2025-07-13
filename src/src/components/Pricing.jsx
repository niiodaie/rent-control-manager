import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Check, Star, Loader2 } from 'lucide-react';
import { createCheckoutSession, getUserCurrency } from '../lib/stripe';

const pricingPlans = {
  monthly: [
    {
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
      popular: false
    },
    {
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
      popular: true
    },
    {
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
      popular: false
    },
    {
      name: 'Enterprise',
      price: 499.99,
      description: 'For large property management companies',
      features: [
        'Unlimited properties',
        'Global compliance tools',
        'Enterprise security',
        'Custom workflows',
        '24/7 phone support',
        'On-premise deployment',
        'Custom development',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ],
  annual: [
    {
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
      popular: false
    },
    {
      name: 'Professional',
      price: 499.99,
      originalPrice: 599.88,
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
      popular: true
    },
    {
      name: 'Premium',
      price: 999.99,
      originalPrice: 1199.88,
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
      popular: false
    },
    {
      name: 'Enterprise',
      price: 4999.99,
      originalPrice: 5999.88,
      description: 'For large property management companies',
      features: [
        'Unlimited properties',
        'Global compliance tools',
        'Enterprise security',
        'Custom workflows',
        '24/7 phone support',
        'On-premise deployment',
        'Custom development',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]
};

export function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [processingPayment, setProcessingPayment] = useState(null);

  const plans = pricingPlans[billingCycle];

  const handlePlanClick = async (plan) => {
    if (plan.cta === 'Contact Sales') {
      navigate('/contact');
      return;
    }

    if (plan.price === 0) {
      navigate('/signup');
      return;
    }

    // Handle paid plans with Stripe checkout
    setProcessingPayment(plan.name);
    
    try {
      const currency = getUserCurrency();
      const amount = Math.round(plan.price * 100); // Convert to cents
      
      const paymentData = {
        amount,
        currency: currency.toLowerCase(),
        email: 'user@example.com', // This would come from user context
        metadata: {
          plan: plan.name,
          billingCycle,
          userId: 'temp-user-id' // This would come from auth context
        }
      };

      const { url } = await createCheckoutSession(paymentData);
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to start payment process. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <div className="bg-muted rounded-lg p-1">
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
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('pricing.annual')}
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-background rounded-lg shadow-sm p-8 ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                
                <div className="mt-6">
                  {plan.price === 0 ? (
                    <div className="text-4xl font-bold">Free</div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold">
                        ${plan.price}
                        <span className="text-lg font-normal text-muted-foreground">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${plan.originalPrice}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Button 
                  className={`w-full mt-6 ${plan.popular ? '' : 'variant-outline'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanClick(plan)}
                  disabled={processingPayment === plan.name}
                >
                  {processingPayment === plan.name ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('pricing.processing', 'Processing...')}
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-16 text-center">
          <div className="bg-background rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('pricing.customSolution')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('pricing.customSolutionDesc')}
            </p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              {t('pricing.contactEnterprise')}
            </Button>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            {t('pricing.questions')}{' '}
            <a href="/contact" className="text-primary hover:underline">
              {t('pricing.contactUs')}
            </a>
            {' '}or check our{' '}
            <a href="/faq" className="text-primary hover:underline">
              {t('pricing.faqLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

