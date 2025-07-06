import React from 'react';
import TenantDashboard from './TenantDashboard';
import NotFound from './NotFound';
import LandingPage from './LandingPage';

const TenantRouter = () => {
  const hostname = window.location.hostname;

  // Extract subdomain
  const parts = hostname.split('.');
  const isLocalhost = hostname.includes('localhost');
  const subdomain = !isLocalhost && parts.length > 2 ? parts[0] : null;

  // Reserved names to route to main app
  const reserved = ['www', 'rent-control', 'rentcontrol'];

  if (!subdomain || reserved.includes(subdomain)) {
    return <LandingPage />;
  }

  // Render tenant dashboard for valid subdomains
  return <TenantDashboard subdomain={subdomain} />;
};

export default TenantRouter;
