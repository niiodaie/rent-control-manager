import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests'
import { supabase } from '../lib/supabaseClient'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Skeleton } from '../components/ui/skeleton'
import { 
  Home, 
  CreditCard, 
  Wrench, 
  MessageSquare, 
  Settings, 
  LogOut,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  FileText
} from 'lucide-react'

export function ResidentDashboard() {
  const { user, signOut } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const { requests: maintenanceRequests, groupedRequests, loading: requestsLoading } = useMaintenanceRequests('tenant')
  const [activeTab, setActiveTab] = useState('overview')
  const [propertyInfo, setPropertyInfo] = useState(null)
  const [leaseInfo, setLeaseInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTenantData = async () => {
      if (!user) return

      try {
        // Fetch property information for the tenant
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select(`
            *,
            lease:leases(
              id,
              start_date,
              end_date,
              rent_amount,
              security_deposit,
              status
            )
          `)
          .eq('tenant_id', user.id)
          .single()

        if (propertyError && propertyError.code !== 'PGRST116') {
          console.error('Error fetching property:', propertyError)
        } else if (propertyData) {
          setPropertyInfo(propertyData)
          setLeaseInfo(propertyData.lease?.[0] || null)
        }
      } catch (error) {
        console.error('Error fetching tenant data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTenantData()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleCreateMaintenanceRequest = () => {
    // This would open a modal or navigate to a form
    console.log('Create maintenance request')
  }

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Resident Dashboard
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

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'maintenance', label: 'Maintenance' },
            { id: 'payments', label: 'Payments' },
            { id: 'lease', label: 'Lease Info' },
            { id: 'messages', label: 'Messages' }
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${leaseInfo?.rent_amount?.toLocaleString() || 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {leaseInfo ? 'Per month' : 'No active lease'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lease Status</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leaseInfo?.status || 'No Lease'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {leaseInfo?.end_date ? 
                      `Ends ${new Date(leaseInfo.end_date).toLocaleDateString()}` : 
                      'No active lease'
                    }
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                  <Wrench className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {groupedRequests.pending.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pending requests
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Property</CardTitle>
                  <Home className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {propertyInfo?.unit_number || 'N/A'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Unit number
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Property Information */}
            {propertyInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    Your Property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Property Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Address:</span> {propertyInfo.address}</p>
                        {propertyInfo.unit_number && (
                          <p><span className="font-medium">Unit:</span> {propertyInfo.unit_number}</p>
                        )}
                        <p><span className="font-medium">Bedrooms:</span> {propertyInfo.bedrooms || 'N/A'}</p>
                        <p><span className="font-medium">Bathrooms:</span> {propertyInfo.bathrooms || 'N/A'}</p>
                      </div>
                    </div>
                    {leaseInfo && (
                      <div>
                        <h3 className="font-medium mb-2">Lease Information</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Start Date:</span> {new Date(leaseInfo.start_date).toLocaleDateString()}</p>
                          <p><span className="font-medium">End Date:</span> {new Date(leaseInfo.end_date).toLocaleDateString()}</p>
                          <p><span className="font-medium">Monthly Rent:</span> ${leaseInfo.rent_amount?.toLocaleString()}</p>
                          <p><span className="font-medium">Security Deposit:</span> ${leaseInfo.security_deposit?.toLocaleString() || 'N/A'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Maintenance Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Wrench className="h-5 w-5 mr-2" />
                    Recent Maintenance Requests
                  </span>
                  <Button size="sm" onClick={handleCreateMaintenanceRequest}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : maintenanceRequests.length > 0 ? (
                  <div className="space-y-3">
                    {maintenanceRequests.slice(0, 5).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No maintenance requests</h3>
                    <p className="text-muted-foreground mb-4">
                      Submit a maintenance request when you need repairs or assistance.
                    </p>
                    <Button onClick={handleCreateMaintenanceRequest}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Maintenance Requests
                <Button onClick={handleCreateMaintenanceRequest}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </CardTitle>
              <CardDescription>
                Submit and track maintenance requests for your unit
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
                            <span>Submitted {new Date(request.created_at).toLocaleDateString()}</span>
                            {request.priority && (
                              <>
                                <span>•</span>
                                <span>Priority: {request.priority}</span>
                              </>
                            )}
                          </div>
                          {request.admin_notes && (
                            <div className="mt-3 p-2 bg-muted rounded text-sm">
                              <p className="font-medium">Admin Notes:</p>
                              <p>{request.admin_notes}</p>
                            </div>
                          )}
                        </div>
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
                <div className="text-center py-12">
                  <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No maintenance requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Submit a maintenance request when you need repairs or assistance.
                  </p>
                  <Button onClick={handleCreateMaintenanceRequest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Other tabs */}
        {activeTab === 'payments' && (
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment history and rent payment features coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'lease' && (
          <Card>
            <CardHeader>
              <CardTitle>Lease Information</CardTitle>
            </CardHeader>
            <CardContent>
              {leaseInfo ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Lease Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Start Date:</span> {new Date(leaseInfo.start_date).toLocaleDateString()}</p>
                        <p><span className="font-medium">End Date:</span> {new Date(leaseInfo.end_date).toLocaleDateString()}</p>
                        <p><span className="font-medium">Status:</span> {leaseInfo.status}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Financial Details</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Monthly Rent:</span> ${leaseInfo.rent_amount?.toLocaleString()}</p>
                        <p><span className="font-medium">Security Deposit:</span> ${leaseInfo.security_deposit?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No active lease information available.</p>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'messages' && (
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Messaging features coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

