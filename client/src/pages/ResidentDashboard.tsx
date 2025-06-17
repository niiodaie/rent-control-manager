
import { useEffect, useState } from "react";
import { Home, MessageSquare, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResidentDashboard() {
  const [resident, setResident] = useState({ name: "Jane", unit: "3B", maintenance: 2, packages: 1 });

  useEffect(() => {
    // TODO: Fetch actual resident data from API
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-black px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Welcome */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Welcome back, {resident.name} 🏡</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Your unit: {resident.unit} — Here’s what’s happening today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{resident.packages}</p>
                <p className="text-slate-500 dark:text-slate-400">Packages waiting</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border dark:border-slate-700">
            <div className="flex items-center gap-4">
              <MessageSquare className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{resident.maintenance}</p>
                <p className="text-slate-500 dark:text-slate-400">Maintenance requests open</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 pt-6">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 text-lg font-semibold">
            Pay Rent
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 px-6 py-3 text-lg font-semibold">
            Submit Maintenance
          </Button>
          <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:underline">
            View Community Board
          </Button>
        </div>
      </div>
    </div>
  );
}
