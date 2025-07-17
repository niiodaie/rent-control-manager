import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Building2, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Receipt,
  Loader2
} from 'lucide-react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const RentPayment = () => {
  const { t } = useTranslation();
  const { user, apiCall } = useAuth();
  
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      
      // Fetch upcoming payments
      const upcomingResponse = await apiCall(`/api/rent-payments/tenant/${user.id}/upcoming`);
      if (upcomingResponse.success) {
        setUpcomingPayments(upcomingResponse.data);
      }

      // Fetch payment history
      const historyResponse = await apiCall(`/api/rent-payments/tenant/${user.id}?limit=10`);
      if (historyResponse.success) {
        setPaymentHistory(historyResponse.data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayRent = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentForm(true);
  };

  const getStatusBadge = (status, dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'pending':
        if (due < today) {
          return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
        }
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Rent Payments</h2>
        <p className="text-muted-foreground">
          Manage your rent payments and view payment history
        </p>
      </div>

      {/* Upcoming Payments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upcoming Payments</h3>
        
        {upcomingPayments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Payments</h3>
              <p className="text-muted-foreground text-center">
                You don't have any rent payments due at this time.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingPayments.map((payment) => {
              const isOverdue = new Date(payment.due_date) < new Date();
              
              return (
                <Card key={payment.id} className={`hover:shadow-md transition-shadow ${isOverdue ? 'border-red-200 bg-red-50 dark:bg-red-950/20' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {payment.lease.property.name}
                        </CardTitle>
                        <CardDescription>
                          Unit {payment.lease.unit.unit_number}
                        </CardDescription>
                      </div>
                      {getStatusBadge(payment.status, payment.due_date)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Amount:</span>
                        <span className="text-lg font-semibold">{formatCurrency(payment.amount)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Due Date:</span>
                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                          {formatDate(payment.due_date)}
                        </span>
                      </div>
                      
                      {isOverdue && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            This payment is overdue. Please pay as soon as possible to avoid late fees.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handlePayRent(payment)}
                        variant={isOverdue ? "destructive" : "default"}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Rent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment History</h3>
        
        {paymentHistory.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Payment History</h3>
              <p className="text-muted-foreground text-center">
                Your payment history will appear here once you make your first payment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Your last 10 rent payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {payment.status === 'paid' ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : payment.status === 'failed' ? (
                          <AlertCircle className="h-8 w-8 text-red-500" />
                        ) : (
                          <Clock className="h-8 w-8 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {payment.lease.property.name} - Unit {payment.lease.unit.unit_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {formatDate(payment.due_date)}
                          {payment.paid_date && ` • Paid: ${formatDate(payment.paid_date)}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                      {getStatusBadge(payment.status, payment.due_date)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPayment && (
        <Elements stripe={stripePromise}>
          <PaymentForm
            payment={selectedPayment}
            onClose={() => {
              setShowPaymentForm(false);
              setSelectedPayment(null);
            }}
            onSuccess={() => {
              setShowPaymentForm(false);
              setSelectedPayment(null);
              fetchPayments();
            }}
            formatCurrency={formatCurrency}
          />
        </Elements>
      )}
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ payment, onClose, onSuccess, formatCurrency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { apiCall } = useAuth();
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const response = await apiCall('/api/rent-payments/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({
          paymentId: payment.id,
          tenantId: payment.tenant_id
        })
      });

      if (response.success) {
        setPaymentDetails(response.data);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setError('Failed to initialize payment');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !paymentDetails) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      paymentDetails.client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: payment.tenant?.full_name || 'Tenant',
          },
        }
      }
    );

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      // Confirm payment on backend
      try {
        const response = await apiCall('/api/rent-payments/confirm-payment', {
          method: 'POST',
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            tenantId: payment.tenant_id
          })
        });

        if (response.success) {
          onSuccess();
        } else {
          setError(response.error);
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        setError('Payment succeeded but confirmation failed');
      }
      
      setProcessing(false);
    }
  };

  if (!paymentDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pay Rent</CardTitle>
          <CardDescription>
            {payment.lease.property.name} - Unit {payment.lease.unit.unit_number}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Payment Summary */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Rent Amount:</span>
                <span>{formatCurrency(paymentDetails.landlord_amount)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing Fee (2%):</span>
                <span>{formatCurrency(paymentDetails.platform_fee)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total:</span>
                <span>{formatCurrency(paymentDetails.amount)}</span>
              </div>
            </div>

            {/* Card Element */}
            <div className="border rounded-lg p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={processing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!stripe || processing}
                className="flex-1"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay {formatCurrency(paymentDetails.amount)}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentPayment;

