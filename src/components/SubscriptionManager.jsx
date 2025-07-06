import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Building2, 
  Users, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  Download,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import PricingPlans from './PricingPlans';

const SubscriptionManager = () => {
  const { t } = useTranslation();
  const { user, apiCall } = useAuth();
  
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchSubscriptionData();
    }
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      
      // Fetch subscription details
      const subResponse = await apiCall(`/api/subscriptions/user/${user.id}`);
      if (subResponse.success) {
        setSubscription(subResponse.data);
      }

      // Fetch usage statistics
      const usageResponse = await apiCall(`/api/subscriptions/usage/${user.id}`);
      if (usageResponse.success) {
        setUsage(usageResponse.data);
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await apiCall('/api/subscriptions/cancel', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          subscriptionId: subscription.stripe_subscription_id
        })
      });

      if (response.success) {
        setSubscription(prev => ({ ...prev, status: 'cancelled' }));
        alert('Subscription cancelled successfully. You will retain access until the end of your billing period.');
      } else {
        alert('Failed to cancel subscription: ' + response.error);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      setActionLoading(true);
      const response = await apiCall('/api/subscriptions/reactivate', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          subscriptionId: subscription.stripe_subscription_id
        })
      });

      if (response.success) {
        setSubscription(prev => ({ ...prev, status: 'active' }));
        alert('Subscription reactivated successfully!');
      } else {
        alert('Failed to reactivate subscription: ' + response.error);
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      alert('Failed to reactivate subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setActionLoading(true);
      const response = await apiCall('/api/subscriptions/billing-portal', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          returnUrl: window.location.href
        })
      });

      if (response.success && response.data.url) {
        window.open(response.data.url, '_blank');
      } else {
        alert('Failed to open billing portal: ' + response.error);
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert('Failed to open billing portal');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      case 'past_due':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Past Due</Badge>;
      case 'trialing':
        return <Badge variant="secondary"><Calendar className="h-3 w-3 mr-1" />Trial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanLimits = (plan) => {
    switch (plan) {
      case 'free':
        return { properties: 1, residents: 5, storage: 1 };
      case 'premium':
        return { properties: 5, residents: 100, storage: 50 };
      case 'enterprise':
        return { properties: 999, residents: 9999, storage: 1000 };
      default:
        return { properties: 1, residents: 5, storage: 1 };
    }
  };

  const getUsagePercentage = (used, limit) => {
    if (limit === 999 || limit === 9999) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
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

  if (showPricing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Upgrade Your Plan</h2>
          <Button variant="outline" onClick={() => setShowPricing(false)}>
            Back to Subscription
          </Button>
        </div>
        <PricingPlans currentPlan={subscription} />
      </div>
    );
  }

  const currentPlan = subscription?.plan || 'free';
  const limits = getPlanLimits(currentPlan);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Subscription & Billing</h2>
        <p className="text-muted-foreground">
          Manage your subscription, view usage, and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="capitalize">{currentPlan} Plan</CardTitle>
                <CardDescription>
                  {subscription ? (
                    <>
                      {subscription.status === 'active' && subscription.current_period_end && (
                        `Renews on ${formatDate(subscription.current_period_end)}`
                      )}
                      {subscription.status === 'cancelled' && subscription.current_period_end && (
                        `Access until ${formatDate(subscription.current_period_end)}`
                      )}
                      {subscription.status === 'trialing' && subscription.trial_end && (
                        `Trial ends on ${formatDate(subscription.trial_end)}`
                      )}
                    </>
                  ) : (
                    'Free plan with basic features'
                  )}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {subscription && getStatusBadge(subscription.status)}
              {subscription && subscription.amount && (
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatCurrency(subscription.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{subscription.billing_cycle}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={() => setShowPricing(true)}>
              <Crown className="h-4 w-4 mr-2" />
              {currentPlan === 'free' ? 'Upgrade Plan' : 'Change Plan'}
            </Button>
            
            {subscription && subscription.status === 'active' && (
              <Button variant="outline" onClick={handleManageBilling} disabled={actionLoading}>
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
            )}
            
            {subscription && subscription.status === 'active' && (
              <Button variant="outline" onClick={handleCancelSubscription} disabled={actionLoading}>
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Subscription
              </Button>
            )}
            
            {subscription && subscription.status === 'cancelled' && (
              <Button variant="outline" onClick={handleReactivateSubscription} disabled={actionLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reactivate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      {usage && (
        <Card>
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>
              Your current usage against plan limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Properties */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Properties</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {usage.properties_count} of {limits.properties === 999 ? 'unlimited' : limits.properties}
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(usage.properties_count, limits.properties)} 
                  className="h-2"
                />
                {usage.properties_count >= limits.properties && limits.properties !== 999 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You've reached your property limit. Upgrade to add more properties.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Residents */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Residents</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {usage.residents_count} of {limits.residents === 9999 ? 'unlimited' : limits.residents}
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(usage.residents_count, limits.residents)} 
                  className="h-2"
                />
                {usage.residents_count >= limits.residents && limits.residents !== 9999 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You've reached your resident limit. Upgrade to add more residents.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Storage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Document Storage</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(usage.storage_used / 1024).toFixed(1)} GB of {limits.storage === 1000 ? 'unlimited' : `${limits.storage} GB`}
                  </span>
                </div>
                <Progress 
                  value={getUsagePercentage(usage.storage_used / 1024, limits.storage)} 
                  className="h-2"
                />
                {(usage.storage_used / 1024) >= limits.storage && limits.storage !== 1000 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You've reached your storage limit. Upgrade to get more storage space.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {subscription && subscription.invoices && subscription.invoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              Your recent invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscription.invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {invoice.status === 'paid' ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : invoice.status === 'open' ? (
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {formatCurrency(invoice.amount_paid / 100)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(invoice.created * 1000)} • {invoice.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {invoice.invoice_pdf && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </a>
                      </Button>
                    )}
                    {invoice.hosted_invoice_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
          <CardDescription>
            Compare features across different plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-lg border ${currentPlan === 'free' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
              <h3 className="font-semibold mb-2">Free Plan</h3>
              <ul className="text-sm space-y-1">
                <li>• 1 property</li>
                <li>• 5 residents</li>
                <li>• Basic features</li>
                <li>• Ads displayed</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg border ${currentPlan === 'premium' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
              <h3 className="font-semibold mb-2">Premium Plan</h3>
              <ul className="text-sm space-y-1">
                <li>• 5 properties</li>
                <li>• 100 residents</li>
                <li>• Advanced features</li>
                <li>• No ads</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg border ${currentPlan === 'enterprise' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
              <h3 className="font-semibold mb-2">Enterprise Plan</h3>
              <ul className="text-sm space-y-1">
                <li>• Unlimited properties</li>
                <li>• Unlimited residents</li>
                <li>• All features</li>
                <li>• White-label</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;

