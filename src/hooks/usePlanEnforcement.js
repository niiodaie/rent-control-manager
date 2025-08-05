import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const usePlanEnforcement = () => {
  const { user, updateUserPlan } = useAuth();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planModalTrigger, setPlanModalTrigger] = useState(null);

  // Check if user can perform an action based on their current plan
  const checkPlanLimits = useCallback((action, currentData = {}) => {
    if (!user) return false;

    const currentPlan = user.plan || 'free';
    const planLimits = {
      free: {
        properties: 1,
        tenants: 0,
        canInviteTenants: false
      },
      pro: {
        properties: 5,
        tenants: Infinity,
        canInviteTenants: true
      },
      business: {
        properties: Infinity,
        tenants: Infinity,
        canInviteTenants: true
      }
    };

    const limits = planLimits[currentPlan];
    
    switch (action) {
      case 'add_property':
        const currentProperties = currentData.propertyCount || 0;
        if (currentProperties >= limits.properties) {
          setPlanModalTrigger('second_property');
          setShowPlanModal(true);
          return false;
        }
        return true;

      case 'invite_tenant':
        if (!limits.canInviteTenants) {
          setPlanModalTrigger('invite_tenant');
          setShowPlanModal(true);
          return false;
        }
        return true;

      case 'add_tenant':
        const currentTenants = currentData.tenantCount || 0;
        if (currentTenants >= limits.tenants) {
          setPlanModalTrigger('tenant_limit');
          setShowPlanModal(true);
          return false;
        }
        return true;

      default:
        return true;
    }
  }, [user]);

  // Handle plan upgrade
  const handlePlanUpgrade = useCallback(async (selectedPlan) => {
    try {
      // In a real implementation, this would:
      // 1. Create Stripe checkout session
      // 2. Redirect to Stripe
      // 3. Handle webhook to update user plan
      
      // For demo purposes, we'll simulate the upgrade
      console.log(`Upgrading to ${selectedPlan} plan...`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user plan in context/database
      await updateUserPlan(selectedPlan);
      
      // Close modal
      setShowPlanModal(false);
      setPlanModalTrigger(null);
      
      return true;
    } catch (error) {
      console.error('Plan upgrade failed:', error);
      throw error;
    }
  }, [updateUserPlan]);

  // Get current plan information
  const getCurrentPlanInfo = useCallback(() => {
    if (!user) return null;

    const currentPlan = user.plan || 'free';
    const planInfo = {
      free: {
        name: 'Free',
        price: 0,
        properties: 1,
        tenants: 0,
        features: ['1 property', 'Basic features', 'Email support']
      },
      pro: {
        name: 'Pro',
        price: 49.99,
        properties: 5,
        tenants: Infinity,
        features: ['Up to 5 properties', 'Unlimited tenants', 'Advanced features', 'Priority support']
      },
      business: {
        name: 'Business',
        price: 99.99,
        properties: Infinity,
        tenants: Infinity,
        features: ['Unlimited properties', 'Unlimited tenants', 'All features', 'Dedicated support']
      }
    };

    return planInfo[currentPlan];
  }, [user]);

  // Check if user needs to upgrade for a specific feature
  const needsUpgradeFor = useCallback((feature) => {
    if (!user) return true;

    const currentPlan = user.plan || 'free';
    
    const featureRequirements = {
      'multiple_properties': ['pro', 'business'],
      'tenant_invites': ['pro', 'business'],
      'advanced_analytics': ['business'],
      'api_access': ['business'],
      'white_label': ['business']
    };

    const requiredPlans = featureRequirements[feature];
    return requiredPlans && !requiredPlans.includes(currentPlan);
  }, [user]);

  return {
    // State
    showPlanModal,
    planModalTrigger,
    
    // Actions
    checkPlanLimits,
    handlePlanUpgrade,
    setShowPlanModal,
    
    // Getters
    getCurrentPlanInfo,
    needsUpgradeFor,
    
    // Computed
    currentPlan: user?.plan || 'free',
    isFreePlan: !user?.plan || user.plan === 'free',
    isPaidPlan: user?.plan && user.plan !== 'free'
  };
};

export default usePlanEnforcement;

