import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const AuthContext = createContext({});

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
          setProperties([]);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch user's properties if they're a property owner
      if (profileData.role === 'property_owner') {
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select(`
            *,
            units(count)
          `)
          .eq('owner_id', userId)
          .eq('status', 'active');

        if (propertiesError) throw propertiesError;
        setProperties(propertiesData || []);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            full_name: userData.full_name || '',
            role: userData.role || 'tenant',
            phone: userData.phone || '',
            subscription_status: 'free',
            plan_limits: {
              properties: 1,
              residents: 5,
              features: ['basic']
            }
          }]);

        if (profileError) throw profileError;
      }

      return { success: true, data };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setProperties([]);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return { success: true, data };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const createProperty = async (propertyData) => {
    try {
      if (!user || profile?.role !== 'property_owner') {
        throw new Error('Unauthorized to create properties');
      }

      // Check plan limits
      if (profile.subscription_status === 'free' && properties.length >= 1) {
        throw new Error('Free plan allows only 1 property. Please upgrade to add more.');
      }
      if (profile.subscription_status === 'premium' && properties.length >= 5) {
        throw new Error('Premium plan allows up to 5 properties. Please upgrade to Enterprise for unlimited properties.');
      }

      const { data, error } = await supabase
        .from('properties')
        .insert([{
          ...propertyData,
          owner_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Refresh properties list
      await fetchUserProfile(user.id);
      
      return { success: true, data };
    } catch (error) {
      console.error('Create property error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProperty = async (propertyId, updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('properties')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', propertyId)
        .eq('owner_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Refresh properties list
      await fetchUserProfile(user.id);
      
      return { success: true, data };
    } catch (error) {
      console.error('Update property error:', error);
      return { success: false, error: error.message };
    }
  };

  const getProperty = async (propertyId) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          units(
            *,
            leases(
              *,
              tenant:users!leases_tenant_id_fkey(
                id,
                full_name,
                email,
                phone
              )
            )
          )
        `)
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Get property error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    profile,
    properties,
    loading,
    supabase,
    signIn,
    signUp,
    signOut,
    updateProfile,
    createProperty,
    updateProperty,
    getProperty,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

