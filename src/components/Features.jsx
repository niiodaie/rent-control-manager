import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  CreditCard,
  Wrench,
  Users,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Smartphone
} from 'lucide-react';

const features = [
  {
    icon: <Building2 className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Multi-Tenant Platform',
    desc: 'Manage multiple properties and tenants with custom branding for each.',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Automated Rent Collection',
    desc: 'Collect rent via Stripe, send reminders, and apply late fees automatically.',
  },
  {
    icon: <Wrench className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Maintenance Requests',
    desc: 'Let tenants submit requests and track vendor resolution progress.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Tenant Portals',
    desc: 'Each tenant has a secure login with their own dashboard.',
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Secure Payments',
    desc: 'All payments are encrypted and processed via Stripe.',
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Instant Notifications',
    desc: 'Real-time alerts for tenants, managers, and owners.',
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Custom Domains',
    desc: 'Each property can run on its own branded subdomain.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Reports & Analytics',
    desc: 'Track rent collection, maintenance trends, and tenant activity.',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-600 mb-3" />,
    title: 'Mobile Responsive',
    desc: 'Fully responsive and optimized for any device.',
  },
];

const Features = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        {t('features.title', 'Explore All Features')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200 bg-white dark:bg-gray-900"
          >
            <div className="flex flex-col items-center text-center">
              {item.icon}
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

