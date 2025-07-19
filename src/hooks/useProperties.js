import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '../lib/supabaseClient';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getCurrentUser();
        if (!user) {
          if (mounted) {
            setProperties([]);
            setLoading(false);
          }
          return;
        }

        // Fetch properties owned by the current user
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            tenants:profiles!properties_tenant_id_fkey(
              id,
              full_name,
              email,
              phone
            )
          `)
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (mounted) {
          setProperties(data || []);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProperties();

    // Set up real-time subscription
    const subscription = supabase
      .channel('properties_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        () => {
          fetchProperties();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const addProperty = async (propertyData) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            ...propertyData,
            owner_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setProperties(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      console.error('Error adding property:', err);
      return { data: null, error: err.message };
    }
  };

  const updateProperty = async (propertyId, updates) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', propertyId)
        .select()
        .single();

      if (error) throw error;

      setProperties(prev =>
        prev.map(property =>
          property.id === propertyId ? data : property
        )
      );
      return { data, error: null };
    } catch (err) {
      console.error('Error updating property:', err);
      return { data: null, error: err.message };
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(prev =>
        prev.filter(property => property.id !== propertyId)
      );
      return { error: null };
    } catch (err) {
      console.error('Error deleting property:', err);
      return { error: err.message };
    }
  };

  return {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
    refetch: () => {
      fetchProperties();
    }
  };
};

