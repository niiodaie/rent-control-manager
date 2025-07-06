import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Check, 
  X, 
  Crown, 
  Building2, 
  Users, 
  CreditCard, 
  Zap,
  Star,
  Shield,
  Headphones,
  BarChart3,
  Globe,
  Smartphone,
  AlertCircle,
  Loader2
} from 'lucide-react';

const PricingPlans = ({ showUpgrade = false, currentPlan = null }) => {
  const { t } = useTranslation();
  const { user, apiCall } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      limits: {
        properties: 1,
        residents: 5,
        storage: '1 GB',
        support: 'Community'
      },
      features: [
        'Up to 1 property',
        'Up to 5 residents',
        'Basic rent collection',
        'Tenant applications',
        'Basic maintenance tracking',
        'Email notifications',
        '1 GB document storage',
        'Community support'
      ],
      restrictions: [
        'Ads displayed',
        'Limited customization',
        'Basic reporting only'
      ],
      popular: false,
      color: 'border-gray-200',
      buttonVariant: 'outline'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Best for growing property managers',
      price: { monthly: 49.99, yearly: 499.99 },
      limits: {
        properties: 5,
        residents: 100,
        storage: '50 GB',
        support: 'Email & Chat'
      },
      features: [
        'Up to 5 properties',
        'Up to 100 residents',
        'Advanced rent collection',
        'Automated late fees',
        'Custom lease templates',
        'Advanced maintenance tracking',
        'SMS & email notifications',
        'Custom branding',
        '50 GB document storage',
        'Priority email & chat support',
        'Advanced reporting',
        'Mobile app access'
      ],
      restrictions: [],
      popular: true,
      color: 'border-blue-500',
      buttonVariant: 'default'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large property management companies',
      price: { monthly: 499.99, yearly: 4999.99 },
      limits: {
        properties: 'Unlimited',
        residents: 'Unlimited',
        storage: '1 TB',
        support: 'Dedicated Account Manager'
      },
      features: [
        'Unlimited properties',
        'Unlimited residents',
        'White-label solution',
        'Custom integrations',
        'API access',
        'Advanced analytics',
        'Multi-location management',
        'Custom workflows',
        'Unlimited document storage',
        'Dedicated account manager',
        'Phone support',
        'Custom training',
        'SLA guarantee',
        'Advanced security features'
      ],
      restrictions: [],
      popular: false,
      color: 'border-purple-500',
      buttonVariant: 'secondary'
    }
  ];

  const handleSelectPlan = async (plan) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    if (plan.id === 'free') {
      // Handle free plan selection
      try {
        setLoading(true);
        const response = await apiCall('/api/subscriptions/free', {
          method: 'POST',
          body: JSON.stringify({
            userId: user.id,
            plan: 'free'
          })
        });

        if (response.success) {
          window.location.reload();
        } else {
          alert('Failed to activate free plan: ' + response.error);
        }
      } catch (error) {
        console.error('Error activating free plan:', error);
        alert('Failed to activate free plan');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Handle paid plan selection
    try {
      setLoading(true);
      setSelectedPlan(plan.id);

      const priceAmount = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
      
      const response = await apiCall('/api/subscriptions/create-checkout', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          planId: plan.id,
          billingCycle,
          priceAmount,
          successUrl: `${window.location.origin}/dashboard?subscription=success`,
          cancelUrl: `${window.location.origin}/pricing?subscription=cancelled`
        })
      });

      if (response.success && response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert('Failed to create checkout session: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start subscription process');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price % 1 === 0 ? 0 : 2
    }).format(price);
  };

  const getYearlySavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyPrice = plan.price.yearly;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  const isPlanActive = (planId) => {
    return currentPlan?.id === planId;
  };

  const canUpgradeTo = (planId) => {
    if (!currentPlan) return true;
    
    const planOrder = { free: 0, premium: 1, enterprise: 2 };
    return planOrder[planId] > planOrder[currentPlan.id];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start with our free plan and upgrade as your property portfolio grows. 
          All plans include our core rent collection features with 2% processing fee.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={billingCycle === 'yearly' ? 'font-medium' : 'text-muted-foreground'}>
            Yearly
            <Badge variant="secondary" className="ml-2">Save up to 17%</Badge>
          </span>
        </div>
      </div>

      {/* Upgrade Alert */}
      {showUpgrade && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached the limits of your current plan. Upgrade to continue adding properties and residents.
          </AlertDescription>
        </Alert>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isActive = isPlanActive(plan.id);
          const canUpgrade = canUpgradeTo(plan.id);
          const savings = billingCycle === 'yearly' && plan.price.yearly > 0 ? getYearlySavings(plan) : null;
          const isLoading = loading && selectedPlan === plan.id;

          return (
            <Card 
              key={plan.id} 
              className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''} ${
                isActive ? 'bg-green-50 dark:bg-green-950/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {isActive && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="default" className="bg-green-500">
                    <Check className="h-3 w-3 mr-1" />
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  {plan.id === 'free' && <Building2 className="h-6 w-6" />}
                  {plan.id === 'premium' && <Crown className="h-6 w-6 text-blue-500" />}
                  {plan.id === 'enterprise' && <Shield className="h-6 w-6 text-purple-500" />}
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.price[billingCycle] === 0 ? (
                      'Free'
                    ) : (
                      <>
                        {formatPrice(plan.price[billingCycle])}
                        <span className="text-lg font-normal text-muted-foreground">
                          /{billingCycle === 'yearly' ? 'year' : 'month'}
                        </span>
                      </>
                    )}
                  </div>
                  
                  {savings && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {formatPrice(savings.amount)} ({savings.percentage}%) yearly
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Plan Limits */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Plan Limits
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.limits.properties} properties</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.limits.residents} residents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.limits.storage} storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.limits.support}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Features Included
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions */}
                {plan.restrictions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  variant={isActive ? 'outline' : plan.buttonVariant}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isActive || (!canUpgrade && currentPlan) || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : isActive ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Current Plan
                    </>
                  ) : !canUpgrade && currentPlan ? (
                    'Downgrade Not Available'
                  ) : plan.id === 'free' ? (
                    'Get Started Free'
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {currentPlan ? 'Upgrade Now' : 'Start Free Trial'}
                    </>
                  )}
                </Button>

                {plan.id === 'premium' && !isActive && (
                  <p className="text-xs text-center text-muted-foreground">
                    14-day free trial, then {formatPrice(plan.price[billingCycle])}/{billingCycle === 'yearly' ? 'year' : 'month'}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <CreditCard className="h-8 w-8 text-blue-500" />
            <div className="text-left">
              <p className="font-medium">2% Processing Fee</p>
              <p className="text-sm text-muted-foreground">On all rent payments</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-green-500" />
            <div className="text-left">
              <p className="font-medium">Secure & Compliant</p>
              <p className="text-sm text-muted-foreground">Bank-level security</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Smartphone className="h-8 w-8 text-purple-500" />
            <div className="text-left">
              <p className="font-medium">Mobile Optimized</p>
              <p className="text-sm text-muted-foreground">Works on all devices</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            All plans include our core features: rent collection, tenant management, lease tracking, and basic reporting.
            <br />
            Need a custom solution? <a href="mailto:sales@visnec.com" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;

