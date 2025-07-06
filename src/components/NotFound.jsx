import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rent Control
            </span>
          </Link>
        </motion.div>

        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title', 'Page Not Found')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('notFound.description', 'Sorry, the page you are looking for doesn\'t exist or has been moved.')}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg w-full"
          >
            <Home className="w-5 h-5" />
            <span>{t('notFound.goHome', 'Go Back Home')}</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-600 w-full"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('notFound.goBack', 'Go Back')}</span>
          </button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            {t('notFound.help', 'Need help? ')}
            <Link to="/contact" className="text-blue-600 hover:text-blue-700 underline">
              {t('notFound.contact', 'Contact us')}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

