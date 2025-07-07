import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import TenantDashboard from './TenantDashboard';
import NotFound from './NotFound';

const TenantRouter = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getSubdomain = () => {
    if (typeof window === 'undefined') return null;
    const host = window.location.hostname;
    const parts = host.split('.');
    return parts.length > 2 ? parts[0] : null;
  };

  useEffect(() => {
    const fetchTenant = async () => {
      const subdomain = getSubdomain();

      if (!subdomain) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

      if (error || !data) {
        console.warn('Subdomain not found:', subdomain);
        setNotFound(true);
      } else {
        setTenant(data);
      }

      setLoading(false);
    };

    fetchTenant();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
          Loading tenant dashboard...
        </div>
      </div>
    );
  }

  if (notFound) return <NotFound />;

  return <TenantDashboard tenant={tenant} />;
};

export default TenantRouter;
