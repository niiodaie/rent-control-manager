import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Plus, Loader2 } from 'lucide-react'
import { useProperties } from '../hooks/useProperties'
import { useAuth } from '../contexts/AuthContext'

export function AddPropertyModal({ trigger, onSuccess }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addProperty } = useProperties()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    address: '',
    unit_number: '',
    bedrooms: '',
    bathrooms: '',
    rent_amount: '',
    property_type: '',
    description: '',
    amenities: '',
    lease_terms: '12'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const propertyData = {
        ...formData,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseFloat(formData.bathrooms) || 0,
        rent_amount: parseFloat(formData.rent_amount) || 0,
        lease_terms: parseInt(formData.lease_terms) || 12,
        owner_id: user.id,
        status: 'available'
      }

      const { data, error } = await addProperty(propertyData)
      
      if (error) {
        throw new Error(error)
      }

      // Reset form
      setFormData({
        address: '',
        unit_number: '',
        bedrooms: '',
        bathrooms: '',
        rent_amount: '',
        property_type: '',
        description: '',
        amenities: '',
        lease_terms: '12'
      })

      setOpen(false)
      if (onSuccess) onSuccess(data)
      
    } catch (error) {
      console.error('Error adding property:', error)
      alert('Failed to add property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Add a new property to your rental portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <div className="md:col-span-2">
              <Label htmlFor="address">Property Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>

            {/* Unit Number */}
            <div>
              <Label htmlFor="unit_number">Unit Number (Optional)</Label>
              <Input
                id="unit_number"
                value={formData.unit_number}
                onChange={(e) => handleInputChange('unit_number', e.target.value)}
                placeholder="Apt 2B, Unit 101, etc."
              />
            </div>

            {/* Property Type */}
            <div>
              <Label htmlFor="property_type">Property Type *</Label>
              <Select value={formData.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div>
              <Label htmlFor="bedrooms">Bedrooms *</Label>
              <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div>
              <Label htmlFor="bathrooms">Bathrooms *</Label>
              <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bathroom</SelectItem>
                  <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                  <SelectItem value="2">2 Bathrooms</SelectItem>
                  <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                  <SelectItem value="3">3 Bathrooms</SelectItem>
                  <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                  <SelectItem value="4">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rent Amount */}
            <div>
              <Label htmlFor="rent_amount">Monthly Rent ($) *</Label>
              <Input
                id="rent_amount"
                type="number"
                value={formData.rent_amount}
                onChange={(e) => handleInputChange('rent_amount', e.target.value)}
                placeholder="2500"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Lease Terms */}
            <div>
              <Label htmlFor="lease_terms">Lease Terms (months)</Label>
              <Select value={formData.lease_terms} onValueChange={(value) => handleInputChange('lease_terms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lease terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Property Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the property, its features, and any special details..."
              rows={3}
            />
          </div>

          {/* Amenities */}
          <div>
            <Label htmlFor="amenities">Amenities</Label>
            <Textarea
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleInputChange('amenities', e.target.value)}
              placeholder="List amenities (e.g., parking, laundry, gym, pool, etc.)"
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Property...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPropertyModal

