import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useProperties } from '../hooks/useProperties'
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Skeleton } from '../components/ui/skeleton'
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
  Clock
} from 'lucide-react'

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const { properties, loading: propertiesLoading } = useProperties()
  const { requests: maintenanceRequests, groupedRequests, loading: requestsLoading } = useMaintenanceRequests('admin')
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = async () => {
    await signOut()
  }

  // Calculate dynamic stats from live data
  const stats = React.useMemo(() => {
    const totalProperties = properties.length
    const activeTenants = properties.filter(p => p.tenant_id).length
    const occupancyRate = totalProperties > 0 ? Math.round((activeTenants / totalProperties) * 100) : 0
    const monthlyRevenue = properties.reduce((sum, property) => sum + (property.rent_amount || 0), 0)

    return [
      {
        title: 'Total Properties',
        value: totalProperties.toString(),
        change: `${totalProperties} properties`,
        icon: Building2,
        color: 'text-blue-600'
      },
      {
        title: 'Active Tenants',
        value: activeTenants.toString(),
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
        value: groupedRequests.pending.length.toString(),
        change: `${maintenanceRequests.length} total`,
        icon: Wrench,
        color: 'text-red-600'
      }
    ]
  }, [properties, maintenanceRequests, groupedRequests])

  const recentProperties = properties.slice(0, 5)
  const recentRequests = maintenanceRequests.slice(0, 5)

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {profile?.full_name || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'properties', label: 'Properties' },
            { id: 'tenants', label: 'Tenants' },
            { id: 'maintenance', label: 'Maintenance' },
            { id: 'reports', label: 'Reports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {propertiesLoading || requestsLoading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Properties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Recent Properties
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {propertiesLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16" />
                      ))}
                    </div>
                  ) : recentProperties.length > 0 ? (
                    <div className="space-y-3">
                      {recentProperties.map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{property.address}</p>
                            <p className="text-sm text-muted-foreground">
                              {property.unit_number && `Unit ${property.unit_number} • `}
                              ${property.rent_amount?.toLocaleString() || 'N/A'}/month
                            </p>
                          </div>
                          <Badge variant={property.tenant_id ? 'default' : 'secondary'}>
                            {property.tenant_id ? 'Occupied' : 'Vacant'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No properties yet. Add your first property to get started.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Maintenance Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Maintenance Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {requestsLoading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16" />
                      ))}
                    </div>
                  ) : recentRequests.length > 0 ? (
                    <div className="space-y-3">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{request.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.property?.address} • {request.tenant?.full_name}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={
                                request.status === 'completed' ? 'default' :
                                request.status === 'in_progress' ? 'secondary' :
                                'destructive'
                              }
                            >
                              {request.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                              {request.status === 'in_progress' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {request.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {request.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No maintenance requests yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                All Properties
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {propertiesLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              ) : properties.length > 0 ? (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{property.address}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.unit_number && `Unit ${property.unit_number} • `}
                          {property.bedrooms} bed, {property.bathrooms} bath • 
                          ${property.rent_amount?.toLocaleString() || 'N/A'}/month
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={property.tenant_id ? 'default' : 'secondary'}>
                          {property.tenant_id ? 'Occupied' : 'Vacant'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No properties yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your first property to start managing your rental business.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Property
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>
                Manage and track maintenance requests from your tenants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requestsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24" />
                  ))}
                </div>
              ) : maintenanceRequests.length > 0 ? (
                <div className="space-y-6">
                  {/* Status Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {groupedRequests.pending.length}
                      </div>
                      <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {groupedRequests.in_progress.length}
                      </div>
                      <div className="text-sm text-blue-700">In Progress</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {groupedRequests.completed.length}
                      </div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {groupedRequests.cancelled.length}
                      </div>
                      <div className="text-sm text-gray-700">Cancelled</div>
                    </div>
                  </div>

                  {/* Requests List */}
                  <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">{request.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span>{request.property?.address}</span>
                              <span>•</span>
                              <span>{request.tenant?.full_name}</span>
                              <span>•</span>
                              <span>{new Date(request.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={
                                request.status === 'completed' ? 'default' :
                                request.status === 'in_progress' ? 'secondary' :
                                'destructive'
                              }
                            >
                              {request.status.replace('_', ' ')}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No maintenance requests</h3>
                  <p className="text-muted-foreground">
                    Maintenance requests from your tenants will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Other tabs can be implemented similarly */}
        {activeTab === 'tenants' && (
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Tenant management features coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reports and analytics features coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

