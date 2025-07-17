import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('session_id');
    setSessionId(id);

    // OPTIONAL: send to backend for verification
    // fetch('/api/stripe/verify-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sessionId: id }),
    // });
  }, [location.search]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">🎉 Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for subscribing.
      </p>
      {sessionId && (
        <p className="mt-2 text-sm text-gray-500">
          Stripe session ID: <code>{sessionId}</code>
        </p>
      )}
    </div>
  );
}
