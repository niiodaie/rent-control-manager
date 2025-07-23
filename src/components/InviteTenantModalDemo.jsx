import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { UserPlus, Mail, Building2, User, MessageSquare, CheckCircle } from 'lucide-react'

export function InviteTenantModalDemo() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    propertyId: '',
    message: ''
  })

  // Mock available properties (vacant ones)
  const availableProperties = [
    {
      id: '3',
      address: '789 Pine St, Suite 1',
      city: 'Chicago',
      state: 'IL',
      rent_amount: 1800
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setLoading(false)
    setSuccess(true)

    // Reset after showing success
    setTimeout(() => {
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        propertyId: '',
        message: ''
      })
      setSuccess(false)
      setOpen(false)
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (success) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Tenant
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Invitation Sent!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tenant invitation has been sent to {formData.email}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
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

export default InviteTenantModalDemo

