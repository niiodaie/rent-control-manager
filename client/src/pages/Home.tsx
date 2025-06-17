import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Building, Users, CreditCard, Wrench, ShoppingCart, FileText, Check, Star } from "lucide-react";
import Logo from "@/components/Logo";

const features = [
  {
    icon: Building,
    title: "Property Management",
    description: "Manage multiple properties with ease, track rent, and organize lease documents.",
  },
  {
    icon: Users,
    title: "Resident Portal",
    description: "Residents can pay rent, submit maintenance requests, and access community features.",
  },
  {
    icon: ShoppingCart,
    title: "Community Marketplace",
    description: "Built-in marketplace for residents to buy and sell items within their community.",
  },
  {
    icon: CreditCard,
    title: "Global Payments",
    description: "Accept payments worldwide with smart gateway routing and 2% platform fees.",
  },
  {
    icon: Wrench,
    title: "Maintenance Tracking",
    description: "Track maintenance requests from submission to completion with real-time updates.",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Centralized document storage for leases, applications, and property records.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small landlords",
    features: ["Up to 5 units", "Basic resident portal", "Document storage", "Email support"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$49.99",
    period: "/month",
    description: "For growing property portfolios",
    features: ["Up to 50 units", "Advanced analytics", "Marketplace features", "Priority support", "Custom branding"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "/month",
    description: "For large property management companies",
    features: ["Unlimited units", "Advanced reporting", "API access", "White-label solution", "Dedicated support"],
    popular: false,
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" onClick={() => setLocation("/login")}>
              Login
            </Button>
            <Button onClick={() => setLocation("/apply")}>
              Apply Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Multi-Tenant Property Management
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Complete
            <span className="text-blue-600"> Rent Control </span>
            Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Streamline property management with our comprehensive SaaS platform. 
            Handle rent collection, maintenance requests, community marketplace, and more - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg" onClick={() => setLocation("/login?role=landlord")}>
              Login as Landlord
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={() => setLocation("/login?role=resident")}>
              Login as Resident
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free plan available • 2% transaction fees
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From rent collection to maintenance tracking, our platform handles every aspect of property management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your property portfolio. Upgrade or downgrade anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative text-center ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-600">{plan.period}</span>}
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => setLocation("/login?role=landlord")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Property Managers Worldwide
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="text-lg font-semibold ml-2">4.9/5</span>
            <span className="text-gray-600">from 2,500+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Rent Control has completely transformed how I manage my 15-unit building. The resident portal alone saves me 10 hours a week!"
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Property Manager, Austin TX</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The marketplace feature is brilliant! Our residents love being able to buy and sell items within the community."
              </p>
              <div className="font-semibold">Mike Chen</div>
              <div className="text-sm text-gray-500">Landlord, San Francisco CA</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Global payment support was exactly what we needed for our international properties. Seamless experience!"
              </p>
              <div className="font-semibold">Emma Rodriguez</div>
              <div className="text-sm text-gray-500">Real Estate Investor, Miami FL</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Streamline Your Property Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of landlords who have simplified their workflow with Rent Control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4" onClick={() => setLocation("/login?role=landlord")}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600" onClick={() => setLocation("/apply")}>
              Apply as Resident
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400">
                The complete property management platform for modern landlords and residents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 Rent Control. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400">Powered by</span>
              <a 
                href="https://visnec.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Visnec
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}