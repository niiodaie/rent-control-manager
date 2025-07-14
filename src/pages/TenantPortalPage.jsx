import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  Loader2
} from 'lucide-react';
import { createCheckoutSession, formatCurrency, getUserCurrency } from '../lib/stripe';

export function TenantPortalPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [processingPayment, setProcessingPayment] = useState(false);

  // Mock tenant data - in a real app, this would come from authentication/API
  const tenantData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    property: {
      address: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      landlord: 'Property Management Co.'
    },
    currentRent: {
      amount: 2500,
      currency: 'USD',
      dueDate: '2024-02-01',
      status: 'due' // 'paid', 'due', 'overdue'
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

  const handlePayRent = async () => {
    setProcessingPayment(true);
    
    try {
      const currency = getUserCurrency();
      const amount = Math.round(tenantData.currentRent.amount * 100); // Convert to cents
      
      const paymentData = {
        amount,
        currency: currency.toLowerCase(),
        email: tenantData.email,
        metadata: {
          type: 'rent_payment',
          tenantName: tenantData.name,
          propertyAddress: tenantData.property.address,
          dueDate: tenantData.currentRent.dueDate,
          landlord: tenantData.property.landlord
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('tenant.portal.title', 'Tenant Portal')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('tenant.portal.welcome', 'Welcome back')}, {tenantData.name}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              {t('tenant.portal.backHome', 'Back to Home')}
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
                  {t('tenant.currentRent.title', 'Current Rent Payment')}
                </CardTitle>
                <CardDescription>
                  {t('tenant.currentRent.description', 'Your rent payment for this month')}
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
                        {t('tenant.payment.processing', 'Processing...')}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        {t('tenant.payment.payNow', 'Pay Rent Now')}
                      </>
                    )}
                  </Button>
                )}

                {tenantData.currentRent.status === 'paid' && (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-green-600 font-medium">
                      {t('tenant.payment.paid', 'Rent payment completed')}
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
                  {t('tenant.history.title', 'Payment History')}
                </CardTitle>
                <CardDescription>
                  {t('tenant.history.description', 'Your recent rent payments')}
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

          {/* Property Information */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  {t('tenant.property.title', 'Property Information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Address</div>
                  <div className="font-medium">{tenantData.property.address}</div>
                  <div className="text-sm text-muted-foreground">{tenantData.property.city}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Landlord</div>
                  <div className="font-medium">{tenantData.property.landlord}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {t('tenant.account.title', 'Account Information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="font-medium">{tenantData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{tenantData.email}</div>
                </div>
                <Button variant="outline" className="w-full">
                  {t('tenant.account.edit', 'Edit Profile')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

