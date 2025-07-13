import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Building2, 
  Users, 
  CreditCard, 
  FileText, 
  Wrench, 
  BarChart3, 
  Shield, 
  Calendar,
  Smartphone,
  Globe,
  Zap,
  HeadphonesIcon
} from 'lucide-react';

export function Features() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Building2,
      title: t('features.globalProperty'),
      description: t('features.globalPropertyDesc'),
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: t('features.multiLanguage'),
      description: t('features.multiLanguageDesc'),
      color: 'text-green-600'
    },
    {
      icon: CreditCard,
      title: t('features.globalPayment'),
      description: t('features.globalPaymentDesc'),
      color: 'text-purple-600'
    },
    {
      icon: FileText,
      title: t('features.smartLease'),
      description: t('features.smartLeaseDesc'),
      color: 'text-orange-600'
    },
    {
      icon: Wrench,
      title: t('features.maintenance'),
      description: t('features.maintenanceDesc'),
      color: 'text-red-600'
    },
    {
      icon: BarChart3,
      title: t('features.analytics'),
      description: t('features.analyticsDesc'),
      color: 'text-indigo-600'
    },
    {
      icon: Shield,
      title: t('features.security'),
      description: t('features.securityDesc'),
      color: 'text-emerald-600'
    },
    {
      icon: Calendar,
      title: t('features.scheduling'),
      description: t('features.schedulingDesc'),
      color: 'text-yellow-600'
    },
    {
      icon: Smartphone,
      title: t('features.mobile'),
      description: t('features.mobileDesc'),
      color: 'text-pink-600'
    },
    {
      icon: Globe,
      title: t('features.location'),
      description: t('features.locationDesc'),
      color: 'text-cyan-600'
    },
    {
      icon: Zap,
      title: t('features.api'),
      description: t('features.apiDesc'),
      color: 'text-violet-600'
    },
    {
      icon: HeadphonesIcon,
      title: t('features.support'),
      description: t('features.supportDesc'),
      color: 'text-teal-600'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="feature-card group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Global Property Management?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of property managers who have streamlined their operations 
              and increased their revenue with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => navigate('/signup')}
              >
                {t('hero.startTrial')}
              </button>
              <button 
                className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors borderless"
                onClick={() => {
                  // TODO: Open demo modal
                  console.log('Schedule demo clicked');
                }}
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

