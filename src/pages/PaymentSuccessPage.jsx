import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Calendar, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/session/${sessionId}`
      );
      const data = await response.json();
      
      if (data.session) {
        setSessionData(data.session);
      }
    } catch (error) {
      console.error('Error fetching session data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD'
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your subscription to Rent Control
            </p>
          </div>

          {/* Payment Details */}
          {sessionData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold">
                    {formatAmount(sessionData.amount_total, sessionData.currency)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payment Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {sessionData.payment_status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Session ID</span>
                  <span className="font-mono text-sm">{sessionData.id}</span>
                </div>

                {sessionData.subscription && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Subscription Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan</span>
                        <span>{sessionData.metadata?.plan || 'Professional'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing</span>
                        <span>{sessionData.metadata?.billingCycle || 'Monthly'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subscription ID</span>
                        <span className="font-mono">{sessionData.subscription}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
              <CardDescription>
                Get started with your Rent Control subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Check your email</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent you a confirmation email with your receipt and account details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Set up your account</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile and add your first property to get started.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Explore features</h4>
                  <p className="text-sm text-muted-foreground">
                    Take advantage of all the powerful tools in your subscription plan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>

          {/* Support */}
          <div className="text-center mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Our support team is here to help you get started
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

