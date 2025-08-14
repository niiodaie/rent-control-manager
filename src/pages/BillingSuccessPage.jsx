import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const formatMoney = (amountCents, currency = "usd") => {
  if (typeof amountCents !== "number") return "";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amountCents / 100);
};

const BillingSuccessPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user } = useAuth();

  const sessionId = useMemo(() => params.get("session_id"), [params]);

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  // Auto-redirect countdown for logged-in users
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    let tick;
    let redirect;
    if (user) {
      tick = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
      redirect = setTimeout(() => navigate("/admin/dashboard"), 5000);
    }
    return () => {
      if (tick) clearInterval(tick);
      if (redirect) clearTimeout(redirect);
    };
  }, [user, navigate]);

  useEffect(() => {
    const run = async () => {
      if (!sessionId) {
        setLoading(false);
        setError("Missing checkout session id.");
        return;
      }
      try {
        const res = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) {
          const { error: e } = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          throw new Error(e || `HTTP ${res.status}`);
        }
        const json = await res.json();
        setSession(json);
        setLoading(false);
      } catch (err) {
        console.error("Fetch session failed:", err);
        setError("We couldn’t verify your payment. If this continues, please contact support.");
        setLoading(false);
      }
    };
    run();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful</h1>

        {loading && (
          <p className="text-gray-600 dark:text-gray-300 mb-6">Confirming your subscription…</p>
        )}

        {!loading && error && (
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
        )}

        {!loading && !error && session && (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your subscription has been updated. You now have access to your new plan’s features.
            </p>

            {session.plan && (
              <div className="mb-6 text-sm text-left bg-gray-50 dark:bg-gray-900 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Plan</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {session.plan.product_name || "Subscription"}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Interval</span>
                  <span className="font-medium capitalize text-gray-900 dark:text-white">
                    {session.plan.interval || "monthly"}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Amount</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatMoney(session.amount_total ?? session.plan.unit_amount, session.currency)}
                  </span>
                </div>
                {session.customer_email && (
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600 dark:text-gray-300">Receipt Email</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {session.customer_email}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Primary actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/billing")}
            className="w-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Manage Billing
          </button>
        </div>

        {/* Auto-redirect hint (only when logged in) */}
        {user && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            You’ll be redirected to your dashboard in {seconds}s.
          </p>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          If you believe this is an error,{" "}
          <a href="/contact" className="text-blue-600 hover:underline">contact support</a>.
        </p>
      </div>
    </div>
  );
};

export default BillingSuccessPage;
