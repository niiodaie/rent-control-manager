import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Crown, Zap } from 'lucide-react';

const AdBanner = ({ 
  position = 'top', 
  size = 'banner', 
  className = '',
  onUpgradeClick = null 
}) => {
  const { user } = useAuth();
  const adRef = useRef(null);
  const [showAd, setShowAd] = React.useState(false);
  const [adLoaded, setAdLoaded] = React.useState(false);

  // Check if user is on free plan
  const isFreePlan = user?.subscription?.plan === 'free' || !user?.subscription;

  useEffect(() => {
    // Only show ads for free plan users
    if (!isFreePlan) {
      setShowAd(false);
      return;
    }

    // Check if ads are enabled in environment
    const adsEnabled = process.env.REACT_APP_ENABLE_ADS === 'true';
    const adsenseClient = process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT;

    if (!adsEnabled || !adsenseClient) {
      // Show upgrade banner instead of ads
      setShowAd(true);
      return;
    }

    // Load Google AdSense script
    const loadAdSense = () => {
      if (window.adsbygoogle) {
        setAdLoaded(true);
        setShowAd(true);
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', adsenseClient);
      
      script.onload = () => {
        setAdLoaded(true);
        setShowAd(true);
      };

      script.onerror = () => {
        console.warn('Failed to load Google AdSense');
        setShowAd(true); // Show upgrade banner instead
      };

      document.head.appendChild(script);
    };

    loadAdSense();
  }, [isFreePlan]);

  useEffect(() => {
    if (adLoaded && adRef.current && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('AdSense error:', error);
      }
    }
  }, [adLoaded, showAd]);

  const handleUpgrade = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      window.location.href = '/pricing';
    }
  };

  const getAdSize = () => {
    switch (size) {
      case 'banner':
        return { width: '728', height: '90' };
      case 'rectangle':
        return { width: '300', height: '250' };
      case 'leaderboard':
        return { width: '970', height: '90' };
      case 'mobile-banner':
        return { width: '320', height: '50' };
      default:
        return { width: '728', height: '90' };
    }
  };

  const getAdSlot = () => {
    // These would be your actual AdSense ad unit IDs
    switch (size) {
      case 'banner':
        return '1234567890';
      case 'rectangle':
        return '1234567891';
      case 'leaderboard':
        return '1234567892';
      case 'mobile-banner':
        return '1234567893';
      default:
        return '1234567890';
    }
  };

  // Don't show anything for paid plans
  if (!isFreePlan || !showAd) {
    return null;
  }

  const adSize = getAdSize();
  const adsenseClient = process.env.REACT_APP_GOOGLE_ADSENSE_CLIENT;
  const adsEnabled = process.env.REACT_APP_ENABLE_ADS === 'true';

  return (
    <div className={`w-full ${className}`}>
      {adsEnabled && adsenseClient && adLoaded ? (
        // Google AdSense Ad
        <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                Advertisement
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUpgrade}
                className="text-xs"
              >
                <Crown className="h-3 w-3 mr-1" />
                Remove Ads
              </Button>
            </div>
            <div className="flex justify-center">
              <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                  display: 'inline-block',
                  width: `${adSize.width}px`,
                  height: `${adSize.height}px`
                }}
                data-ad-client={adsenseClient}
                data-ad-slot={getAdSlot()}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        // Upgrade Banner (fallback when ads are disabled or failed to load)
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Crown className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    Remove ads and unlock advanced features for just $49.99/month
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpgrade}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Upgrade Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Specific ad components for different positions
export const TopAdBanner = (props) => (
  <AdBanner position="top" size="leaderboard" {...props} />
);

export const SidebarAdBanner = (props) => (
  <AdBanner position="sidebar" size="rectangle" {...props} />
);

export const MobileAdBanner = (props) => (
  <AdBanner position="mobile" size="mobile-banner" {...props} />
);

export const BottomAdBanner = (props) => (
  <AdBanner position="bottom" size="banner" {...props} />
);

export default AdBanner;

