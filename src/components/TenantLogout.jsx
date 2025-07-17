import React, { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const TenantLogout = () => {
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      window.location.href = '/';
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-700 dark:text-white">Logging you out...</p>
    </div>
  );
};

export default TenantLogout;
