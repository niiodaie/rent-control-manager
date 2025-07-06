import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Settings, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Crown,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, apiCall } = useAuth();
  
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Filters and search
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [ticketFilter, setTicketFilter] = useState('all');
  
  // Broadcast message
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    type: 'announcement',
    target_role: 'all'
  });

  useEffect(() => {
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics
      const analyticsResponse = await apiCall(`/api/admin/analytics?userId=${user.id}`);
      if (analyticsResponse.success) {
        setAnalytics(analyticsResponse.data);
      }

      // Fetch users
      const usersResponse = await apiCall(`/api/admin/users?userId=${user.id}&limit=100`);
      if (usersResponse.success) {
        setUsers(usersResponse.data.users);
      }

      // Fetch support tickets
      const ticketsResponse = await apiCall(`/api/admin/support-tickets?userId=${user.id}&limit=50`);
      if (ticketsResponse.success) {
        setSupportTickets(ticketsResponse.data.tickets);
      }

      // Fetch admin logs
      const logsResponse = await apiCall(`/api/admin/logs?userId=${user.id}&limit=50`);
      if (logsResponse.success) {
        setAdminLogs(logsResponse.data.logs);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action, data = {}) => {
    try {
      let endpoint = '';
      let method = 'PUT';
      let body = { userId: user.id, ...data };

      switch (action) {
        case 'suspend':
          endpoint = `/api/admin/users/${userId}`;
          body.status = 'suspended';
          break;
        case 'activate':
          endpoint = `/api/admin/users/${userId}`;
          body.status = 'active';
          break;
        case 'change_subscription':
          endpoint = `/api/admin/users/${userId}/subscription`;
          method = 'POST';
          break;
        default:
          return;
      }

      const response = await apiCall(endpoint, {
        method,
        body: JSON.stringify(body)
      });

      if (response.success) {
        fetchDashboardData(); // Refresh data
        alert(`User ${action} completed successfully`);
      } else {
        alert(`Failed to ${action} user: ` + response.error);
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      alert(`Failed to ${action} user`);
    }
  };

  const handleTicketUpdate = async (ticketId, updates) => {
    try {
      const response = await apiCall(`/api/admin/support-tickets/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: user.id,
          ...updates
        })
      });

      if (response.success) {
        fetchDashboardData(); // Refresh data
        alert('Ticket updated successfully');
      } else {
        alert('Failed to update ticket: ' + response.error);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Failed to update ticket');
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    
    try {
      const response = await apiCall('/api/admin/broadcast', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          ...broadcastForm
        })
      });

      if (response.success) {
        alert(`Broadcast sent to ${response.data.recipient_count} users`);
        setBroadcastForm({
          title: '',
          message: '',
          type: 'announcement',
          target_role: 'all'
        });
      } else {
        alert('Failed to send broadcast: ' + response.error);
      }
    } catch (error) {
      console.error('Error sending broadcast:', error);
      alert('Failed to send broadcast');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'resolved':
        return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Check admin access
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform oversight and management
          </p>
        </div>
        <Button onClick={fetchDashboardData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {analytics && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overview.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      Active subscriptions: {analytics.overview.activeSubscriptions}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Properties</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overview.totalProperties}</div>
                    <p className="text-xs text-muted-foreground">
                      Units: {analytics.overview.totalUnits}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(analytics.revenue.totalPlatformRevenue)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Fees: {formatCurrency(analytics.revenue.platformFees)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overview.totalLeases}</div>
                    <p className="text-xs text-muted-foreground">
                      Total rent: {formatCurrency(analytics.revenue.totalRevenue)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subscription Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Distribution of active subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(analytics.subscriptions.breakdown).map(([plan, count]) => ({
                            name: plan.charAt(0).toUpperCase() + plan.slice(1),
                            value: count
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {Object.entries(analytics.subscriptions.breakdown).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* User Growth */}
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>Daily user signups over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={Object.entries(analytics.growth.dailyUserSignups).map(([date, count]) => ({
                          date,
                          signups: count
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="signups" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users by email or name..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="landlord">Landlords</SelectItem>
                <SelectItem value="tenant">Tenants</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts, subscriptions, and access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users
                  .filter(user => {
                    const matchesSearch = !userSearch || 
                      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                      user.full_name?.toLowerCase().includes(userSearch.toLowerCase());
                    const matchesFilter = userFilter === 'all' || user.role === userFilter;
                    return matchesSearch && matchesFilter;
                  })
                  .map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{userData.full_name || userData.email}</p>
                          <p className="text-sm text-muted-foreground">{userData.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{userData.role}</Badge>
                            {userData.subscription && (
                              <Badge variant="secondary">{userData.subscription.plan}</Badge>
                            )}
                            {getStatusBadge(userData.status || 'active')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(userData.id, 'suspend')}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(userData.id, 'change_subscription', { plan: 'premium', action: 'upgrade' })}
                        >
                          <Crown className="h-4 w-4 mr-1" />
                          Upgrade
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={ticketFilter} onValueChange={setTicketFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Manage customer support requests and issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets
                  .filter(ticket => ticketFilter === 'all' || ticket.status === ticketFilter)
                  .map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <MessageSquare className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            From: {ticket.user?.full_name || ticket.user?.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Created: {formatDate(ticket.created_at)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTicketUpdate(ticket.id, { status: 'in_progress' })}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleTicketUpdate(ticket.id, { status: 'resolved', admin_response: 'Issue resolved by admin.' })}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broadcast Tab */}
        <TabsContent value="broadcast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Message</CardTitle>
              <CardDescription>
                Send announcements to all users or specific user groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="broadcast_title">Title</Label>
                    <Input
                      id="broadcast_title"
                      value={broadcastForm.title}
                      onChange={(e) => setBroadcastForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Announcement title..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="broadcast_type">Type</Label>
                    <Select 
                      value={broadcastForm.type} 
                      onValueChange={(value) => setBroadcastForm(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="alert">Alert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="broadcast_target">Target Audience</Label>
                  <Select 
                    value={broadcastForm.target_role} 
                    onValueChange={(value) => setBroadcastForm(prev => ({ ...prev, target_role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="landlord">Landlords Only</SelectItem>
                      <SelectItem value="tenant">Tenants Only</SelectItem>
                      <SelectItem value="admin">Admins Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="broadcast_message">Message</Label>
                  <Textarea
                    id="broadcast_message"
                    value={broadcastForm.message}
                    onChange={(e) => setBroadcastForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Your announcement message..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Broadcast
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Activity Logs</CardTitle>
              <CardDescription>
                Track all administrative actions and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Shield className="h-8 w-8 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">{log.action.replace('_', ' ').toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">
                          By: {log.admin?.full_name || log.admin?.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(log.timestamp)}
                        </p>
                        {log.details && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Details: {JSON.stringify(log.details)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure platform-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Platform settings will be implemented in the next update. 
                    Contact support for configuration changes.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

