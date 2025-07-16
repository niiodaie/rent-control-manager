import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, CheckCircle, Building2, Users, DollarSign } from 'lucide-react';
import { VideoModal } from './VideoModal';

export function Hero() {
  const { t } = useTranslation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleStartTrial = () => {
    window.location.href = '/signup';
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Building2 className="w-3 h-3 mr-1" />
                  {t('hero.trustedBy')}
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  {t('hero.title')}
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6" onClick={handleStartTrial}>
                  {t('hero.startTrial')}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" onClick={handleWatchDemo}>
                  <Play className="mr-2 h-5 w-5" />
                  {t('hero.watchDemo')}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('hero.noSetupFees')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('hero.cancelAnytime')}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {t('hero.globalSupport')}
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{t('dashboard.title')}</h3>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {t('dashboard.allSystemsActive')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('dashboard.properties')}</p>
                        <p className="text-2xl font-bold">247</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('dashboard.tenants')}</p>
                        <p className="text-2xl font-bold">1,429</p>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('dashboard.occupancy')}</p>
                        <p className="text-2xl font-bold">94.2%</p>
                      </div>
                      <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('dashboard.monthlyRevenue')}</p>
                        <p className="text-2xl font-bold">$847K</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('dashboard.liveUpdates')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
}

