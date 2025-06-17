import { Building2, ArrowRight, DollarSign, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Icons */}
      <div className="flex gap-8 mb-6">
        <div className="flex flex-col items-center">
          <DollarSign className="h-16 w-16 text-black" />
          <DollarSign className="h-24 w-16 text-black mt-2" />
        </div>
        <div className="flex flex-col items-center">
          <DollarSign className="h-4 w-4 text-black" />
          <Home className="h-24 w-24 text-black mt-2" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-2xl font-semibold flex items-center justify-center gap-2 mb-1">
        <Building2 className="w-6 h-6" />
        Enterprise Property Management
      </h1>
      <h2 className="text-3xl font-bold tracking-tight mb-1">Rent Control</h2>
      <h3 className="text-xl text-gray-700 mb-4">Revolutionized</h3>

      {/* Subheading */}
      <p className="max-w-xl text-sm text-gray-600 mb-6">
        The enterprise-grade property management platform trusted by landlords
        in 190+ countries. Custom branding, automated workflows, and seamless
        tenant experiences.
      </p>

      {/* Call-to-action */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-2">
        <Input
          placeholder="Enter number of properties"
          type="number"
          className="w-72"
        />
        <Button>Get Started Free</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button variant="ghost" className="text-sm flex items-center gap-1">
          Resident Portal Access <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="link" className="text-sm">
          99.99% Uptime Guarantee
        </Button>
      </div>
    </div>
  );
}
