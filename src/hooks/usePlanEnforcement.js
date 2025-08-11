import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { checkPlanLimit, getPlanLimits } from '../config/plans';

export const usePlanEnforcement = () => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState('free');
  const [usage, setUsage] = useState({
    properties: 0,
    units: 0,
    admins: 1
  });
  const [loading, setLoading] = useState(true);

  // Load user's current plan and usage
  useEffect(() => {
    const loadPlanData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // In real implementation, this would fetch from Supabase
        // For now, we'll use mock data
        const mockSubscription = {
          plan_key: 'free', // This would come from the subscriptions table
          usage: {
            properties: 0,
            units: 0,
            admins: 1
          }
        };

        setCurrentPlan(mockSubscription.plan_key);
        setUsage(mockSubscription.usage);
      } catch (error) {
        console.error('Error loading plan data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlanData();
  }, [user]);

  // Check if user can perform an action based on plan limits
  const canPerformAction = useCallback((actionType, additionalCount = 1) => {
    const currentCount = usage[actionType] || 0;
    return checkPlanLimit(currentPlan, actionType, currentCount + additionalCount);
  }, [currentPlan, usage]);

  // Get current plan limits
  const planLimits = getPlanLimits(currentPlan);

  // Check specific limits
  const canAddProperty = useCallback(() => {
    return canPerformAction('properties');
  }, [canPerformAction]);

  const canAddUnit = useCallback((propertyId) => {
    // In real implementation, this would check units per specific property
    return canPerformAction('units');
  }, [canPerformAction]);

  const canAddAdmin = useCallback(() => {
    return canPerformAction('admins');
  }, [canPerformAction]);

  // Get usage percentage for a specific limit
  const getUsagePercentage = useCallback((limitType) => {
    const limit = planLimits[limitType];
    const current = usage[limitType] || 0;
    
    if (limit === 'unlimited') return 0;
    if (typeof limit !== 'number') return 0;
    
    return Math.min((current / limit) * 100, 100);
  }, [planLimits, usage]);

  // Check if approaching limit (80% or more)
  const isApproachingLimit = useCallback((limitType) => {
    return getUsagePercentage(limitType) >= 80;
  }, [getUsagePercentage]);

  // Check if at limit
  const isAtLimit = useCallback((limitType) => {
    const limit = planLimits[limitType];
    const current = usage[limitType] || 0;
    
    if (limit === 'unlimited') return false;
    if (typeof limit !== 'number') return false;
    
    return current >= limit;
  }, [planLimits, usage]);

  // Update usage (would typically sync with backend)
  const updateUsage = useCallback((newUsage) => {
    setUsage(prev => ({ ...prev, ...newUsage }));
  }, []);

  // Simulate incrementing usage
  const incrementUsage = useCallback((type, amount = 1) => {
    setUsage(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + amount
    }));
  }, []);

  // Get upgrade suggestions based on current usage
  const getUpgradeSuggestions = useCallback(() => {
    const suggestions = [];
    
    if (isAtLimit('properties')) {
      suggestions.push({
        type: 'properties',
        message: `You've reached your limit of ${planLimits.properties} properties`,
        action: 'Upgrade to add more properties'
      });
    }
    
    if (isAtLimit('units')) {
      suggestions.push({
        type: 'units',
        message: `You've reached your limit of ${planLimits.unitsPerProperty} units per property`,
        action: 'Upgrade for unlimited units'
      });
    }
    
    if (isAtLimit('admins')) {
      suggestions.push({
        type: 'admins',
        message: `You've reached your limit of ${planLimits.admins} admin users`,
        action: 'Upgrade to add more team members'
      });
    }
    
    return suggestions;
  }, [isAtLimit, planLimits]);

  return {
    // Current state
    currentPlan,
    usage,
    planLimits,
    loading,
    
    // Limit checking
    canAddProperty,
    canAddUnit,
    canAddAdmin,
    canPerformAction,
    
    // Usage analytics
    getUsagePercentage,
    isApproachingLimit,
    isAtLimit,
    
    // Usage management
    updateUsage,
    incrementUsage,
    
    // Upgrade guidance
    getUpgradeSuggestions
  };
};

export default usePlanEnforcement;

