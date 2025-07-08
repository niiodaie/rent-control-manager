import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Users, Building2, Headphones } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: 'Automated Rent Collection',
    description: 'Easily collect rent online with real-time payment tracking and reminders.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: 'Tenant Communication',
    description: 'Send messages, notices, and updates directly from your dashboard.',
  },
  {
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    title: 'Multi-Property Support',
    description: 'Manage multiple properties with ease from a single admin interface.',
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: 'Secure Data Handling',
    description: 'All tenant and landlord data is encrypted and stored securely.',
  },
  {
    icon: <Headphones className="w-8 h-8 text-blue-600" />,
    title: 'Customer Support',
    description: 'We offer email and live support for all plan tiers.',
  },
];

const Features = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Platform Features</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Rent Control makes property management effortless for landlords and seamless for tenants.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.03 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
