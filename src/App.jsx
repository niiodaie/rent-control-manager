import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ManagerDashboard from './components/ManagerDashboard';
import TenantDashboard from './components/TenantDashboard';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import Contact from './components/Contact';
import TermsOfUse from './components/TermsOfUse';
import HelpCenter from './components/HelpCenter';
import NotFound from './components/NotFound';
import TenantRouter from './components/TenantRouter';
import Features from './components/Features';
import PricingPlans from './components/PricingPlans';
import usePageTracking from './hooks/usePageTracking';
import './i18n';

function App() {
// usePageTracking(); // Track page views for Google Analytics

  const isTenantSubdomain = () => {
  if (typeof window === 'undefined') return false;

  const host = window.location.hostname;
  const parts = host.split('.');

  // Example: tenant.example.com → parts.length = 3
  return parts.length > 2 && !['www', 'app'].includes(parts[0]);
};


  useEffect(() => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}, []);


  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {isTenantSubdomain() ? (
            <TenantRouter />
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/tenant" element={<TenantDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<PricingPlans />} />
              <Route path="/demo" element={<LandingPage />} />
              <Route path="/api" element={<HelpCenter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
