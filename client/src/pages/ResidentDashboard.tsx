import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  CreditCard, 
  Wrench, 
  ShoppingCart, 
  FileText, 
  Bell,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle,
  LogOut
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatCurrency, formatDate } from "@/lib/utils";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";
import type { MaintenanceRequest, Transaction, MarketplaceListing, InsertMaintenanceRequest } from "@shared/schema";

export default function ResidentDashboard() {
  const [, setLocation] = useLocation();
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);
  const { toast } = useToast();

  // Get resident data from localStorage
  const userId = parseInt(localStorage.getItem('user-id') || '1');
  const userRole = localStorage.getItem('user-role');

  const { data: resident } = useQuery({
    queryKey: ['/api/residents', userId],
    queryFn: () => apiRequest(`/api/residents/${userId}`)
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['/api/transactions', userId],
    queryFn: () => apiRequest(`/api/transactions?payerId=${userId}`)
  });

  const { data: maintenanceRequests = [] } = useQuery({
    queryKey: ['/api/maintenance', userId],
    queryFn: () => apiRequest(`/api/maintenance?residentId=${userId}`)
  });

  const { data: marketplaceListings = [] } = useQuery({
    queryKey: ['/api/marketplace', resident?.propertyId],
    queryFn: () => apiRequest(`/api/marketplace?propertyId=${resident?.propertyId}`),
    enabled: !!resident?.propertyId
  });

  const createMaintenanceRequestMutation = useMutation({
    mutationFn: async (data: InsertMaintenanceRequest) => {
      return apiRequest('/api/maintenance', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/maintenance'] });
      setIsMaintenanceOpen(false);
      toast({ title: "Success", description: "Maintenance request submitted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit request", variant: "destructive" });
    }
  });

  const handleMaintenanceSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    createMaintenanceRequestMutation.mutate({
      propertyId: resident?.propertyId || 1,
      residentId: userId,
      title: data.title as string,
      description: data.description as string,
      category: data.category as string,
      priority: data.priority as string
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    localStorage.removeItem('user-id');
    setLocation('/');
  };

  if (!resident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 3);
  const recentMaintenance = maintenanceRequests.slice(0, 3);
  const featuredListings = marketplaceListings.filter((listing: MarketplaceListing) => listing.status === 'active').slice(0, 3);

  const nextRentDue = new Date();
  nextRentDue.setMonth(nextRentDue.getMonth() + 1);
  nextRentDue.setDate(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo />
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-gray-900">Resident Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {resident.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome to Your Home Portal</h2>
            <p className="opacity-90">
              Unit {resident.unit} • {resident.phone} • {resident.email}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Rent Due</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDate(nextRentDue.toISOString())}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(resident.rent)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lease Status</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant={resident.status === 'active' ? 'default' : 'secondary'}>
                  {resident.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Expires: {formatDate(resident.leaseExpiry)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter((r: MaintenanceRequest) => r.status === 'open').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Maintenance issues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resident.lastPayment ? formatDate(resident.lastPayment) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Payment history
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col h-20" onClick={() => setLocation('/resident/payments')}>
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span className="text-sm">Pay Rent</span>
                  </Button>
                  <Dialog open={isMaintenanceOpen} onOpenChange={setIsMaintenanceOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex flex-col h-20">
                        <Wrench className="h-6 w-6 mb-2" />
                        <span className="text-sm">Maintenance</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Maintenance Request</DialogTitle>
                      </DialogHeader>
                      <form action={handleMaintenanceSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Issue Title</Label>
                          <Input id="title" name="title" placeholder="Brief description of the issue" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                                <SelectItem value="hvac">HVAC</SelectItem>
                                <SelectItem value="appliances">Appliances</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select name="priority" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            name="description" 
                            placeholder="Detailed description of the issue..." 
                            rows={3}
                            required 
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsMaintenanceOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={createMaintenanceRequestMutation.isPending}>
                            {createMaintenanceRequestMutation.isPending ? "Submitting..." : "Submit Request"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="flex flex-col h-20" onClick={() => setLocation('/resident/marketplace')}>
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <span className="text-sm">Marketplace</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-20" onClick={() => setLocation('/resident/documents')}>
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Documents</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your payment history</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No payments recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map((transaction: Transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(parseFloat(transaction.amount))}</p>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Maintenance Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Status</CardTitle>
                <CardDescription>Your recent requests</CardDescription>
              </CardHeader>
              <CardContent>
                {recentMaintenance.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No maintenance requests</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentMaintenance.map((request: MaintenanceRequest) => (
                      <div key={request.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{request.title}</h4>
                          <Badge 
                            variant={
                              request.status === 'completed' ? 'default' : 
                              request.status === 'in_progress' ? 'secondary' : 'outline'
                            }
                            className="text-xs"
                          >
                            {request.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{request.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{request.category}</span>
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Community Marketplace */}
            <Card>
              <CardHeader>
                <CardTitle>Community Marketplace</CardTitle>
                <CardDescription>Items for sale in your building</CardDescription>
              </CardHeader>
              <CardContent>
                {featuredListings.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No items for sale</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {featuredListings.map((listing: MarketplaceListing) => (
                      <div key={listing.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{listing.title}</h4>
                          <span className="font-bold text-blue-600">{formatCurrency(parseFloat(listing.price))}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{listing.description}</p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{listing.condition}</span>
                          <span>{formatDate(listing.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Building Announcements</CardTitle>
                <CardDescription>Important updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-blue-900">Pool Maintenance</p>
                        <p className="text-xs text-blue-700">Pool will be closed for cleaning on Saturday</p>
                        <p className="text-xs text-blue-600 mt-1">2 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-green-900">Package Room Update</p>
                        <p className="text-xs text-green-700">New package notification system is now active</p>
                        <p className="text-xs text-green-600 mt-1">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Need help? Contact your property manager or visit our <a href="#" className="text-blue-600 hover:underline">Help Center</a>
          </p>
          <p className="mt-2">
            Powered by <a href="https://visnec.com" className="text-blue-600 hover:underline">Visnec</a>
          </p>
        </div>
      </div>
    </div>
  );
}