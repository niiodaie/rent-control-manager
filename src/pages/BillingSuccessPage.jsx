import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BillingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sessionId] = useState(searchParams.get('session_id'));
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Countdown timer for auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/admin/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleContinue = () => {
    navigate('/admin/dashboard');
  };

  const handleDownloadReceipt = () => {
    // In a real implementation, this would download the actual receipt
    alert('Receipt download would be implemented with Stripe API');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to your upgraded Rent Control experience
          </p>
        </div>

        {/* Success Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your subscription is now active
            </h2>
            <p className="text-gray-600">
              You now have access to all premium features and increased limits
            </p>
          </div>

          {/* Session Info */}
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Transaction ID</p>
                  <p className="text-sm text-gray-600 font-mono">{sessionId}</p>
                </div>
                <button
                  onClick={handleDownloadReceipt}
                  className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Receipt
                </button>
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">What's next?</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Access your dashboard</p>
                  <p className="text-sm text-gray-600">Start managing your properties with enhanced features</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Explore new features</p>
                  <p className="text-sm text-gray-600">Check out advanced analytics, automation tools, and more</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage your subscription</p>
                  <p className="text-sm text-gray-600">Update billing details or change plans anytime in settings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleContinue}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Continue to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={() => navigate('/billing')}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Billing Settings
            </button>
          </div>
        </div>

        {/* Auto-redirect Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Automatically redirecting to your dashboard in {countdown} seconds...
          </p>
          <button
            onClick={handleContinue}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
          >
            Skip waiting
          </button>
        </div>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help getting started?{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingSuccessPage;

