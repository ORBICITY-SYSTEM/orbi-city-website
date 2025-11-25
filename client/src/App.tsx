import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import Gallery from "./pages/Gallery";
import Amenities from "./pages/Amenities";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import ApartmentDetail from "./pages/ApartmentDetail";
import Booking from "./pages/Booking";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import PurchaseConditions from "./pages/PurchaseConditions";
import LoyaltyProgram from "./pages/LoyaltyProgram";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PromoPopup } from "./components/PromoPopup";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/apartments" component={Apartments} />
      <Route path="/apartment/:id" component={ApartmentDetail} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/amenities" component={Amenities} />
      <Route path="/location" component={Location} />
      <Route path="/contact" component={Contact} />
      <Route path="/booking/:id" component={Booking} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/purchase-conditions" component={PurchaseConditions} />
      <Route path="/loyalty-program" component={LoyaltyProgram} />
      <Route path="/blog" component={Blog} />
      <Route path="/admin/:page?" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <GoogleAnalytics />
          <Router />
          <WhatsAppButton />
          <PromoPopup />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
