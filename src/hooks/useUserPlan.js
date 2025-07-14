import { useState, useEffect } from 'react';

// Mock user plan detection - in production this would integrate with your auth system
export function useUserPlan() {
  const [userPlan, setUserPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate checking user authentication and plan
    const checkUserPlan = async () => {
      try {
        // In production, this would be an API call to your backend
        // For now, we'll simulate different scenarios
        
        // Check if user is logged in (you can integrate with your auth system)
        const isLoggedIn = localStorage.getItem('user_token') || false;
        
        if (!isLoggedIn) {
          // Not logged in = free user (show ads)
          setUserPlan('free');
          setUser(null);
        } else {
          // Simulate getting user data from API
          const userData = {
            id: '123',
            email: 'user@example.com',
            name: 'John Doe',
            plan: 'free', // This would come from your database
            subscription: {
              status: 'active',
              trial_end: null,
              current_period_end: null
            }
          };
          
          setUser(userData);
          setUserPlan(userData.plan);
        }
      } catch (error) {
        console.error('Error checking user plan:', error);
        // Default to free on error (show ads)
        setUserPlan('free');
      } finally {
        setLoading(false);
      }
    };

    checkUserPlan();
  }, []);

  // Function to update user plan (useful after subscription changes)
  const updateUserPlan = (newPlan) => {
    setUserPlan(newPlan);
    if (user) {
      setUser({ ...user, plan: newPlan });
    }
  };

  // Check if user should see ads
  const shouldShowAds = userPlan === 'free';

  // Check if user is on a paid plan
  const isPaidUser = ['professional', 'premium', 'enterprise'].includes(userPlan);

  return {
    userPlan,
    user,
    loading,
    shouldShowAds,
    isPaidUser,
    updateUserPlan
  };
}

// Helper function to determine ad frequency based on plan
export function getAdConfig(userPlan) {
  switch (userPlan) {
    case 'free':
      return {
        showBanner: true,
        showSidebar: true,
        showFooter: true,
        maxAdsPerPage: 2
      };
    case 'professional':
    case 'premium':
    case 'enterprise':
      return {
        showBanner: false,
        showSidebar: false,
        showFooter: false,
        maxAdsPerPage: 0
      };
    default:
      return {
        showBanner: true,
        showSidebar: true,
        showFooter: true,
        maxAdsPerPage: 2
      };
  }
}

