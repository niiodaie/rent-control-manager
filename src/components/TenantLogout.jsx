// components/TenantLogout.jsx
import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const TenantLogout = () => {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      window.location.href = '/';
    };
    logout();
  }, []);

  return (
    <div className="p-6 text-center text-gray-700 dark:text-gray-200">
      Logging out...
    </div>
  );
};

export default TenantLogout;
