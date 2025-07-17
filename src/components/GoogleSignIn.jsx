import React from 'react';
import { supabase } from '../lib/supabaseClient';

export default function GoogleSignIn() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Login error:', error.message);
      alert('Google sign-in failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      Sign in with Google
    </button>
  );
}
