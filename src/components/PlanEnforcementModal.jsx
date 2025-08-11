import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, ArrowRight, Check } from 'lucide-react';
import { PLANS } from '../config/plans';

const PlanEnforcementModal = ({ 
  isOpen, 
  onClose, 
  limitType, 
  currentPlan = 'free',
  message,
  suggestions = []
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/choose-plan');
  };

  const getRecommendedPlan = () => {
    if (currentPlan === 'free') return PLANS.starter;
    if (currentPlan === 'starter') return PLANS.pro;
    return PLANS.pro;
  };

  const recommendedPlan = getRecommendedPlan();

  const getLimitMessage = () => {
    if (message) return message;
    
    switch (limitType) {
      case 'properties':
        return `You've reached your limit of ${PLANS[currentPlan].limits.properties} properties`;
      case 'units':
        return `You've reached your limit of ${PLANS[currentPlan].limits.unitsPerProperty} units per property`;
      case 'admins':
        return `You've reached your limit of ${PLANS[currentPlan].limits.admins} admin users`;
      default:
        return 'You\'ve reached a plan limit';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Plan Limit Reached
                </h3>
                <p className="text-sm text-gray-600">
                  Upgrade to continue
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Limit Message */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              {getLimitMessage()}
            </p>
            
            {suggestions.length > 0 && (
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {suggestion.action}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Plan */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Recommended: {recommendedPlan.name}
                </h4>
                <p className="text-sm text-gray-600">
                  ${recommendedPlan.price}/month
                </p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-700">
                  {recommendedPlan.limits.properties === 'unlimited' 
                    ? 'Unlimited properties' 
                    : `Up to ${recommendedPlan.limits.properties} properties`}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-700">
                  {recommendedPlan.limits.unitsPerProperty === 'unlimited' 
                    ? 'Unlimited units per property' 
                    : `Up to ${recommendedPlan.limits.unitsPerProperty} units per property`}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-gray-700">
                  {recommendedPlan.limits.ads ? 'Includes ads' : 'No ads'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trial Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEnforcementModal;

