import { useEffect, useState } from 'react';
import { supabase, getCurrentUser } from '../lib/supabaseClient';

export const useMaintenanceRequests = (userRole = null) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchMaintenanceRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await getCurrentUser();
        if (!user) {
          if (mounted) {
            setRequests([]);
            setLoading(false);
          }
          return;
        }

        let query = supabase
          .from('maintenance_requests')
          .select(`
            *,
            property:properties(
              id,
              address,
              unit_number
            ),
            tenant:profiles!maintenance_requests_tenant_id_fkey(
              id,
              full_name,
              email,
              phone
            )
          `);

        // Filter based on user role
        if (userRole === 'tenant') {
          query = query.eq('tenant_id', user.id);
        } else if (userRole === 'admin') {
          // For admins, get requests for their properties
          query = query.in(
            'property_id',
            supabase
              .from('properties')
              .select('id')
              .eq('owner_id', user.id)
          );
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        if (error) throw error;

        if (mounted) {
          setRequests(data || []);
        }
      } catch (err) {
        console.error('Error fetching maintenance requests:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchMaintenanceRequests();

    // Set up real-time subscription
    const subscription = supabase
      .channel('maintenance_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maintenance_requests'
        },
        () => {
          fetchMaintenanceRequests();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [userRole]);

  const createRequest = async (requestData) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('maintenance_requests')
        .insert([
          {
            ...requestData,
            tenant_id: user.id,
            status: 'pending'
          }
        ])
        .select(`
          *,
          property:properties(
            id,
            address,
            unit_number
          ),
          tenant:profiles!maintenance_requests_tenant_id_fkey(
            id,
            full_name,
            email,
            phone
          )
        `)
        .single();

      if (error) throw error;

      setRequests(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      console.error('Error creating maintenance request:', err);
      return { data: null, error: err.message };
    }
  };

  const updateRequestStatus = async (requestId, status, notes = null) => {
    try {
      const updates = { status };
      if (notes) updates.admin_notes = notes;

      const { data, error } = await supabase
        .from('maintenance_requests')
        .update(updates)
        .eq('id', requestId)
        .select(`
          *,
          property:properties(
            id,
            address,
            unit_number
          ),
          tenant:profiles!maintenance_requests_tenant_id_fkey(
            id,
            full_name,
            email,
            phone
          )
        `)
        .single();

      if (error) throw error;

      setRequests(prev =>
        prev.map(request =>
          request.id === requestId ? data : request
        )
      );
      return { data, error: null };
    } catch (err) {
      console.error('Error updating maintenance request:', err);
      return { data: null, error: err.message };
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .delete()
        .eq('id', requestId);

      if (error) throw error;

      setRequests(prev =>
        prev.filter(request => request.id !== requestId)
      );
      return { error: null };
    } catch (err) {
      console.error('Error deleting maintenance request:', err);
      return { error: err.message };
    }
  };

  // Group requests by status for easy display
  const groupedRequests = {
    pending: requests.filter(r => r.status === 'pending'),
    in_progress: requests.filter(r => r.status === 'in_progress'),
    completed: requests.filter(r => r.status === 'completed'),
    cancelled: requests.filter(r => r.status === 'cancelled')
  };

  return {
    requests,
    groupedRequests,
    loading,
    error,
    createRequest,
    updateRequestStatus,
    deleteRequest,
    refetch: () => {
      fetchMaintenanceRequests();
    }
  };
};

