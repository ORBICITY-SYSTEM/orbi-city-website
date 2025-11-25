import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      apartments: "Apartments",
      amenities: "Amenities",
      gallery: "Gallery",
      location: "Location",
      contact: "Contact",
      bookNow: "Book Now",
      
      // Hero Section
      luxuryLiving: "LUXURY LIVING",
      welcomeTitle: "Welcome to Orbi City Batumi",
      welcomeSubtitle: "Experience luxury living on the Black Sea coast",
      discoverMore: "Discover More",
      contactConcierge: "Contact Concierge",
      
      // Apartments Section
      perfectSanctuary: "Your Perfect Sanctuary",
      apartmentsDesc: "Discover our collection of meticulously designed apartments",
      viewDetails: "View Details",
      guests: "Guests",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      perNight: "/night",
      
      // Gallery
      visualJourney: "VISUAL JOURNEY",
      galleryTitle: "Gallery",
      galleryDesc: "Explore our stunning collection of luxury apartments and breathtaking sea views",
      
      // Location
      findUs: "FIND US",
      ourLocation: "Our Location",
      locationDesc: "Prime beachfront location in the heart of Batumi, Georgia's stunning Black Sea coast",
      getInTouch: "Get in Touch",
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
      
      // Amenities
      worldClass: "WORLD-CLASS",
      amenitiesTitle: "Premium Amenities",
      amenitiesDesc: "Indulge in luxury with our exceptional facilities",
      
      // Testimonials
      testimonials: "What Our Guests Say",
      
      // Footer
      quickLinks: "Quick Links",
      contactInfo: "Contact",
      allRightsReserved: "All rights reserved",
      
      // Booking Modal
      bookingTitle: "Book Your Stay",
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Select dates",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      specialRequests: "Special Requests",
      preferredContact: "Preferred Contact Method",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      submitBooking: "Submit Booking",
      confirmationMessage: "რამოდენიმე წუთში დაგირეკავთ რეზერვაციების მენეჯერი სართულისა და ბლოკის არჩევისთვის",
      available: "Available",
      
      // Promo Popup
      specialOffer: "Special 20% Discount!",
      promoDesc: "Use code at checkout for exclusive savings",
      copyCode: "Copy Code",
      copied: "Copied!",
    },
  },
  ka: {
    translation: {
      // Navigation
      home: "მთავარი",
      apartments: "აპარტამენტები",
      amenities: "პირობები",
      gallery: "გალერეა",
      location: "მდებარეობა",
      contact: "კონტაქტი",
      bookNow: "დაჯავშნა",
      
      // Hero Section
      luxuryLiving: "ᲚᲣᲥᲡᲣᲖᲣᲠᲘ ᲪᲮᲝᲕᲠᲔᲑᲐ",
      welcomeTitle: "მოგესალმებით ორბი სითი ბათუმში",
      welcomeSubtitle: "განიცადეთ ლუქსუზური ცხოვრება შავი ზღვის სანაპიროზე",
      discoverMore: "გაიგე მეტი",
      contactConcierge: "დაუკავშირდით კონსიერჟს",
      
      // Apartments Section
      perfectSanctuary: "თქვენი სრულყოფილი თავშესაფარი",
      apartmentsDesc: "აღმოაჩინეთ ჩვენი საგულდაგულოდ დიზაინის აპარტამენტები",
      viewDetails: "დეტალები",
      guests: "სტუმარი",
      bedrooms: "საძინებელი",
      bathrooms: "სააბაზანო",
      perNight: "/ღამე",
      
      // Gallery
      visualJourney: "ᲕᲘᲖᲣᲐᲚᲣᲠᲘ ᲛᲝᲒᲖᲐᲣᲠᲝᲑᲐ",
      galleryTitle: "გალერეა",
      galleryDesc: "გაეცანით ჩვენს ლუქსუზურ აპარტამენტებსა და შთამბეჭდავ ზღვის ხედებს",
      
      // Location
      findUs: "იპოვეთ ჩვენ",
      ourLocation: "ჩვენი მდებარეობა",
      locationDesc: "პრემიუმ მდებარეობა ზღვის პირას, ბათუმის ცენტრში, საქართველოს შავი ზღვის სანაპიროზე",
      getInTouch: "დაგვიკავშირდით",
      address: "მისამართი",
      phone: "ტელეფონი",
      email: "ელ-ფოსტა",
      hours: "სამუშაო საათები",
      
      // Amenities
      worldClass: "ᲛᲡᲝᲤᲚᲘᲝ ᲓᲝᲜᲘᲡ",
      amenitiesTitle: "პრემიუმ პირობები",
      amenitiesDesc: "ისიამოვნეთ ლუქსით ჩვენი განსაკუთრებული პირობებით",
      
      // Testimonials
      testimonials: "რას ამბობენ ჩვენი სტუმრები",
      
      // Footer
      quickLinks: "სწრაფი ბმულები",
      contactInfo: "კონტაქტი",
      allRightsReserved: "ყველა უფლება დაცულია",
      
      // Booking Modal
      bookingTitle: "დაჯავშნეთ თქვენი ყოფნა",
      checkIn: "დაბრუნება",
      checkOut: "გასვლა",
      selectDates: "აირჩიეთ თარიღები",
      fullName: "სრული სახელი",
      emailAddress: "ელ-ფოსტა",
      phoneNumber: "ტელეფონის ნომერი",
      specialRequests: "სპეციალური მოთხოვნები",
      preferredContact: "სასურველი კონტაქტის მეთოდი",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      submitBooking: "დაჯავშნა",
      confirmationMessage: "რამოდენიმე წუთში დაგირეკავთ რეზერვაციების მენეჯერი სართულისა და ბლოკის არჩევისთვის",
      available: "ხელმისაწვდომია",
      
      // Promo Popup
      specialOffer: "სპეციალური 20% ფასდაკლება!",
      promoDesc: "გამოიყენეთ კოდი ექსკლუზიური ფასდაკლებისთვის",
      copyCode: "კოდის კოპირება",
      copied: "დაკოპირდა!",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
