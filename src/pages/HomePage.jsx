import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { AdBanner } from '../components/ads/AdBanner';
import { AdSidebar } from '../components/ads/AdSidebar';
import { AdFooter } from '../components/ads/AdFooter';
import { useUserPlan } from '../hooks/useUserPlan';
import SEOHead from '../components/SEOHead';

export function HomePage() {
  const { isFreePlan } = useUserPlan();

  return (
    <>
      <SEOHead
        title="Rent Control - Global Property Management Platform"
        description="Professional property management platform for landlords and tenants worldwide. Manage properties, collect rent, and streamline operations globally with multi-currency support."
        keywords="property management, rent collection, landlord software, tenant portal, global property management, multi-currency rent, property analytics"
        ogImage="https://rentcontrol.net/og-image.jpg"
      />
      
      <div className="min-h-screen">
        {isFreePlan && <AdBanner />}
        
        <div className="flex">
          <div className="flex-1">
            <Hero />
            <Features />
            <Pricing />
          </div>
          
          {isFreePlan && (
            <div className="hidden lg:block w-80">
              <AdSidebar />
            </div>
          )}
        </div>
        
        {isFreePlan && <AdFooter />}
      </div>
    </>
  );
}

