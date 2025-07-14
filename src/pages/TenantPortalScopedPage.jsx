import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Home, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { createCheckoutSession, formatCurrency, getUserCurrency } from '../lib/stripe';
import SEOHead from '../components/SEOHead';

export function TenantPortalScopedPage() {
  const { landlordSlug, propertySlug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [tenantData, setTenantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data based on URL parameters - in a real app, this would fetch from API
  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on URL parameters
        const mockData = {
          landlord: {
            slug: landlordSlug,
            name: landlordSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            company: `${landlordSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Properties`,
            email: `contact@${landlordSlug}.com`,
            phone: '+1 (555) 123-4567'
          },
          property: {
            slug: propertySlug,
            name: propertySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            address: `${Math.floor(Math.random() * 9999) + 1} ${propertySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Street`,
            unit: `Apt ${Math.floor(Math.random() * 50) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
            city: 'New York, NY 10001',
            type: 'Apartment',
            bedrooms: Math.floor(Math.random() * 3) + 1,
            bathrooms: Math.floor(Math.random() * 2) + 1
          },
          tenant: {
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 987-6543',
            leaseStart: '2023-01-01',
            leaseEnd: '2024-12-31'
          },
          currentRent: {
            amount: 2500 + Math.floor(Math.random() * 1000),
            currency: 'USD',
            dueDate: '2024-02-01',
            status: Math.random() > 0.7 ? 'paid' : 'due'
          },
          paymentHistory: [
            {
              id: 'pay_001',
              amount: 2500,
              currency: 'USD',
              date: '2024-01-01',
              status: 'paid',
              method: 'Credit Card'
            },
            {
              id: 'pay_002',
              amount: 2500,
              currency: 'USD',
              date: '2023-12-01',
              status: 'paid',
              method: 'Credit Card'
            },
            {
              id: 'pay_003',
              amount: 2500,
              currency: 'USD',
              date: '2023-11-01',
              status: 'paid',
              method: 'Bank Transfer'
            }
          ]
        };
        
        setTenantData(mockData);
      } catch (err) {
        setError('Failed to load tenant data');
        console.error('Error fetching tenant data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (landlordSlug && propertySlug) {
      fetchTenantData();
    } else {
      setError('Invalid URL parameters');
      setLoading(false);
    }
  }, [landlordSlug, propertySlug]);

  const handlePayRent = async () => {
    if (!tenantData) return;
    
    setProcessingPayment(true);
    
    try {
      const currency = getUserCurrency();
      const amount = Math.round(tenantData.currentRent.amount * 100); // Convert to cents
      
      const paymentData = {
        amount,
        currency: currency.toLowerCase(),
        email: tenantData.tenant.email,
        metadata: {
          type: 'rent_payment',
          tenantName: tenantData.tenant.name,
          propertyAddress: `${tenantData.property.address}, ${tenantData.property.unit}`,
          propertySlug: propertySlug,
          landlordSlug: landlordSlug,
          dueDate: tenantData.currentRent.dueDate,
          landlord: tenantData.landlord.name
        }
      };

      const { url } = await createCheckoutSession(paymentData);
      
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to start payment process. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'due':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Due</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading tenant portal...</p>
        </div>
      </div>
    );
  }

  if (error || !tenantData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Error</h1>
          <p className="text-muted-foreground mb-4">{error || 'Unable to load tenant data'}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`Tenant Portal - ${tenantData.property.name} | ${tenantData.landlord.company}`}
        description={`Secure tenant portal for ${tenantData.property.name}. Pay rent online, view payment history, and manage your tenancy.`}
        keywords="tenant portal, rent payment, property management, online rent, tenant dashboard"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                  <span>{tenantData.landlord.company}</span>
                  <span>•</span>
                  <span>{tenantData.property.name}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tenant Portal
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back, {tenantData.tenant.name}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Rent Payment */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Current Rent Payment
                  </CardTitle>
                  <CardDescription>
                    Your rent payment for {tenantData.property.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-3xl font-bold">
                        {formatCurrency(tenantData.currentRent.amount * 100, tenantData.currentRent.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(tenantData.currentRent.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(tenantData.currentRent.status)}
                    </div>
                  </div>

                  {tenantData.currentRent.status !== 'paid' && (
                    <Button 
                      onClick={handlePayRent}
                      disabled={processingPayment}
                      className="w-full"
                      size="lg"
                    >
                      {processingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Rent Now
                        </>
                      )}
                    </Button>
                  )}

                  {tenantData.currentRent.status === 'paid' && (
                    <div className="text-center py-4">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <p className="text-green-600 font-medium">
                        Rent payment completed
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Payment History
                  </CardTitle>
                  <CardDescription>
                    Your recent rent payments for {tenantData.property.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenantData.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {formatCurrency(payment.amount * 100, payment.currency)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString()} • {payment.method}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {payment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Property & Landlord Information */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Property Name</div>
                    <div className="font-medium">{tenantData.property.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Address</div>
                    <div className="font-medium">{tenantData.property.address}</div>
                    <div className="text-sm text-muted-foreground">{tenantData.property.unit}</div>
                    <div className="text-sm text-muted-foreground">{tenantData.property.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Property Type</div>
                    <div className="font-medium">{tenantData.property.type}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                      <div className="font-medium">{tenantData.property.bedrooms}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                      <div className="font-medium">{tenantData.property.bathrooms}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Landlord Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Company</div>
                    <div className="font-medium">{tenantData.landlord.company}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Contact Person</div>
                    <div className="font-medium">{tenantData.landlord.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{tenantData.landlord.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{tenantData.landlord.phone}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Lease Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Tenant Name</div>
                    <div className="font-medium">{tenantData.tenant.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{tenantData.tenant.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{tenantData.tenant.phone}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Lease Start</div>
                      <div className="font-medium">{new Date(tenantData.tenant.leaseStart).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Lease End</div>
                      <div className="font-medium">{new Date(tenantData.tenant.leaseEnd).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

