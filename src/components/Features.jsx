import React from 'react';
import { useTranslation } from 'react-i18next';
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
      color: 'text-pink-600'
    },
    {
      icon: Smartphone,
      title: t('features.mobile'),
      description: t('features.mobileDesc'),
      color: 'text-cyan-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

