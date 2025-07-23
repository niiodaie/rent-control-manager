import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Plus, Loader2, Wrench } from 'lucide-react'
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests'
import { useAuth } from '../contexts/AuthContext'

export function MaintenanceRequestModal({ trigger, onSuccess }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { createRequest } = useMaintenanceRequests('tenant')
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    location: ''
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
      const requestData = {
        ...formData,
        tenant_id: user.id,
        status: 'pending'
      }

      const { data, error } = await createRequest(requestData)
      
      if (error) {
        throw new Error(error)
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        location: ''
      })

      setOpen(false)
      if (onSuccess) onSuccess(data)
      
    } catch (error) {
      console.error('Error creating maintenance request:', error)
      alert('Failed to create maintenance request. Please try again.')
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
            New Request
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wrench className="h-5 w-5 mr-2" />
            Submit Maintenance Request
          </DialogTitle>
          <DialogDescription>
            Describe the maintenance issue you're experiencing. We'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">HVAC/Heating/Cooling</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="flooring">Flooring</SelectItem>
                <SelectItem value="windows_doors">Windows/Doors</SelectItem>
                <SelectItem value="pest_control">Pest Control</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Can wait a few days</SelectItem>
                <SelectItem value="medium">Medium - Should be fixed soon</SelectItem>
                <SelectItem value="high">High - Needs attention quickly</SelectItem>
                <SelectItem value="urgent">Urgent - Safety/security issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location in Unit</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Kitchen sink, Master bedroom, Living room"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Please provide as much detail as possible about the issue, including when it started, what you've tried, and how it's affecting you..."
              rows={4}
              required
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
                  Submitting...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MaintenanceRequestModal

