// src/pages/BillingSuccessPage.jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BillingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your subscription has been updated. You now have access to your new
          plan’s features.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/billing")}
            className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Manage Billing
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          If you believe this is an error,{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default BillingSuccessPage;
