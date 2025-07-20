import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle } from 'lucide-react';
import { t, getCurrentLanguage } from '../i18n/simple';

export function Hero() {
  const [currentLang, setCurrentLang] = React.useState('en');

  // Update language when it changes
  React.useEffect(() => {
    const updateLanguage = () => {
      setCurrentLang(getCurrentLanguage());
    };
    
    updateLanguage();
    
    // Listen for language changes
    const handleStorageChange = (e) => {
      if (e.key === 'preferred-language') {
        updateLanguage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative">
        {/* Trust Badge */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            <span>Trusted by 10,000+ Property Managers Globally</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                <span className="block">Global Property</span>
                <span className="block text-primary">Management</span>
                <span className="block">Made Simple</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t('hero.subtitle', currentLang)}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>{t('hero.cta.trial', currentLang)}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border border-border hover:bg-muted px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>{t('hero.cta.demo', currentLang)}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 global support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-card border rounded-xl shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-muted/50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Property Dashboard</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">All Systems Active</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-muted-foreground">Properties</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">1,856</div>
                    <div className="text-sm text-muted-foreground">Tenants</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-muted-foreground">Occupancy</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Sunset Apartments</div>
                      <div className="text-sm text-muted-foreground">Rent collected</div>
                    </div>
                    <div className="text-green-600 font-semibold">$12,500</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Downtown Lofts</div>
                      <div className="text-sm text-muted-foreground">Maintenance completed</div>
                    </div>
                    <div className="text-blue-600 font-semibold">$8,750</div>
                  </div>
                </div>

                {/* Live Updates Indicator */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Live Updates</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-medium">Monthly Revenue</span>
                    <span className="text-green-600">+23.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              ✨ Live Demo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

