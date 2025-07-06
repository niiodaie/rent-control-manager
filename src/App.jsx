import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './i18n';

// Components
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import PropertyDashboard from './components/PropertyDashboard';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return !user ? children : <Navigate to="/dashboard" replace />;
};

// Main App Component
const AppContent = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set default language based on browser/location
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'es'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage(defaultLang);
    }
  }, [i18n]);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:propertyId" 
            element={
              <ProtectedRoute>
                <PropertyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:propertyId/units" 
            element={
              <ProtectedRoute>
                <PropertyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:propertyId/tenants" 
            element={
              <ProtectedRoute>
                <PropertyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:propertyId/payments" 
            element={
              <ProtectedRoute>
                <PropertyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/:propertyId/settings" 
            element={
              <ProtectedRoute>
                <PropertyDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// Root App Component with Providers
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

