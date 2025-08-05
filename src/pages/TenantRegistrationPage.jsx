import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Mail, Lock, ArrowRight, ArrowLeft, Check, AlertCircle, Home } from 'lucide-react';

const TenantRegistrationPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [inviteData, setInviteData] = useState(null);
  const [inviteError, setInviteError] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  // Check for invite token on component mount
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      validateInviteToken(token);
    }
  }, [searchParams]);

  const validateInviteToken = async (token) => {
    try {
      // In a real implementation, this would validate the token with the backend
      // For demo purposes, we'll simulate a valid invite
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate invite data
      const mockInviteData = {
        email: 'john.doe@example.com',
        propertyName: 'Sunset Apartments',
        propertyAddress: '123 Main St, Apt 4B',
        landlordName: 'Sarah Johnson',
        unitDetails: {
          unit: '4B',
          rent: 2500,
          moveInDate: '2024-02-01'
        }
      };
      
      setInviteData(mockInviteData);
      setFormData(prev => ({
        ...prev,
        email: mockInviteData.email
      }));
    } catch (error) {
      setInviteError('Invalid or expired invitation link. Please contact your landlord for a new invitation.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create account with Supabase
      const { user, error } = await signUp(formData.email, formData.password, {
        role: 'tenant',
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        invite_token: searchParams.get('token'),
        status: inviteData ? 'active' : 'pending_invitation'
      });

      if (error) throw error;

      // Redirect based on invite status
      if (inviteData) {
        navigate('/resident/dashboard');
      } else {
        navigate('/tenant/pending');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderInviteInfo = () => {
    if (!inviteData) return null;

    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded-lg mr-4">
            <Home className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-2">You've been invited!</h3>
            <div className="space-y-2 text-sm text-green-800">
              <p><strong>Property:</strong> {inviteData.propertyName}</p>
              <p><strong>Address:</strong> {inviteData.propertyAddress}</p>
              <p><strong>Landlord:</strong> {inviteData.landlordName}</p>
              <p><strong>Unit:</strong> {inviteData.unitDetails.unit}</p>
              <p><strong>Monthly Rent:</strong> ${inviteData.unitDetails.rent}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNoInviteMessage = () => {
    if (inviteData) return null;

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">No invitation link?</h3>
            <p className="text-sm text-blue-800 mb-3">
              You can still create your account. Once your landlord invites you to a property, 
              you'll be able to access your tenant portal and all features.
            </p>
            <p className="text-sm text-blue-700">
              <strong>Next steps:</strong> Ask your landlord to send you an invitation through their dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (inviteError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invalid Invitation</h2>
          <p className="text-gray-600 mb-6">{inviteError}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/register/tenant')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register Without Invitation
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/assets/RC-Logo.png" alt="Rent Control" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {inviteData ? 'Complete Your Registration' : 'Tenant Registration'}
          </h1>
          <p className="text-gray-600 mt-2">
            {inviteData 
              ? 'You\'re almost ready to access your tenant portal' 
              : 'Create your tenant account to get started'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderInviteInfo()}
          {renderNoInviteMessage()}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="john@example.com"
                disabled={!!inviteData}
                required
              />
              {inviteData && (
                <p className="text-sm text-gray-500 mt-1">
                  Email pre-filled from invitation
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="text-sm text-gray-500">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-green-600 hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  {inviteData ? 'Complete Registration' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Role Selection
            </button>

            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-3">
            {inviteData ? (
              <>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  Immediate access to your tenant portal
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  View lease details and property information
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-3" />
                  Submit maintenance requests and pay rent online
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center text-sm text-gray-700">
                  <AlertCircle className="h-4 w-4 text-blue-500 mr-3" />
                  Your account will be created but pending activation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <AlertCircle className="h-4 w-4 text-blue-500 mr-3" />
                  Ask your landlord to send you an invitation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <AlertCircle className="h-4 w-4 text-blue-500 mr-3" />
                  Once invited, you'll have full access to the tenant portal
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantRegistrationPage;

