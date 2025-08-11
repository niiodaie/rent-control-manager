import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

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
  const [profile, setProfile] = useState(null)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserData(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await loadUserData(session.user.id)
        } else {
          setProfile(null)
          setSubscription(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadUserData = async (userId) => {
    try {
      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError)
      } else {
        setProfile(profileData)
      }

      // Load user subscription
      let { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (subscriptionError && subscriptionError.code === 'PGRST116') {
        // No subscription found, create free plan
        const { data: newSubscription, error: createError } = await supabase
          .from('subscriptions')
          .insert({
            user_id: userId,
            plan_key: 'free',
            plan_status: 'active',
            limits: {
              properties: 1,
              unitsPerProperty: 5,
              admins: 1,
              ads: true,
              support: 'email'
            }
          })
          .select()
          .single()

        if (createError) {
          console.error('Error creating free subscription:', createError)
        } else {
          subscriptionData = newSubscription
        }
      } else if (subscriptionError) {
        console.error('Error loading subscription:', subscriptionError)
      }

      setSubscription(subscriptionData)
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

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

  // Production-ready login routing based on role and subscription
  const getLoginRedirectPath = async (userId) => {
    try {
      // Get user profile to determine role
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (!profileData) {
        return '/register' // No profile, needs to complete registration
      }

      const { role } = profileData

      if (role === 'landlord') {
        return '/admin/dashboard'
      } else if (role === 'tenant') {
        // Check if tenant is connected to a unit
        const { data: tenantData } = await supabase
          .from('tenant_units')
          .select('*')
          .eq('tenant_id', userId)
          .single()

        return tenantData ? '/resident/dashboard' : '/tenant/pending'
      }

      return '/' // Default fallback
    } catch (error) {
      console.error('Error determining redirect path:', error)
      return '/'
    }
  }

  const signInWithRedirect = async (email, password) => {
    const { data, error } = await signIn(email, password)
    
    if (data?.user && !error) {
      const redirectPath = await getLoginRedirectPath(data.user.id)
      return { data, error, redirectPath }
    }
    
    return { data, error, redirectPath: null }
  }

  // Check if user can perform action based on subscription limits
  const canPerformAction = (action, currentUsage = {}) => {
    if (!subscription) return false

    const { limits } = subscription
    if (!limits) return false

    switch (action) {
      case 'add_property':
        return limits.properties === -1 || (currentUsage.properties || 0) < limits.properties
      case 'add_unit':
        return limits.unitsPerProperty === -1 || (currentUsage.unitsPerProperty || 0) < limits.unitsPerProperty
      case 'add_admin':
        return limits.admins === -1 || (currentUsage.admins || 0) < limits.admins
      default:
        return true
    }
  }

  // Get upgrade suggestion when limits are exceeded
  const getUpgradeSuggestion = (action) => {
    if (!subscription) return 'starter'

    const { plan_key } = subscription

    if (plan_key === 'free') return 'starter'
    if (plan_key === 'starter') return 'pro'
    
    return null // Pro users shouldn't hit limits
  }

  const value = {
    user,
    profile,
    subscription,
    loading,
    signIn,
    signInWithRedirect,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword,
    updateProfile,
    loadUserData,
    getLoginRedirectPath,
    canPerformAction,
    getUpgradeSuggestion,
    isLandlord: profile?.role === 'landlord',
    isTenant: profile?.role === 'tenant',
    planKey: subscription?.plan_key || 'free',
    planStatus: subscription?.plan_status || 'active',
    planLimits: subscription?.limits || {}
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

