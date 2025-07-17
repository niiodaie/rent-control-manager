import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const ProtectedRoute = ({ children, requiredRole = null, redirectTo = '/login' }) => {
  const { user, role, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login with return URL
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect based on user's actual role
    if (role === 'admin' || role === 'landlord') {
      return <Navigate to="/admin/dashboard" replace />
    } else {
      return <Navigate to="/resident/dashboard" replace />
    }
  }

  return children
}

export const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="admin" redirectTo="/login">
      {children}
    </ProtectedRoute>
  )
}

export const TenantRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="tenant" redirectTo="/login">
      {children}
    </ProtectedRoute>
  )
}

export const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    // User is already logged in, redirect to appropriate dashboard
    const role = user?.user_metadata?.role || user?.app_metadata?.role || 'tenant'
    if (role === 'admin' || role === 'landlord') {
      return <Navigate to="/admin/dashboard" replace />
    } else {
      return <Navigate to="/resident/dashboard" replace />
    }
  }

  return children
}

