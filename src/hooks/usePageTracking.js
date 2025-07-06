import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Replace this with Google Analytics if needed
    console.log('Page view:', location.pathname);
  }, [location]);
}
