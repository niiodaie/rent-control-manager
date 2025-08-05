import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Mail, Phone, Home, ArrowRight } from 'lucide-react';

const TenantPendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img src="/assets/RC-Logo.png" alt="Rent Control" className="h-12 w-auto" />
          </div>
          <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-xl text-gray-600">
            Your landlord must invite you to activate your account
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
            <p className="text-gray-600">
              Your tenant account has been created, but you'll need an invitation from your landlord 
              to access your tenant portal and property information.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Contact Your Landlord</h3>
                <p className="text-gray-600 text-sm">
                  Reach out to your landlord or property manager and let them know you've created 
                  a Rent Control account. Provide them with your email address.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Wait for Invitation</h3>
                <p className="text-gray-600 text-sm">
                  Your landlord will send you an invitation through their Rent Control dashboard. 
                  This will link your account to your specific property and unit.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <ArrowRight className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Access Your Portal</h3>
                <p className="text-gray-600 text-sm">
                  Once invited, you'll be able to log in and access your tenant portal with 
                  lease information, payment options, and maintenance request features.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Make sure your landlord has a Rent Control account</p>
              <p>• Ask them to look for the "Invite Tenant" feature in their dashboard</p>
              <p>• Check your email (including spam folder) for the invitation</p>
              <p>• Contact support if you don't receive an invitation within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Logging In
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your account email: <span className="font-medium">Check your profile for details</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Landlords can find the invite feature in their dashboard under "Tenants" → "Invite Tenant"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TenantPendingPage;

