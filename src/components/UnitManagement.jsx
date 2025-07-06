import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  DollarSign, 
  Home,
  Bed,
  Bath,
  Square,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const UnitManagement = () => {
  const { propertyId } = useParams();
  const { t } = useTranslation();
  const { user, apiCall } = useAuth();
  
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [showInviteTenant, setShowInviteTenant] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const [unitForm, setUnitForm] = useState({
    unit_number: '',
    unit_type: 'apartment',
    floor_number: '',
    square_feet: '',
    bedrooms: 1,
    bathrooms: 1.0,
    base_rent: '',
    security_deposit: '',
    pet_deposit: '',
    utilities_included: [],
    amenities: [],
    description: ''
  });

  const [inviteForm, setInviteForm] = useState({
    email: '',
    message: ''
  });

  useEffect(() => {
    if (propertyId) {
      fetchUnits();
    }
  }, [propertyId]);

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const response = await apiCall(`/api/units/property/${propertyId}?userId=${user.id}`);
      
      if (response.success) {
        setUnits(response.data);
      } else {
        console.error('Failed to fetch units:', response.error);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUnit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall('/api/units', {
        method: 'POST',
        body: JSON.stringify({
          ...unitForm,
          property_id: propertyId,
          base_rent: parseFloat(unitForm.base_rent),
          security_deposit: parseFloat(unitForm.security_deposit || 0),
          pet_deposit: parseFloat(unitForm.pet_deposit || 0),
          square_feet: unitForm.square_feet ? parseInt(unitForm.square_feet) : null,
          floor_number: unitForm.floor_number ? parseInt(unitForm.floor_number) : null
        }),
        params: { userId: user.id }
      });

      if (response.success) {
        setUnits([...units, response.data]);
        setShowAddUnit(false);
        resetUnitForm();
      } else {
        alert('Failed to add unit: ' + response.error);
      }
    } catch (error) {
      console.error('Error adding unit:', error);
      alert('Failed to add unit');
    }
  };

  const handleEditUnit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall(`/api/units/${editingUnit.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...unitForm,
          base_rent: parseFloat(unitForm.base_rent),
          security_deposit: parseFloat(unitForm.security_deposit || 0),
          pet_deposit: parseFloat(unitForm.pet_deposit || 0),
          square_feet: unitForm.square_feet ? parseInt(unitForm.square_feet) : null,
          floor_number: unitForm.floor_number ? parseInt(unitForm.floor_number) : null
        }),
        params: { userId: user.id }
      });

      if (response.success) {
        setUnits(units.map(unit => unit.id === editingUnit.id ? response.data : unit));
        setEditingUnit(null);
        resetUnitForm();
      } else {
        alert('Failed to update unit: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating unit:', error);
      alert('Failed to update unit');
    }
  };

  const handleDeleteUnit = async (unitId) => {
    if (!confirm('Are you sure you want to delete this unit? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiCall(`/api/units/${unitId}`, {
        method: 'DELETE',
        params: { userId: user.id }
      });

      if (response.success) {
        setUnits(units.filter(unit => unit.id !== unitId));
      } else {
        alert('Failed to delete unit: ' + response.error);
      }
    } catch (error) {
      console.error('Error deleting unit:', error);
      alert('Failed to delete unit');
    }
  };

  const handleInviteTenant = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall('/api/auth/invite-tenant', {
        method: 'POST',
        body: JSON.stringify({
          propertyId,
          unitId: selectedUnit.id,
          email: inviteForm.email,
          invitedBy: user.id,
          message: inviteForm.message
        })
      });

      if (response.success) {
        alert('Tenant invitation sent successfully!');
        setShowInviteTenant(false);
        setInviteForm({ email: '', message: '' });
        setSelectedUnit(null);
      } else {
        alert('Failed to send invitation: ' + response.error);
      }
    } catch (error) {
      console.error('Error sending invitation:', error);
      alert('Failed to send invitation');
    }
  };

  const resetUnitForm = () => {
    setUnitForm({
      unit_number: '',
      unit_type: 'apartment',
      floor_number: '',
      square_feet: '',
      bedrooms: 1,
      bathrooms: 1.0,
      base_rent: '',
      security_deposit: '',
      pet_deposit: '',
      utilities_included: [],
      amenities: [],
      description: ''
    });
  };

  const startEditUnit = (unit) => {
    setUnitForm({
      unit_number: unit.unit_number,
      unit_type: unit.unit_type,
      floor_number: unit.floor_number?.toString() || '',
      square_feet: unit.square_feet?.toString() || '',
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      base_rent: unit.base_rent.toString(),
      security_deposit: unit.security_deposit?.toString() || '',
      pet_deposit: unit.pet_deposit?.toString() || '',
      utilities_included: unit.utilities_included || [],
      amenities: unit.amenities || [],
      description: unit.description || ''
    });
    setEditingUnit(unit);
  };

  const getUnitStatus = (unit) => {
    const activeLease = unit.leases?.find(lease => lease.status === 'active');
    if (activeLease) {
      return { status: 'occupied', tenant: activeLease.tenant, lease: activeLease };
    }
    
    const draftLease = unit.leases?.find(lease => lease.status === 'draft');
    if (draftLease) {
      return { status: 'reserved', tenant: draftLease.tenant, lease: draftLease };
    }
    
    return { status: 'available' };
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'occupied':
        return <Badge variant="default" className="bg-green-500">Occupied</Badge>;
      case 'reserved':
        return <Badge variant="secondary" className="bg-yellow-500">Reserved</Badge>;
      case 'maintenance':
        return <Badge variant="destructive">Maintenance</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Unit Management</h2>
          <p className="text-muted-foreground">
            Manage units and tenant assignments for this property
          </p>
        </div>
        <Button onClick={() => setShowAddUnit(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {/* Units Grid */}
      {units.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Units Yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Start by adding units to your property. Each unit can be assigned to tenants and managed separately.
            </p>
            <Button onClick={() => setShowAddUnit(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Unit
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => {
            const unitStatus = getUnitStatus(unit);
            
            return (
              <Card key={unit.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Unit {unit.unit_number}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {unit.bedrooms} bed
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {unit.bathrooms} bath
                          </span>
                          {unit.square_feet && (
                            <span className="flex items-center gap-1">
                              <Square className="h-3 w-3" />
                              {unit.square_feet} sq ft
                            </span>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                    {getStatusBadge(unitStatus.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rent:</span>
                      <span className="font-medium">${unit.base_rent}/month</span>
                    </div>
                    
                    {unit.security_deposit > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Deposit:</span>
                        <span>${unit.security_deposit}</span>
                      </div>
                    )}
                    
                    {unit.floor_number && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Floor:</span>
                        <span>{unit.floor_number}</span>
                      </div>
                    )}
                    
                    {unitStatus.status === 'occupied' && unitStatus.tenant && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Current Tenant:</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {unitStatus.tenant.full_name}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          {unitStatus.tenant.phone && (
                            <Button size="sm" variant="outline" className="flex-1">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {unitStatus.status === 'reserved' && unitStatus.tenant && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Reserved for:</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {unitStatus.tenant.full_name}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending lease signature
                        </Badge>
                      </div>
                    )}
                    
                    {unitStatus.status === 'available' && (
                      <div className="pt-3 border-t">
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => {
                            setSelectedUnit(unit);
                            setShowInviteTenant(true);
                          }}
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Invite Tenant
                        </Button>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => startEditUnit(unit)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleDeleteUnit(unit.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Unit Dialog */}
      <Dialog open={showAddUnit} onOpenChange={setShowAddUnit}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Unit</DialogTitle>
            <DialogDescription>
              Create a new unit for this property
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUnit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unit_number">Unit Number *</Label>
                <Input
                  id="unit_number"
                  value={unitForm.unit_number}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, unit_number: e.target.value }))}
                  placeholder="e.g., 12A, 101, Studio 1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unit_type">Unit Type</Label>
                <Select 
                  value={unitForm.unit_type} 
                  onValueChange={(value) => setUnitForm(prev => ({ ...prev, unit_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={unitForm.bedrooms}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  value={unitForm.bathrooms}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, bathrooms: parseFloat(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="square_feet">Square Feet</Label>
                <Input
                  id="square_feet"
                  type="number"
                  min="0"
                  value={unitForm.square_feet}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, square_feet: e.target.value }))}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="base_rent">Monthly Rent *</Label>
                <Input
                  id="base_rent"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitForm.base_rent}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, base_rent: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="security_deposit">Security Deposit</Label>
                <Input
                  id="security_deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitForm.security_deposit}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, security_deposit: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={unitForm.description}
                onChange={(e) => setUnitForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description of the unit..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddUnit(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Unit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={!!editingUnit} onOpenChange={() => setEditingUnit(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Unit {editingUnit?.unit_number}</DialogTitle>
            <DialogDescription>
              Update unit information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUnit} className="space-y-4">
            {/* Same form fields as Add Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_unit_number">Unit Number *</Label>
                <Input
                  id="edit_unit_number"
                  value={unitForm.unit_number}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, unit_number: e.target.value }))}
                  placeholder="e.g., 12A, 101, Studio 1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_unit_type">Unit Type</Label>
                <Select 
                  value={unitForm.unit_type} 
                  onValueChange={(value) => setUnitForm(prev => ({ ...prev, unit_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit_bedrooms">Bedrooms</Label>
                <Input
                  id="edit_bedrooms"
                  type="number"
                  min="0"
                  value={unitForm.bedrooms}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="edit_bathrooms">Bathrooms</Label>
                <Input
                  id="edit_bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  value={unitForm.bathrooms}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, bathrooms: parseFloat(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="edit_square_feet">Square Feet</Label>
                <Input
                  id="edit_square_feet"
                  type="number"
                  min="0"
                  value={unitForm.square_feet}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, square_feet: e.target.value }))}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_base_rent">Monthly Rent *</Label>
                <Input
                  id="edit_base_rent"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitForm.base_rent}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, base_rent: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_security_deposit">Security Deposit</Label>
                <Input
                  id="edit_security_deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitForm.security_deposit}
                  onChange={(e) => setUnitForm(prev => ({ ...prev, security_deposit: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit_description">Description</Label>
              <Textarea
                id="edit_description"
                value={unitForm.description}
                onChange={(e) => setUnitForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description of the unit..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingUnit(null)}>
                Cancel
              </Button>
              <Button type="submit">
                Update Unit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Invite Tenant Dialog */}
      <Dialog open={showInviteTenant} onOpenChange={setShowInviteTenant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Tenant to Unit {selectedUnit?.unit_number}</DialogTitle>
            <DialogDescription>
              Send an invitation to a tenant to join this unit
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleInviteTenant} className="space-y-4">
            <div>
              <Label htmlFor="tenant_email">Tenant Email *</Label>
              <Input
                id="tenant_email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tenant@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="invite_message">Personal Message (Optional)</Label>
              <Textarea
                id="invite_message"
                value={inviteForm.message}
                onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Welcome to your new home! Please accept this invitation to get started..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowInviteTenant(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnitManagement;

