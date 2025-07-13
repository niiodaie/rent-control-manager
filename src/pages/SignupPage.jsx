import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Eye, EyeOff, Check } from 'lucide-react';
import rcLogo from '../assets/RC-Logo.png';

export function SignupPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup
    console.log('Signup attempt:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={rcLogo} 
              alt="Rent Control Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold">{t('auth.createAccount')}</h2>
          <p className="mt-2 text-muted-foreground">
            {t('auth.signupDesc')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                {t('auth.firstName')}
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('auth.firstName')}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                {t('auth.lastName')}
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('auth.lastName')}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('auth.emailAddress')}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth.emailAddress')}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder={t('auth.password')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              {t('auth.confirmPassword')}
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('auth.confirmPassword')}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-muted-foreground">
              {t('auth.agreeTerms')}{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                {t('auth.termsOfService')}
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                {t('auth.privacyPolicy')}
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full">
            {t('auth.createAccountBtn')}
          </Button>
        </form>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium mb-2 flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            {t('auth.freeStarterIncludes')}
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {t('auth.manageProperty')}</li>
            <li>• {t('auth.basicTenant')}</li>
            <li>• {t('auth.onlineRent')}</li>
            <li>• {t('auth.emailSupport')}</li>
            <li>• {t('auth.noCreditCard')}</li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.haveAccount')}{' '}
            <a href="/login" className="font-medium text-primary hover:text-primary/80">
              {t('auth.signIn')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

