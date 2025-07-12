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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);

      // If user is a manager, fetch their properties
      if (data?.role === 'manager') {
        await fetchUserProperties(userId);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProperties = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('manager_id', userId);

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const signUp = async ({ email, password, firstName, lastName, inviteToken = null, role = 'manager' }) => {
    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const profileData = {
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          created_at: new Date().toISOString()
        };

        // If there's an invite token, handle tenant signup
        if (inviteToken) {
          // TODO: Verify invite token and get property info
          // const { data: inviteData } = await supabase
          //   .from('invitations')
          //   .select('property_id, unit')
          //   .eq('token', inviteToken)
          //   .eq('status', 'pending')
          //   .single();

          profileData.role = 'tenant';
          // profileData.property_id = inviteData.property_id;
          // profileData.unit = inviteData.unit;
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (profileError) throw profileError;

        // If invite token, update invitation status
        if (inviteToken) {
          // TODO: Update invitation status to 'accepted'
          // await supabase
          //   .from('invitations')
          //   .update({ status: 'accepted', accepted_at: new Date().toISOString() })
          //   .eq('token', inviteToken);
        }
      }

      return authData;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setProperties([]);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    properties,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    supabase
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

