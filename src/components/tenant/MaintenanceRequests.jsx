import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wrench, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Building2,
  Camera,
  FileText,
  MessageSquare,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const MaintenanceRequests = ({ propertyId, unitId = null, userRole = 'tenant' }) => {
  const { user, apiCall } = useAuth();
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    unit_id: unitId || '',
    images: []
  });

  const categories = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'flooring', label: 'Flooring' },
    { value: 'painting', label: 'Painting' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'security', label: 'Security' },
    { value: 'general', label: 'General Maintenance' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
  ];

  const statuses = [
    { value: 'open', label: 'Open', icon: AlertTriangle, color: 'text-red-500' },
    { value: 'in_progress', label: 'In Progress', icon: Clock, color: 'text-yellow-500' },
    { value: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'text-green-500' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-gray-500' }
  ];

  useEffect(() => {
    fetchMaintenanceRequests();
  }, [propertyId, unitId]);

  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true);
      
      let endpoint = `/api/maintenance/requests?userId=${user.id}`;
      if (propertyId) endpoint += `&propertyId=${propertyId}`;
      if (unitId) endpoint += `&unitId=${unitId}`;
      
      const response = await apiCall(endpoint);
      if (response.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const createMaintenanceRequest = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', newRequest.title);
      formData.append('description', newRequest.description);
      formData.append('priority', newRequest.priority);
      formData.append('category', newRequest.category);
      formData.append('unit_id', newRequest.unit_id);
      formData.append('tenant_id', user.id);
      formData.append('property_id', propertyId);
      
      // Add images
      newRequest.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await apiCall('/api/maintenance/requests', {
        method: 'POST',
        body: formData
      });

      if (response.success) {
        setRequests(prev => [response.data, ...prev]);
        setNewRequest({
          title: '',
          description: '',
          priority: 'medium',
          category: 'general',
          unit_id: unitId || '',
          images: []
        });
        setShowCreateForm(false);
        alert('Maintenance request submitted successfully!');
      } else {
        alert('Failed to submit request: ' + response.error);
      }
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      alert('Failed to submit maintenance request');
    }
  };

  const updateRequestStatus = async (requestId, status, notes = '') => {
    try {
      const response = await apiCall(`/api/maintenance/requests/${requestId}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: user.id,
          status,
          admin_notes: notes,
          updated_by: user.id
        })
      });

      if (response.success) {
        setRequests(prev => 
          prev.map(req => 
            req.id === requestId 
              ? { ...req, status, admin_notes: notes, updated_at: new Date().toISOString() }
              : req
          )
        );
        alert('Request status updated successfully!');
      } else {
        alert('Failed to update request: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewRequest(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setNewRequest(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = statuses.find(s => s.value === status);
    if (!statusConfig) return <Badge variant="outline">{status}</Badge>;
    
    const Icon = statusConfig.icon;
    return (
      <Badge variant="outline" className={statusConfig.color}>
        <Icon className="h-3 w-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = priorities.find(p => p.value === priority);
    if (!priorityConfig) return <Badge variant="outline">{priority}</Badge>;
    
    return (
      <Badge variant="secondary" className={`text-white ${priorityConfig.color}`}>
        {priorityConfig.label}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    const matchesSearch = !searchTerm || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Requests</h2>
          <p className="text-muted-foreground">
            {userRole === 'tenant' ? 'Submit and track your maintenance requests' : 'Manage property maintenance requests'}
          </p>
        </div>
        {userRole === 'tenant' && (
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
                <DialogDescription>
                  Describe the maintenance issue and we'll get it resolved quickly.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={createMaintenanceRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newRequest.category} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newRequest.priority} 
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {!unitId && (
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        value={newRequest.unit_id}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, unit_id: e.target.value }))}
                        placeholder="Unit number or ID"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the maintenance issue..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="images">Photos (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-2"
                  />
                  {newRequest.images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newRequest.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-20 h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload up to 5 photos to help us understand the issue better.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            {priorities.map(priority => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wrench className="h-16 w-16 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No maintenance requests</h3>
              <p className="text-muted-foreground text-center">
                {userRole === 'tenant' 
                  ? "You haven't submitted any maintenance requests yet."
                  : "No maintenance requests have been submitted for this property."
                }
              </p>
              {userRole === 'tenant' && (
                <Button className="mt-4" onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit First Request
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          Unit {request.unit?.unit_number || request.unit_id}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {request.tenant?.full_name || request.tenant?.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(request.created_at)}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {userRole !== 'tenant' && request.status === 'open' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateRequestStatus(request.id, 'in_progress')}
                      >
                        Accept
                      </Button>
                    )}
                    {userRole !== 'tenant' && request.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateRequestStatus(request.id, 'resolved', 'Issue has been resolved.')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Description:</p>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {request.category.replace('_', ' ')}
                    </Badge>
                  </div>

                  {request.images && request.images.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Photos:</p>
                      <div className="flex gap-2">
                        {request.images.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={image.url}
                            alt={`Request image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                            onClick={() => window.open(image.url, '_blank')}
                          />
                        ))}
                        {request.images.length > 3 && (
                          <div className="w-20 h-20 bg-muted rounded border flex items-center justify-center text-sm text-muted-foreground">
                            +{request.images.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {request.admin_notes && (
                    <div>
                      <p className="text-sm font-medium mb-1">Admin Notes:</p>
                      <p className="text-sm text-muted-foreground">{request.admin_notes}</p>
                    </div>
                  )}

                  {request.updated_at !== request.created_at && (
                    <div className="text-xs text-muted-foreground">
                      Last updated: {formatDate(request.updated_at)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenanceRequests;

