import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Users,
  Calendar,
  AlertTriangle,
  Send
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const unitSchema = z.object({
  propertyId: z.number(),
  unitNumber: z.string().min(1, "Unit number is required"),
  rent: z.string().min(1, "Rent amount is required"),
  leaseStartDate: z.string().optional(),
  leaseDocument: z.string().optional(),
});

const invitationSchema = z.object({
  unitId: z.number(),
  email: z.string().email("Valid email is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type UnitForm = z.infer<typeof unitSchema>;
type InvitationForm = z.infer<typeof invitationSchema>;

export default function UnitManagement() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showUnitDialog, setShowUnitDialog] = useState(false);
  const [showInvitationDialog, setShowInvitationDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const { toast } = useToast();

  const landlordId = parseInt(localStorage.getItem('user-id') || '1');

  // Fetch properties
  const { data: properties = [] } = useQuery({
    queryKey: ['/api/properties'],
    queryFn: () => apiRequest('/api/properties')
  });

  // Fetch units for selected property
  const { data: units = [] } = useQuery({
    queryKey: ['/api/units', selectedProperty],
    queryFn: () => apiRequest(`/api/units?propertyId=${selectedProperty}`),
    enabled: !!selectedProperty
  });

  // Fetch invitations
  const { data: invitations = [] } = useQuery({
    queryKey: ['/api/invitations'],
    queryFn: () => apiRequest('/api/invitations')
  });

  // Fetch landlord for branding
  const { data: landlord } = useQuery({
    queryKey: ['/api/landlords', landlordId],
    queryFn: () => apiRequest(`/api/landlords/${landlordId}`)
  });

  const unitForm = useForm<UnitForm>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      propertyId: selectedProperty || 0,
      unitNumber: '',
      rent: '',
      leaseStartDate: '',
      leaseDocument: ''
    }
  });

  const invitationForm = useForm<InvitationForm>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      unitId: 0,
      email: '',
      name: '',
      phone: ''
    }
  });

  const createUnitMutation = useMutation({
    mutationFn: async (data: UnitForm) => {
      return apiRequest('/api/units', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/units'] });
      setShowUnitDialog(false);
      unitForm.reset();
      toast({ title: "Success", description: "Unit created successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create unit", variant: "destructive" });
    }
  });

  const sendInvitationMutation = useMutation({
    mutationFn: async (data: InvitationForm) => {
      return apiRequest('/api/invitations', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          landlordId,
          propertyId: selectedProperty
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/invitations'] });
      setShowInvitationDialog(false);
      invitationForm.reset();
      toast({ title: "Success", description: "Invitation sent successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send invitation", variant: "destructive" });
    }
  });

  const updateUnitConfigMutation = useMutation({
    mutationFn: async ({ unitId, updates }: { unitId: number; updates: any }) => {
      return apiRequest(`/api/units/${unitId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/units'] });
      toast({ title: "Success", description: "Unit configuration updated!" });
    }
  });

  const onUnitSubmit = (data: UnitForm) => {
    createUnitMutation.mutate({
      ...data,
      propertyId: selectedProperty!
    });
  };

  const onInvitationSubmit = (data: InvitationForm) => {
    sendInvitationMutation.mutate(data);
  };

  const getUnitChecklist = (unit: any) => {
    return {
      rentConfigured: !!unit.rent,
      documentsUploaded: unit.documentsUploaded || false,
      leaseApproved: !!unit.leaseDocument,
      isComplete: !!unit.rent && unit.documentsUploaded && !!unit.leaseDocument
    };
  };

  const getBrandColors = () => ({
    primary: landlord?.primaryColor || '#2563eb',
    secondary: landlord?.secondaryColor || '#64748b',
    accent: landlord?.accentColor || '#10b981'
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Unit Management & Invitations</h1>
          <p className="text-muted-foreground">
            Configure units and send branded invitations to tenants
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={showUnitDialog} onOpenChange={setShowUnitDialog}>
            <DialogTrigger asChild>
              <Button disabled={!selectedProperty}>
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Unit</DialogTitle>
                <DialogDescription>
                  Add a new unit to the selected property
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={unitForm.handleSubmit(onUnitSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="unitNumber">Unit Number</Label>
                  <Input
                    id="unitNumber"
                    {...unitForm.register('unitNumber')}
                    placeholder="e.g., 101, A1, Studio"
                  />
                </div>
                <div>
                  <Label htmlFor="rent">Monthly Rent ($)</Label>
                  <Input
                    id="rent"
                    {...unitForm.register('rent')}
                    placeholder="e.g., 1200"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                  <Input
                    id="leaseStartDate"
                    {...unitForm.register('leaseStartDate')}
                    type="date"
                  />
                </div>
                <Button type="submit" disabled={createUnitMutation.isPending}>
                  {createUnitMutation.isPending ? 'Creating...' : 'Create Unit'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Property</CardTitle>
            <CardDescription>Choose a property to manage units</CardDescription>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedProperty?.toString() || ''} 
              onValueChange={(value) => setSelectedProperty(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property: any) => (
                  <SelectItem key={property.id} value={property.id.toString()}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Unit Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Units:</span>
                <Badge variant="outline">{units.length}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Configured:</span>
                <Badge variant="secondary">
                  {units.filter((u: any) => getUnitChecklist(u).isComplete).length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending Invites:</span>
                <Badge style={{ backgroundColor: getBrandColors().accent }}>
                  {invitations.filter((i: any) => i.status === 'pending').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Branding Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Branding Preview</CardTitle>
            <CardDescription>How invitations will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: getBrandColors().primary }}
            >
              <div className="flex items-center space-x-2 mb-2">
                {landlord?.brandLogo && (
                  <img src={landlord.brandLogo} alt="Logo" className="h-6 w-auto" />
                )}
                <span className="font-semibold">
                  {landlord?.brandName || 'Your Property Management'}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {landlord?.welcomeMessage || 'Welcome to your new home!'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedProperty && (
        <Tabs defaultValue="units" className="space-y-6">
          <TabsList>
            <TabsTrigger value="units">Units & Configuration</TabsTrigger>
            <TabsTrigger value="invitations">Tenant Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="units">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units.map((unit: any) => {
                const checklist = getUnitChecklist(unit);
                return (
                  <Card key={unit.id} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Unit {unit.unitNumber}</CardTitle>
                        {checklist.isComplete ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Monthly Rent:</span>
                          <span className="font-semibold">
                            {unit.rent ? `$${unit.rent}` : 'Not set'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Configuration Checklist:</h4>
                          
                          <div className="flex items-center space-x-2">
                            {checklist.rentConfigured ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm">Rent Amount Set</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {checklist.documentsUploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm">Documents Uploaded</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {checklist.leaseApproved ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm">Lease Document Ready</span>
                          </div>
                        </div>

                        <div className="pt-2 space-y-2">
                          {!checklist.rentConfigured && (
                            <div className="flex items-center space-x-2">
                              <Input
                                placeholder="Set rent amount"
                                type="number"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    updateUnitConfigMutation.mutate({
                                      unitId: unit.id,
                                      updates: { rent: parseFloat(e.target.value) }
                                    });
                                  }
                                }}
                              />
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}

                          {checklist.isComplete && (
                            <Button
                              size="sm"
                              className="w-full"
                              style={{ backgroundColor: getBrandColors().primary }}
                              onClick={() => {
                                setSelectedUnit(unit.id);
                                setShowInvitationDialog(true);
                              }}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Invitation
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="invitations">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Invitations</CardTitle>
                <CardDescription>
                  Track invitation status and manage tenant onboarding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invitations.length > 0 ? (
                    invitations.map((invitation: any) => (
                      <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-medium">{invitation.name}</div>
                            <div className="text-sm text-muted-foreground">{invitation.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={
                              invitation.status === 'accepted' ? 'default' :
                              invitation.status === 'pending' ? 'secondary' : 'destructive'
                            }
                          >
                            {invitation.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            Unit {units.find((u: any) => u.id === invitation.unitId)?.unitNumber}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No invitations sent yet. Configure units first to send invitations.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Invitation Dialog */}
      <Dialog open={showInvitationDialog} onOpenChange={setShowInvitationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Tenant Invitation</DialogTitle>
            <DialogDescription>
              Send a branded invitation to a potential tenant
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={invitationForm.handleSubmit(onInvitationSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Tenant Name</Label>
              <Input
                id="name"
                {...invitationForm.register('name')}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                {...invitationForm.register('email')}
                placeholder="john@example.com"
                type="email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...invitationForm.register('phone')}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <input
              type="hidden"
              {...invitationForm.register('unitId')}
              value={selectedUnit || 0}
            />
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Email Preview:</h4>
              <div className="text-sm text-gray-600">
                <p>Subject: Welcome to {landlord?.brandName || 'Your New Home'}</p>
                <p className="mt-2">
                  {landlord?.welcomeMessage || 'You have been invited to join our property management platform.'}
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={sendInvitationMutation.isPending}
              style={{ backgroundColor: getBrandColors().primary }}
            >
              <Mail className="h-4 w-4 mr-2" />
              {sendInvitationMutation.isPending ? 'Sending...' : 'Send Invitation'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}