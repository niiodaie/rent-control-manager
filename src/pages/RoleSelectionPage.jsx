import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, ArrowRight, Shield, Globe, CreditCard } from 'lucide-react';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src="/assets/RC-Logo.png" alt="Rent Control" className="h-12 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Rent Control
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role to get started with the world's most comprehensive property management platform
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Landlord Card */}
          <div 
            onClick={() => navigate('/register/landlord')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Landlord</h2>
              <p className="text-gray-600 mb-6">
                Manage your properties, tenants, and rental income with powerful tools designed for property owners and managers.
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <Shield className="h-4 w-4 text-green-500 mr-3" />
                  Property & tenant management
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className="h-4 w-4 text-green-500 mr-3" />
                  Global payment processing
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CreditCard className="h-4 w-4 text-green-500 mr-3" />
                  Automated rent collection
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                Get Started as Landlord
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tenant Card */}
          <div 
            onClick={() => navigate('/register/tenant')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-500"
          >
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I'm a Tenant</h2>
              <p className="text-gray-600 mb-6">
                Access your tenant portal to pay rent, submit maintenance requests, and communicate with your landlord.
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <Shield className="h-4 w-4 text-green-500 mr-3" />
                  Online rent payments
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Globe className="h-4 w-4 text-green-500 mr-3" />
                  Maintenance requests
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CreditCard className="h-4 w-4 text-green-500 mr-3" />
                  Lease management
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                Get Started as Tenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Already have an account */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by 10,000+ property managers globally</p>
          <div className="flex justify-center items-center space-x-8 text-xs text-gray-400">
            <span>🔒 Bank-level security</span>
            <span>🌍 Global coverage</span>
            <span>📱 Mobile-first design</span>
            <span>⚡ Real-time updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;

