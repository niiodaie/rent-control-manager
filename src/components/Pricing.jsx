import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individual property owners',
    price: { monthly: 29, annual: 290 },
    icon: Zap,
    features: [
      'Up to 5 properties',
      'Basic tenant management',
      'Online rent collection',
      'Maintenance requests',
      'Email support',
      'Mobile app access',
      'Basic reporting'
    ],
    popular: false
  },
  {
    name: 'Professional',
    description: 'Ideal for growing property portfolios',
    price: { monthly: 79, annual: 790 },
    icon: Star,
    features: [
      'Up to 50 properties',
      'Advanced tenant screening',
      'Automated rent collection',
      'Maintenance workflow',
      'Financial reporting',
      'Priority support',
      'Custom lease templates',
      'Tenant portal',
      'Multi-currency support',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For large property management companies',
    price: { monthly: 199, annual: 1990 },
    icon: Crown,
    features: [
      'Unlimited properties',
      'Advanced analytics',
      'Multi-user accounts',
      'White-label options',
      'Custom integrations',
      'Dedicated support',
      'Advanced security',
      'Custom reporting',
      'Global compliance',
      'SLA guarantee',
      'Training & onboarding'
    ],
    popular: false
  }
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Simple, Transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Global Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your property management needs. 
            All plans include a 14-day free trial with no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const period = isAnnual ? 'year' : 'month';
            
            return (
              <Card 
                key={index} 
                className={`pricing-card relative ${
                  plan.popular 
                    ? 'ring-2 ring-blue-600 shadow-xl scale-105' 
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <div className="text-4xl font-bold">
                      ${price}
                      <span className="text-lg font-normal text-muted-foreground">
                        /{period}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-muted-foreground mt-1">
                        ${Math.round(price / 12)}/month billed annually
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                    }`}
                    size="lg"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enterprise Contact */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Global Solution?</h3>
            <p className="text-muted-foreground mb-6">
              We offer custom enterprise solutions for large property management companies 
              with specific requirements across multiple countries and jurisdictions.
            </p>
            <Button variant="outline" size="lg">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Have questions about our pricing?{' '}
            <a href="#contact" className="text-blue-600 hover:underline">
              Contact us
            </a>{' '}
            or check out our{' '}
            <a href="#faq" className="text-blue-600 hover:underline">
              frequently asked questions
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

