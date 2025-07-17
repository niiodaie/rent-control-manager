import React from 'react';
import Alert from '../common/Alert';

const LeaseInfo = ({ lease, property }) => {
  if (!lease) {
    return (
      <Alert title="No Lease Information">
        No lease information is currently available.
      </Alert>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = lease.endDate ? calculateDaysRemaining(lease.endDate) : null;

  return (
    <div className="space-y-6">
      {/* Lease Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Lease Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Property</h3>
            <p className="text-lg font-semibold text-gray-900">{property?.name}</p>
            <p className="text-gray-600">
              {property?.address}, {property?.city}, {property?.state} {property?.zipCode}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Unit</h3>
            <p className="text-lg font-semibold text-gray-900">{lease.unit || 'N/A'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Monthly Rent</h3>
            <p className="text-lg font-semibold text-gray-900">${lease.rentAmount || property?.rentAmount}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Security Deposit</h3>
            <p className="text-lg font-semibold text-gray-900">
              ${lease.securityDeposit || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Lease Dates */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Lease Term</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
            <p className="text-lg font-semibold text-gray-900">
              {lease.startDate ? formatDate(lease.startDate) : 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">End Date</h3>
            <p className="text-lg font-semibold text-gray-900">
              {lease.endDate ? formatDate(lease.endDate) : 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Days Remaining</h3>
            <p className={`text-lg font-semibold ${
              daysRemaining !== null && daysRemaining < 30 
                ? 'text-red-600' 
                : daysRemaining !== null && daysRemaining < 90
                ? 'text-yellow-600'
                : 'text-gray-900'
            }`}>
              {daysRemaining !== null ? `${daysRemaining} days` : 'N/A'}
            </p>
          </div>
        </div>

        {daysRemaining !== null && daysRemaining < 90 && (
          <Alert 
            title="Lease Expiring Soon" 
            variant={daysRemaining < 30 ? "destructive" : "default"}
            className="mt-4"
          >
            Your lease expires in {daysRemaining} days. Please contact your property manager 
            to discuss renewal options.
          </Alert>
        )}
      </div>

      {/* Lease Terms */}
      {lease.terms && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Lease Terms</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{lease.terms}</p>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Property Manager Contact</h2>
        <div className="space-y-2">
          {property?.managerName && (
            <p className="text-gray-700">
              <span className="font-medium">Name:</span> {property.managerName}
            </p>
          )}
          {property?.managerEmail && (
            <p className="text-gray-700">
              <span className="font-medium">Email:</span> {property.managerEmail}
            </p>
          )}
          {property?.managerPhone && (
            <p className="text-gray-700">
              <span className="font-medium">Phone:</span> {property.managerPhone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseInfo;

