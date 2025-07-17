// pages/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">Your subscription is now active.</p>
      <Link to="/admin/dashboard" className="text-blue-600 underline">
        Go to your dashboard
      </Link>
    </div>
  );
};
