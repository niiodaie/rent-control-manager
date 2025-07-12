// Role constants and types
export const ROLES = {
  MANAGER: 'manager',
  TENANT: 'tenant',
  ADMIN: 'admin'
};

export const USER_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

export const LEASE_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  EXPIRED: 'expired',
  TERMINATED: 'terminated'
};

export const MAINTENANCE_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  FAILED: 'failed'
};

// Role permissions
export const PERMISSIONS = {
  [ROLES.MANAGER]: [
    'create_property',
    'edit_property',
    'delete_property',
    'invite_tenant',
    'view_tenants',
    'manage_leases',
    'view_payments',
    'manage_maintenance'
  ],
  [ROLES.TENANT]: [
    'view_lease',
    'make_payment',
    'submit_maintenance_request',
    'view_payment_history',
    'update_profile'
  ],
  [ROLES.ADMIN]: [
    'manage_all_properties',
    'manage_all_users',
    'view_analytics',
    'system_settings'
  ]
};

// Helper functions
export const hasPermission = (userRole, permission) => {
  return PERMISSIONS[userRole]?.includes(permission) || false;
};

export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

export const getRoleDisplayName = (role) => {
  const displayNames = {
    [ROLES.MANAGER]: 'Property Manager',
    [ROLES.TENANT]: 'Tenant',
    [ROLES.ADMIN]: 'Administrator'
  };
  return displayNames[role] || 'Unknown Role';
};

export default {
  ROLES,
  USER_STATUS,
  LEASE_STATUS,
  MAINTENANCE_STATUS,
  PAYMENT_STATUS,
  PERMISSIONS,
  hasPermission,
  isValidRole,
  getRoleDisplayName
};

