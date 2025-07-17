import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../../../components/property/PropertyDetails';

const PropertyDetailsPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        // TODO: Implement API calls
        // const propertyData = await api.getProperty(propertyId);
        // const tenantsData = await api.getPropertyTenants(propertyId);
        
        // Mock data for now
        setProperty({
          id: propertyId,
          name: 'Sample Property',
          address: '123 Main St',
          city: 'City',
          state: 'State',
          zipCode: '12345',
          units: 10,
          rentAmount: 1200,
          description: 'A beautiful property'
        });
        
        setTenants([]);
      } catch (error) {
        console.error('Error fetching property data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);

  const handleInviteTenant = async (propertyId, inviteData) => {
    // TODO: Implement invite tenant API call
    console.log('Inviting tenant:', inviteData);
  };

  const handleEditProperty = () => {
    // TODO: Navigate to edit property page
    console.log('Edit property:', propertyId);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen">Property not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetails
        property={property}
        tenants={tenants}
        onInviteTenant={handleInviteTenant}
        onEditProperty={handleEditProperty}
      />
    </div>
  );
};

export default PropertyDetailsPage;

