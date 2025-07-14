import React, { useState, useEffect } from 'react';
import { ExternalLink, Star, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function AdSidebar({ userPlan = 'free', className = '' }) {
  const [currentAd, setCurrentAd] = useState(null);

  // Sample sidebar ads - in production these would come from an ad service or API
  const sidebarAds = [
    {
      id: 1,
      type: 'internal',
      title: 'Upgrade to Professional',
      description: 'Unlock advanced features and manage up to 10 properties',
      features: ['Advanced Analytics', 'Priority Support', 'Custom Branding'],
      cta: 'Start Free Trial',
      link: '/pricing',
      icon: TrendingUp,
      badge: 'Most Popular',
      price: '$49.99/mo'
    },
    {
      id: 2,
      type: 'external',
      title: 'Property Insurance',
      description: 'Comprehensive coverage for rental properties',
      features: ['Liability Protection', '24/7 Claims Support', 'Competitive Rates'],
      cta: 'Get Quote',
      link: 'https://example-insurance.com',
      icon: Shield,
      badge: 'Recommended',
      price: 'From $25/mo'
    },
    {
      id: 3,
      type: 'internal',
      title: 'Premium Features',
      description: 'Everything you need for large property portfolios',
      features: ['Unlimited Properties', 'White-label Solution', 'API Access'],
      cta: 'Learn More',
      link: '/pricing',
      icon: Star,
      badge: 'Enterprise',
      price: '$99.99/mo'
    }
  ];

  useEffect(() => {
    // Only show ads for free users
    if (userPlan !== 'free') {
      return;
    }

    // Randomly select an ad
    const randomAd = sidebarAds[Math.floor(Math.random() * sidebarAds.length)];
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
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent className="w-5 h-5 text-primary" />
            <Badge variant="secondary" className="text-xs">
              {currentAd.badge}
            </Badge>
          </div>
          <span className="text-sm font-semibold text-primary">
            {currentAd.price}
          </span>
        </div>
        <CardTitle className="text-lg">{currentAd.title}</CardTitle>
        <CardDescription className="text-sm">
          {currentAd.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-2 mb-4">
          {currentAd.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={handleAdClick}
          className="w-full"
          size="sm"
        >
          {currentAd.cta}
          {currentAd.type === 'external' && (
            <ExternalLink className="w-3 h-3 ml-1" />
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {currentAd.type === 'internal' ? 'Sponsored' : 'Advertisement'}
        </p>
      </CardContent>
    </Card>
  );
}

