import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, CheckCircle, Building2, Users, DollarSign } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-0">
                <Building2 className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Property Managers Globally
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Global Property
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600">
                  Management
                </span>
                <span className="block">Made Simple</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Streamline your rental business worldwide with our comprehensive platform. 
                Manage properties, tenants, and payments across multiple countries and currencies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Button size="lg" className="text-lg px-8 py-4 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-14 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">24/7 global support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative lg:pl-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 lg:p-8 border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Property Dashboard</h3>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  All Systems Active
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-8">
                <div className="text-center p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border-0">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">247</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Properties</div>
                </div>
                <div className="text-center p-4 lg:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border-0">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">1,856</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Tenants</div>
                </div>
                <div className="text-center p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border-0">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Occupancy</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl border-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Sunset Apartments</span>
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">$12,500</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl border-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Downtown Lofts</span>
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">$8,750</span>
                </div>
              </div>

              {/* Live Updates Indicator */}
              <div className="mt-8 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Live Updates</span>
                </div>
              </div>
            </div>

            {/* Floating Revenue Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-0 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Monthly Revenue</div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">+23.5%</div>
                </div>
              </div>
            </div>

            {/* Background decoration for dashboard */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

