import React, { useState } from 'react';
import { CreditCard, Calendar, FileText, AlertCircle, MessageCircle, Home, User, Settings, Bell, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tenant = {
    name: 'John Doe',
    apartment: 'Sunset Apartments - Unit 3B',
    rentDue: '$1,200',
    rentStatus: 'Due in 3 days',
    leaseLink: '/documents/lease.pdf',
    lastPayment: '$1,200 paid on June 1, 2025',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    moveInDate: 'January 15, 2024',
    leaseEndDate: 'January 14, 2025'
  };

  const maintenanceRequests = [
    { id: 1, title: 'Leaky Faucet', status: 'In Progress', submitted: '2 days ago', priority: 'medium' },
    { id: 2, title: 'AC Not Working', status: 'Resolved', submitted: 'Last week', priority: 'high' },
  ];

  const announcements = [
    { message: 'Quarterly inspection on July 10th.', date: '3 days ago' },
    { message: 'Reminder: Trash days are Mon & Thurs.', date: '1 week ago' },
  ];

  const messages = [
    { id: 1, from: 'Property Manager', message: 'Maintenance team will visit tomorrow at 3pm', time: '2 hours ago', unread: true },
    { id: 2, from: 'Property Manager', message: 'Thank you for your rent payment', time: '1 day ago', unread: false },
  ];

  const quickActions = [
    {
      title: 'My Profile',
      description: 'View and update your personal information',
      icon: User,
      color: 'bg-blue-500',
      action: () => setActiveTab('profile')
    },
    {
      title: 'Pay Rent',
      description: 'Make your monthly rent payment',
      icon: CreditCard,
      color: 'bg-green-500',
      action: () => setActiveTab('rent')
    },
    {
      title: 'Maintenance',
      description: 'Submit and track maintenance requests',
      icon: AlertCircle,
      color: 'bg-orange-500',
      action: () => setActiveTab('maintenance')
    },
    {
      title: 'Messages',
      description: 'Chat with your property manager',
      icon: MessageCircle,
      color: 'bg-purple-500',
      action: () => setActiveTab('messages'),
      badge: messages.filter(m => m.unread).length
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tenant Portal</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.apartment}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                </span>
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Welcome Message */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-2">Welcome, {tenant.name} 👋</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Manage your tenancy for <strong>{tenant.apartment}</strong>
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'rent', label: 'Rent & Payments', icon: CreditCard },
                { id: 'maintenance', label: 'Maintenance', icon: AlertCircle },
                { id: 'messages', label: 'Messages', icon: MessageCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {tab.id === 'messages' && messages.filter(m => m.unread).length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {messages.filter(m => m.unread).length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={action.action}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      {action.badge && action.badge > 0 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Rent Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">Current Rent</h3>
                  <p className="text-2xl font-bold mt-1">{tenant.rentDue}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.rentStatus}</p>
                </div>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
                  onClick={() => setActiveTab('rent')}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now</span>
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Maintenance Requests */}
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <span>Maintenance Requests</span>
                  </h3>
                  <button 
                    className="text-blue-600 hover:text-blue-700 text-sm"
                    onClick={() => setActiveTab('maintenance')}
                  >
                    View All
                  </button>
                </div>
                <ul className="space-y-3">
                  {maintenanceRequests.slice(0, 3).map((req, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{req.title}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{req.submitted}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        req.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        req.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {req.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Announcements */}
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <span>Announcements</span>
                </h3>
                <ul className="space-y-3">
                  {announcements.map((note, idx) => (
                    <li key={idx} className="flex justify-between items-start">
                      <span className="flex-1">{note.message}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{note.date}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && <ProfileTab tenant={tenant} />}
        {activeTab === 'rent' && <RentTab tenant={tenant} />}
        {activeTab === 'maintenance' && <MaintenanceTab requests={maintenanceRequests} />}
        {activeTab === 'messages' && <MessagesTab messages={messages} />}
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ tenant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: tenant.name,
    email: tenant.email,
    phone: tenant.phone
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">My Profile</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{tenant.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{tenant.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{tenant.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Unit</label>
            <p className="text-gray-900 dark:text-white">{tenant.apartment}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Move-in Date</label>
            <p className="text-gray-900 dark:text-white">{tenant.moveInDate}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lease End Date</label>
            <p className="text-gray-900 dark:text-white">{tenant.leaseEndDate}</p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Rent Tab Component
const RentTab = ({ tenant }) => {
  const paymentHistory = [
    { date: '2025-06-01', amount: 1200, status: 'Paid', method: 'Credit Card' },
    { date: '2025-05-01', amount: 1200, status: 'Paid', method: 'Bank Transfer' },
    { date: '2025-04-01', amount: 1200, status: 'Paid', method: 'Credit Card' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Rent & Payments</h3>

      {/* Current Rent Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold mb-4">Current Month</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Amount Due</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{tenant.rentDue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
            <p className="text-lg font-medium text-orange-600">July 1, 2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              {tenant.rentStatus}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Pay Rent Now</span>
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold mb-4">Payment History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Maintenance Tab Component
const MaintenanceTab = ({ requests }) => {
  const [showForm, setShowForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Submitting maintenance request:', newRequest);
    setShowForm(false);
    setNewRequest({ title: '', description: '', priority: 'medium', location: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Maintenance Requests</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* New Request Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-4">Submit New Maintenance Request</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Issue Title</label>
              <input
                type="text"
                value={newRequest.title}
                onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={newRequest.location}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Kitchen, Bathroom, Living Room"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold mb-4">Your Requests</h4>
        <div className="space-y-4">
          {requests.map((request, index) => (
            <div key={request.id || index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 dark:text-white">{request.title}</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Submitted {request.submitted}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {request.priority} priority
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      request.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Messages</h3>

      {/* Message Thread */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden h-96 flex flex-col">
        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">{message.from}</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                    {message.unread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Emergency Phone</p>
              <p className="font-medium">(555) 911-HELP</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Property Manager</p>
              <p className="font-medium">manager@sunsetapartments.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
