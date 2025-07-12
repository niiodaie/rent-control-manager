import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual property owners",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Up to 5 properties",
        "Basic tenant management",
        "Online rent collection",
        "Maintenance requests",
        "Email support",
        "Mobile app access"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing property portfolios",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "Up to 25 properties",
        "Advanced tenant screening",
        "Automated rent collection",
        "Maintenance workflow",
        "Financial reporting",
        "Priority support",
        "Custom lease templates",
        "Tenant portal"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large property management companies",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Unlimited properties",
        "Advanced analytics",
        "Multi-user accounts",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "White-label options",
        "Advanced security",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  const getPrice = (plan) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice;
    return monthlyCost - annualCost;
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <span className="text-blue-600 block">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your property management needs. 
            All plans include a 14-day free trial with no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isAnnual 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isAnnual 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular 
                  ? 'border-blue-600 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-all duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>

                {isAnnual && (
                  <div className="text-green-600 text-sm font-medium">
                    Save ${getSavings(plan)} per year
                  </div>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.buttonVariant}
                className={`w-full py-3 text-lg font-semibold ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : ''
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Need a Custom Solution?
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer custom enterprise solutions for large property management companies 
              with specific requirements. Contact our sales team to discuss your needs.
            </p>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have questions about our pricing? 
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Contact us
            </a> or check out our 
            <a href="#faq" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              frequently asked questions
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

