// src/lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallback for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://okqesdddonaaicozavmj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcWVzZGRkb25hYWljb3phdm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjE3NzQsImV4cCI6MjA2NzMzNzc3NH0.Z2ANB03qznTIryGPxlhiojv0vI8ZPtyHPDy8yHJZHVk';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Helper function to get user profile
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

