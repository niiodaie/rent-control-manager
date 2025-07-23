import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserPlan } from '../lib/utils';

export function ChoosePlanPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSelect = async (plan) => {
    try {
      setLoading(true);
      await updateUserPlan(user.id, plan);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Failed to select plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
      <div className="grid gap-4">
        <button
          onClick={() => handleSelect('free')}
          disabled={loading}
          className="p-4 border rounded"
        >
          Free – Basic features
        </button>
        <button
          onClick={() => handleSelect('starter')}
          disabled={loading}
          className="p-4 border rounded"
        >
          Starter – $49.99/month
        </button>
        <button
          onClick={() => handleSelect('pro')}
          disabled={loading}
          className="p-4 border rounded"
        >
          Pro – $99.99/month
        </button>
      </div>
    </div>
  );
}

export default ChoosePlanPage
