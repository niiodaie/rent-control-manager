import React from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  FileText, 
  Shield, 
  BarChart3,
  MessageSquare,
  Calendar,
  Smartphone
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Effortlessly manage multiple properties with detailed profiles, photos, and documentation.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Tenant Management",
      description: "Streamline tenant onboarding, track lease agreements, and maintain tenant communications.",
      color: "green"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Automated rent collection, payment tracking, and financial reporting with multiple payment methods.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Lease Management",
      description: "Digital lease agreements, automatic renewals, and compliance tracking for all your properties.",
      color: "orange"
    },
    {
      icon: MessageSquare,
      title: "Maintenance Requests",
      description: "Efficient maintenance workflow with tenant requests, vendor management, and progress tracking.",
      color: "red"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive insights into property performance, revenue trends, and occupancy rates.",
      color: "indigo"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Bank-level security with data encryption and compliance with housing regulations.",
      color: "emerald"
    },
    {
      icon: Calendar,
      title: "Scheduling & Reminders",
      description: "Automated reminders for rent due dates, lease renewals, and maintenance schedules.",
      color: "yellow"
    },
    {
      icon: Smartphone,
      title: "Mobile Access",
      description: "Full-featured mobile app for property managers and tenants to access everything on-the-go.",
      color: "pink"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600",
      emerald: "bg-emerald-100 text-emerald-600",
      yellow: "bg-yellow-100 text-yellow-600",
      pink: "bg-pink-100 text-pink-600"
    };
    return colorMap[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="text-blue-600 block">Manage Properties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need to efficiently manage 
            your rental properties and create exceptional experiences for your tenants.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${getColorClasses(feature.color)} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Property Management?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of property managers who have streamlined their operations 
              and increased their revenue with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

