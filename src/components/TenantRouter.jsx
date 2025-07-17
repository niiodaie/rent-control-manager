import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Routes, Route, useLocation } from 'react-router-dom';
import TenantLogin from './TenantLogin';
import TenantDashboard from './TenantDashboard';
import TenantPasswordReset from './TenantPasswordReset';
import TenantLogout from './TenantLogout';
import NotFound from './NotFound';

const TenantRouter = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [session, setSession] = useState(null);

  const getSubdomain = () => {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 2) return parts[0];
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

      const session = (await supabase.auth.getSession()).data.session;
      setSession(session);
      setLoading(false);
    };

    fetchTenant();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading tenant portal...</div>;
  if (notFound) return <NotFound />;

  return (
    <Routes>
      <Route path="/reset" element={<TenantPasswordReset tenant={tenant} />} />
      <Route path="/logout" element={<TenantLogout />} />
      <Route path="/*" element={session ? <TenantDashboard tenant={tenant} /> : <TenantLogin tenant={tenant} />} />
    </Routes>
  );
};

export default TenantRouter;
