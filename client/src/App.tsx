import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LiveChatWidget } from "./components/LiveChatWidget";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { StructuredData } from "./components/StructuredData";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load all page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Apartments = lazy(() => import("./pages/Apartments"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Amenities = lazy(() => import("./pages/Amenities"));
const Location = lazy(() => import("./pages/Location"));
const Contact = lazy(() => import("./pages/Contact"));
const ApartmentDetail = lazy(() => import("./pages/ApartmentDetail"));
const Booking = lazy(() => import("./pages/Booking"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PurchaseConditions = lazy(() => import("./pages/PurchaseConditions"));
const LoyaltyProgram = lazy(() => import("./pages/LoyaltyProgram"));
const Blog = lazy(() => import("./pages/Blog"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component with luxury styling
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-gold-400 mx-auto mb-4" />
        <p className="text-gold-400 font-serif text-lg">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <StructuredData page="home" />
            <Router />
            <WhatsAppButton />
            <LiveChatWidget />
            {/* PromoPopup removed */}
            <GoogleAnalytics />
            <GoogleTagManager gtmId={import.meta.env.VITE_GTM_ID || ''} />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
