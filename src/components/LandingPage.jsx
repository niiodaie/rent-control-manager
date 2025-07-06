import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Shield, 
  Smartphone, 
  Globe,
  Check,
  Menu,
  X,
  Star,
  ArrowRight,
  Play,
  Zap,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  Moon,
  Sun
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Manage multiple properties with custom branding and dashboards'
    },
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Invite and manage tenants with unit-based assignments'
    },
    {
      icon: DollarSign,
      title: 'Rent Collection',
      description: 'Automated rent collection with 2% processing fee'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Stripe-powered secure payment processing'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive design optimized for all devices'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support for English and Spanish languages'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '1 Property',
        'Up to 5 Residents',
        'Basic Dashboard',
        'Rent Tracking',
        'Email Support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      price: '$49.99',
      period: '/month',
      description: 'For growing property portfolios',
      features: [
        'Up to 5 Properties',
        'Up to 100 Residents',
        'Custom Branding',
        'Advanced Analytics',
        'Priority Support',
        'No Ads',
        'Maintenance Tracking',
        'Document Storage'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$499.99',
      period: '/month',
      description: 'For large property management companies',
      features: [
        'Unlimited Properties',
        'Unlimited Residents',
        'White Label',
        'API Access',
        'Dedicated Support',
        'Custom Integrations',
        'Advanced Reporting'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Rent Control</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <select className="bg-background border border-input rounded-md px-2 py-1 text-sm">
                <option>EN</option>
                <option>ES</option>
              </select>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <Link 
                to="/login" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#pricing" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
                <a href="#about" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
                <div className="flex items-center justify-between px-3 py-2">
                  <select className="bg-background border border-input rounded-md px-2 py-1 text-sm">
                    <option>EN</option>
                    <option>ES</option>
                  </select>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md hover:bg-accent transition-colors"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block mx-3 my-2 btn-primary text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Announcement Banner */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Zap className="h-4 w-4 mr-2" />
              🚀 Now with Stripe Connect Integration
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Property Management
              <span className="block text-primary">Made Simple</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Manage your properties, collect rent, and communicate with tenants all in one platform. 
              Custom dashboards for each property with your own branding.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Free Trial
              </Link>
              <button className="btn-outline text-lg px-8 py-4">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="text-sm text-muted-foreground animate-fade-in">
              Free plan available • No credit card required • 2% processing fee
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive property management tools designed for modern landlords and property managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your property portfolio. All plans include our 2% processing fee on rent payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-xl border bg-card transition-all duration-300 hover:shadow-lg animate-fade-in ${
                  plan.popular 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'btn-outline'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Simplify Your Property Management?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of property owners who trust Rent Control for their property management needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="bg-background text-primary hover:bg-background/90 px-8 py-4 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Your Free Trial
              </Link>
              <button className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 rounded-lg font-medium transition-colors duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Rent Control</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The modern property management platform that simplifies rent collection, 
                tenant management, and property operations.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Trusted by 10,000+ property owners</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a></li>
                <li><a href="/api" className="text-muted-foreground hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Rent Control. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <a 
                href="https://visnec.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-1" />
                Visnec
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

