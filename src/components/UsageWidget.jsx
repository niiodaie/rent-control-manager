import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePlanEnforcement } from '../hooks/usePlanEnforcement';
import { PLANS } from '../config/plans';

const UsageWidget = ({ className = '' }) => {
  const navigate = useNavigate();
  const {
    currentPlan,
    usage,
    planLimits,
    getUsagePercentage,
    isApproachingLimit,
    isAtLimit,
    loading
  } = usePlanEnforcement();

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const plan = PLANS[currentPlan];
  
  const usageItems = [
    {
      key: 'properties',
      label: 'Properties',
      current: usage.properties,
      limit: planLimits.properties,
      percentage: getUsagePercentage('properties')
    },
    {
      key: 'units',
      label: 'Total Units',
      current: usage.units,
      limit: planLimits.unitsPerProperty === 'unlimited' ? 'unlimited' : usage.properties * planLimits.unitsPerProperty,
      percentage: planLimits.unitsPerProperty === 'unlimited' ? 0 : getUsagePercentage('units')
    },
    {
      key: 'admins',
      label: 'Admin Users',
      current: usage.admins,
      limit: planLimits.admins,
      percentage: getUsagePercentage('admins')
    }
  ];

  const getStatusIcon = (item) => {
    if (isAtLimit(item.key)) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    if (isApproachingLimit(item.key)) {
      return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    }
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getProgressBarColor = (item) => {
    if (isAtLimit(item.key)) return 'bg-red-500';
    if (isApproachingLimit(item.key)) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Plan Usage</h3>
            <p className="text-sm text-gray-600">
              Current plan: <span className="font-medium">{plan.name}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/billing')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Manage
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {usageItems.map((item) => (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {getStatusIcon(item)}
                <span className="text-sm font-medium text-gray-900 ml-2">
                  {item.label}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {item.current} / {item.limit === 'unlimited' ? '∞' : item.limit}
              </span>
            </div>
            
            {item.limit !== 'unlimited' && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(item)}`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
              </div>
            )}
            
            {item.limit === 'unlimited' && (
              <div className="text-xs text-green-600 font-medium">
                Unlimited
              </div>
            )}
          </div>
        ))}

        {/* Upgrade CTA */}
        {(isAtLimit('properties') || isAtLimit('units') || isAtLimit('admins')) && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Reached plan limits?
                </p>
                <p className="text-xs text-blue-700">
                  Upgrade for higher limits and more features
                </p>
              </div>
              <button
                onClick={() => navigate('/choose-plan')}
                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* Approaching Limit Warning */}
        {!isAtLimit('properties') && !isAtLimit('units') && !isAtLimit('admins') && 
         (isApproachingLimit('properties') || isApproachingLimit('units') || isApproachingLimit('admins')) && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-yellow-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-yellow-900">
                  Approaching plan limits
                </p>
                <p className="text-xs text-yellow-700">
                  Consider upgrading to avoid interruptions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsageWidget;

