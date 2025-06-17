import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
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
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/apply" component={Apply} />
      
      {/* Landlord Routes */}
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>
      <Route path="/properties">
        <Layout>
          <Properties />
        </Layout>
      </Route>
      <Route path="/residents">
        <Layout>
          <Residents />
        </Layout>
      </Route>
      <Route path="/applications">
        <Layout>
          <Applications />
        </Layout>
      </Route>
      <Route path="/documents">
        <Layout>
          <Documents />
        </Layout>
      </Route>
      <Route path="/marketplace">
        <Layout>
          <Marketplace />
        </Layout>
      </Route>
      <Route path="/payments">
        <Layout>
          <Payments />
        </Layout>
      </Route>
      <Route path="/maintenance">
        <Layout>
          <Maintenance />
        </Layout>
      </Route>
      
      {/* Resident Routes */}
      <Route path="/resident-dashboard" component={ResidentDashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
