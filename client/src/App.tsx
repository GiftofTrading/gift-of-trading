import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { trackPageView } from "./lib/analytics";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Webinars from "./pages/Webinars";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminManagement from "./pages/AdminManagement";
import VerifyEmail from "./pages/VerifyEmail";
import StockMarketMadeEasy from "./pages/StockMarketMadeEasy";
import Masterclass from "./pages/Masterclass";
import SuccessStories from "./pages/SuccessStories";
import Login from "./pages/Login";

// Manus Analytics page view tracking
function AnalyticsTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Track page view with Manus analytics
    trackPageView();
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <AnalyticsTracker />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/webinars" component={Webinars} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/manage-admins" component={AdminManagement} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/login" component={Login} />
        <Route path="/pro-coaching">{() => { useEffect(() => { window.location.replace("/stock-market-made-easy"); }, []); return null; }}</Route>
        <Route path="/stock-market-made-easy" component={StockMarketMadeEasy} />
        <Route path="/masterclass" component={Masterclass} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
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
