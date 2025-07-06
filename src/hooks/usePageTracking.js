import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Example: send path to console or tracking service
    console.log("Page view:", location.pathname);

    // You could also send this to Google Analytics or other service here.
  }, [location]);
}
