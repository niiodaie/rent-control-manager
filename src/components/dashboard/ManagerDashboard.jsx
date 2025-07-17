import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Settings,
  Bell,
  Search,
  Calendar,
  FileText,
  CreditCard,
  Home,
  User,
  LogOut,
  Wrench,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard as PaymentIcon,
  FileText as ApplicationIcon,
  MessageSquare
} from 'lucide-react';

const ManagerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, properties, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    occupiedUnits: 0,
    vacantUnits: 0,
    pendingApplications: 0,
    pendingPayments: 0,
    maintenanceRequests: 0,
    monthlyRevenue: 0,
    collectionRate: 0
  });

  useEffect(() => {
    if (properties) {
      calculateStats();
    }
    
    // Fetch notifications (mock data for now)
    fetchNotifications();
  }, [properties]);

  const calculateStats = () => {
    const totalProperties = properties.length;
    let totalUnits = 0;
    let occupiedUnits = 0;
    let monthlyRevenue = 0;
    let pendingApplications = 0;
    let pendingPayments = 0;
    let maintenanceRequests = 0;

    properties.forEach(property => {
      const units = property.units || [];
      totalUnits += units.length;
      
      units.forEach(unit => {
        if (unit.status === 'occupied' || (unit.leases && unit.leases.some(lease => lease.status === 'active'))) {
          occupiedUnits++;
          
          // Calculate monthly revenue from active leases
          const activeLease = unit.leases?.find(lease => lease.status === 'active');
          if (activeLease) {
            monthlyRevenue += parseFloat(activeLease.monthly_rent || 0);
          }
        }
        
        // Count pending applications
        if (unit.applications && unit.applications.some(app => app.status === 'pending')) {
          pendingApplications++;
        }
        
        // Count pending payments
        if (unit.payments && unit.payments.some(payment => payment.status === 'pending')) {
          pendingPayments++;
        }
        
        // Count maintenance requests
        if (unit.maintenance_requests && unit.maintenance_requests.some(req => req.status === 'open')) {
          maintenanceRequests++;
        }
      });
    });

    const vacantUnits = totalUnits - occupiedUnits;
    const collectionRate = occupiedUnits > 0 ? 
      ((occupiedUnits - pendingPayments) / occupiedUnits) * 100 : 0;

    setStats({
      totalProperties,
      totalUnits,
      occupiedUnits,
      vacantUnits,
      pendingApplications,
      pendingPayments,
      maintenanceRequests,
      monthlyRevenue,
      collectionRate
    });
  };

  const fetchNotifications = () => {
    // Mock notifications data
    const mockNotifications = [
      { 
        id: 1, 
        type: 'payment', 
        message: 'New rent payment received from John Doe', 
        time: '10 minutes ago',
        property: 'Sunset Apartments',
        unit: '3B'
      },
      { 
        id: 2, 
        type: 'maintenance', 
        message: 'Maintenance request: Leaky faucet in Unit 2A', 
        time: '1 hour ago',
        property: 'Oakwood Heights',
        unit: '2A'
      },
      { 
        id: 3, 
        type: 'application', 
        message: 'New rental application submitted for review', 
        time: '3 hours ago',
        property: 'Sunset Apartments',
        unit: '5C'
      },
      { 
        id: 4, 
        type: 'message', 
        message: 'New message from tenant Sarah Johnson', 
        time: 'Yesterday',
        property: 'Oakwood Heights',
        unit: '4D'
      }
    ];
    
    setNotifications(mockNotifications);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Rent Control
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, tenants..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
              <div className="relative group">
                <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    <p className="font-medium">{profile?.full_name || user?.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Property Manager</p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to your Manager Dashboard, {profile?.full_name || 'Manager'} 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your properties, tenants, and operations from this central dashboard.
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px space-x-8">
              {[
                { id: 'properties', label: 'Properties', icon: Building2 },
                { id: 'tenants', label: 'Tenants', icon: Users },
                { id: 'applications', label: 'Applications', icon: ApplicationIcon },
                { id: 'payments', label: 'Payments', icon: PaymentIcon },
                { id: 'maintenance', label: 'Maintenance', icon: Wrench },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {tab.id === 'applications' && stats.pendingApplications > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {stats.pendingApplications}
                    </span>
                  )}
                  {tab.id === 'maintenance' && stats.maintenanceRequests > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      {stats.maintenanceRequests}
                    </span>
                  )}
                  {tab.id === 'messages' && notifications.filter(n => n.type === 'message').length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {notifications.filter(n => n.type === 'message').length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Properties
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalProperties}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Tenants
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.occupiedUnits}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Collection Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.collectionRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'properties' && (
            <PropertiesTab 
              properties={properties} 
              navigate={navigate}
            />
          )}
          
          {activeTab === 'tenants' && (
            <TenantsTab 
              properties={properties}
            />
          )}
          
          {activeTab === 'applications' && (
            <ApplicationsTab 
              pendingCount={stats.pendingApplications}
            />
          )}
          
          {activeTab === 'payments' && (
            <PaymentsTab 
              pendingCount={stats.pendingPayments}
              monthlyRevenue={stats.monthlyRevenue}
              collectionRate={stats.collectionRate}
            />
          )}
          
          {activeTab === 'maintenance' && (
            <MaintenanceTab 
              requestCount={stats.maintenanceRequests}
            />
          )}
          
          {activeTab === 'messages' && (
            <MessagesTab 
              notifications={notifications.filter(n => n.type === 'message')}
            />
          )}
          
          {activeTab === 'subscriptions' && (
            <SubscriptionsTab 
              profile={profile}
            />
          )}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'payment' ? 'bg-green-500' : 
                      notification.type === 'maintenance' ? 'bg-orange-500' : 
                      notification.type === 'application' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.property} - Unit {notification.unit} • {notification.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

// Properties Tab Component
const PropertiesTab = ({ properties, navigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Properties
        </h3>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={() => {/* Add property logic */}}
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Properties Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start by adding your first property. You can add details, units, and invite tenants.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Property</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => {
            const totalUnits = property.units?.length || 0;
            const occupiedUnits = property.units?.filter(unit => 
              unit.status === 'occupied' || (unit.leases && unit.leases.some(lease => lease.status === 'active'))
            ).length || 0;
            const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;
            
            return (
              <div 
                key={property.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  {property.image_url ? (
                    <img 
                      src={property.image_url} 
                      alt={property.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {property.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {property.address}, {property.city}, {property.state}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Units</p>
                      <p className="font-medium">{totalUnits} total</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Occupancy</p>
                      <p className="font-medium">{occupancyRate.toFixed(0)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {occupiedUnits} occupied, {totalUnits - occupiedUnits} vacant
                    </span>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Add Property Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 border-dashed flex items-center justify-center h-64 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                Add New Property
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a new property to your portfolio
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Tenants Tab Component
const TenantsTab = ({ properties }) => {
  // Extract all tenants from properties
  const tenants = [];
  properties.forEach(property => {
    property.units?.forEach(unit => {
      unit.leases?.forEach(lease => {
        if (lease.tenant && lease.status === 'active') {
          tenants.push({
            ...lease.tenant,
            property_name: property.name,
            unit_number: unit.unit_number,
            lease_end: lease.end_date,
            monthly_rent: lease.monthly_rent
          });
        }
      });
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tenants
        </h3>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Tenant</span>
        </button>
      </div>

      {tenants.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Tenants Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start by adding units to your properties and inviting tenants to join.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Your First Tenant</span>
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property / Unit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Lease End
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Monthly Rent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {tenants.map((tenant, index) => (
                  <tr key={tenant.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {tenant.full_name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {tenant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{tenant.property_name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Unit {tenant.unit_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(tenant.lease_end).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${parseFloat(tenant.monthly_rent).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3">
                        Message
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Applications Tab Component
const ApplicationsTab = ({ pendingCount }) => {
  // Mock applications data
  const applications = [
    {
      id: 1,
      applicant_name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '(555) 123-4567',
      property_name: 'Sunset Apartments',
      unit_number: '5C',
      date_submitted: '2025-07-01',
      status: 'pending',
      income: 75000,
      credit_score: 720
    },
    {
      id: 2,
      applicant_name: 'Michael Rodriguez',
      email: 'michael.r@example.com',
      phone: '(555) 987-6543',
      property_name: 'Oakwood Heights',
      unit_number: '2B',
      date_submitted: '2025-06-28',
      status: 'approved',
      income: 85000,
      credit_score: 750
    },
    {
      id: 3,
      applicant_name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '(555) 456-7890',
      property_name: 'Sunset Apartments',
      unit_number: '3A',
      date_submitted: '2025-06-25',
      status: 'rejected',
      income: 55000,
      credit_score: 620
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Rental Applications
        </h3>
        <div className="flex space-x-2">
          <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>All Applications</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Applicant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property / Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map(application => (
                <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.applicant_name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {application.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{application.property_name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Unit {application.unit_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(application.date_submitted).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      application.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Payments Tab Component
const PaymentsTab = ({ pendingCount, monthlyRevenue, collectionRate }) => {
  // Mock payments data
  const payments = [
    {
      id: 1,
      tenant_name: 'John Doe',
      property_name: 'Sunset Apartments',
      unit_number: '3B',
      amount: 1200,
      date: '2025-07-01',
      status: 'paid',
      method: 'Credit Card'
    },
    {
      id: 2,
      tenant_name: 'Sarah Johnson',
      property_name: 'Oakwood Heights',
      unit_number: '4D',
      amount: 1500,
      date: '2025-07-01',
      status: 'pending',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      tenant_name: 'Michael Smith',
      property_name: 'Sunset Apartments',
      unit_number: '2A',
      amount: 1100,
      date: '2025-06-30',
      status: 'paid',
      method: 'Credit Card'
    },
    {
      id: 4,
      tenant_name: 'Jessica Brown',
      property_name: 'Oakwood Heights',
      unit_number: '1C',
      amount: 1350,
      date: '2025-06-28',
      status: 'overdue',
      method: 'Pending'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Rent Payments
        </h3>
        <div className="flex space-x-2">
          <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>All Payments</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Generate Statement
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Monthly Revenue</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${monthlyRevenue.toLocaleString()}</p>
          <div className="mt-2 text-sm text-green-600">
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              2.5% from last month
            </span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Collection Rate</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{collectionRate.toFixed(1)}%</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${collectionRate}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Pending Payments</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            View pending payments
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tenant
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Property / Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {payment.tenant_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{payment.property_name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Unit {payment.unit_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${payment.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Maintenance Tab Component
const MaintenanceTab = ({ requestCount }) => {
  // Mock maintenance requests data
  const requests = [
    {
      id: 1,
      tenant_name: 'John Doe',
      property_name: 'Sunset Apartments',
      unit_number: '3B',
      issue: 'Leaky faucet in bathroom',
      priority: 'medium',
      date_submitted: '2025-07-05',
      status: 'open',
      assigned_to: null
    },
    {
      id: 2,
      tenant_name: 'Sarah Johnson',
      property_name: 'Oakwood Heights',
      unit_number: '4D',
      issue: 'AC not cooling properly',
      priority: 'high',
      date_submitted: '2025-07-04',
      status: 'in_progress',
      assigned_to: 'Mike Technician'
    },
    {
      id: 3,
      tenant_name: 'Michael Smith',
      property_name: 'Sunset Apartments',
      unit_number: '2A',
      issue: 'Light fixture not working in kitchen',
      priority: 'low',
      date_submitted: '2025-07-03',
      status: 'resolved',
      assigned_to: 'Mike Technician'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Maintenance Requests
        </h3>
        <div className="flex space-x-2">
          <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option>All Requests</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tenant / Unit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {requests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {request.tenant_name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {request.property_name} - Unit {request.unit_number}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {request.issue}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(request.date_submitted).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {request.status === 'in_progress' ? 'In Progress' : 
                       request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {request.assigned_to || 'Not Assigned'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3">
                      Assign
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ notifications }) => {
  // Mock conversations data
  const conversations = [
    {
      id: 1,
      tenant_name: 'John Doe',
      property_name: 'Sunset Apartments',
      unit_number: '3B',
      last_message: 'When will the maintenance team fix the leaky faucet?',
      time: '10 minutes ago',
      unread: true
    },
    {
      id: 2,
      tenant_name: 'Sarah Johnson',
      property_name: 'Oakwood Heights',
      unit_number: '4D',
      last_message: 'Thanks for addressing the AC issue so quickly!',
      time: '2 hours ago',
      unread: false
    },
    {
      id: 3,
      tenant_name: 'Michael Smith',
      property_name: 'Sunset Apartments',
      unit_number: '2A',
      last_message: 'I\'ll be out of town next week. Just letting you know.',
      time: 'Yesterday',
      unread: false
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  // Mock messages for the selected conversation
  const messages = [
    {
      id: 1,
      sender: 'tenant',
      text: 'Hello, I wanted to report a leaky faucet in my bathroom.',
      time: '2025-07-06T10:30:00'
    },
    {
      id: 2,
      sender: 'manager',
      text: 'Hi John, thanks for letting us know. When would be a good time for our maintenance team to come by?',
      time: '2025-07-06T10:45:00'
    },
    {
      id: 3,
      sender: 'tenant',
      text: 'I\'m available tomorrow afternoon after 2pm.',
      time: '2025-07-06T11:00:00'
    },
    {
      id: 4,
      sender: 'manager',
      text: 'Perfect, I\'ll schedule them to come by around 3pm tomorrow. Does that work?',
      time: '2025-07-06T11:15:00'
    },
    {
      id: 5,
      sender: 'tenant',
      text: 'Yes, that works great. Thank you!',
      time: '2025-07-06T11:20:00'
    },
    {
      id: 6,
      sender: 'tenant',
      text: 'When will the maintenance team fix the leaky faucet?',
      time: '2025-07-06T14:30:00'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-300px)] min-h-[500px]">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h3>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                  selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {conversation.tenant_name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {conversation.property_name} - Unit {conversation.unit_number}
                    </p>
                    <p className={`text-sm mt-1 ${conversation.unread ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {conversation.last_message.length > 40 
                        ? conversation.last_message.substring(0, 40) + '...' 
                        : conversation.last_message}
                    </p>
                    {conversation.unread && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Content */}
        <div className="w-2/3 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {conversations.find(c => c.id === selectedConversation)?.tenant_name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {conversations.find(c => c.id === selectedConversation)?.property_name} - 
                      Unit {conversations.find(c => c.id === selectedConversation)?.unit_number}
                    </p>
                  </div>
                </div>
                <div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === 'manager' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'manager' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'manager' 
                            ? 'text-blue-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                    onClick={handleSendMessage}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Conversation Selected</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Select a conversation from the list to view messages.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Subscriptions Tab Component
const SubscriptionsTab = ({ profile }) => {
  // Mock subscription plans
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        '1 property',
        'Up to 5 units',
        'Basic tenant management',
        'Limited maintenance requests',
        'Email support'
      ],
      limits: {
        properties: 1,
        units: 5
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49.99,
      features: [
        'Up to 5 properties',
        'Up to 25 units',
        'Full tenant management',
        'Maintenance request tracking',
        'Payment processing',
        'Email and chat support'
      ],
      limits: {
        properties: 5,
        units: 25
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      features: [
        'Unlimited properties',
        'Unlimited units',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Priority support',
        'Dedicated account manager'
      ],
      limits: {
        properties: Infinity,
        units: Infinity
      }
    }
  ];

  const currentPlan = profile?.subscription_status || 'free';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Subscription Management
        </h3>
      </div>

      {/* Current Plan */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h4>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {plans.find(p => p.id === currentPlan)?.name || 'Free'} Plan
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {currentPlan === 'free' ? 'Limited features' : 'Full access to premium features'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {currentPlan !== 'enterprise' && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div 
            key={plan.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
              currentPlan === plan.id 
                ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                : 'border-gray-200 dark:border-gray-700'
            } overflow-hidden`}
          >
            <div className={`p-6 ${
              currentPlan === plan.id 
                ? 'bg-blue-50 dark:bg-blue-900/20' 
                : ''
            }`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {currentPlan === plan.id && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Current Plan
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {currentPlan === plan.id ? (
                  <button 
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400"
                    disabled
                  >
                    Current Plan
                  </button>
                ) : (
                  <button 
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                      plan.id === 'free' 
                        ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600' 
                        : 'text-white bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentPlan !== 'free' ? (
                <>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Jul 1, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan - Monthly
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${plans.find(p => p.id === currentPlan)?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Jun 1, 2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan - Monthly
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${plans.find(p => p.id === currentPlan)?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                        Download
                      </button>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No billing history available for Free plan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

