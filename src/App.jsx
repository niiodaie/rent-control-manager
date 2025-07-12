import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';
import { useAuth } from './hooks/useAuth';
import { useRole } from './hooks/useRole';

// Pages
import HomePage from './pages/index';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import InvitePage from './pages/invite';
import ManagerDashboardPage from './pages/manager/dashboard';
import PropertyDetailsPage from './pages/manager/property/[propertyId]';
import TenantDashboardPage from './pages/tenant/dashboard';
import TenantLeasePage from './pages/tenant/lease';

// Components
import NotFound from './components/NotFound';
import Loader from './components/common/Loader';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading: authLoading } = useAuth();
  const { currentRole, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentRole !== requiredRole) {
    // Redirect based on user's actual role
    if (currentRole === 'manager') {
      return <Navigate to="/manager/dashboard" replace />;
    } else if (currentRole === 'tenant') {
      return <Navigate to="/tenant/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { currentRole, loading: roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <Loader />;
  }

  if (user && currentRole) {
    // Redirect based on user's role
    if (currentRole === 'manager') {
      return <Navigate to="/manager/dashboard" replace />;
    } else if (currentRole === 'tenant') {
      return <Navigate to="/tenant/dashboard" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
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
            <SignupPage />
          </PublicRoute>
        } 
      />
      <Route path="/invite/:token" element={<InvitePage />} />

      {/* Manager Routes */}
      <Route 
        path="/manager/dashboard" 
        element={
          <ProtectedRoute requiredRole="manager">
            <ManagerDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manager/property/:propertyId" 
        element={
          <ProtectedRoute requiredRole="manager">
            <PropertyDetailsPage />
          </ProtectedRoute>
        } 
      />

      {/* Tenant Routes */}
      <Route 
        path="/tenant/dashboard" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenant/lease" 
        element={
          <ProtectedRoute requiredRole="tenant">
            <TenantLeasePage />
          </ProtectedRoute>
        } 
      />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RoleProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </RoleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

