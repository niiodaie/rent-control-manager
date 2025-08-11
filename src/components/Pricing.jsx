import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Star, ArrowRight } from "lucide-react";
import { getCurrentLanguage } from "../i18n/simple"; // keep if you use it
import { PLANS, fmtMoney, getDisplayPrice } from "@/config/plans"; // <-- new

export function Pricing() {
  const [currentLang, setCurrentLang] = useState("en");
  const [interval, setInterval] = useState("monthly"); // "monthly" | "yearly"
  const navigate = useNavigate();

  useEffect(() => {
    const updateLanguage = () => setCurrentLang(getCurrentLanguage());
    updateLanguage();
    const handleStorageChange = (e) => {
      if (e.key === "preferred-language") updateLanguage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Use the single source of truth
  const planKeys = ["free", "starter", "pro", "enterprise"];

  const go = (key) => {
    if (key === "enterprise") {
      navigate("/contact");
      return;
    }
    if (key === "free") {
      navigate("/choose-plan?highlight=free");
      return;
    }
    // Paid plans go to the unified paywall with preselected interval
    navigate(`/choose-plan?highlight=${key}&interval=${interval}`);
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Global Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your property management needs. All plans include a 14‑day free trial with no credit card required.
          </p>
        </div>

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            className={`px-3 py-1 rounded ${interval === "monthly" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "border"}`}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded ${interval === "yearly" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "border"}`}
            onClick={() => setInterval("yearly")}
          >
            Yearly <span className="ml-1 text-green-600">Save 20%</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {planKeys.map((key) => {
            const plan = PLANS[key];
            const price = getDisplayPrice(key, interval); // reads monthly/yearly from config
            const isPopular = !!plan.popular;

            return (
              <div
                key={key}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 ${
                  isPopular ? "ring-2 ring-blue-500 scale-105" : "hover:shadow-xl transition-shadow"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {fmtMoney(price)}
                    </span>
                    {key !== "enterprise" && (
                      <span className="text-gray-500 dark:text-gray-400">/{interval === "monthly" ? "month" : "year"}</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {key === "free"
                      ? "Perfect for getting started with basic property management"
                      : key === "starter"
                      ? "Ideal for small property managers"
                      : key === "pro"
                      ? "Perfect for growing property management businesses"
                      : "For large‑scale property management companies"}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => go(key)}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isPopular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14‑day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
