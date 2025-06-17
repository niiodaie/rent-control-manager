import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ResidentDashboard from "@/pages/ResidentDashboard";
import Properties from "@/pages/Properties";
import Residents from "@/pages/Residents";
import Applications from "@/pages/Applications";
import Documents from "@/pages/Documents";
import Marketplace from "@/pages/Marketplace";
import Payments from "@/pages/Payments";
import Maintenance from "@/pages/Maintenance";
import BrandingSettings from "@/pages/BrandingSettings";
import Apply from "@/pages/Apply";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <PublicLayout>
          <Home />
        </PublicLayout>
      </Route>
      <Route path="/login">
        <PublicLayout>
          <Login />
        </PublicLayout>
      </Route>
      <Route path="/apply">
        <PublicLayout>
          <Apply />
        </PublicLayout>
      </Route>
      
      {/* Protected Landlord Routes */}
      <Route path="/dashboard">
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </Route>
      <Route path="/properties">
        <DashboardLayout>
          <Properties />
        </DashboardLayout>
      </Route>
      <Route path="/residents">
        <DashboardLayout>
          <Residents />
        </DashboardLayout>
      </Route>
      <Route path="/applications">
        <DashboardLayout>
          <Applications />
        </DashboardLayout>
      </Route>
      <Route path="/documents">
        <DashboardLayout>
          <Documents />
        </DashboardLayout>
      </Route>
      <Route path="/marketplace">
        <DashboardLayout>
          <Marketplace />
        </DashboardLayout>
      </Route>
      <Route path="/payments">
        <DashboardLayout>
          <Payments />
        </DashboardLayout>
      </Route>
      <Route path="/maintenance">
        <DashboardLayout>
          <Maintenance />
        </DashboardLayout>
      </Route>
      <Route path="/branding">
        <DashboardLayout>
          <BrandingSettings />
        </DashboardLayout>
      </Route>
      
      {/* Protected Resident Routes */}
      <Route path="/resident-dashboard">
        <DashboardLayout>
          <ResidentDashboard />
        </DashboardLayout>
      </Route>
      
      <Route>
        <PublicLayout>
          <NotFound />
        </PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
