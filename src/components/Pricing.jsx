import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ArrowRight } from 'lucide-react';
import { t, getCurrentLanguage } from '../i18n/simple';

export function Pricing() {
  const [currentLang, setCurrentLang] = React.useState('en');

  // Update language when it changes
  React.useEffect(() => {
    const updateLanguage = () => {
      setCurrentLang(getCurrentLanguage());
    };
    
    updateLanguage();
    
    // Listen for language changes
    const handleStorageChange = (e) => {
      if (e.key === 'preferred-language') {
        updateLanguage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started with basic property management',
      features: [
        'Up to 1 property unit',
        'Basic tenant management',
        'Payment tracking',
        'Email support',
        'Mobile app access',
        'Includes ads'
      ],
      popular: false,
      cta: 'Start Free',
      highlight: 'With ads, 1 unit max'
    },
    {
      name: 'Starter',
      price: '$49.99',
      period: '/month',
      description: 'Ideal for small property managers',
      features: [
        'Up to 5 property units',
        'Advanced tenant portal',
        'Automated rent collection',
        'Maintenance management',
        'Financial reporting',
        'Priority support',
        'No ads'
      ],
      popular: true,
      cta: 'Start Free Trial',
      highlight: 'Most Popular'
    },
    {
      name: 'Professional',
      price: '$129.99',
      period: '/month',
      description: 'Perfect for growing property management businesses',
      features: [
        'Up to 15 property units',
        'Advanced analytics',
        'Multi-language support',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Advanced integrations'
      ],
      popular: false,
      cta: 'Start Free Trial',
      highlight: 'Best Value'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale property management companies',
      features: [
        'Unlimited property units',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced analytics',
        '24/7 phone support',
        'Custom training'
      ],
      popular: false,
      cta: 'Contact Sales',
      highlight: 'Unlimited Scale'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Global Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your property management needs. All plans include a 14-day free trial with no credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 ${
                plan.popular
                  ? 'ring-2 ring-blue-500 scale-105'
                  : 'hover:shadow-xl transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {plan.highlight}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.cta === 'Contact Sales' ? '/contact' : '/signup'}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

