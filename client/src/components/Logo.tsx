import { Home } from "lucide-react";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

export default function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={`w-10 h-10 bg-primary rounded-lg flex items-center justify-center ${className}`}>
        <Home className="h-6 w-6 text-white" />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <Home className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Rent Control</h1>
        <p className="text-sm text-neutral-500">Property Management</p>
      </div>
    </div>
  );
}

export function LogoSVG() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="8" width="24" height="24" rx="6" fill="#1E40AF"/>
      <path d="M8 18h8m-4-4v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <text x="32" y="18" fill="#1E293B" fontSize="14" fontWeight="700" fontFamily="Inter">
        Rent Control
      </text>
      <text x="32" y="28" fill="#64748B" fontSize="10" fontFamily="Inter">
        Property Management
      </text>
    </svg>
  );
}
