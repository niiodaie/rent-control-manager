import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { SimpleInviteTenantModal } from '../components/SimpleInviteTenantModal'
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter,
  Wrench,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  X
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function AdminDashboardDemo() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const handleInviteSubmit = async (e) => {
    e.preventDefault()
    setInviteLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setInviteLoading(false)
    setInviteSuccess(true)
    
    // Reset after success
    setTimeout(() => {
      setInviteForm({ firstName: '', lastName: '', email: '', message: '' })
      setInviteSuccess(false)
      setShowInviteModal(false)
    }, 2000)
  }

  // Mock data for demonstration
  const mockProperties = [
    {
      id: 1,
      address: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      rent_amount: 2500,
      tenant_name: 'John Smith',
      tenant_email: 'john.smith@email.com',
      lease_start: '2024-01-01',
      lease_end: '2024-12-31',
      status: 'occupied'
    },
    {
      id: 2,
      address: '456 Oak Ave, Unit 2A',
      city: 'Los Angeles',
      state: 'CA',
      rent_amount: 3200,
      tenant_name: 'Sarah Johnson',
      tenant_email: 'sarah.j@email.com',
      lease_start: '2024-02-15',
      lease_end: '2025-02-14',
      status: 'occupied'
    },
    {
      id: 3,
      address: '789 Pine St, Suite 1',
      city: 'Chicago',
      state: 'IL',
      rent_amount: 1800,
      tenant_name: null,
      tenant_email: null,
      lease_start: null,
      lease_end: null,
      status: 'vacant'
    }
  ]

  const mockMaintenanceRequests = [
    {
      id: 1,
      property_address: '123 Main St, Apt 4B',
      tenant_name: 'John Smith',
      issue: 'Leaky faucet in kitchen',
      priority: 'medium',
      status: 'pending',
      created_at: '2024-01-20',
      description: 'The kitchen faucet has been dripping for the past week.'
    },
    {
      id: 2,
      property_address: '456 Oak Ave, Unit 2A',
      tenant_name: 'Sarah Johnson',
      issue: 'Heating not working',
      priority: 'high',
      status: 'in_progress',
      created_at: '2024-01-18',
      description: 'No heat in the apartment, very cold.'
    },
    {
      id: 3,
      property_address: '123 Main St, Apt 4B',
      tenant_name: 'John Smith',
      issue: 'Light bulb replacement',
      priority: 'low',
      status: 'completed',
      created_at: '2024-01-15',
      description: 'Bathroom light bulb needs replacement.'
    }
  ]

  // Calculate stats
  const totalProperties = mockProperties.length
  const occupiedProperties = mockProperties.filter(p => p.status === 'occupied').length
  const occupancyRate = Math.round((occupiedProperties / totalProperties) * 100)
  const monthlyRevenue = mockProperties.reduce((sum, property) => sum + (property.rent_amount || 0), 0)
  const pendingRequests = mockMaintenanceRequests.filter(r => r.status === 'pending').length

  const stats = [
    {
      title: 'Total Properties',
      value: totalProperties.toString(),
      change: `${occupiedProperties} occupied`,
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Active Tenants',
      value: occupiedProperties.toString(),
      change: `${occupancyRate}% occupancy`,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${monthlyRevenue.toLocaleString()}`,
      change: 'From active leases',
      icon: DollarSign,
      color: 'text-yellow-600'
    },
    {
      title: 'Maintenance Requests',
      value: pendingRequests.toString(),
      change: `${mockMaintenanceRequests.length} total`,
      icon: Wrench,
      color: 'text-red-600'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your property overview.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'properties' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </Button>
          <Button
            variant={activeTab === 'maintenance' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance
          </Button>
          <Button
            variant={activeTab === 'tenants' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('tenants')}
          >
            Tenants
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
                <CardDescription>Your latest property additions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {property.city}, {property.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${property.rent_amount}/mo</p>
                        <Badge variant={property.status === 'occupied' ? 'default' : 'secondary'}>
                          {property.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Maintenance</CardTitle>
                <CardDescription>Latest maintenance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMaintenanceRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-start space-x-3">
                      {getStatusIcon(request.status)}
                      <div className="flex-1">
                        <p className="font-medium">{request.issue}</p>
                        <p className="text-sm text-muted-foreground">{request.property_address}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{request.created_at}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Properties</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{property.address}</CardTitle>
                    <CardDescription>{property.city}, {property.state}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Rent:</span>
                        <span className="font-medium">${property.rent_amount}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant={property.status === 'occupied' ? 'default' : 'secondary'}>
                          {property.status}
                        </Badge>
                      </div>
                      {property.tenant_name && (
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium">{property.tenant_name}</p>
                          <p className="text-xs text-muted-foreground">{property.tenant_email}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Maintenance Requests</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {mockMaintenanceRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{request.issue}</CardTitle>
                        <CardDescription>{request.property_address}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Tenant: {request.tenant_name}</span>
                        <span>Created: {request.created_at}</span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tenants' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Tenants</h2>
              <Button onClick={() => setShowInviteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite Tenant
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProperties.filter(p => p.tenant_name).map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{property.tenant_name}</CardTitle>
                    <CardDescription>{property.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{property.tenant_email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">${property.rent_amount}/month</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{property.city}, {property.state}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Lease: {property.lease_start} to {property.lease_end}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invite Tenant Modal */}
      {showInviteModal && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => !inviteLoading && setShowInviteModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border p-6">
            {/* Close button */}
            <button
              onClick={() => !inviteLoading && setShowInviteModal(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
              disabled={inviteLoading}
            >
              <X className="h-4 w-4" />
            </button>

            {inviteSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Invitation Sent!</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Tenant invitation has been sent to {inviteForm.email}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Invite New Tenant
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Send an invitation to a new tenant to join your property.
                  </p>
                </div>
                
                <form onSubmit={handleInviteSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        value={inviteForm.firstName}
                        onChange={(e) => setInviteForm({...inviteForm, firstName: e.target.value})}
                        placeholder="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={inviteLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        value={inviteForm.lastName}
                        onChange={(e) => setInviteForm({...inviteForm, lastName: e.target.value})}
                        placeholder="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={inviteLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                      placeholder="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={inviteLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={inviteLoading}
                    >
                      <option>789 Pine St, Suite 1 - $1800/month</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personal Message (Optional)</label>
                    <textarea
                      value={inviteForm.message}
                      onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
                      placeholder="Welcome to your new home!"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      disabled={inviteLoading}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowInviteModal(false)}
                      disabled={inviteLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={inviteLoading || !inviteForm.email || !inviteForm.firstName || !inviteForm.lastName}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {inviteLoading ? 'Sending...' : 'Send Invitation'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboardDemo

