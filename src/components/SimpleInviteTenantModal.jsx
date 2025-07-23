import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { UserPlus, Mail, Building2, User, MessageSquare, CheckCircle, X } from 'lucide-react'

export function SimpleInviteTenantModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    propertyId: '3',
    message: ''
  })

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
        propertyId: '3',
        message: ''
      })
      setSuccess(false)
      setIsOpen(false)
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="h-4 w-4 mr-2" />
        Invite Tenant
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => !loading && setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border p-6">
        {/* Close button */}
        <button
          onClick={() => !loading && setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Invitation Sent!</h3>
              <p className="text-sm text-gray-600 mt-1">
                Tenant invitation has been sent to {formData.email}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Invite New Tenant
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Send an invitation to a new tenant to join your property. They'll receive an email with instructions to create their account.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="property" className="text-sm font-medium flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  Property
                </label>
                <select
                  id="property"
                  value={formData.propertyId}
                  onChange={(e) => handleInputChange('propertyId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                >
                  <option value="3">789 Pine St, Suite 1 - $1800/month</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Welcome to your new home! I'm excited to have you as a tenant..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.email || !formData.firstName || !formData.lastName}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? 'Sending...' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default SimpleInviteTenantModal

