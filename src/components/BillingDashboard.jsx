import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  DollarSign,
  Users,
  Building
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlanEnforcement } from '../hooks/usePlanEnforcement';
import { PLANS, getPlanByKey } from '../config/plans';
import UsageWidget from './UsageWidget';

const BillingDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentPlan,
    usage,
    planLimits,
    getUsagePercentage,
    isAtLimit,
    loading
  } = usePlanEnforcement();

  const [billingInfo, setBillingInfo] = useState(null);
  const [billingLoading, setBillingLoading] = useState(true);

  useEffect(() => {
    // Load billing information
    const loadBillingInfo = async () => {
      setBillingLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock billing data
      const mockBilling = {
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        nextInvoice: {
          amount: currentPlan === 'starter' ? 49.99 : currentPlan === 'pro' ? 129.99 : 0,
          date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        paymentMethod: currentPlan !== 'free' ? {
          type: 'card',
          last4: '4242',
          brand: 'visa'
        } : null
      };
      
      setBillingInfo(mockBilling);
      setBillingLoading(false);
    };

    loadBillingInfo();
  }, [currentPlan]);

  const plan = getPlanByKey(currentPlan);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'past_due': return 'text-red-600 bg-red-100';
      case 'canceled': return 'text-gray-600 bg-gray-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const stats = [
    {
      name: 'Current Plan',
      value: plan.name,
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Monthly Cost',
      value: plan.price === 'Custom' ? 'Custom' : plan.price === 0 ? 'Free' : `$${plan.price}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Properties',
      value: `${usage.properties} / ${planLimits.properties === 'unlimited' ? '∞' : planLimits.properties}`,
      icon: Building,
      color: isAtLimit('properties') ? 'text-red-600' : 'text-blue-600',
      bgColor: isAtLimit('properties') ? 'bg-red-100' : 'bg-blue-100'
    },
    {
      name: 'Admin Users',
      value: `${usage.admins} / ${planLimits.admins === 'unlimited' ? '∞' : planLimits.admins}`,
      icon: Users,
      color: isAtLimit('admins') ? 'text-red-600' : 'text-purple-600',
      bgColor: isAtLimit('admins') ? 'bg-red-100' : 'bg-purple-100'
    }
  ];

  if (loading || billingLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing Overview</h2>
          <p className="text-gray-600">Manage your subscription and usage</p>
        </div>
        <button
          onClick={() => navigate('/billing')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Manage Billing
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Details */}
        <div className="lg:col-span-2">
          <UsageWidget />
        </div>

        {/* Billing Status */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(billingInfo?.status)}`}>
                  {billingInfo?.status === 'active' ? 'Active' : billingInfo?.status}
                </span>
              </div>
              
              {billingInfo?.currentPeriodEnd && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Renews</span>
                  <span className="text-gray-900 font-medium">
                    {billingInfo.currentPeriodEnd.toLocaleDateString()}
                  </span>
                </div>
              )}
              
              {billingInfo?.paymentMethod && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span className="text-gray-900 font-medium">
                    •••• {billingInfo.paymentMethod.last4}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Next Invoice */}
          {billingInfo?.nextInvoice && billingInfo.nextInvoice.amount > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Invoice</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${billingInfo.nextInvoice.amount}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Due Date</span>
                  <span className="text-gray-900 font-medium">
                    {billingInfo.nextInvoice.date.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Auto-renewal enabled
                    </p>
                    <p className="text-xs text-blue-700">
                      Payment will be processed automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upgrade Prompt */}
          {currentPlan === 'free' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Ready to grow?
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Upgrade to unlock more properties, advanced features, and priority support.
                  </p>
                  <button
                    onClick={() => navigate('/choose-plan')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Plans
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Limit Warnings */}
          {(isAtLimit('properties') || isAtLimit('admins')) && (
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">
                    Plan Limits Reached
                  </h4>
                  <p className="text-sm text-red-700 mb-4">
                    You've reached your plan limits. Upgrade to continue adding resources.
                  </p>
                  <button
                    onClick={() => navigate('/choose-plan')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard;

