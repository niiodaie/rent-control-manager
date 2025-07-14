import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pricing } from '../components/Pricing';
import SEOHead from '../components/SEOHead';

export function PricingPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead 
        title="Pricing - Rent Control"
        description="Simple, transparent pricing for global property management. Choose the perfect plan for your rental business with 14-day free trials."
        keywords="rent control pricing, property management cost, rental software pricing, subscription plans"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan for your property management needs. All plans include a 14-day free trial with no credit card required.
            </p>
          </div>

          {/* Pricing Component */}
          <Pricing />

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Why Choose Rent Control?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">No Setup Fees</h3>
                  <p className="text-muted-foreground">Get started immediately with no upfront costs or hidden fees.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cancel Anytime</h3>
                  <p className="text-muted-foreground">No long-term contracts. Cancel your subscription at any time.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">Get help when you need it with our global support team.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQ</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, debit cards, and bank transfers in 150+ currencies through our secure Stripe integration.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">No setup fees ever. Start with our free trial and only pay when you're ready to upgrade to a paid plan.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">What happens after my trial ends?</h3>
                <p className="text-muted-foreground">Your account will automatically convert to the free Starter plan. You can upgrade to a paid plan at any time to unlock additional features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

