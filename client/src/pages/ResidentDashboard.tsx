import { useEffect, useState } from "react";

export default function ResidentDashboard() {
  const [residentName, setResidentName] = useState("Tenant One");

  useEffect(() => {
    // Simulate fetching tenant data
    setTimeout(() => {
      setResidentName("Alex Doe");
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-white to-slate-200 dark:from-slate-800 dark:to-black text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Welcome, {residentName} 👋</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">This is your personalized resident dashboard.</p>

      <div className="mt-10 p-6 bg-white/80 dark:bg-slate-900/80 shadow-xl rounded-xl max-w-xl mx-auto border dark:border-slate-700">
        <p className="text-lg text-slate-700 dark:text-slate-300">Here you can:</p>
        <ul className="list-disc text-left text-slate-600 dark:text-slate-400 mt-4 pl-6">
          <li>View rent status</li>
          <li>Upload documents</li>
          <li>Join community marketplace</li>
          <li>Message your landlord</li>
        </ul>
      </div>
    </div>
  );
}
