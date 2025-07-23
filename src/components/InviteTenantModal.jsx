import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { useProperties } from '../hooks/useProperties'
import { supabase } from '../lib/supabaseClient'
import { UserPlus, Mail, Building2, User, MessageSquare } from 'lucide-react'
import { useToast } from './ui/use-toast'

export function InviteTenantModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    propertyId: '',
    message: ''
  })
  
  const { properties } = useProperties()
  const { toast } = useToast()

  const availableProperties = properties.filter(property => !property.tenant_id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create tenant invitation record
      const { data: invitation, error: inviteError } = await supabase
        .from('tenant_invitations')
        .insert({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          property_id: formData.propertyId,
          message: formData.message,
          status: 'pending',
          invited_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single()

      if (inviteError) throw inviteError

      // Send invitation email (in a real app, this would be handled by a backend service)
      const selectedProperty = properties.find(p => p.id === formData.propertyId)
      
      // For now, we'll just show a success message
      // In production, you'd integrate with an email service like SendGrid or AWS SES
      
      toast({
        title: "Invitation Sent!",
        description: `Tenant invitation has been sent to ${formData.email} for ${selectedProperty?.address}`,
      })

      // Reset form and close modal
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        propertyId: '',
        message: ''
      })
      setOpen(false)

    } catch (error) {
      console.error('Error sending invitation:', error)
      toast({
        title: "Error",
        description: "Failed to send tenant invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Invite New Tenant
          </DialogTitle>
          <DialogDescription>
            Send an invitation to a new tenant to join your property. They'll receive an email with instructions to create their account.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="property" className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              Property
            </Label>
            <Select value={formData.propertyId} onValueChange={(value) => handleInputChange('propertyId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent>
                {availableProperties.length === 0 ? (
                  <SelectItem value="" disabled>
                    No available properties
                  </SelectItem>
                ) : (
                  availableProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.address} - ${property.rent_amount}/month
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {availableProperties.length === 0 && (
              <p className="text-sm text-muted-foreground">
                All properties currently have tenants assigned. Add a new property or remove existing tenants to invite new ones.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Personal Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Welcome to your new home! I'm excited to have you as a tenant..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.email || !formData.firstName || !formData.lastName || !formData.propertyId}
            >
              {loading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteTenantModal

