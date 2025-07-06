import React from 'react';
import { CreditCard, Calendar, FileText, AlertCircle, MessageCircle, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const TenantDashboard = () => {
  const tenant = {
    name: 'John Doe',
    apartment: 'Sunset Apartments - Unit 3B',
    rentDue: '$1,200',
    rentStatus: 'Due in 3 days',
    leaseLink: '/documents/lease.pdf',
    lastPayment: '$1,200 paid on June 1, 2025',
  };

  const maintenanceRequests = [
    { title: 'Leaky Faucet', status: 'In Progress', submitted: '2 days ago' },
    { title: 'AC Not Working', status: 'Resolved', submitted: 'Last week' },
  ];

  const announcements = [
    { message: 'Quarterly inspection on July 10th.', date: '3 days ago' },
    { message: 'Reminder: Trash days are Mon & Thurs.', date: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Welcome, {tenant.name} 👋</h1>
          <p className="text-gray-600 dark:text-gray-300">You're viewing your dashboard for <strong>{tenant.apartment}</strong></p>
        </motion.div>

        {/* Rent Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Current Rent</h2>
              <p className="text-2xl font-bold mt-1">{tenant.rentDue}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tenant.rentStatus}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Pay Now</span>
            </button>
          </div>
        </motion.div>

        {/* Lease & Payment Info */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <span>Your Lease</span>
            </h3>
            <a href={tenant.leaseLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View / Download Lease Agreement
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <span>Payment History</span>
            </h3>
            <p>{tenant.lastPayment}</p>
          </div>
        </motion.div>

        {/* Maintenance Requests */}
        <motion.div
          className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span>Maintenance Requests</span>
          </h3>
          <ul className="space-y-3">
            {maintenanceRequests.map((req, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{req.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{req.status} · {req.submitted}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Announcements */}
        <motion.div
          className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-500" />
            <span>Announcements</span>
          </h3>
          <ul className="space-y-3">
            {announcements.map((note, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{note.message}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{note.date}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TenantDashboard;
