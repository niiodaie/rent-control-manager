import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Settings, 
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PLANS, getPlanByKey } from '../config/plans';

const BillingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState('free');
  const [billingInfo, setBillingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock loading subscription data
    const loadBillingData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock subscription data
      const mockSubscription = {
        plan: 'starter',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'visa',
          expiryMonth: 12,
          expiryYear: 2025
        },
        nextInvoice: {
          amount: 49.99,
          date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      };
      
      setCurrentPlan(mockSubscription.plan);
      setBillingInfo(mockSubscription);
      setLoading(false);
    };

    loadBillingData();
  }, []);

  const handleChangePlan = () => {
    navigate('/choose-plan');
  };

  const handleManagePayment = () => {
    // In real implementation, this would open Stripe Customer Portal
    alert('This would open the Stripe Customer Portal for payment method management');
  };

  const handleDownloadInvoice = () => {
    // In real implementation, this would download the latest invoice
    alert('This would download the latest invoice from Stripe');
  };

  const handleCancelSubscription = () => {
    // In real implementation, this would cancel the subscription
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      alert('Subscription cancellation would be processed via Stripe API');
    }
  };

  const plan = getPlanByKey(currentPlan);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Billing & Subscription
          </h1>
          <p className="text-gray-600">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Overview */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  billingInfo?.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {billingInfo?.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600">
                    ${plan.price}/month • Renews {billingInfo?.currentPeriodEnd?.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={handleChangePlan}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Change Plan
                </button>
              </div>

              {/* Plan Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Plan Limits</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Properties: {plan.limits.properties === 'unlimited' ? 'Unlimited' : plan.limits.properties}</li>
                    <li>Units per property: {plan.limits.unitsPerProperty === 'unlimited' ? 'Unlimited' : plan.limits.unitsPerProperty}</li>
                    <li>Admin users: {plan.limits.admins === 'unlimited' ? 'Unlimited' : plan.limits.admins}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {plan.limits.ads ? 'Includes ads' : 'No ads'}
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {plan.limits.support} support
                    </li>
                    {plan.limits.analytics && (
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {plan.limits.analytics} analytics
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                <button
                  onClick={handleManagePayment}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Manage
                </button>
              </div>

              {billingInfo?.paymentMethod ? (
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      •••• •••• •••• {billingInfo.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-gray-600">
                      {billingInfo.paymentMethod.brand.toUpperCase()} • Expires {billingInfo.paymentMethod.expiryMonth}/{billingInfo.paymentMethod.expiryYear}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-gray-600">No payment method on file</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium mt-2">
                    Add payment method
                  </button>
                </div>
              )}
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Billing History</h2>
                <button
                  onClick={handleDownloadInvoice}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download Latest
                </button>
              </div>

              <div className="space-y-3">
                {/* Mock invoice entries */}
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">December 2024</p>
                    <p className="text-sm text-gray-600">Starter Plan • Paid</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$49.99</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Download
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">November 2024</p>
                    <p className="text-sm text-gray-600">Starter Plan • Paid</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$49.99</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Invoice */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Invoice</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-gray-900">
                    ${billingInfo?.nextInvoice?.amount}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {billingInfo?.nextInvoice?.date?.toLocaleDateString()}
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
                      Your subscription will automatically renew
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={handleChangePlan}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Upgrade Plan</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Get more features and higher limits
                  </p>
                </button>

                <button
                  onClick={handleManagePayment}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Update Payment</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Change your payment method
                  </p>
                </button>

                <button
                  onClick={handleCancelSubscription}
                  className="w-full text-left p-3 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-red-900">Cancel Subscription</span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    Cancel at the end of billing period
                  </p>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              
              <p className="text-gray-600 text-sm mb-4">
                Have questions about your billing or subscription? Our support team is here to help.
              </p>
              
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;

