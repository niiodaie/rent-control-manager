import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, User, MapPin, Phone, Mail, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const LandlordRegistrationPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Account details
    email: '',
    password: '',
    confirmPassword: '',
    
    // Profile details
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    
    // First property details
    propertyName: '',
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    propertyCountry: 'United States',
    propertyType: 'apartment',
    totalUnits: 1
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create account with Supabase
      const { user, error } = await signUp(formData.email, formData.password, {
        role: 'admin',
        plan: 'free',
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        company: formData.company
      });

      if (error) throw error;

      // TODO: Create first property in database
      // This would typically be done via API call to backend
      
      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step === currentStep 
              ? 'bg-blue-600 text-white' 
              : step < currentStep 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <Check className="h-5 w-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Let's start with your basic account information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="ABC Property Management"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your First Property</h2>
        <p className="text-gray-600">Start with your first property to get familiar with the platform</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
        <input
          type="text"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Sunset Apartments"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
        <input
          type="text"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Main Street"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="propertyCity"
            value={formData.propertyCity}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="New York"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
          <input
            type="text"
            name="propertyState"
            value={formData.propertyState}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="NY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
          <input
            type="text"
            name="propertyZip"
            value={formData.propertyZip}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10001"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="apartment">Apartment Building</option>
            <option value="house">Single Family House</option>
            <option value="condo">Condominium</option>
            <option value="townhouse">Townhouse</option>
            <option value="commercial">Commercial Property</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Units</label>
          <input
            type="number"
            name="totalUnits"
            value={formData.totalUnits}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Complete</h2>
        <p className="text-gray-600">Review your information and complete your registration</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
          <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
          <p className="text-gray-600">{formData.email}</p>
          {formData.company && <p className="text-gray-600">{formData.company}</p>}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">First Property</h3>
          <p className="text-gray-600">{formData.propertyName}</p>
          <p className="text-gray-600">
            {formData.propertyAddress}, {formData.propertyCity}, {formData.propertyState} {formData.propertyZip}
          </p>
          <p className="text-gray-600">{formData.totalUnits} unit(s)</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">🎉 Free Plan Activated</h3>
          <p className="text-blue-800 text-sm">
            Your account will start with our Free plan, which includes management for 1 property. 
            You can upgrade anytime to add more properties and unlock advanced features.
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        By completing registration, you agree to our{' '}
        <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/assets/RC-Logo.png" alt="Rent Control" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Landlord Registration</h1>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => currentStep === 1 ? navigate('/register') : handlePrevStep()}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {currentStep === 1 ? 'Back to Role Selection' : 'Previous'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                  <Check className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Already have account link */}
        <div className="text-center mt-6">
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
      </div>
    </div>
  );
};

export default LandlordRegistrationPage;

