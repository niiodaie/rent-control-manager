import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { useLocation } from "wouter";
import { Building, Globe, Shield, Zap } from "lucide-react";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20">
      {/* Enhanced Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
              <Logo variant="full" className="h-8" />
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                <Building className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Enterprise</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">
                Features
              </a>
              <a href="#global" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">
                Global Platform
              </a>
              <a href="#pricing" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">
                Pricing
              </a>
              <a href="#security" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors">
                Security
              </a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/login")}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setLocation("/login")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="container mx-auto px-6 py-16">
          {/* Trust Bar */}
          <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-semibold">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">190+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="font-semibold">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-orange-600" />
                <span className="font-semibold">50,000+ Properties</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <Logo variant="full" className="h-8" />
                <p className="text-slate-600 dark:text-slate-400 text-base max-w-md leading-relaxed">
                  The enterprise-grade property management platform that transforms how landlords operate. 
                  <span className="font-semibold text-slate-800 dark:text-slate-200"> Trusted by property managers in 190+ countries.</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Multi-Currency</span>
                </div>
                <div className="px-3 py-1 bg-green-50 dark:bg-green-950/50 rounded-full border border-green-200/50 dark:border-green-800/50">
                  <span className="text-xs font-semibold text-green-700 dark:text-green-300">GDPR Ready</span>
                </div>
                <div className="px-3 py-1 bg-purple-50 dark:bg-purple-950/50 rounded-full border border-purple-200/50 dark:border-purple-800/50">
                  <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">White Label</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Platform</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Property Management</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Tenant Portal</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Payment Processing</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Maintenance Tracking</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Custom Branding</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Solutions</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Small Business</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Individual Landlords</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Property Managers</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Real Estate Agencies</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Support</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Contact Sales</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <p>© 2024 Rent Control. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</a>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-xs text-slate-500 dark:text-slate-500">Powered by</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Visnec</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}