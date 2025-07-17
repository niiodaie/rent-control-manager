import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Helper function to get user role from metadata
export const getUserRole = (user) => {
  return user?.user_metadata?.role || user?.app_metadata?.role || 'tenant'
}

// Helper function to check if user is admin/landlord
export const isAdmin = (user) => {
  const role = getUserRole(user)
  return role === 'admin' || role === 'landlord'
}

// Helper function to check if user is tenant/resident
export const isTenant = (user) => {
  const role = getUserRole(user)
  return role === 'tenant' || role === 'resident'
}

