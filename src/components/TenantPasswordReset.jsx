// components/TenantPasswordReset.jsx
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Mail } from 'lucide-react';

const TenantPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-complete',
    });

    if (error) setStatus({ error: error.message });
    else setStatus({ success: 'Reset link sent. Check your email.' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
        {status?.success && <p className="text-green-500 mt-4">{status.success}</p>}
        {status?.error && <p className="text-red-500 mt-4">{status.error}</p>}
      </div>
    </div>
  );
};

export default TenantPasswordReset;

