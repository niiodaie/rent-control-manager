import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench, 
  Plus, 
  Settings, 
  Home,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Palette,
  Upload
} from 'lucide-react';

const PropertyDashboard = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, getProperty, updateProperty } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUnits: 0,
    occupiedUnits: 0,
    pendingPayments: 0,
    maintenanceRequests: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      const result = await getProperty(propertyId);
      
      if (result.success) {
        setProperty(result.data);
        calculateStats(result.data);
      } else {
        console.error('Failed to fetch property:', result.error);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (propertyData) => {
    const units = propertyData.units || [];
    const totalUnits = units.length;
    const occupiedUnits = units.filter(unit => 
      unit.leases && unit.leases.some(lease => lease.status === 'active')
    ).length;
    
    // Calculate monthly revenue from active leases
    const monthlyRevenue = units.reduce((total, unit) => {
      const activeLease = unit.leases?.find(lease => lease.status === 'active');
      return total + (activeLease ? parseFloat(activeLease.monthly_rent) : 0);
    }, 0);

    setStats({
      totalUnits,
      occupiedUnits,
      pendingPayments: 0, // This would come from payments API
      maintenanceRequests: 0, // This would come from maintenance API
      monthlyRevenue
    });
  };

  const handleBrandingUpdate = async (brandingData) => {
    try {
      const result = await updateProperty(propertyId, {
        branding_settings: {
          ...property.branding_settings,
          ...brandingData
        }
      });

      if (result.success) {
        setProperty(result.data);
      }
    } catch (error) {
      console.error('Error updating branding:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Property Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The property you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const occupancyRate = stats.totalUnits > 0 ? (stats.occupiedUnits / stats.totalUnits) * 100 : 0;
  const themeColor = property.theme_color || '#3B82F6';

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Property Header with Branding */}
      <div 
        className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
        style={{ 
          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}CC 100%)` 
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {property.logo_url ? (
                <img 
                  src={property.logo_url} 
                  alt={`${property.name} logo`}
                  className="h-16 w-16 rounded-lg object-cover bg-white/10 p-2"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-white/10 flex items-center justify-center">
                  <Building2 className="h-8 w-8" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{property.name}</h1>
                <p className="text-primary-foreground/80 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.address}, {property.city}, {property.state}
                </p>
                {property.welcome_message && (
                  <p className="text-primary-foreground/90 mt-2 max-w-md">
                    {property.welcome_message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <Home className="h-4 w-4 mr-2" />
                All Properties
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUnits}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.occupiedUnits} occupied
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.occupiedUnits} of {stats.totalUnits} units
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    From active leases
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.maintenanceRequests}</div>
                  <p className="text-xs text-muted-foreground">
                    Open requests
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for managing {property.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setActiveTab('units')}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Add Unit</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setActiveTab('tenants')}
                  >
                    <Users className="h-6 w-6" />
                    <span>Invite Tenant</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setActiveTab('payments')}
                  >
                    <DollarSign className="h-6 w-6" />
                    <span>View Payments</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Palette className="h-6 w-6" />
                    <span>Customize Branding</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates for {property.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Property dashboard created</p>
                      <p className="text-xs text-muted-foreground">Welcome to your property management dashboard</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                  
                  {stats.totalUnits === 0 && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Add your first unit</p>
                        <p className="text-xs text-muted-foreground">Start by adding units to your property</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveTab('units')}>
                        Add Unit
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Units Tab */}
          <TabsContent value="units" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Units</h2>
                <p className="text-muted-foreground">
                  Manage units for {property.name}
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </div>

            {stats.totalUnits === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Units Yet</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    Start by adding units to your property. Each unit can be assigned to tenants and managed separately.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Unit
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {property.units?.map((unit) => {
                  const activeLease = unit.leases?.find(lease => lease.status === 'active');
                  const isOccupied = !!activeLease;
                  
                  return (
                    <Card key={unit.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Unit {unit.unit_number}</CardTitle>
                            <CardDescription>
                              {unit.bedrooms} bed, {unit.bathrooms} bath
                            </CardDescription>
                          </div>
                          <Badge variant={isOccupied ? "default" : "secondary"}>
                            {isOccupied ? "Occupied" : "Available"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rent:</span>
                            <span className="font-medium">${unit.base_rent}/month</span>
                          </div>
                          
                          {unit.square_feet && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Size:</span>
                              <span>{unit.square_feet} sq ft</span>
                            </div>
                          )}
                          
                          {isOccupied && activeLease?.tenant && (
                            <div className="pt-3 border-t">
                              <p className="text-sm font-medium">Current Tenant:</p>
                              <p className="text-sm text-muted-foreground">
                                {activeLease.tenant.full_name}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline">
                                  <Mail className="h-3 w-3 mr-1" />
                                  Email
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {!isOccupied && (
                            <div className="pt-3 border-t">
                              <Button size="sm" className="w-full">
                                <Users className="h-3 w-3 mr-1" />
                                Invite Tenant
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Tenants</h2>
                <p className="text-muted-foreground">
                  Manage tenants for {property.name}
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Tenant
              </Button>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tenant Management</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Invite tenants to your units and manage their information, leases, and communications.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Your First Tenant
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Payments</h2>
                <p className="text-muted-foreground">
                  Track rent payments and revenue for {property.name}
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-md">
                  Monitor rent payments, processing fees, and revenue analytics for your property.
                </p>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Processing fee: 2% per transaction
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Payments are processed securely through Stripe
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Property Settings</h2>
              <p className="text-muted-foreground">
                Customize the branding and settings for {property.name}
              </p>
            </div>

            <PropertyBrandingSettings 
              property={property}
              onUpdate={handleBrandingUpdate}
              themeColor={themeColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Property Branding Settings Component
const PropertyBrandingSettings = ({ property, onUpdate, themeColor }) => {
  const [formData, setFormData] = useState({
    logo_url: property.logo_url || '',
    welcome_message: property.welcome_message || '',
    theme_color: property.theme_color || '#3B82F6'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Branding Settings
        </CardTitle>
        <CardDescription>
          Customize the appearance of your property dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Logo URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                placeholder="https://example.com/logo.png"
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button type="button" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Welcome Message</label>
            <textarea
              value={formData.welcome_message}
              onChange={(e) => setFormData(prev => ({ ...prev, welcome_message: e.target.value }))}
              placeholder="Welcome to our property! We're here to help make your stay comfortable."
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Theme Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={formData.theme_color}
                onChange={(e) => setFormData(prev => ({ ...prev, theme_color: e.target.value }))}
                className="w-12 h-10 border rounded-md"
              />
              <input
                type="text"
                value={formData.theme_color}
                onChange={(e) => setFormData(prev => ({ ...prev, theme_color: e.target.value }))}
                placeholder="#3B82F6"
                className="flex-1 px-3 py-2 border rounded-md font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              Save Changes
            </Button>
            <Button type="button" variant="outline">
              Preview
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyDashboard;

