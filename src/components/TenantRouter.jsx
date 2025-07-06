import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Loader from './Loader';
import NotFound from './NotFound';

const TenantDashboard = ({ subdomain }) => {
  const [tenantData, setTenantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTenant = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

      if (error || !data) {
        console.error('Tenant not found:', error);
        setNotFound(true);
      } else {
        setTenantData(data);
      }
      setLoading(false);
    };

    if (subdomain) {
      fetchTenant();
    }
  }, [subdomain]);

  if (loading) return <Loader />;
  if (notFound) return <NotFound />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Welcome to {tenantData?.property_name || subdomain}'s Dashboard</h1>
      <p><strong>Country:</strong> {tenantData?.country}</p>
      <p><strong>Currency:</strong> {tenantData?.currency}</p>
      <p><strong>Preferred Payment:</strong> {tenantData?.payment_method}</p>
      {/* Additional tenant-specific sections */}
    </div>
  );
};

export default TenantDashboard;
