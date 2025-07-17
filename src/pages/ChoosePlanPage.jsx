import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/AuthContext'; // adjust path if needed
import { updateUserPlan } from '../utils';

export default function ChoosePlan() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePlanSelect = async (plan) => {
    try {
      setLoading(true);
      await updateUserPlan(user.id, plan);
      router.push('/admin/dashboard');
    } catch (err) {
      alert('Plan update failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Choose Your Plan</h1>
      <div className="grid gap-4">
        <button
          className="p-4 border rounded hover:bg-gray-100"
          onClick={() => handlePlanSelect('free')}
          disabled={loading}
        >
          Free – Basic features
        </button>
        <button
          className="p-4 border rounded hover:bg-gray-100"
          onClick={() => handlePlanSelect('starter')}
          disabled={loading}
        >
          Starter – $49.99/month
        </button>
        <button
          className="p-4 border rounded hover:bg-gray-100"
          onClick={() => handlePlanSelect('pro')}
          disabled={loading}
        >
          Pro – $99.99/month
        </button>
      </div>
    </div>
  );
}
