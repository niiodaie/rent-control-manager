import React, { useState } from 'react';
import { X, Check, Crown, Building2, Users, CreditCard, Zap } from 'lucide-react';

const PlanEnforcementModal = ({ isOpen, onClose, trigger, onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const plans = {
    pro: {
      name: 'Pro',
      price: 49.99,
      properties: 5,
      features: [
        'Up to 5 properties',
        'Unlimited tenants',
        'Advanced tenant portal',
        'Automated rent collection',
        'Maintenance management',
        'Financial reporting',
        'Priority support',
        'No ads'
      ]
    },
    business: {
      name: 'Business',
      price: 99.99,
      properties: 'Unlimited',
      features: [
        'Unlimited properties',
        'Unlimited tenants',
        'Advanced analytics',
        'Multi-language support',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Advanced integrations',
        'White-label options'
      ]
    }
  };

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'second_property':
        return {
          title: 'Upgrade Required to Add More Properties',
          message: 'Your Free plan includes 1 property. To manage more properties, please choose a plan that fits your needs.'
        };
      case 'invite_tenant':
        return {
          title: 'Upgrade Required to Invite Tenants',
          message: 'To invite tenants and unlock full property management features, please upgrade to a paid plan.'
        };
      default:
        return {
          title: 'Upgrade Required',
          message: 'To access this feature, please upgrade to a paid plan.'
        };
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would integrate with Stripe
      // For now, we'll simulate the upgrade process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onUpgrade callback with selected plan
      onUpgrade(selectedPlan);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const { title, message } = getTriggerMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Current Plan Status */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Current Plan: Free</h3>
              <p className="text-gray-600 text-sm">1 property • Basic features</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">$0</p>
              <p className="text-gray-600 text-sm">per month</p>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Choose Your Plan</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pro Plan */}
            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedPlan === 'pro' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('pro')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Pro Plan</h4>
                    <p className="text-sm text-gray-600">Perfect for small landlords</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${plans.pro.price}</p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {plans.pro.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedPlan === 'pro' && (
                <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm font-medium">✓ Selected Plan</p>
                </div>
              )}
            </div>

            {/* Business Plan */}
            <div 
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all relative ${
                selectedPlan === 'business' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan('business')}
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Crown className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Business Plan</h4>
                    <p className="text-sm text-gray-600">For growing portfolios</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${plans.business.price}</p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {plans.business.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedPlan === 'business' && (
                <div className="bg-purple-100 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-800 text-sm font-medium">✓ Selected Plan</p>
                </div>
              )}
            </div>
          </div>

          {/* Plan Comparison */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">What you'll get with {plans[selectedPlan].name}:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {plans[selectedPlan].features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Information */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-blue-900 font-medium">Secure Payment</p>
                <p className="text-blue-700 text-sm">
                  Powered by Stripe • Cancel anytime • 14-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Maybe Later
          </button>
          
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Upgrade to {plans[selectedPlan].name} - ${plans[selectedPlan].price}/mo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanEnforcementModal;

