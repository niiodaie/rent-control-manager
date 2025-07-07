import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Lock, Mail } from 'lucide-react';

const TenantLogin = ({ tenant }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message || 'Login failed. Please try again.');
    } else {
      setSuccess(true);
      setTimeout(() => window.location.reload(), 1200); // slight delay for user feedback
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        {/* Optional Logo */}
        {tenant?.logo_url && (
          <div className="flex justify-center mb-4">
            <img src={tenant.logo_url} alt={tenant.name} className="h-12 object-contain" />
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Welcome to {tenant?.name || 'your property'}
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Please login to access your tenant portal.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">Login successful! Redirecting...</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          {tenant?.support_email && (
            <>
              <br />
              <span>
                Need help?{' '}
                <a href={`mailto:${tenant.support_email}`} className="text-blue-600 hover:underline">
                  Contact property manager
                </a>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;
