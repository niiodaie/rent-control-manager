import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function PaymentProcessingPage() {
  const [status, setStatus] = useState('processing');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const sessionId = searchParams.get('session_id');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    if (canceled) {
      setStatus('canceled');
      return;
    }

    async function verifyPayment() {
      try {
        if (!sessionId) {
          setStatus('error');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050'}/api/verify-payment?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          setStatus('success');
        } else {
          setStatus('pending');
          // Retry verification after a delay for pending payments
          setTimeout(verifyPayment, 3000);
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('error');
      }
    }

    if (sessionId) {
      verifyPayment();
    } else if (!canceled) {
      setStatus('error');
    }
  }, [sessionId, canceled]);

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleRetryPayment = () => {
    navigate('/#pricing');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t('payment.processing.title', 'Verifying your payment...')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('payment.processing.description', 'Please wait while we confirm your payment.')}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              {t('payment.success.title', '✅ Payment Successful!')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('payment.success.description', 'Your payment has been processed successfully. You can now access your dashboard.')}
            </p>
            <div className="space-y-2">
              <Button onClick={handleReturnHome} className="w-full">
                {t('payment.success.returnHome', 'Return to Dashboard')}
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600">
              {t('payment.error.title', '❌ Payment Failed')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('payment.error.description', 'We couldn\'t verify your payment. Please try again or contact support.')}
            </p>
            <div className="space-y-2">
              <Button onClick={handleRetryPayment} className="w-full">
                {t('payment.error.retry', 'Try Again')}
              </Button>
              <Button variant="outline" onClick={handleReturnHome} className="w-full">
                {t('payment.error.returnHome', 'Return Home')}
              </Button>
            </div>
          </div>
        )}

        {status === 'canceled' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <XCircle className="w-16 h-16 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-600">
              {t('payment.canceled.title', 'Payment Canceled')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('payment.canceled.description', 'Your payment was canceled. No charges were made to your account.')}
            </p>
            <div className="space-y-2">
              <Button onClick={handleRetryPayment} className="w-full">
                {t('payment.canceled.retry', 'Try Again')}
              </Button>
              <Button variant="outline" onClick={handleReturnHome} className="w-full">
                {t('payment.canceled.returnHome', 'Return Home')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

