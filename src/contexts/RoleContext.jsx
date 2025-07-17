import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState(null);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const determineRole = async () => {
      if (!user) {
        setCurrentRole(null);
        setCurrentProperty(null);
        setLoading(false);
        return;
      }

      try {
        // Determine role based on user data
        if (user.role === 'manager') {
          setCurrentRole('manager');
        } else if (user.role === 'tenant') {
          setCurrentRole('tenant');
          // For tenants, also set the property they're associated with
          if (user.propertyId) {
            // TODO: Fetch property details
            setCurrentProperty({ id: user.propertyId });
          }
        } else {
          // Default role determination logic
          // Check if user has properties (manager) or is associated with a property (tenant)
          // This would typically involve API calls
          setCurrentRole('manager'); // Default for now
        }
      } catch (error) {
        console.error('Error determining user role:', error);
        setCurrentRole(null);
      } finally {
        setLoading(false);
      }
    };

    determineRole();
  }, [user]);

  const switchRole = (role, propertyId = null) => {
    setCurrentRole(role);
    if (role === 'tenant' && propertyId) {
      setCurrentProperty({ id: propertyId });
    } else if (role === 'manager') {
      setCurrentProperty(null);
    }
  };

  const isManager = currentRole === 'manager';
  const isTenant = currentRole === 'tenant';

  const value = {
    currentRole,
    currentProperty,
    isManager,
    isTenant,
    switchRole,
    loading
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;

