import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertResidentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Grid, List, Users } from "lucide-react";
import ResidentCard from "@/components/ResidentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resident, InsertResident } from "@shared/schema";

export default function Residents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const { toast } = useToast();

  const { data: residents, isLoading } = useQuery<Resident[]>({
    queryKey: ["/api/residents"],
  });

  const form = useForm<InsertResident>({
    resolver: zodResolver(insertResidentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      unit: "",
      rent: 0,
      status: "active",
      leaseExpiry: "",
      lastPayment: "",
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: InsertResident) => {
      const response = await apiRequest("POST", "/api/residents", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Resident Added",
        description: "Resident has been successfully added.",
      });
      form.reset();
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/residents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add resident. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertResident> }) => {
      const response = await apiRequest("PUT", `/api/residents/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Resident Updated",
        description: "Resident information has been updated.",
      });
      form.reset();
      setIsDialogOpen(false);
      setEditingResident(null);
      queryClient.invalidateQueries({ queryKey: ["/api/residents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update resident. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/residents/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Resident Removed",
        description: "Resident has been successfully removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/residents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove resident. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertResident) => {
    if (editingResident) {
      updateMutation.mutate({ id: editingResident.id, data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    form.reset({
      name: resident.name,
      email: resident.email,
      phone: resident.phone,
      unit: resident.unit,
      rent: resident.rent,
      status: resident.status,
      leaseExpiry: resident.leaseExpiry,
      lastPayment: resident.lastPayment || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredResidents = residents?.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resident.unit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || resident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = residents ? {
    total: residents.length,
    active: residents.filter(r => r.status === "active").length,
    late: residents.filter(r => r.status === "late").length,
    revenue: residents.reduce((sum, r) => sum + r.rent, 0),
  } : { total: 0, active: 0, late: 0, revenue: 0 };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Residents</h2>
            <p className="text-neutral-600">Manage your property residents and rental information</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingResident(null);
                form.reset();
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resident
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingResident ? "Edit Resident" : "Add New Resident"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                              <Input placeholder="2A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Rent</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="2400" 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="late">Late Payment</SelectItem>
                              <SelectItem value="notice">Notice Served</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leaseExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lease Expiry</FormLabel>
                          <FormControl>
                            <Input placeholder="Dec 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastPayment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Payment</FormLabel>
                          <FormControl>
                            <Input placeholder="Nov 1, 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={addMutation.isPending || updateMutation.isPending}
                      >
                        {addMutation.isPending || updateMutation.isPending 
                          ? "Saving..." 
                          : editingResident ? "Update" : "Add Resident"
                        }
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total Residents</p>
                  <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Active Leases</p>
                  <p className="text-2xl font-bold text-accent">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Late Payments</p>
                  <p className="text-2xl font-bold text-red-500">{stats.late}</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-neutral-900">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    placeholder="Search residents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="late">Late Payment</SelectItem>
                    <SelectItem value="notice">Notice Served</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Residents Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-neutral-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredResidents && filteredResidents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResidents.map((resident) => (
              <ResidentCard
                key={resident.id}
                resident={resident}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              {searchQuery || statusFilter ? "No residents found" : "No residents yet"}
            </h3>
            <p className="text-neutral-600 mb-4">
              {searchQuery || statusFilter 
                ? "Try adjusting your search or filters." 
                : "Add your first resident to get started."
              }
            </p>
            {!searchQuery && !statusFilter && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Resident
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
