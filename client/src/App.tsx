import { Router, Route } from "wouter"; // Removed useHashLocation
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResidentDashboard from "./pages/ResidentDashboard";
import Apply from "./pages/Apply";

function App() {
  return (
    <Router> {/* Default routing with clean URLs */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/resident-dashboard" component={ResidentDashboard} />
      <Route path="/apply" component={Apply} />
    </Router>
  );
}

export default App;
