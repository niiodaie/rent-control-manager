import React, { useState, useEffect } from 'react';
import { ExternalLink, Zap, Building, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export function AdFooter({ userPlan = 'free' }) {
  const [currentAd, setCurrentAd] = useState(null);

  // Sample footer ads - in production these would come from an ad service or API
  const footerAds = [
    {
      id: 1,
      type: 'internal',
      title: 'Ready to Scale Your Property Business?',
      description: 'Join thousands of property managers who trust Rent Control',
      cta: 'Start Free Trial',
      link: '/signup',
      icon: Building,
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600'
    },
    {
      id: 2,
      type: 'external',
      title: 'Professional Property Management Tools',
      description: 'Advanced software solutions for property professionals',
      cta: 'Explore Tools',
      link: 'https://example-tools.com',
      icon: Zap,
      bgColor: 'bg-gradient-to-r from-green-600 to-teal-600'
    },
    {
      id: 3,
      type: 'internal',
      title: 'Connect with Property Managers',
      description: 'Network with professionals in our community',
      cta: 'Join Community',
      link: '/contact',
      icon: Users,
      bgColor: 'bg-gradient-to-r from-orange-600 to-red-600'
    }
  ];

  useEffect(() => {
    // Only show ads for free users
    if (userPlan !== 'free') {
      return;
    }

    // Randomly select an ad
    const randomAd = footerAds[Math.floor(Math.random() * footerAds.length)];
    setCurrentAd(randomAd);
  }, [userPlan]);

  const handleAdClick = () => {
    if (currentAd) {
      if (currentAd.type === 'external') {
        window.open(currentAd.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = currentAd.link;
      }
    }
  };

  // Don't render if user is not on free plan
  if (userPlan !== 'free' || !currentAd) {
    return null;
  }

  const IconComponent = currentAd.icon;

  return (
    <div className="w-full py-8 border-t">
      <div className="container mx-auto px-4">
        <Card className={`${currentAd.bgColor} text-white border-0 overflow-hidden`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-center md:text-left">
                <div className="bg-white/20 p-3 rounded-full">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{currentAd.title}</h3>
                  <p className="text-white/90">{currentAd.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <Button
                  onClick={handleAdClick}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90"
                >
                  {currentAd.cta}
                  {currentAd.type === 'external' && (
                    <ExternalLink className="w-4 h-4 ml-2" />
                  )}
                </Button>
                <span className="text-xs text-white/70">
                  {currentAd.type === 'internal' ? 'Sponsored' : 'Advertisement'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

