import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, CheckCircle, Building2, Users, DollarSign } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Building2 className="w-3 h-3 mr-1" />
                Trusted by 10,000+ Property Managers Globally
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Global Property
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Management
                </span>
                <br />
                Made Simple
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Streamline your rental business worldwide with our comprehensive platform. 
                Manage properties, tenants, and payments across multiple countries and currencies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 global support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 borderless">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Property Dashboard</h3>
                <Badge variant="outline" className="text-green-600 borderless">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  All Systems Active
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg borderless">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-muted-foreground">Properties</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg borderless">
                  <div className="text-2xl font-bold text-green-600">1,856</div>
                  <div className="text-sm text-muted-foreground">Tenants</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg borderless">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-muted-foreground">Occupancy</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg borderless">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Sunset Apartments</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">$12,500</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg borderless">
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Downtown Lofts</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">$8,750</span>
                </div>
              </div>

              {/* Live Updates Indicator */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Updates</span>
                </div>
              </div>
            </div>

            {/* Floating Revenue Card */}
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 borderless">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  <div className="text-lg font-bold text-green-600">+23.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

