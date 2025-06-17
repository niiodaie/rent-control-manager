import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, Receipt, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction, Resident } from "@shared/schema";

export default function Payments() {
  const [isPayRentOpen, setIsPayRentOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const { toast } = useToast();

  // For demo purposes, use property ID 1
  const propertyId = 1;

  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions'],
    queryFn: () => apiRequest('/api/transactions?propertyId=' + propertyId)
  });

  const { data: residents = [] } = useQuery({
    queryKey: ['/api/residents'],
    queryFn: () => apiRequest('/api/residents?propertyId=' + propertyId)
  });

  const payRentMutation = useMutation({
    mutationFn: async (data: { residentId: number; amount: number }) => {
      return apiRequest('/api/rent/pay', {
        method: 'POST',
        body: JSON.stringify({
          residentId: data.residentId,
          propertyId,
          amount: data.amount
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/residents'] });
      setIsPayRentOpen(false);
      setSelectedResident(null);
      toast({ title: "Success", description: "Rent payment processed successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Payment failed", variant: "destructive" });
    }
  });

  const onPayRent = (formData: FormData) => {
    if (!selectedResident) return;
    
    const amount = parseFloat(formData.get('amount') as string);
    payRentMutation.mutate({
      residentId: selectedResident.id,
      amount
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "rent":
        return <Receipt className="h-4 w-4" />;
      case "marketplace":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const rentTransactions = transactions.filter((t: Transaction) => t.type === "rent");
  const marketplaceTransactions = transactions.filter((t: Transaction) => t.type === "marketplace");
  const totalRevenue = transactions
    .filter((t: Transaction) => t.status === "completed")
    .reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount), 0);
  const totalFees = transactions
    .filter((t: Transaction) => t.status === "completed")
    .reduce((sum: number, t: Transaction) => sum + parseFloat(t.fee), 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments & Transactions</h1>
          <p className="text-muted-foreground">Manage rent payments and marketplace transactions</p>
        </div>
        <Dialog open={isPayRentOpen} onOpenChange={setIsPayRentOpen}>
          <DialogTrigger asChild>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Rent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pay Rent</DialogTitle>
            </DialogHeader>
            <form action={onPayRent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resident">Select Resident</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const resident = residents.find((r: Resident) => r.id === parseInt(e.target.value));
                    setSelectedResident(resident || null);
                  }}
                  required
                >
                  <option value="">Choose resident...</option>
                  {residents.map((resident: Resident) => (
                    <option key={resident.id} value={resident.id}>
                      {resident.name} - Unit {resident.unit}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedResident && (
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={selectedResident.rent}
                    placeholder="0.00"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Monthly rent: {formatCurrency(selectedResident.rent)}
                  </p>
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Payment Processing</h4>
                <p className="text-sm text-blue-700">
                  A 2% processing fee will be applied to this transaction.
                  {selectedResident && (
                    <span className="block mt-1">
                      Processing fee: {formatCurrency(selectedResident.rent * 0.02)}
                    </span>
                  )}
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsPayRentOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={payRentMutation.isPending || !selectedResident}>
                  {payRentMutation.isPending ? "Processing..." : "Pay Rent"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">All completed transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFees)}</div>
            <p className="text-xs text-muted-foreground">2% processing fees collected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue - totalFees)}</div>
            <p className="text-xs text-muted-foreground">Revenue minus fees</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="rent">Rent Payments</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                  <p className="text-muted-foreground">Transactions will appear here once payments are made</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction: Transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{formatCurrency(parseFloat(transaction.amount))}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(transaction.status)}
                              <span>{transaction.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Fee: {formatCurrency(parseFloat(transaction.fee))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rent">
          <Card>
            <CardHeader>
              <CardTitle>Rent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {rentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No rent payments yet</h3>
                  <p className="text-muted-foreground">Rent payments will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rentTransactions.map((transaction: Transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Receipt className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{formatCurrency(parseFloat(transaction.amount))}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Fee: {formatCurrency(parseFloat(transaction.fee))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {marketplaceTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No marketplace transactions yet</h3>
                  <p className="text-muted-foreground">Marketplace sales will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {marketplaceTransactions.map((transaction: Transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CreditCard className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{formatCurrency(parseFloat(transaction.amount))}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Fee: {formatCurrency(parseFloat(transaction.fee))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}