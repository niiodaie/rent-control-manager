import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter
} from 'lucide-react'

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = async () => {
    await signOut()
  }

  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      change: '+2 this month',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Active Tenants',
      value: '34',
      change: '+5 this month',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'text-yellow-600'
    },
    {
      title: 'Occupancy Rate',
      value: '94%',
      change: '+3% from last month',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  const recentProperties = [
    { id: 1, name: 'Sunset Apartments', units: 24, occupied: 22, revenue: '$8,400' },
    { id: 2, name: 'Downtown Lofts', units: 16, occupied: 15, revenue: '$6,750' },
    { id: 3, name: 'Garden View Complex', units: 32, occupied: 30, revenue: '$9,350' }
  ]

  const recentTenants = [
    { id: 1, name: 'John Smith', property: 'Sunset Apartments', unit: 'A-101', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', property: 'Downtown Lofts', unit: 'B-205', status: 'Active' },
    { id: 3, name: 'Mike Wilson', property: 'Garden View Complex', unit: 'C-301', status: 'Pending' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">Rent Control Admin</h1>
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
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'properties' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('properties')}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Properties
            </Button>
            <Button
              variant={activeTab === 'tenants' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('tenants')}
            >
              <Users className="h-4 w-4 mr-2" />
              Tenants
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
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>

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
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Properties</CardTitle>
                    <CardDescription>
                      Your latest property additions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProperties.map((property) => (
                        <div key={property.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{property.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {property.occupied}/{property.units} units occupied
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{property.revenue}</p>
                            <p className="text-sm text-muted-foreground">monthly</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Tenants</CardTitle>
                    <CardDescription>
                      Latest tenant applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTenants.map((tenant) => (
                        <div key={tenant.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{tenant.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {tenant.property} - {tenant.unit}
                            </p>
                          </div>
                          <Badge variant={tenant.status === 'Active' ? 'default' : 'secondary'}>
                            {tenant.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Properties</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Property management interface will be implemented here.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tenants</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    Tenant management interface will be implemented here.
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

