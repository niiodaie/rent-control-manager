import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import rcLogo from '../assets/RC-Logo.png';
import GoogleSignIn from '../components/GoogleSignIn';
import { supabase } from '../lib/supabaseClient';

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    });

    if (error) {
      setError(error.message || 'Login failed');
      return;
    }

    const role = data?.user?.user_metadata?.role || '';

    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'resident' || role === 'tenant') {
      navigate('/tenant-portal');
    } else {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={rcLogo} alt="Rent Control Logo" className="h-16 w-16 object-contain" />
            </Link>
          </div>
          <h2 className="text-3xl font-bold">{t('auth.welcomeBack')}</h2>
          <p className="mt-2 text-muted-foreground">{t('auth.signInToAccount')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                {t('auth.rememberMe')}
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                {t('auth.forgotPassword')}
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {t('auth.signIn')}
          </Button>
        </form>

        <GoogleSignIn />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
              {t('auth.signUpFree')}
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link to="/" className="text-sm text-primary hover:text-primary/80">
            ← {t('nav.home')}
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>
            {t('auth.bySigningIn')}{' '}
            <a href="#" className="underline hover:text-foreground">{t('auth.termsOfService')}</a>{' '}
            {t('auth.and')}{' '}
            <a href="#" className="underline hover:text-foreground">{t('auth.privacyPolicy')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
