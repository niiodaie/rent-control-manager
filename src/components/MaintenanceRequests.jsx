import React, { useState } from 'react'
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Wrench, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  X,
  Calendar,
  User,
  MapPin,
  Loader2,
  Filter
} from 'lucide-react'

export function MaintenanceRequests({ userRole = 'tenant' }) {
  const { user } = useAuth()
  const { profile } = useProfile()
  const { 
    requests, 
    groupedRequests, 
    loading, 
    createRequest, 
    updateRequestStatus 
  } = useMaintenanceRequests(userRole)
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general'
  })

  const handleCreateRequest = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await createRequest({
        ...newRequest,
        // For now, we'll use a placeholder property_id
        // In a real app, this would come from the user's lease/property assignment
        property_id: 1
      })

      if (error) {
        setSubmitStatus({ type: 'error', message: error })
      } else {
        setSubmitStatus({ type: 'success', message: 'Maintenance request submitted successfully!' })
        setNewRequest({
          title: '',
          description: '',
          priority: 'medium',
          category: 'general'
        })
        setTimeout(() => {
          setIsCreateModalOpen(false)
          setSubmitStatus(null)
        }, 2000)
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit request. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateRequestStatus(requestId, newStatus)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />
      case 'in_progress':
        return <AlertCircle className="h-3 w-3" />
      case 'completed':
        return <CheckCircle className="h-3 w-3" />
      case 'cancelled':
        return <X className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'in_progress':
        return 'secondary'
      case 'cancelled':
        return 'outline'
      default:
        return 'destructive'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const filteredRequests = filterStatus === 'all' 
    ? requests 
    : requests.filter(request => request.status === filterStatus)

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            {userRole === 'admin' 
              ? 'Manage maintenance requests from your tenants'
              : 'Submit and track your maintenance requests'
            }
          </p>
        </div>
        {userRole === 'tenant' && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
                <DialogDescription>
                  Describe the issue you're experiencing and we'll get it resolved.
                </DialogDescription>
              </DialogHeader>
              
              {submitStatus && (
                <Alert variant={submitStatus.type === 'error' ? 'destructive' : 'default'}>
                  {submitStatus.type === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{submitStatus.message}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Leaky faucet in kitchen"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please describe the issue in detail..."
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newRequest.priority} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newRequest.category} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="appliances">Appliances</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreateModalOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Status Summary for Admin */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {groupedRequests.pending.length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {groupedRequests.in_progress.length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {groupedRequests.completed.length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {groupedRequests.cancelled.length}
              </div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor="status-filter">Filter by status:</Label>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-lg">{request.title}</h3>
                      <Badge 
                        variant={getStatusVariant(request.status)}
                        className="flex items-center space-x-1"
                      >
                        {getStatusIcon(request.status)}
                        <span>{request.status.replace('_', ' ')}</span>
                      </Badge>
                      {request.priority && (
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority} priority
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {request.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      {userRole === 'admin' && request.tenant && (
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{request.tenant.full_name}</span>
                        </div>
                      )}
                      
                      {request.property && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{request.property.address}</span>
                        </div>
                      )}
                    </div>

                    {request.admin_notes && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Admin Notes:</p>
                        <p className="text-sm text-muted-foreground">{request.admin_notes}</p>
                      </div>
                    )}
                  </div>
                  
                  {userRole === 'admin' && request.status !== 'completed' && request.status !== 'cancelled' && (
                    <div className="flex flex-col space-y-2 ml-4">
                      {request.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(request.id, 'in_progress')}
                        >
                          Start Work
                        </Button>
                      )}
                      {request.status === 'in_progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(request.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(request.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {filterStatus === 'all' 
                  ? 'No maintenance requests' 
                  : `No ${filterStatus.replace('_', ' ')} requests`
                }
              </h3>
              <p className="text-muted-foreground mb-4">
                {userRole === 'tenant' 
                  ? 'Submit a maintenance request when you need repairs or assistance.'
                  : 'Maintenance requests from your tenants will appear here.'
                }
              </p>
              {userRole === 'tenant' && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Request
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

