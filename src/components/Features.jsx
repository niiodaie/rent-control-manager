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
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  {
    icon: Users,
    title: 'Multi-Language Tenant Portal',
    description: 'Tenants can access their portal in their preferred language with automatic translation.',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    icon: CreditCard,
    title: 'Global Payment Processing',
    description: 'Accept payments in 150+ currencies with automatic conversion and local payment methods.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    icon: FileText,
    title: 'Smart Lease Management',
    description: 'Digital contracts with e-signatures, automatic renewals, and local legal compliance.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  {
    icon: Wrench,
    title: 'Maintenance Workflow',
    description: 'Streamlined maintenance requests with vendor management and progress tracking.',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive insights with multi-currency reporting and performance metrics.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with GDPR compliance and data encryption worldwide.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Automated reminders and scheduling across different time zones.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Full-featured mobile apps for iOS and Android with offline capabilities.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800'
  },
  {
    icon: Globe,
    title: 'Location Intelligence',
    description: 'Auto-detect user location and adapt interface to local regulations and customs.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    borderColor: 'border-cyan-200 dark:border-cyan-800'
  },
  {
    icon: Zap,
    title: 'API Integration',
    description: 'Connect with 500+ third-party services and build custom integrations.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    borderColor: 'border-violet-200 dark:border-violet-800'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Global Support',
    description: 'Round-the-clock support in multiple languages with local expertise.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    borderColor: 'border-teal-200 dark:border-teal-800'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 rounded-full border-0">
            ✨ Comprehensive Platform
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600">
              Manage Properties Globally
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools you need to efficiently manage 
            rental properties worldwide and create exceptional experiences for your tenants.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                    <IconComponent className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-3xl"></div>
          
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-8 lg:p-16 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            
            <div className="relative text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Global Property Management?
              </h3>
              <p className="text-lg sm:text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of property managers who have streamlined their operations 
                and increased their revenue with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Start Free Trial
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40">
                  Schedule Demo
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mt-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

