import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Check, Star } from 'lucide-react';
import { apiService } from '../services/api';

export function Pricing() {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(null);

  const handleStartTrial = async (planName) => {
    if (planName === 'Starter') {
      window.location.href = '/signup?plan=starter';
      return;
    }

    setLoading(planName);
    
    try {
      // For paid plans, create Stripe subscription session
      const planData = {
        planName: planName.toLowerCase(),
        billingCycle: isAnnual ? 'annual' : 'monthly',
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`
      };

      const response = await apiService.createSubscriptionSession(planData);
      
      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      } else {
        // Fallback to signup page if API is not available
        window.location.href = `/signup?plan=${planName.toLowerCase()}`;
      }
    } catch (error) {
      console.error('Payment session creation failed:', error);
      // Fallback to signup page on error
      window.location.href = `/signup?plan=${planName.toLowerCase()}`;
    } finally {
      setLoading(null);
    }
  };

  const handleContactSales = () => {
    window.location.href = '/contact?inquiry=enterprise';
  };

  const pricingPlans = {
    monthly: [
      {
        name: t('pricing.starter.name'),
        price: 0,
        description: t('pricing.starter.description'),
        features: [
          t('pricing.starter.features.properties'),
          t('pricing.starter.features.tenantManagement'),
          t('pricing.starter.features.rentCollection'),
          t('pricing.starter.features.emailSupport'),
          t('pricing.starter.features.mobileApp'),
          t('pricing.starter.features.basicReporting')
        ],
        cta: t('pricing.starter.cta'),
        popular: false
      },
      {
        name: t('pricing.professional.name'),
        price: 49.99,
        description: t('pricing.professional.description'),
        features: [
          t('pricing.professional.features.properties'),
          t('pricing.professional.features.tenantPortal'),
          t('pricing.professional.features.multiCurrency'),
          t('pricing.professional.features.maintenance'),
          t('pricing.professional.features.prioritySupport'),
          t('pricing.professional.features.analytics'),
          t('pricing.professional.features.apiAccess'),
          t('pricing.professional.features.branding')
        ],
        cta: t('pricing.professional.cta'),
        popular: true
      },
      {
        name: t('pricing.premium.name'),
        price: 99.99,
        description: t('pricing.premium.description'),
        features: [
          t('pricing.premium.features.properties'),
          t('pricing.premium.features.multiLanguage'),
          t('pricing.premium.features.globalPayments'),
          t('pricing.premium.features.automation'),
          t('pricing.premium.features.phoneSupport'),
          t('pricing.premium.features.whiteLabel'),
          t('pricing.premium.features.integrations'),
          t('pricing.premium.features.customReports')
        ],
        cta: t('pricing.premium.cta'),
        popular: false
      },
      {
        name: t('pricing.enterprise.name'),
        price: 499.99,
        description: t('pricing.enterprise.description'),
        features: [
          t('pricing.enterprise.features.unlimited'),
          t('pricing.enterprise.features.customization'),
          t('pricing.enterprise.features.dedicatedSupport'),
          t('pricing.enterprise.features.sla'),
          t('pricing.enterprise.features.onboarding'),
          t('pricing.enterprise.features.compliance'),
          t('pricing.enterprise.features.sso'),
          t('pricing.enterprise.features.training')
        ],
        cta: t('pricing.enterprise.cta'),
        popular: false
      }
    ],
    annual: [
      {
        name: t('pricing.starter.name'),
        price: 0,
        description: t('pricing.starter.description'),
        features: [
          t('pricing.starter.features.properties'),
          t('pricing.starter.features.tenantManagement'),
          t('pricing.starter.features.rentCollection'),
          t('pricing.starter.features.emailSupport'),
          t('pricing.starter.features.mobileApp'),
          t('pricing.starter.features.basicReporting')
        ],
        cta: t('pricing.starter.cta'),
        popular: false
      },
      {
        name: t('pricing.professional.name'),
        price: 41.58,
        originalPrice: 49.99,
        description: t('pricing.professional.description'),
        features: [
          t('pricing.professional.features.properties'),
          t('pricing.professional.features.tenantPortal'),
          t('pricing.professional.features.multiCurrency'),
          t('pricing.professional.features.maintenance'),
          t('pricing.professional.features.prioritySupport'),
          t('pricing.professional.features.analytics'),
          t('pricing.professional.features.apiAccess'),
          t('pricing.professional.features.branding')
        ],
        cta: t('pricing.professional.cta'),
        popular: true
      },
      {
        name: t('pricing.premium.name'),
        price: 83.25,
        originalPrice: 99.99,
        description: t('pricing.premium.description'),
        features: [
          t('pricing.premium.features.properties'),
          t('pricing.premium.features.multiLanguage'),
          t('pricing.premium.features.globalPayments'),
          t('pricing.premium.features.automation'),
          t('pricing.premium.features.phoneSupport'),
          t('pricing.premium.features.whiteLabel'),
          t('pricing.premium.features.integrations'),
          t('pricing.premium.features.customReports')
        ],
        cta: t('pricing.premium.cta'),
        popular: false
      },
      {
        name: t('pricing.enterprise.name'),
        price: 416.58,
        originalPrice: 499.99,
        description: t('pricing.enterprise.description'),
        features: [
          t('pricing.enterprise.features.unlimited'),
          t('pricing.enterprise.features.customization'),
          t('pricing.enterprise.features.dedicatedSupport'),
          t('pricing.enterprise.features.sla'),
          t('pricing.enterprise.features.onboarding'),
          t('pricing.enterprise.features.compliance'),
          t('pricing.enterprise.features.sso'),
          t('pricing.enterprise.features.training')
        ],
        cta: t('pricing.enterprise.cta'),
        popular: false
      }
    ]
  };

  const currentPlans = isAnnual ? pricingPlans.annual : pricingPlans.monthly;

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              {t('pricing.monthly')}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              {t('pricing.annual')}
            </span>
            {isAnnual && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {t('pricing.save17')}
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-primary text-primary-foreground shadow-2xl scale-105'
                  : 'bg-card border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {t('pricing.mostPopular')}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${plan.price === 0 ? '0' : plan.price.toFixed(2)}
                  </span>
                  {plan.price > 0 && (
                    <span className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      /{isAnnual ? t('pricing.perMonth') : t('pricing.perMonth')}
                    </span>
                  )}
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${plan.originalPrice.toFixed(2)}/{t('pricing.perMonth')}
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-primary-foreground' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : ''
                }`}
                variant={plan.popular ? 'secondary' : 'default'}
                onClick={() => plan.name === t('pricing.enterprise.name') ? handleContactSales() : handleStartTrial(plan.name)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? 'Processing...' : plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t('pricing.needHelp')}
          </p>
          <Button variant="outline" onClick={handleContactSales}>
            {t('pricing.contactSales')}
          </Button>
        </div>
      </div>
    </section>
  );
}

