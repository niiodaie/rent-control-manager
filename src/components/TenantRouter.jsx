import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // make sure this is set up
import TenantDashboard from './TenantDashboard';
import NotFound from './NotFound';

const TenantRouter = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getSubdomain = () => {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 2) return parts[0]; // e.g. abladei.rent-control.net → "abladei"
    return null;
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
        setNotFound(true);
      } else {
        setTenant(data);
      }

      setLoading(false);
    };

    fetchTenant();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading tenant dashboard...</div>;
  if (notFound) return <NotFound />;

  return <TenantDashboard tenant={tenant} />;
};

export default TenantRouter;
