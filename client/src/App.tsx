/**
 * Design: Coastal Trust Architecture — source-faithful public route map.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BridgeLoans from "./pages/BridgeLoans";
import PartnerCG from "./pages/PartnerCG";
import BeatTheRate from "./pages/BeatTheRate";
import LoanPrograms from "./pages/LoanPrograms";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/bridge-loans"} component={BridgeLoans} />
      <Route path="/partners/culbertson-gray" component={PartnerCG} />
      <Route path="/beat-the-rate" component={BeatTheRate} />
      <Route path="/loan-programs" component={LoanPrograms} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
