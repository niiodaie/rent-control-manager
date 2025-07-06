import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import Contact from './components/Contact';
import TermsOfUse from './components/TermsOfUse';
import HelpCenter from './components/HelpCenter';
import NotFound from './components/NotFound';
// import usePageTracking from './hooks/usePageTracking';
import './i18n';

function App() {
  usePageTracking(); // Track page views for Google Analytics

  useEffect(() => {
    // Apply theme on mount
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/help" element={<HelpCenter />} />
            {/* Additional footer links */}
            <Route path="/features" element={<LandingPage />} />
            <Route path="/pricing" element={<LandingPage />} />
            <Route path="/demo" element={<LandingPage />} />
            <Route path="/api" element={<HelpCenter />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

