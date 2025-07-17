import React from 'react';
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

const features = [
  {
    icon: Building2,
    title: 'Global Property Management',
    description: 'Manage properties across multiple countries with local compliance and currency support.',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    title: 'Multi-Language Tenant Portal',
    description: 'Tenants can access their portal in their preferred language with automatic translation.',
    color: 'text-green-600'
  },
  {
    icon: CreditCard,
    title: 'Global Payment Processing',
    description: 'Accept payments in 150+ currencies with automatic conversion and local payment methods.',
    color: 'text-purple-600'
  },
  {
    icon: FileText,
    title: 'Smart Lease Management',
    description: 'Digital contracts with e-signatures, automatic renewals, and local legal compliance.',
    color: 'text-orange-600'
  },
  {
    icon: Wrench,
    title: 'Maintenance Workflow',
    description: 'Streamlined maintenance requests with vendor management and progress tracking.',
    color: 'text-red-600'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights with multi-currency reporting and performance metrics.',
    color: 'text-indigo-600'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with GDPR compliance and data encryption worldwide.',
    color: 'text-emerald-600'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated reminders and scheduling across different time zones.',
    color: 'text-yellow-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Full-featured mobile apps for iOS and Android with offline capabilities.',
    color: 'text-pink-600'
  },
  {
    icon: Globe,
    title: 'Location Intelligence',
    description: 'Auto-detect user location and adapt interface to local regulations and customs.',
    color: 'text-cyan-600'
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Connect with 500+ third-party services and build custom integrations.',
    color: 'text-violet-600'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Global Support',
    description: 'Round-the-clock support in multiple languages with local expertise.',
    color: 'text-teal-600'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Manage Properties Globally
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need to efficiently manage 
            rental properties worldwide and create exceptional experiences for your tenants.
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
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors borderless">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

