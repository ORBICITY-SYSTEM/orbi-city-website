import { useEffect } from 'react';

interface GoogleTagManagerProps {
  gtmId: string;
}

/**
 * Google Tag Manager integration component
 * 
 * Usage:
 * 1. Create GTM container at https://tagmanager.google.com
 * 2. Get your GTM ID (format: GTM-XXXXXXX)
 * 3. Add GTM_ID to environment variables
 * 4. Add this component to App.tsx
 * 
 * Example:
 * <GoogleTagManager gtmId={import.meta.env.VITE_GTM_ID || ''} />
 */
export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    if (!gtmId || gtmId === '') {
      console.warn('[GTM] No GTM ID provided. Skipping Google Tag Manager initialization.');
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    console.log(`[GTM] Initialized with ID: ${gtmId}`);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(`script[src*="${gtmId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [gtmId]);

  // Render noscript fallback
  if (!gtmId || gtmId === '') {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

// Helper function to push events to dataLayer
export function pushToDataLayer(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
    });
    console.log('[GTM] Event pushed:', event, data);
  }
}

// Predefined tracking functions for common events
export const GTMEvents = {
  // Booking events
  viewApartment: (apartmentId: number, apartmentName: string, price: number) => {
    pushToDataLayer('view_apartment', {
      apartment_id: apartmentId,
      apartment_name: apartmentName,
      price: price,
    });
  },

  openBookingModal: (apartmentId: number, apartmentName: string) => {
    pushToDataLayer('open_booking_modal', {
      apartment_id: apartmentId,
      apartment_name: apartmentName,
    });
  },

  selectDates: (checkIn: string, checkOut: string, nights: number) => {
    pushToDataLayer('select_dates', {
      check_in: checkIn,
      check_out: checkOut,
      nights: nights,
    });
  },

  fillGuestInfo: (guestName: string, guestEmail: string) => {
    pushToDataLayer('fill_guest_info', {
      guest_name: guestName,
      guest_email: guestEmail,
    });
  },

  submitBooking: (bookingData: {
    apartmentId: number;
    apartmentName: string;
    checkIn: string;
    checkOut: string;
    nights: number;
    totalPrice: number;
    contactMethod: string;
  }) => {
    pushToDataLayer('submit_booking', {
      value: bookingData.totalPrice,
      currency: 'USD',
      apartment_id: bookingData.apartmentId,
      apartment_name: bookingData.apartmentName,
      check_in: bookingData.checkIn,
      check_out: bookingData.checkOut,
      nights: bookingData.nights,
      contact_method: bookingData.contactMethod,
    });
  },

  // Navigation events
  clickWhatsApp: () => {
    pushToDataLayer('click_whatsapp', {
      button_location: 'floating_button',
    });
  },

  clickPromoCode: (code: string) => {
    pushToDataLayer('click_promo_code', {
      promo_code: code,
    });
  },

  copyPromoCode: (code: string) => {
    pushToDataLayer('copy_promo_code', {
      promo_code: code,
    });
  },

  // Page views
  pageView: (pageName: string, pageUrl: string) => {
    pushToDataLayer('page_view', {
      page_name: pageName,
      page_url: pageUrl,
    });
  },

  // User interactions
  clickCTA: (ctaText: string, ctaLocation: string) => {
    pushToDataLayer('click_cta', {
      cta_text: ctaText,
      cta_location: ctaLocation,
    });
  },

  viewGallery: (category: string) => {
    pushToDataLayer('view_gallery', {
      gallery_category: category,
    });
  },

  changeLanguage: (language: string) => {
    pushToDataLayer('change_language', {
      language: language,
    });
  },
};

// TypeScript declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
