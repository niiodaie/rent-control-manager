import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Scale,
  UserCheck,
  Building,
  CreditCard,
  Mail,
  Clock
} from 'lucide-react';

const TermsOfUse = () => {
  const { t } = useTranslation();

  const termsSection = [
    {
      icon: UserCheck,
      title: 'User Responsibilities',
      content: 'You are responsible for maintaining accurate information on your properties and tenants. This includes keeping contact details, lease terms, and property information up to date.'
    },
    {
      icon: Shield,
      title: 'Platform Liability',
      content: 'Rent Control is not liable for missed payments or disputes between parties. We provide the platform and tools, but the relationships and agreements are between landlords and tenants.'
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      content: 'Abuse of the system — including fraud, impersonation, or illegal listings — will result in account termination. We maintain a zero-tolerance policy for misuse.'
    },
    {
      icon: Scale,
      title: 'Agreement Updates',
      content: 'Continued use of the platform signifies your agreement to these terms. We reserve the right to update this policy at any time with reasonable notice.'
    }
  ];

  const additionalTerms = [
    {
      icon: Building,
      title: 'Property Listings',
      description: 'All property information must be accurate and legally compliant. False or misleading listings are prohibited.'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Stripe handles all payment processing. A 2% platform fee applies to all rent transactions processed through our system.'
    },
    {
      icon: FileText,
      title: 'Data Usage',
      description: 'We collect and use data as outlined in our Privacy Policy. Your information is protected and never sold to third parties.'
    },
    {
      icon: CheckCircle,
      title: 'Service Availability',
      description: 'We strive for 99.9% uptime but cannot guarantee uninterrupted service. Maintenance windows will be announced in advance.'
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
            <FileText className="w-4 h-4" />
            <span>Terms of Use</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Terms of Use
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            By using Rent Control, you agree to the following terms and conditions. 
            Please read them carefully before using our platform.
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

      {/* Main Terms Section */}
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
              Key Terms & Conditions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential terms that govern your use of the Rent Control platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {termsSection.map((term, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <term.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {term.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {term.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional Terms */}
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
              Additional Terms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Important details about using our platform and services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalTerms.map((term, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <term.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {term.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {term.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Acceptance Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Agreement & Acceptance
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              By creating an account or using any part of the Rent Control platform, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, 
              please do not use our service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/privacy"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg border border-gray-200 dark:border-gray-600"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enforcement Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
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
                Enforcement & Violations
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Account Termination</h3>
                    <p className="text-gray-600 dark:text-gray-300">Violations of these terms may result in immediate account suspension or termination.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Fair Use Policy</h3>
                    <p className="text-gray-600 dark:text-gray-300">We monitor platform usage to ensure fair access for all users and prevent abuse.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Appeal Process</h3>
                    <p className="text-gray-600 dark:text-gray-300">Users may appeal account actions by contacting our support team with relevant information.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                Prohibited Activities
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Creating fake or fraudulent property listings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Impersonating other users or property owners</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Using the platform for illegal activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Attempting to bypass payment processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Harassment or inappropriate communication</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Questions About These Terms?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            If you have any questions about these Terms of Use, please don't hesitate to contact us.
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
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>support@rent-control.net</span>
            </a>
            <Link 
              to="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            >
              Contact Form
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsOfUse;

