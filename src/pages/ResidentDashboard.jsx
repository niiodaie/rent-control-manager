import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
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
  CheckCircle
} from 'lucide-react'

export function ResidentDashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = async () => {
    await signOut()
  }

  const rentInfo = {
    amount: '$1,250',
    dueDate: 'January 1, 2024',
    status: 'Paid',
    nextDue: 'February 1, 2024'
  }

  const propertyInfo = {
    name: 'Sunset Apartments',
    unit: 'A-101',
    address: '123 Main Street, Apt A-101',
    leaseEnd: 'December 31, 2024'
  }

  const maintenanceRequests = [
    { id: 1, title: 'Leaky Faucet', status: 'In Progress', date: '2024-01-15', priority: 'Medium' },
    { id: 2, title: 'AC Not Working', status: 'Completed', date: '2024-01-10', priority: 'High' },
    { id: 3, title: 'Light Bulb Replacement', status: 'Pending', date: '2024-01-12', priority: 'Low' }
  ]

  const paymentHistory = [
    { id: 1, amount: '$1,250', date: '2024-01-01', status: 'Paid', type: 'Rent' },
    { id: 2, amount: '$1,250', date: '2023-12-01', status: 'Paid', type: 'Rent' },
    { id: 3, amount: '$1,250', date: '2023-11-01', status: 'Paid', type: 'Rent' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Home className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">Resident Portal</h1>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('overview')}
            >
              <Home className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'payments' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </Button>
            <Button
              variant={activeTab === 'maintenance' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('maintenance')}
            >
              <Wrench className="h-4 w-4 mr-2" />
              Maintenance
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Rent
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rentInfo.amount}</div>
                    <p className="text-xs text-muted-foreground">
                      Due {rentInfo.nextDue}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Payment Status
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rentInfo.status}</div>
                    <p className="text-xs text-muted-foreground">
                      Last payment: {rentInfo.dueDate}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Maintenance Requests
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                      1 in progress, 1 pending
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Lease Expires
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">11</div>
                    <p className="text-xs text-muted-foreground">
                      months remaining
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Property Info and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Information</CardTitle>
                    <CardDescription>
                      Your current residence details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">{propertyInfo.name}</p>
                      <p className="text-sm text-muted-foreground">Unit {propertyInfo.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{propertyInfo.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lease End Date</p>
                      <p className="text-sm text-muted-foreground">{propertyInfo.leaseEnd}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Maintenance</CardTitle>
                    <CardDescription>
                      Your latest maintenance requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {maintenanceRequests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{request.title}</p>
                            <p className="text-sm text-muted-foreground">{request.date}</p>
                          </div>
                          <Badge 
                            variant={
                              request.status === 'Completed' ? 'default' : 
                              request.status === 'In Progress' ? 'secondary' : 'outline'
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Payments</h2>
                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Make Payment
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Current Rent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{rentInfo.amount}</div>
                    <p className="text-muted-foreground">Due {rentInfo.nextDue}</p>
                    <Button className="w-full mt-4">Pay Now</Button>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentHistory.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{payment.type}</p>
                            <p className="text-sm text-muted-foreground">{payment.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{payment.amount}</p>
                            <Badge variant="default">{payment.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Maintenance Requests</h2>
                <Button>
                  <Wrench className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            request.priority === 'High' ? 'bg-red-100 text-red-600' :
                            request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            <AlertCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{request.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Submitted on {request.date} • {request.priority} Priority
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            request.status === 'Completed' ? 'default' : 
                            request.status === 'In Progress' ? 'secondary' : 'outline'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Messages</h2>
              
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Messaging interface will be implemented here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Settings interface will be implemented here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

