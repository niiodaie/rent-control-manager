import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, getUserRole, isAdmin, isTenant } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        setRole(getUserRole(session.user))
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          setRole(getUserRole(session.user))
        } else {
          setRole(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  }

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  }

  const updateProfile = async (updates) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    return { data, error }
  }

  const updateUserPlan = async (plan) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { plan }
      })
      if (error) throw error;
      
      // Update local user state
      setUser(prev => ({
        ...prev,
        user_metadata: {
          ...prev?.user_metadata,
          plan
        }
      }));
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  const getRedirectPath = (userRole, userPlan) => {
    if (!userRole) return '/';
    
    switch (userRole) {
      case 'admin':
        // Check if landlord needs to choose a plan
        if (!userPlan || userPlan === 'free') {
          return '/choose-plan';
        }
        return '/admin/dashboard';
      case 'tenant':
        return '/resident/dashboard';
      default:
        return '/';
    }
  }

  const signInWithRedirect = async (email, password) => {
    const { data, error } = await signIn(email, password);
    
    if (data?.user && !error) {
      const userRole = getUserRole(data.user);
      const userPlan = data.user.user_metadata?.plan;
      const redirectPath = getRedirectPath(userRole, userPlan);
      
      return { data, error, redirectPath };
    }
    
    return { data, error, redirectPath: null };
  }

  const value = {
    user,
    role,
    loading,
    signIn,
    signInWithRedirect,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updateProfile,
    updateUserPlan,
    getRedirectPath,
    isAdmin: user ? isAdmin(user) : false,
    isTenant: user ? isTenant(user) : false,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

