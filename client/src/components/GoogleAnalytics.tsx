import { useEffect } from "react";
import { useLocation } from "wouter";
import ReactGA from "react-ga4";

// Google Analytics Measurement ID
// For production, this should be set via environment variable
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Initialize GA4 only once
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
          debug_mode: import.meta.env.DEV, // Enable debug mode in development
        },
      });
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      ReactGA.send({ hitType: "pageview", page: location, title: document.title });
    }
  }, [location]);

  return null; // This component doesn't render anything
}

// Helper functions for tracking custom events

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

export const trackBookingClick = (apartmentName: string) => {
  trackEvent("Conversion", "booking_click", apartmentName);
};

export const trackContactFormSubmit = () => {
  trackEvent("Conversion", "contact_form_submit", "Contact Form");
};

export const trackWhatsAppClick = () => {
  trackEvent("Engagement", "whatsapp_click", "WhatsApp Button");
};

export const trackApartmentView = (apartmentName: string) => {
  trackEvent("Engagement", "apartment_view", apartmentName);
};

export const trackVirtualTourClick = (tourName: string) => {
  trackEvent("Engagement", "virtual_tour_click", tourName);
};

export const trackGalleryView = (category: string) => {
  trackEvent("Engagement", "gallery_view", category);
};

export const trackPromoCodeCopy = (promoCode: string) => {
  trackEvent("Engagement", "promo_code_copy", promoCode);
};
