// src/config/plans.ts
export type PlanKey = "free" | "starter" | "pro" | "enterprise";
type Interval = "monthly" | "yearly";

export const PLANS: Record<PlanKey, any> = {
  free: {
    id: "free",
    name: "Free",
    monthly: 0,
    yearly: 0,
    lookupKey: null,
    yearlyLookupKey: null,
    features: [
      "Up to 1 property unit",
      "Basic tenant management",
      "Payment tracking",
      "Email support",
      "Mobile app access",
      "Includes ads",
    ],
    limits: { properties: 1, unitsPerProperty: 5, admins: 1, ads: true, support: "email" },
    popular: false,
    cta: "Start Free",
  },

  starter: {
    id: "starter",
    name: "Starter",
    monthly: 49.99,
    yearly: 499.99,
    lookupKey: "plan_starter_monthly_v1",
    yearlyLookupKey: "plan_starter_yearly_v1",
    features: [
      "Up to 5 property units",
      "Advanced tenant portal",
      "Automated rent collection",
      "Maintenance management",
      "Financial reporting",
      "Priority support",
      "No ads",
    ],
    limits: { properties: 5, unitsPerProperty: 20, admins: 2, ads: false, support: "priority" },
    popular: true,
    cta: "Start Free Trial",
  },

  pro: {
    id: "pro",
    name: "Professional",
    monthly: 99.99,        // ✅ was 129.99 — corrected to $99.99
    yearly: 999.99,
    lookupKey: "plan_pro_monthly_v1",
    yearlyLookupKey: "plan_pro_yearly_v1",
    features: [
      "Unlimited property units",
      "Advanced analytics",
      "Multi-language support",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Advanced integrations",
    ],
    limits: {
      properties: "unlimited",
      unitsPerProperty: "unlimited",
      admins: "unlimited",
      ads: false,
      support: "sla",
      analytics: "advanced",
    },
    popular: false,
    cta: "Start Free Trial",
  },

  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    monthly: "Custom",
    yearly: "Custom",
    lookupKey: null,
    yearlyLookupKey: null,
    features: [
      "Unlimited property units",
      "White-label solution",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics",
      "24/7 phone support",
      "Custom training",
    ],
    limits: {
      properties: "unlimited",
      unitsPerProperty: "unlimited",
      admins: "unlimited",
      ads: false,
      support: "dedicated",
      analytics: "enterprise",
    },
    popular: false,
    cta: "Contact Sales",
  },
};

export const fmtMoney = (v: number | string) =>
  typeof v === "number"
    ? v === 0
      ? "$0"
      : v.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2 })
    : v;

export const getDisplayPrice = (planKey: PlanKey, interval: Interval) => {
  const p = PLANS[planKey];
  return interval === "yearly" ? p.yearly : p.monthly;
};

export const getLookupKey = (planKey: PlanKey, interval: Interval) => {
  const p = PLANS[planKey];
  return interval === "yearly" ? p.yearlyLookupKey : p.lookupKey;
};

export const getPlanLimits = (planKey: PlanKey) => PLANS[planKey].limits;

export const checkPlanLimit = (
  planKey: PlanKey,
  limitType: keyof typeof PLANS.free.limits,
  currentCount: number
) => {
  const limit = getPlanLimits(planKey)[limitType] as number | "unlimited";
  if (limit === "unlimited") return true;
  return currentCount < limit;
};
// Plan configuration for Stripe billing integration
export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    lookupKey: null,
    features: [
      'Up to 1 property unit',
      'Basic tenant management',
      'Payment tracking',
      'Email support',
      'Mobile app access',
      'Includes ads'
    ],
    limits: {
      properties: 1,
      unitsPerProperty: 5,
      admins: 1,
      ads: true,
      support: 'email'
    },
    popular: false,
    cta: 'Start Free'
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 49.99,
    interval: 'month',
    lookupKey: 'plan_starter_monthly_v1',
    yearlyLookupKey: 'plan_starter_yearly_v1',
    features: [
      'Up to 5 property units',
      'Advanced tenant portal',
      'Automated rent collection',
      'Maintenance management',
      'Financial reporting',
      'Priority support',
      'No ads'
    ],
    limits: {
      properties: 5,
      unitsPerProperty: 20,
      admins: 2,
      ads: false,
      support: 'priority'
    },
    popular: true,
    cta: 'Start Free Trial'
  },
  pro: {
    id: 'pro',
    name: 'Professional',
    price: 129.99,
    interval: 'month',
    lookupKey: 'plan_pro_monthly_v1',
    yearlyLookupKey: 'plan_pro_yearly_v1',
    features: [
      'Unlimited property units',
      'Advanced analytics',
      'Multi-language support',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Advanced integrations'
    ],
    limits: {
      properties: 'unlimited',
      unitsPerProperty: 'unlimited',
      admins: 'unlimited',
      ads: false,
      support: 'sla',
      analytics: 'advanced'
    },
    popular: false,
    cta: 'Start Free Trial'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    interval: 'month',
    lookupKey: null,
    features: [
      'Unlimited property units',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics',
      '24/7 phone support',
      'Custom training'
    ],
    limits: {
      properties: 'unlimited',
      unitsPerProperty: 'unlimited',
      admins: 'unlimited',
      ads: false,
      support: 'dedicated',
      analytics: 'enterprise'
    },
    popular: false,
    cta: 'Contact Sales'
  }
};

export const getPlanByKey = (planKey) => {
  return PLANS[planKey] || PLANS.free;
};

export const getPlanLimits = (planKey) => {
  const plan = getPlanByKey(planKey);
  return plan.limits;
};

export const checkPlanLimit = (planKey, limitType, currentCount) => {
  const limits = getPlanLimits(planKey);
  const limit = limits[limitType];
  
  if (limit === 'unlimited') return true;
  if (typeof limit === 'number') return currentCount < limit;
  
  return false;
};

