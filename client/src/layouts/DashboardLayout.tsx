import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('user-role');
    
    if (!token || !role) {
      // Not authenticated, redirect to login
      setLocation('/login');
      return;
    }

    setIsAuthenticated(true);
    setUserRole(role);
  }, [setLocation]);

  // Don't render dashboard if not authenticated
  if (!isAuthenticated || !userRole) {
    return null;
  }

  // Use existing Layout component which includes sidebar
  return <Layout>{children}</Layout>;
}