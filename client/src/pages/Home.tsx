import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, Users, CreditCard, Wrench, ShoppingCart, FileText, Check,
  ArrowRight, TrendingUp, Globe, Shield, Zap, Award
} from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Property silhouettes with animated rent effect */}
        <div className="absolute top-20 right-10 opacity-5 dark:opacity-10">
          <svg width="200" height="250" viewBox="0 0 200 250" className="text-slate-700 dark:text-slate-300">
            {/* Apartment building */}
            <rect x="20" y="80" width="80" height="150" fill="currentColor" />
            <rect x="120" y="60" width="60" height="170" fill="currentColor" />
            
            {/* Windows with rent animation */}
            <rect x="30" y="90" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </rect>
            <rect x="55" y="90" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <rect x="30" y="115" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
            </rect>
            <rect x="55" y="115" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </rect>
            
            {/* Apartment 2 windows */}
            <rect x="130" y="80" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
            </rect>
            <rect x="150" y="80" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2.5s" />
            </rect>
            
            {/* Floating "$" symbols with rent effect */}
            <text x="40" y="75" fontSize="16" fill="currentColor" opacity="0.6">
              <animate attributeName="y" values="75;65;75" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" />
              $
            </text>
            <text x="140" y="55" fontSize="14" fill="currentColor" opacity="0.5">
              <animate attributeName="y" values="55;45;55" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" />
              $
            </text>
          </svg>
        </div>
        
        {/* House silhouette */}
        <div className="absolute bottom-20 left-10 opacity-5 dark:opacity-10">
          <svg width="150" height="120" viewBox="0 0 150 120" className="text-slate-700 dark:text-slate-300">
            {/* House structure */}
            <polygon points="75,20 120,60 30,60" fill="currentColor" />
            <rect x="40" y="60" width="70" height="50" fill="currentColor" />
            
            {/* Door */}
            <rect x="65" y="85" width="20" height="25" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Windows with animation */}
            <rect x="50" y="70" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
            </rect>
            <rect x="88" y="70" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" begin="1s" />
            </rect>
            
            {/* Rent symbol */}
            <text x="75" y="15" fontSize="12" fill="currentColor" opacity="0.7" textAnchor="middle">
              <animate attributeName="y" values="15;10;15" dur="3s" repeatCount="indefinite" />
              $
            </text>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="text-left max-w-2xl">
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                  Rent Control
                  <br />
                  <span className="text-blue-600">for Landlords</span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  The modern property management platform trusted by landlords worldwide. Manage properties, collect rent, and engage tenants with custom-branded experiences.
                </p>
              </div>

              {/* Search-style CTA */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Get started with your property portfolio
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="How many properties do you manage?"
                        className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white text-lg"
                        readOnly
                      />
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setLocation("/login")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setLocation("/login?resident=true")}
                  >
                    Or login as a resident →
                  </Button>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">50,000+ Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">190+ Countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">$2.5B+ Processed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Property Showcase */}
            <div className="relative">
              {/* Main property card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 transform hover:scale-105 transition-transform duration-500">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900/20 p-8 flex items-center justify-center relative overflow-hidden">
                  {/* Property illustration */}
                  <svg width="280" height="180" viewBox="0 0 280 180" className="text-slate-300 dark:text-slate-600">
                    {/* Modern buildings */}
                    <rect x="40" y="80" width="50" height="80" fill="currentColor" opacity="0.8" rx="4" />
                    <rect x="110" y="60" width="70" height="100" fill="currentColor" opacity="0.9" rx="4" />
                    <rect x="200" y="85" width="45" height="75" fill="currentColor" opacity="0.7" rx="4" />
                    
                    {/* Animated windows */}
                    {[...Array(6)].map((_, i) => (
                      <rect key={i} x={50 + (i % 2) * 20} y={95 + Math.floor(i / 2) * 20} width={10} height={10} fill="rgba(59, 130, 246, 0.5)" rx="2">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                      </rect>
                    ))}
                    
                    {[...Array(9)].map((_, i) => (
                      <rect key={i} x={125 + (i % 3) * 18} y={75 + Math.floor(i / 3) * 18} width={12} height={12} fill="rgba(147, 51, 234, 0.5)" rx="2">
                        <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" />
                      </rect>
                    ))}
                  </svg>
                  
                  {/* Status badges */}
                  <div className="absolute top-6 right-6 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                    98% Occupied
                  </div>
                  <div className="absolute bottom-6 left-6 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
                    $2,850/mo avg
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Sunset Apartments
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Modern complex with premium amenities
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">$68K</p>
                      <p className="text-sm text-slate-500">monthly revenue</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">24</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Units</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">23</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Occupied</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">4.8</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="absolute -top-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Revenue Up 15%</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">vs last month</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">3 New Applications</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Ready for review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Everything You Need to Scale
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From custom branding to automated rent collection, we've built the tools that growing property managers need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Custom Branding",
                description: "White-label dashboards with your logo, colors, and domain. Each landlord gets their own branded experience.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Globe,
                title: "Global Ready",
                description: "Multi-currency support, timezone awareness, and localization for 190+ countries. GDPR and international compliance built-in.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: CreditCard,
                title: "Payment Processing",
                description: "Accept payments in 135+ currencies with Stripe integration. Automatic currency conversion and international banking support.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: ShoppingCart,
                title: "Resident Marketplace",
                description: "Community marketplace for residents to buy, sell, and trade. Build stronger tenant relationships worldwide.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Wrench,
                title: "Maintenance Tracking",
                description: "Smart maintenance workflows with photo uploads, priority levels, and automated notifications across time zones.",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: FileText,
                title: "Document Management",
                description: "Secure document storage with international compliance. Support for local lease templates and regulations.",
                color: "from-teal-500 to-cyan-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-105">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Capabilities */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300 border-0">
              <Globe className="h-4 w-4 mr-2" />
              Global Platform
            </Badge>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Built for Property Managers Everywhere
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From New York to Tokyo, London to Sydney - our platform adapts to local regulations, currencies, and languages.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                metric: "190+",
                label: "Countries Supported",
                icon: Globe,
                detail: "Full localization"
              },
              {
                metric: "135+",
                label: "Currencies",
                icon: CreditCard,
                detail: "Auto-conversion"
              },
              {
                metric: "24/7",
                label: "Global Support",
                icon: Shield,
                detail: "All time zones"
              },
              {
                metric: "99.9%",
                label: "Uptime SLA",
                icon: Zap,
                detail: "Enterprise grade"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-slate-900 dark:text-slate-100 font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Trusted by Property Managers Worldwide
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: "50,000+",
                label: "Properties Managed",
                icon: Building
              },
              {
                metric: "250,000+",
                label: "Global Residents",
                icon: Users
              },
              {
                metric: "$2.5B+",
                label: "Rent Processed",
                icon: TrendingUp
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for small landlords",
                features: [
                  "Up to 5 properties",
                  "Basic tenant management",
                  "Document storage",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$29",
                period: "per month",
                description: "For growing property portfolios",
                features: [
                  "Unlimited properties",
                  "Custom branding",
                  "Payment processing",
                  "Maintenance tracking",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large property management companies",
                features: [
                  "White-label solution",
                  "Custom integrations",
                  "Dedicated support",
                  "Advanced analytics",
                  "Multi-tenant architecture"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} bg-white dark:bg-slate-800`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}`}
                    onClick={() => setLocation("/login")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <Award className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of property managers who've already made the switch to smarter, more efficient operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-6 text-lg font-semibold shadow-xl"
                onClick={() => setLocation("/login")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                onClick={() => setLocation("/apply")}
              >
                Apply to Join
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}