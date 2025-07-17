import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from './lib/supabaseClient'; // assumed location
import ErrorBoundary from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalStatus } from './components/GlobalStatus';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import ResidentDashboard from './pages/ResidentDashboard';
import './App.css';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Utility to get role (from Supabase or localStorage)
const getUserRole = async () => {
  const { data } = await supabase.auth.getSession();
  const role = data?.session?.user?.user_metadata?.role || localStorage.getItem('role');
  return role;
};

function AppContent() {
  const { ready } = useTranslation();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRole().then((r) => {
      setRole(r);
      setLoading(false);
    });
  }, []);

  if (!ready || loading) return <LoadingSpinner />;

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Auth-only pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Role-based redirects */}
          <Route path="/dashboard" element={
            role === 'admin' ? <Navigate to="/admin-dashboard" />
            : role === 'resident' ? <Navigate to="/resident-dashboard" />
            : <Navigate to="/" />
          } />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/resident-dashboard" element={<ResidentDashboard />} />

          {/* Main pages with layout */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
              </main>
              <Footer />
              <GlobalStatus />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AppContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
