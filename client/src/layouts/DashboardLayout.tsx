import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  Search,
  Globe,
  Building
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserData {
  name: string;
  email: string;
  role: string;
  brandName?: string;
  brandLogo?: string;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth-token');
    const role = localStorage.getItem('user-role');
    const user = localStorage.getItem('user-data');
    
    if (!token || !role) {
      setLocation('/login');
      return;
    }

    let parsedUser: UserData = {
      name: "Property Manager",
      email: "manager@example.com",
      role: role
    };

    if (user) {
      try {
        parsedUser = { ...parsedUser, ...JSON.parse(user) };
      } catch (e) {
        // Use defaults if parsing fails
      }
    }

    setIsAuthenticated(true);
    setUserData(parsedUser);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
    localStorage.removeItem('user-data');
    setLocation('/login');
  };

  if (!isAuthenticated || !userData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Enhanced Dashboard Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Left side - Logo and brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {userData.brandLogo ? (
                <img src={userData.brandLogo} alt="Brand Logo" className="h-8 w-8 rounded-lg" />
              ) : (
                <Logo variant="icon" className="h-8 w-8" />
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {userData.brandName || "Rent Control"}
                </h1>
                {userData.role === 'landlord' && (
                  <Badge className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    <Building className="h-3 w-3 mr-1" />
                    Property Owner
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties, tenants, documents..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-3">
            {/* Global indicator for international users */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <Globe className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Global</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" onClick={() => setLocation('/branding-settings')}>
              <Settings className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {userData.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {userData.email}
                </p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-screen">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Page content with proper spacing */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Powered by Visnec - Fixed position */}
      <div className="fixed bottom-4 right-4 z-30">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-full px-3 py-1 shadow-lg">
          <span className="text-xs text-slate-500 dark:text-slate-400">Powered by</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Visnec</span>
        </div>
      </div>
    </div>
  );
}