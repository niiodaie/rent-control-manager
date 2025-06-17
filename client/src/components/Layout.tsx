import { useLocation } from "wouter";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Don't show sidebar on the /apply page
  const showSidebar = location !== "/apply";

  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
