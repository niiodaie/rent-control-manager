import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Eye, EyeOff, Check } from 'lucide-react';
import rcLogo from '../assets/RC-Logo.png';

export function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup - for demo purposes, redirect to home
    console.log('Signup attempt:', formData, 'Plan:', selectedPlan);
    // In a real app, this would create the user account
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const planNames = {
    starter: t('pricing.starter.name'),
    professional: t('pricing.professional.name'),
    premium: t('pricing.premium.name'),
    enterprise: t('pricing.enterprise.name')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img 
                src={rcLogo} 
                alt="Rent Control Logo" 
                className="h-16 w-16 object-contain"
              />
            </Link>
          </div>
          <h2 className="text-3xl font-bold">{t('auth.createAccount')}</h2>
          <p className="mt-2 text-muted-foreground">
            {t('auth.startManaging')}
          </p>
          {selectedPlan && selectedPlan !== 'starter' && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-primary font-medium">
                {t('auth.selectedPlan')}: {planNames[selectedPlan]}
              </p>
            </div>
          )}
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
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t('auth.enterFirstName')}
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
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t('auth.enterLastName')}
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
              placeholder={t('auth.enterEmail')}
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
                placeholder={t('auth.enterPassword')}
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

          <div className="flex items-start">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-muted-foreground">
              {t('auth.agreeToTerms')}{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                {t('auth.termsOfService')}
              </a>
              {' '}{t('auth.and')}{' '}
              <a href="#" className="text-primary hover:text-primary/80 underline">
                {t('auth.privacyPolicy')}
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
            {selectedPlan === 'starter' ? t('auth.createFreeAccount') : t('auth.startFreeTrial')}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link to="/" className="text-sm text-primary hover:text-primary/80">
            ← {t('nav.home')}
          </Link>
        </div>

        {selectedPlan === 'starter' && (
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">{t('auth.freeForever')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupPage;

