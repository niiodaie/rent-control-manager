import React from 'react';
import { Building2, Users, Globe, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">About Rent Control</h1>
          
          <div className="prose prose-lg mx-auto mb-16">
            <p className="text-xl text-muted-foreground text-center mb-8">
              We're revolutionizing property management with a global platform that makes 
              rental management simple, efficient, and accessible worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                To empower property managers and landlords worldwide with the tools they need 
                to efficiently manage their rental properties while providing exceptional 
                experiences for tenants.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                A world where property management is seamless, transparent, and accessible 
                to everyone, regardless of location or portfolio size.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Support for multiple currencies, languages, and local regulations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">User-Centric</h3>
                    <p className="text-sm text-muted-foreground">
                      Designed for both property managers and tenants
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Secure & Reliable</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security with 99.9% uptime
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Building2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Scalable</h3>
                    <p className="text-sm text-muted-foreground">
                      From single properties to large portfolios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Trusted by Property Managers Worldwide</h2>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AboutPage;
