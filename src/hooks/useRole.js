import { useContext } from 'react';
import RoleContext from '../contexts/RoleContext';

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export default useRole;

