import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  FileText, 
  Folder,
  User,
  Settings
} from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Manage Properties", href: "/properties", icon: Building },
  { name: "Residents", href: "/residents", icon: Users },
  { name: "Applications", href: "/applications", icon: FileText },
  { name: "Documents", href: "/documents", icon: Folder },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-neutral-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-200">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href === "/dashboard" && location === "/");
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-neutral-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-neutral-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-900">John Smith</p>
            <p className="text-xs text-neutral-500">Property Owner</p>
          </div>
          <button className="text-neutral-400 hover:text-neutral-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
