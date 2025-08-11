// src/config/plans.js

/** @typedef {"free"|"starter"|"pro"|"enterprise"} PlanKey */
/** @typedef {"monthly"|"yearly"} Interval */

export const PLANS = {
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
    monthly: 99.99,      // <-- corrected from 129.99
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
    limits: { properties: "unlimited", unitsPerProperty: "unlimited", admins: "unlimited", ads: false, support: "sla", analytics: "advanced" },
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
    limits: { properties: "unlimited", unitsPerProperty: "unlimited", admins: "unlimited", ads: false, support: "dedicated", analytics: "enterprise" },
    popular: false,
    cta: "Contact Sales",
  },
};

/** @param {number|string} v */
export const fmtMoney = (v) =>
  typeof v === "number"
    ? v === 0
      ? "$0"
      : v.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 2 })
    : v;

/** @param {PlanKey} planKey @param {Interval} interval */
export const getDisplayPrice = (planKey, interval) => {
  const p = PLANS[planKey];
  return interval === "yearly" ? p.yearly : p.monthly;
};

/** @param {PlanKey} planKey @param {Interval} interval */
export const getLookupKey = (planKey, interval) => {
  const p = PLANS[planKey];
  return interval === "yearly" ? p.yearlyLookupKey : p.lookupKey;
};

/** @param {PlanKey} planKey */
export const getPlanLimits = (planKey) => PLANS[planKey].limits;

/** @param {PlanKey} planKey @param {"properties"|"unitsPerProperty"|"admins"} limitType @param {number} currentCount */
export const checkPlanLimit = (planKey, limitType, currentCount) => {
  const limit = getPlanLimits(planKey)[limitType];
  if (limit === "unlimited") return true;
  return currentCount < limit;
};
