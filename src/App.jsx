// App.jsx - Bulletproof version without problematic i18n

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute, AuthRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { GlobalStatus } from './components/GlobalStatus';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './components/SimpleLanguageSelector';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AdminDashboardDemo from './pages/AdminDashboardDemo';
import AdminDashboard from './pages/AdminDashboard';
import ResidentDashboard from './pages/ResidentDashboard'
import AuthCallback from './pages/AuthCallback'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './pages/BlogPage'
import ChoosePlanPage from './pages/ChoosePlanPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import './App.css';

function PlanRedirectWatcher() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user &&
      user.role === 'admin' &&
      (!user.plan || user.plan === 'free') &&
      location.pathname !== '/choose-plan'
    ) {
      navigate('/choose-plan');
    }
  }, [user, location.pathname, navigate]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/login" element={
                  <AuthRoute>
                    <LoginPage />
                  </AuthRoute>
                } />
                <Route path="/signup" element={
                  <AuthRoute>
                    <SignupPage />
                  </AuthRoute>
                } />
                <Route path="/reset-password" element={
                  <AuthRoute>
                    <ResetPasswordPage />
                  </AuthRoute>
                } />
                <Route path="/choose-plan" element={
                  <ProtectedRoute>
                    <ChoosePlanPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/demo" element={<AdminDashboardDemo />} />
                <Route path="/resident/dashboard" element={
                  <ProtectedRoute requiredRole="tenant">
                    <ResidentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/success" element={
                  <ProtectedRoute>
                    <PaymentSuccessPage />
                  </ProtectedRoute>
                } />
                <Route path="/*" element={
                  <>
                    <PlanRedirectWatcher />
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/help" element={<BlogPage />} />
                      </Routes>
                    </main>
                    <Footer />
                    <GlobalStatus />
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;

