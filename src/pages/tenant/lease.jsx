import React, { useState, useEffect } from 'react';
import { useRole } from '../../hooks/useRole';
import LeaseInfo from '../../components/tenant/LeaseInfo';

const TenantLeasePage = () => {
  const { currentProperty } = useRole();
  const [lease, setLease] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaseData = async () => {
      try {
        // TODO: Implement API calls
        // const leaseData = await api.getTenantLease();
        // const propertyData = await api.getProperty(currentProperty.id);
        
        // Mock data for now
        setLease({
          id: '1',
          unit: 'A101',
          rentAmount: 1200,
          securityDeposit: 1200,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          terms: 'Standard lease terms and conditions...'
        });
        
        setProperty({
          id: currentProperty?.id || '1',
          name: 'Sample Property',
          address: '123 Main St',
          city: 'City',
          state: 'State',
          zipCode: '12345',
          managerName: 'John Doe',
          managerEmail: 'manager@example.com',
          managerPhone: '(555) 123-4567'
        });
      } catch (error) {
        console.error('Error fetching lease data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaseData();
  }, [currentProperty]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LeaseInfo lease={lease} property={property} />
    </div>
  );
};

export default TenantLeasePage;

