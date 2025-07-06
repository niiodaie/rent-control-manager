import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  DollarSign, 
  CreditCard, 
  Globe, 
  Palette, 
  Upload, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Building2,
  Smartphone,
  Banknote,
  Zap,
  Eye,
  Loader2,
  X
} from 'lucide-react';
import { countryCurrencyMap, getCountryList, getCurrencyForCountry } from '../lib/countryCurrencyMap';
import { checkSubdomainAvailabilityDev, saveOnboardingData, uploadBrandingAsset } from '../lib/api';

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [collectionMethods, setCollectionMethods] = useState([]);
  const [subdomain, setSubdomain] = useState('');
  const [subdomainAvailable, setSubdomainAvailable] = useState(null);
  const [subdomainChecking, setSubdomainChecking] = useState(false);
  const [brandingData, setBrandingData] = useState({
    logo: null,
    theme: 'light',
    primaryColor: '#3B82F6',
    companyName: ''
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 4;
  const countries = getCountryList();

  // Auto-set currency when country changes
  useEffect(() => {
    if (country) {
      const newCurrency = getCurrencyForCountry(country);
      setCurrency(newCurrency);
    }
  }, [country]);

  // Check subdomain availability with debouncing
  useEffect(() => {
    if (subdomain.length > 2) {
      setSubdomainChecking(true);
      const timeoutId = setTimeout(async () => {
        try {
          const available = await checkSubdomainAvailabilityDev(subdomain);
          setSubdomainAvailable(available);
        } catch (error) {
          console.error('Error checking subdomain:', error);
          setSubdomainAvailable(false);
        } finally {
          setSubdomainChecking(false);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setSubdomainAvailable(null);
      setSubdomainChecking(false);
    }
  }, [subdomain]);

  // Handle collection method changes
  const handleMethodChange = (method) => {
    setCollectionMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBrandingData(prev => ({ ...prev, logo: file }));
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!country) newErrors.country = 'Please select a country';
        if (!currency) newErrors.currency = 'Currency is required';
        break;
      case 2:
        if (collectionMethods.length === 0) {
          newErrors.collectionMethods = 'Please select at least one payment method';
        }
        break;
      case 3:
        if (!subdomain) newErrors.subdomain = 'Subdomain is required';
        if (subdomain && subdomain.length < 3) newErrors.subdomain = 'Subdomain must be at least 3 characters';
        if (subdomainAvailable === false) newErrors.subdomain = 'This subdomain is not available';
        break;
      case 4:
        if (!brandingData.companyName) newErrors.companyName = 'Company name is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Finish setup
  const finishSetup = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      const onboardingData = {
        country,
        currency,
        collectionMethods,
        subdomain,
        branding: brandingData
      };

      await saveOnboardingData(onboardingData);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error finishing setup:', error);
      setErrors({ general: 'Failed to save setup. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const paymentMethods = [
    { id: 'stripe', name: 'Stripe', icon: CreditCard, description: 'Credit/Debit Cards, Bank Transfers' },
    { id: 'paystack', name: 'Paystack', icon: Banknote, description: 'Popular in Africa' },
    { id: 'momo', name: 'Mobile Money', icon: Smartphone, description: 'MTN, Vodafone, AirtelTigo' },
    { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfers' },
    { id: 'cash', name: 'Cash', icon: DollarSign, description: 'In-person cash payments' }
  ];

  const themes = [
    { id: 'light', name: 'Light', preview: 'bg-white border-gray-200' },
    { id: 'dark', name: 'Dark', preview: 'bg-gray-900 border-gray-700' },
    { id: 'blue', name: 'Blue', preview: 'bg-blue-50 border-blue-200' },
    { id: 'green', name: 'Green', preview: 'bg-green-50 border-green-200' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rent Control Setup
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Let's customize your property management platform
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  stepNumber <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {stepNumber < step ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    📍 Basic Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tell us about your location and preferred currency
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your country</option>
                      {countries.map((countryName) => (
                        <option key={countryName} value={countryName}>
                          {countryName}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={currency}
                        readOnly
                        placeholder="Currency will be auto-selected"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    {errors.currency && (
                      <p className="text-red-500 text-sm mt-1">{errors.currency}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Methods */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    💳 Payment Methods
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose how you want to collect rent from tenants
                  </p>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        collectionMethods.includes(method.id)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={collectionMethods.includes(method.id)}
                        onChange={() => handleMethodChange(method.id)}
                        className="sr-only"
                      />
                      <method.icon className="w-6 h-6 text-blue-600 mr-4" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                      {collectionMethods.includes(method.id) && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </label>
                  ))}
                </div>

                {errors.collectionMethods && (
                  <p className="text-red-500 text-sm mt-4">{errors.collectionMethods}</p>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Subdomain */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    🔗 Choose Your Subdomain
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    This will be your unique property management portal URL
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subdomain
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="your-company"
                        className={`flex-1 px-4 py-3 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.subdomain ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <div className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                        .rentcontrol.visnec.ai
                      </div>
                    </div>
                    
                    {subdomain && (
                      <div className="mt-2 flex items-center space-x-2">
                        {subdomainChecking ? (
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        ) : subdomainAvailable === true ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : subdomainAvailable === false ? (
                          <X className="w-4 h-4 text-red-500" />
                        ) : null}
                        
                        <p className={`text-sm ${
                          subdomainChecking ? 'text-blue-600' :
                          subdomainAvailable === true ? 'text-green-500' :
                          subdomainAvailable === false ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {subdomainChecking ? 'Checking availability...' :
                           subdomainAvailable === true ? '✅ Available' :
                           subdomainAvailable === false ? '❌ Not available' :
                           'Enter a subdomain to check availability'}
                        </p>
                      </div>
                    )}
                    
                    {errors.subdomain && (
                      <p className="text-red-500 text-sm mt-1">{errors.subdomain}</p>
                    )}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Preview your URL:
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-mono">
                          https://{subdomain || 'your-company'}.rentcontrol.visnec.ai
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!subdomainAvailable || subdomainChecking}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Branding */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <Palette className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    🎨 Branding & Theme
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Customize the look and feel of your platform
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={brandingData.companyName}
                      onChange={(e) => setBrandingData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Your Company Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo Upload
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload your company logo
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose File
                      </label>
                      {brandingData.logo && (
                        <p className="text-sm text-green-600 mt-2">
                          ✅ {brandingData.logo.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <label
                          key={theme.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            brandingData.theme === theme.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="theme"
                            value={theme.id}
                            checked={brandingData.theme === theme.id}
                            onChange={(e) => setBrandingData(prev => ({ ...prev, theme: e.target.value }))}
                            className="sr-only"
                          />
                          <div className={`w-6 h-6 rounded border-2 mr-3 ${theme.preview}`} />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {theme.name}
                          </span>
                          {brandingData.theme === theme.id && (
                            <Check className="w-5 h-5 text-blue-600 ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <p className="text-red-500 text-sm mt-4">{errors.general}</p>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={finishSetup}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Setting up...' : 'Finish & Launch'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

