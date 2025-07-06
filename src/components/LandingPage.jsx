import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  Shield, 
  Globe,
  Menu,
  X,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const LandingPage = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Building2,
      title: t('features.propertyManagement.title', 'Multi-Property Management'),
      description: t('features.propertyManagement.description', 'Manage unlimited properties with custom dashboards, branding, and tenant organization.')
    },
    {
      icon: Users,
      title: t('features.tenantManagement.title', 'Tenant Management'),
      description: t('features.tenantManagement.description', 'Streamlined tenant onboarding, applications, and communication tools.')
    },
    {
      icon: CreditCard,
      title: t('features.payments.title', 'Stripe Integration'),
      description: t('features.payments.description', 'Secure payment processing with automatic rent collection and 2% platform fee.')
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title', 'Analytics & Reports'),
      description: t('features.analytics.description', 'Comprehensive reporting on occupancy, revenue, and property performance.')
    },
    {
      icon: Shield,
      title: t('features.security.title', 'Enterprise Security'),
      description: t('features.security.description', 'Bank-level security with Supabase backend and encrypted data storage.')
    },
    {
      icon: Globe,
      title: t('features.global.title', 'Global Ready'),
      description: t('features.global.description', 'Multi-language support with automatic currency conversion and localization.')
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Managed' },
    { number: '50,000+', label: 'Happy Tenants' },
    { number: '$2M+', label: 'Rent Processed' },
    { number: '99.9%', label: 'Uptime' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Property Manager',
      company: 'Johnson Properties',
      content: 'Rent Control has transformed how we manage our 50+ properties. The automation saves us 20 hours per week.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Real Estate Investor',
      company: 'Chen Holdings',
      content: 'The Stripe integration and automated rent collection is a game-changer. Our cash flow is more predictable than ever.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Landlord',
      company: 'Independent',
      content: 'As a small landlord, I love how easy it is to communicate with tenants and track maintenance requests.',
      rating: 5
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
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rent Control
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {t('nav.features', 'Features')}
              </Link>
              <Link to="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {t('nav.pricing', 'Pricing')}
              </Link>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {t('nav.about', 'About')}
              </Link>
              <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                {t('nav.contact', 'Contact')}
              </Link>
              <LanguageSelector />
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {t('nav.signIn', 'Sign In')}
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                {t('nav.getStarted', 'Get Started')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <Link to="/features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  {t('nav.features', 'Features')}
                </Link>
                <Link to="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  {t('nav.pricing', 'Pricing')}
                </Link>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  {t('nav.about', 'About')}
                </Link>
                <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                  {t('nav.contact', 'Contact')}
                </Link>
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  {t('nav.signIn', 'Sign In')}
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg text-center"
                >
                  {t('nav.getStarted', 'Get Started')}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.title', 'Property Management Made Simple')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.subtitle', 'Streamline rent collection, tenant management, and property operations with our all-in-one platform. Built for landlords, loved by tenants.')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>{t('hero.cta.primary', 'Start Free Trial')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/demo"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-600"
              >
                {t('hero.cta.secondary', 'Watch Demo')}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center" variants={itemVariants}>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
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
              {t('features.title', 'Everything You Need to Manage Properties')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('features.subtitle', 'From tenant screening to rent collection, our platform handles every aspect of property management.')}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
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
              Trusted by Property Managers Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our customers have to say about Rent Control
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
            Ready to Transform Your Property Management?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of property owners who have simplified their rental business with Rent Control.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Start Your Free Trial
            </Link>
            <Link 
              to="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 shadow-lg"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">Rent Control</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Modern property management platform built for landlords, property managers, and tenants. 
                Simplify every part of the rental experience.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Appleton, Wisconsin, USA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@rent-control.net</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>9am–5pm CST, Mon–Fri</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
                <li><Link to="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Rent Control. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Powered by</span>
              <a 
                href="https://visnec.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center space-x-1"
              >
                <Heart className="w-4 h-4" />
                <span>Visnec</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

