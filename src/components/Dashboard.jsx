import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Plus, 
  Settings, 
  BarChart3,
  Crown,
  MessageSquare,
  Wrench,
  Calendar,
  TrendingUp,
  Home,
  LogOut
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import SubscriptionManager from './SubscriptionManager';
import { TopAdBanner } from './AdBanner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, apiCall } = useAuth();
  
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    totalTenants: 0,
    monthlyRevenue: 0,
    occupancyRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's properties
      const propertiesResponse = await apiCall(`/api/properties/user/${user.id}`);
      if (propertiesResponse.success) {
        setProperties(propertiesResponse.data);
      }

      // Fetch dashboard statistics
      const statsResponse = await apiCall(`/api/dashboard/stats/${user.id}`);
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getSubscriptionBadge = (plan) => {
    switch (plan) {
      case 'premium':
        return <Badge className="bg-blue-500">Premium</Badge>;
      case 'enterprise':
        return <Badge className="bg-purple-500">Enterprise</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  // Show admin dashboard for admin users
  if (user?.role === 'admin' || user?.role === 'super_admin') {
    return <AdminDashboard />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">Rent Control</h1>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-muted-foreground">Welcome back,</span>
                <span className="font-medium">{user?.full_name || user?.email}</span>
                {user?.subscription && getSubscriptionBadge(user.subscription.plan)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveTab('subscription')}>
                <Crown className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Ad Banner for Free Users */}
        <TopAdBanner className="mb-6" />

        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'overview' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'subscription' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Crown className="h-4 w-4 inline mr-2" />
            Subscription
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Properties</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProperties}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalUnits} total units
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tenants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTenants}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.occupancyRate}% occupancy rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">
                    On-time rent collection
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Properties Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Properties</h2>
                <Button onClick={() => navigate('/properties/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>

              {properties.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Building2 className="h-16 w-16 text-muted-foreground opacity-50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No properties yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Get started by adding your first property to begin managing tenants and collecting rent.
                    </p>
                    <Button onClick={() => navigate('/properties/new')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Property
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Card key={property.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{property.name}</CardTitle>
                            <CardDescription>{property.address}</CardDescription>
                          </div>
                          <Badge variant={property.status === 'active' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Units</p>
                              <p className="font-medium">{property.total_units || 0}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Occupied</p>
                              <p className="font-medium">{property.occupied_units || 0}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monthly Rent</p>
                              <p className="font-medium">{formatCurrency(property.monthly_revenue || 0)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Occupancy</p>
                              <p className="font-medium">
                                {property.total_units > 0 
                                  ? Math.round((property.occupied_units / property.total_units) * 100)
                                  : 0
                                }%
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => navigate(`/dashboard/${property.id}`)}
                            >
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Manage
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Messages</h3>
                      <p className="text-sm text-muted-foreground">3 unread</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Wrench className="h-8 w-8 text-orange-500" />
                    <div>
                      <h3 className="font-medium">Maintenance</h3>
                      <p className="text-sm text-muted-foreground">2 pending</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Calendar className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-medium">Rent Due</h3>
                      <p className="text-sm text-muted-foreground">5 this month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Users className="h-8 w-8 text-purple-500" />
                    <div>
                      <h3 className="font-medium">Tenants</h3>
                      <p className="text-sm text-muted-foreground">Manage all</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <SubscriptionManager />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Powered by{' '}
              <a 
                href="https://visnec.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                Visnec
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

