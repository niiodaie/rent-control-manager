import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  DollarSign, 
  Wrench, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import InviteTenantModal from '../components/InviteTenantModal';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const stats = [
    { label: 'Total Properties', value: '12', icon: Home, color: 'bg-blue-500' },
    { label: 'Active Tenants', value: '28', icon: Users, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: '$24,500', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Maintenance Requests', value: '3', icon: Wrench, color: 'bg-orange-500' }
  ];

  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Main St, Downtown',
      units: 8,
      occupied: 7,
      revenue: '$8,400'
    },
    {
      id: 2,
      name: 'Garden View Complex',
      address: '456 Oak Ave, Midtown',
      units: 12,
      occupied: 11,
      revenue: '$13,200'
    },
    {
      id: 3,
      name: 'Downtown Lofts',
      address: '789 Pine St, City Center',
      units: 6,
      occupied: 5,
      revenue: '$7,500'
    }
  ];

  const tenants = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      property: 'Sunset Apartments - Unit 101',
      rentStatus: 'Paid',
      moveInDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      property: 'Garden View Complex - Unit 5B',
      rentStatus: 'Due',
      moveInDate: '2023-08-01'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 345-6789',
      property: 'Downtown Lofts - Unit 12A',
      rentStatus: 'Paid',
      moveInDate: '2023-09-10'
    }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      property: 'Sunset Apartments - Unit 101',
      tenant: 'John Smith',
      issue: 'Leaky faucet in kitchen',
      priority: 'Medium',
      status: 'In Progress',
      date: '2024-01-15'
    },
    {
      id: 2,
      property: 'Garden View Complex - Unit 5B',
      tenant: 'Sarah Johnson',
      issue: 'Heating not working properly',
      priority: 'High',
      status: 'Open',
      date: '2024-01-14'
    },
    {
      id: 3,
      property: 'Downtown Lofts - Unit 12A',
      tenant: 'Mike Chen',
      issue: 'Light fixture replacement needed',
      priority: 'Low',
      status: 'Scheduled',
      date: '2024-01-13'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'Properties' },
    { id: 'tenants', label: 'Tenants' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Due': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Property Management Dashboard</h1>
              <p className="text-gray-600">Manage your properties, tenants, and maintenance requests</p>
            </div>
            <Button onClick={() => setShowInviteModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Invite Tenant
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New tenant moved in</p>
                        <p className="text-sm text-gray-600">Mike Chen - Downtown Lofts Unit 12A</p>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Maintenance request submitted</p>
                        <p className="text-sm text-gray-600">Heating issue - Garden View Complex</p>
                      </div>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Rent payment received</p>
                        <p className="text-sm text-gray-600">John Smith - $1,200</p>
                      </div>
                      <span className="text-sm text-gray-500">5 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Properties</h3>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{property.name}</h4>
                          <p className="text-gray-600 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.address}
                          </p>
                          <div className="flex gap-4 mt-3 text-sm">
                            <span>Units: {property.units}</span>
                            <span>Occupied: {property.occupied}/{property.units}</span>
                            <span className="font-medium text-green-600">Revenue: {property.revenue}</span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tenants Tab */}
            {activeTab === 'tenants' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Tenants</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Search tenants..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button onClick={() => setShowInviteModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Tenant
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {tenants.map((tenant) => (
                    <div key={tenant.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{tenant.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant.rentStatus)}`}>
                              {tenant.rentStatus}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {tenant.email}
                            </p>
                            <p className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {tenant.phone}
                            </p>
                            <p className="flex items-center">
                              <Home className="h-4 w-4 mr-2" />
                              {tenant.property}
                            </p>
                            <p className="text-xs">Move-in: {new Date(tenant.moveInDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Maintenance Requests</h3>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Request
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {maintenanceRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{request.issue}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Property:</strong> {request.property}</p>
                            <p><strong>Tenant:</strong> {request.tenant}</p>
                            <p><strong>Submitted:</strong> {new Date(request.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Tenant Modal */}
      <InviteTenantModal 
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        properties={properties}
      />
    </div>
  );
}

export default AdminDashboard;

