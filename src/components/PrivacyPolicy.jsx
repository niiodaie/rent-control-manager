import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Clock,
  Globe
} from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const privacyPrinciples = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We are clear about what data we collect, how we use it, and who we share it with. No hidden practices or unclear terms.'
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'All data is encrypted both in transit and at rest using enterprise-grade encryption protocols and secure cloud infrastructure.'
    },
    {
      icon: CheckCircle,
      title: 'User Control',
      description: 'You have full control over your data, including the right to access, modify, or delete your information at any time.'
    }
  ];

  const dataTypes = [
    {
      category: 'Account Information',
      items: ['Name, email address, phone number', 'Property details and addresses', 'Payment information (processed by Stripe)', 'Profile preferences and settings']
    },
    {
      category: 'Usage Data',
      items: ['Login times and frequency', 'Feature usage patterns', 'Device and browser information', 'IP address and location data']
    },
    {
      category: 'Communication Data',
      items: ['Messages between landlords and tenants', 'Support ticket conversations', 'Email communications', 'Maintenance request details']
    },
    {
      category: 'Financial Data',
      items: ['Rent payment history', 'Transaction records', 'Billing information', 'Tax-related documents']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your Privacy Matters
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We respect your privacy and are committed to protecting your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </motion.p>
          
          <motion.div
            className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Clock className="w-4 h-4" />
            <span>Last updated: January 2024</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Privacy Principles */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The core values that guide how we handle your personal information
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Data Collection */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Information We Collect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We only collect data necessary to provide our services effectively
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataTypes.map((dataType, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Database className="w-5 h-5 text-blue-600 mr-2" />
                  {dataType.category}
                </h3>
                <ul className="space-y-2">
                  {dataType.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How We Use Data */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                How We Use Your Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Service Delivery</h3>
                    <p className="text-gray-600 dark:text-gray-300">Provide tenant communication, rent processing, and dashboard analytics.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Platform Improvement</h3>
                    <p className="text-gray-600 dark:text-gray-300">Analyze usage patterns to enhance features and user experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Customer Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">Respond to inquiries and provide technical assistance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Legal Compliance</h3>
                    <p className="text-gray-600 dark:text-gray-300">Meet regulatory requirements and protect against fraud.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What We Don't Do
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">We do not sell your information to third parties</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">We do not share data without your consent</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">We do not store sensitive payment information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">We do not use data for advertising purposes</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Data Security */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We Protect Your Data
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Enterprise-grade security measures to keep your information safe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Encryption
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All data is encrypted both in transit and at rest using industry-standard AES-256 encryption.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Database className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Supabase Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Data stored securely with Supabase, featuring row-level security and automatic backups.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Stripe Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Payment processing handled by Stripe with PCI DSS compliance. No payment data stored on our servers.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Your Rights */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights & Control
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              You have full control over your personal information
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Access Your Data</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Request a copy of all personal information we have about you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Correct Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Update or correct any inaccurate personal information.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Delete Your Data</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Request deletion of your personal information at any time.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Data Portability</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Export your data in a machine-readable format.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Questions About Privacy?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            You may request data deletion at any time by contacting our support team.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="mailto:support@rent-control.net"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>support@rent-control.net</span>
            </a>
            <Link 
              to="/contact"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg border border-gray-200 dark:border-gray-600"
            >
              Contact Form
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PrivacyPolicy;

