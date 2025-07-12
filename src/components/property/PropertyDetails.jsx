import React, { useState } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import InviteTenantModal from './InviteTenantModal';

const PropertyDetails = ({ property, tenants = [], onInviteTenant, onEditProperty }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleInviteTenant = async (inviteData) => {
    try {
      await onInviteTenant(property.id, inviteData);
      setShowInviteModal(false);
    } catch (error) {
      console.error('Failed to invite tenant:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Property Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{property.name}</h1>
            <p className="text-gray-600 mt-1">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
            {property.description && (
              <p className="text-gray-700 mt-2">{property.description}</p>
            )}
          </div>
          <Button onClick={onEditProperty} variant="outline">
            Edit Property
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total Units</h3>
            <p className="text-2xl font-bold text-gray-900">{property.units}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Occupied Units</h3>
            <p className="text-2xl font-bold text-gray-900">{tenants.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Monthly Rent</h3>
            <p className="text-2xl font-bold text-gray-900">${property.rentAmount}</p>
          </div>
        </div>
      </div>

      {/* Tenants Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Tenants</h2>
          <Button onClick={() => setShowInviteModal(true)}>
            Invite Tenant
          </Button>
        </div>

        {tenants.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tenants yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Invite tenants to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {tenant.firstName} {tenant.lastName}
                    </h3>
                    <p className="text-gray-600">{tenant.email}</p>
                    {tenant.unit && (
                      <p className="text-sm text-gray-500">Unit: {tenant.unit}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      tenant.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : tenant.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tenant.status || 'Active'}
                    </span>
                    {tenant.leaseStart && (
                      <p className="text-sm text-gray-500 mt-1">
                        Lease: {new Date(tenant.leaseStart).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Tenant Modal */}
      {showInviteModal && (
        <InviteTenantModal
          property={property}
          onInvite={handleInviteTenant}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;

