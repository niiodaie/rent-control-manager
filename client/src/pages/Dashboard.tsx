
import { useEffect, useState } from "react";
import { Building, Users, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [landlord, setLandlord] = useState({ name: "John", properties: 12, tenants: 38, revenue: "$17,800" });

  useEffect(() => {
    // TODO: Fetch actual landlord data from API
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-black px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Welcome back, {landlord.name} 👋</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Here’s a quick overview of your properties.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{landlord.properties}</p>
                <p className="text-slate-500 dark:text-slate-400">Properties</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{landlord.tenants}</p>
                <p className="text-slate-500 dark:text-slate-400">Active Tenants</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{landlord.revenue}</p>
                <p className="text-slate-500 dark:text-slate-400">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 text-lg font-semibold">
            Invite New Tenant <ArrowRight className="ml-2" />
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 px-6 py-3 text-lg font-semibold">
            View Applications
          </Button>
        </div>
      </div>
    </div>
  );
}
