import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('manager');

  const managerStats = [
    { label: 'Total Properties', value: '24', change: '+2', icon: Building2, color: 'blue' },
    { label: 'Active Tenants', value: '156', change: '+8', icon: Users, color: 'green' },
    { label: 'Monthly Revenue', value: '$47,250', change: '+12%', icon: DollarSign, color: 'purple' },
    { label: 'Occupancy Rate', value: '94%', change: '+3%', icon: TrendingUp, color: 'orange' }
  ];

  const properties = [
    { name: 'Sunset Apartments', units: 12, occupied: 11, revenue: '$12,500', status: 'active' },
    { name: 'Downtown Lofts', units: 8, occupied: 7, revenue: '$8,750', status: 'active' },
    { name: 'Garden View Complex', units: 16, occupied: 15, revenue: '$18,200', status: 'active' },
    { name: 'Riverside Condos', units: 6, occupied: 5, revenue: '$7,800', status: 'maintenance' }
  ];

  const tenantData = {
    property: 'Sunset Apartments',
    unit: 'Unit 4B',
    rent: '$1,250',
    dueDate: 'Dec 1, 2024',
    lease: 'Expires: Jun 30, 2025'
  };

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };
    return colors[color] || 'bg-gray-50 text-gray-600';
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Dashboards for
            <span className="text-blue-600 block">Every User</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience intuitive interfaces designed for property managers and tenants. 
            Everything you need is just a click away.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('manager')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'manager'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Property Manager View
            </button>
            <button
              onClick={() => setActiveTab('tenant')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tenant'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tenant View
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {activeTab === 'manager' ? (
            // Manager Dashboard
            <div>
              {/* Dashboard Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">Property Manager Dashboard</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      All Systems Operational
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {managerStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-lg ${getStatColor(stat.color)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Properties Table */}
                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">Properties Overview</h4>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search properties..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{property.name}</div>
                              <div className="text-sm text-gray-500">{property.units} units</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property.occupied}/{property.units}</div>
                              <div className="text-sm text-gray-500">
                                {Math.round((property.occupied / property.units) * 100)}% occupied
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {property.revenue}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                property.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {property.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-900">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Tenant Dashboard
            <div>
              {/* Dashboard Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Tenant Dashboard</h3>
                    <p className="text-sm text-gray-600">{tenantData.property} - {tenantData.unit}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Manager
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Tenant Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                      <span className="text-green-600 text-sm font-medium">Paid</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{tenantData.rent}</div>
                    <div className="text-sm text-gray-600">Monthly Rent</div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="h-8 w-8 text-orange-600" />
                      <span className="text-orange-600 text-sm font-medium">Due Soon</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{tenantData.dueDate}</div>
                    <div className="text-sm text-gray-600">Next Payment</div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Building2 className="h-8 w-8 text-green-600" />
                      <span className="text-green-600 text-sm font-medium">Active</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{tenantData.lease}</div>
                    <div className="text-sm text-gray-600">Lease Status</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pay Rent Online
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Submit Maintenance Request
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Inspection
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Rent Payment Received</div>
                          <div className="text-xs text-gray-500">Nov 1, 2024</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Maintenance Request Completed</div>
                          <div className="text-xs text-gray-500">Oct 28, 2024</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Lease Renewal Notice</div>
                          <div className="text-xs text-gray-500">Oct 15, 2024</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;

