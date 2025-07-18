import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  Building, 
  Users, 
  CreditCard, 
  FileText,
  Mail,
  MessageCircle,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Zap
} from 'lucide-react';

const HelpCenter = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    {
      icon: Building,
      title: 'Setting up your first property',
      description: 'Learn how to add your property, configure settings, and customize your dashboard',
      articles: 5,
      popular: true
    },
    {
      icon: Users,
      title: 'Inviting tenants',
      description: 'Step-by-step guide to inviting tenants and managing tenant applications',
      articles: 8,
      popular: true
    },
    {
      icon: CreditCard,
      title: 'Using Stripe for rent collection',
      description: 'Set up payment processing, collect rent, and manage financial transactions',
      articles: 12,
      popular: true
    },
    {
      icon: FileText,
      title: 'Managing lease agreements',
      description: 'Create, sign, and manage digital lease agreements with your tenants',
      articles: 6,
      popular: false
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Contact Support',
      description: 'Get help from our support team',
      action: 'mailto:support@rent-control.net',
      color: 'blue'
    },
    {
      icon: BookOpen,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      action: '/tutorials',
      color: 'purple'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Browse our complete docs',
      action: '/docs',
      color: 'green'
    }
  ];

  const faqItems = [
    {
      question: 'How do I add my first property?',
      answer: 'Navigate to your dashboard and click "Add Property". Fill in the property details including address, type, and rental information. You can customize the property dashboard with your branding and welcome message.'
    },
    {
      question: 'How does tenant invitation work?',
      answer: 'From your property dashboard, click "Invite Tenant" and enter their email address. They\'ll receive an invitation link to create their account and access their tenant portal.'
    },
    {
      question: 'What are the Stripe fees?',
      answer: 'Rent Control charges a 2% platform fee on all rent payments processed through Stripe. Standard Stripe processing fees also apply (typically 2.9% + 30¢ per transaction).'
    },
    {
      question: 'Can I customize my property dashboard?',
      answer: 'Yes! Each property gets its own custom dashboard where you can upload your logo, set theme colors, and add a personalized welcome message for your tenants.'
    },
    {
      question: 'How do I handle maintenance requests?',
      answer: 'Tenants can submit maintenance requests through their portal with photos and descriptions. You\'ll receive notifications and can track the status of all requests in your dashboard.'
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
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Help Center
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Search through our guides and FAQs to get help with property management, 
            tenant relations, and platform features.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Search for help articles, guides, and FAQs..."
              />
            </div>
          </motion.div>

          {/* Coming Soon Notice */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Clock className="w-4 h-4" />
            <span>🔎 Knowledge Base Coming Soon</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get immediate help with these options
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <motion.a
                key={index}
                href={action.action}
                className={`bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group`}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-green-500 to-green-600'
                } rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Get Help</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Help Topics */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Help Topics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Most searched guides and tutorials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {helpTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {topic.title}
                      </h3>
                      {topic.popular && (
                        <span className="inline-flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {topic.articles} articles
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                        <span>Browse</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Support Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
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
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Urgent Help?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Can't find what you're looking for? Our support team is here to help you get back on track quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@rent-control.net"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Email Support</span>
              </a>
              <Link 
                to="/contact"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg border border-gray-200 dark:border-gray-600"
              >
                Contact Form
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              We typically respond within 24 hours during business hours
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HelpCenter;

