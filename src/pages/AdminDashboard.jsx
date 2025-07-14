import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building, 
  CreditCard,
  AlertCircle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // In production, these would be real API calls
      const mockAnalytics = {
        totalUsers: 1247,
        activeSubscriptions: 892,
        monthlyRevenue: 44650,
        totalProperties: 3421,
        growthRate: 12.5,
        churnRate: 2.1
      };

      const mockUsers = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          plan: 'Professional',
          status: 'active',
          properties: 5,
          joinDate: '2024-01-15',
          lastActive: '2024-01-20',
          revenue: 599.88
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          plan: 'Premium',
          status: 'active',
          properties: 12,
          joinDate: '2024-01-10',
          lastActive: '2024-01-19',
          revenue: 1199.88
        },
        {
          id: '3',
          name: 'Mike Wilson',
          email: 'mike@example.com',
          plan: 'Starter',
          status: 'trial',
          properties: 1,
          joinDate: '2024-01-18',
          lastActive: '2024-01-20',
          revenue: 0
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily@example.com',
          plan: 'Professional',
          status: 'cancelled',
          properties: 3,
          joinDate: '2023-12-01',
          lastActive: '2024-01-15',
          revenue: 299.94
        }
      ];

      const mockSubscriptions = [
        {
          id: 'sub_1',
          userId: '1',
          plan: 'Professional',
          status: 'active',
          amount: 49.99,
          interval: 'monthly',
          currentPeriodEnd: '2024-02-15',
          trialEnd: null
        },
        {
          id: 'sub_2',
          userId: '2',
          plan: 'Premium',
          status: 'active',
          amount: 99.99,
          interval: 'monthly',
          currentPeriodEnd: '2024-02-10',
          trialEnd: null
        },
        {
          id: 'sub_3',
          userId: '3',
          plan: 'Professional',
          status: 'trialing',
          amount: 49.99,
          interval: 'monthly',
          currentPeriodEnd: '2024-02-01',
          trialEnd: '2024-02-01'
        }
      ];

      setAnalytics(mockAnalytics);
      setUsers(mockUsers);
      setSubscriptions(mockSubscriptions);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action, userId) => {
    console.log(`${action} user:`, userId);
    // In production, implement actual user management actions
  };

  const handleRefund = async (subscriptionId) => {
    console.log('Processing refund for subscription:', subscriptionId);
    // In production, implement refund processing
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      trial: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
      trialing: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, subscriptions, and platform analytics
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={fetchDashboardData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{analytics.growthRate}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.activeSubscriptions?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.churnRate}% churn rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${analytics.monthlyRevenue?.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +{analytics.growthRate}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalProperties?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts, subscriptions, and access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.properties}</TableCell>
                      <TableCell>${user.revenue}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUserAction('view', user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUserAction('edit', user.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRefund(user.id)}
                              className="text-orange-600"
                            >
                              <DollarSign className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleUserAction('delete', user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

