import { useEffect, useState } from 'react';
import { supabase, getCurrentUser, getUserProfile } from '../lib/supabaseClient';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getCurrentUser();
        if (!user) {
          if (mounted) {
            setProfile(null);
            setLoading(false);
          }
          return;
        }

        const profileData = await getUserProfile(user.id);
        if (mounted) {
          setProfile(profileData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profileData = await getUserProfile(session.user.id);
          if (mounted) {
            setProfile(profileData);
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setProfile(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const updateProfile = async (updates) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { data: null, error: err.message };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: () => {
      fetchProfile();
    }
  };
};

