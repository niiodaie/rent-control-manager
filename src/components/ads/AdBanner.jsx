import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export function AdBanner({ userPlan = 'free', onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAd, setCurrentAd] = useState(null);

  // Sample ads - in production these would come from an ad service or API
  const sampleAds = [
    {
      id: 1,
      type: 'internal',
      title: 'Upgrade to Professional',
      description: 'Get advanced features and remove ads with our Professional plan',
      cta: 'Upgrade Now',
      link: '/pricing',
      bgColor: 'bg-gradient-to-r from-blue-500 to-purple-600',
      textColor: 'text-white'
    },
    {
      id: 2,
      type: 'external',
      title: 'Property Insurance Made Simple',
      description: 'Protect your rental properties with comprehensive coverage',
      cta: 'Learn More',
      link: 'https://example-insurance.com',
      bgColor: 'bg-gradient-to-r from-green-500 to-teal-600',
      textColor: 'text-white'
    },
    {
      id: 3,
      type: 'internal',
      title: 'Join 10,000+ Property Managers',
      description: 'See why professionals choose Rent Control for their business',
      cta: 'Start Free Trial',
      link: '/signup',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-600',
      textColor: 'text-white'
    }
  ];

  useEffect(() => {
    // Only show ads for free users
    if (userPlan !== 'free') {
      setIsVisible(false);
      return;
    }

    // Randomly select an ad
    const randomAd = sampleAds[Math.floor(Math.random() * sampleAds.length)];
    setCurrentAd(randomAd);
  }, [userPlan]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleAdClick = () => {
    if (currentAd) {
      if (currentAd.type === 'external') {
        window.open(currentAd.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = currentAd.link;
      }
    }
  };

  // Don't render if user is not on free plan or ad is closed
  if (userPlan !== 'free' || !isVisible || !currentAd) {
    return null;
  }

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <Card className={`${currentAd.bgColor} ${currentAd.textColor} border-0 rounded-none`}>
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-sm">{currentAd.title}</h3>
                    <p className="text-xs opacity-90">{currentAd.description}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAdClick}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {currentAd.cta}
                    {currentAd.type === 'external' && (
                      <ExternalLink className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

