import { readFileSync, writeFileSync } from 'fs';

const filePath = '/home/ubuntu/orbi-city-booking/client/src/pages/Home.tsx';
let content = readFileSync(filePath, 'utf-8');

// Navigation translations
const replacements = [
  // Navigation
  { from: '>Home<', to: '>{t("home")}<' },
  { from: '>Apartments<', to: '>{t("apartments")}<' },
  { from: '>Amenities<', to: '>{t("amenities")}<' },
  { from: '>Gallery<', to: '>{t("gallery")}<' },
  { from: '>Location<', to: '>{t("location")}<' },
  { from: '>Contact<', to: '>{t("contact")}<' },
  { from: '>Loyalty Program<', to: '>{t("loyaltyProgram")}<' },
  { from: '>Blog<', to: '>{t("blog")}<' },
  
  // Hero Section
  { from: '"WELCOME TO ORBI CITY BATUMI"', to: '{t("welcomeTo")}' },
  { from: '"Your Perfect Seaside Escape"', to: '{t("heroTitle")}' },
  { from: '"Experience unparalleled luxury on the shores of the Black Sea"', to: '{t("heroSubtitle")}' },
  { from: '"CHECK RATES"', to: '{t("checkRates")}' },
  { from: '"WhatsApp"', to: '{t("whatsapp")}' },
  
  // Apartments Section
  { from: '"EXCLUSIVE RESIDENCES"', to: '{t("exclusiveResidences")}' },
  { from: '"Discover Your Perfect Sanctuary"', to: '{t("discoverSanctuary")}' },
  { from: '"Each residence is meticulously crafted to offer an unparalleled living experience, where timeless elegance meets contemporary comfort."', to: '{t("sanctuaryDesc")}' },
  { from: '"View Details"', to: '{t("viewDetails")}' },
  { from: '"Guests"', to: '{t("guests")}' },
  { from: '"Bedrooms"', to: '{t("bedrooms")}' },
  
  // Gallery
  { from: '"VISUAL JOURNEY"', to: '{t("visualJourney")}' },
  { from: '"A Glimpse into Our World of Luxury"', to: '{t("glimpseTitle")}' },
  { from: '"Explore Full Gallery"', to: '{t("exploreGallery")}' },
  
  // About Section
  { from: '"Discover Orbi City Batumi"', to: '{t("discoverOrbiCity")}' },
  { from: '"Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort. Located in the heart of Batumi, our serviced apartments combine modern elegance with exceptional hospitality. Whether you\\'re here for business or leisure, experience the perfect blend of comfort, convenience, and coastal beauty."', to: '{t("aboutDesc")}' },
  { from: '"Explore Amenities"', to: '{t("exploreAmenities")}' },
  { from: '"View Location"', to: '{t("viewLocation")}' },
  
  // Virtual Tours
  { from: '"IMMERSIVE EXPERIENCE"', to: '{t("immersiveExperience")}' },
  { from: '"Virtual Tours"', to: '{t("virtualTours")}' },
  { from: '"Take a virtual tour of Orbi City Batumi and explore our stunning apartments and facilities from the comfort of your home."', to: '{t("virtualToursDesc")}' },
  
  // Testimonials
  { from: '"GUEST EXPERIENCES"', to: '{t("guestExperiences")}' },
  { from: '"What Our Guests Say"', to: '{t("whatGuestsSay")}' },
  
  // Location
  { from: '"FIND US"', to: '{t("findUs")}' },
  { from: '"Our Location"', to: '{t("ourLocation")}' },
  { from: '"Perfectly situated in the heart of Batumi, steps away from the Black Sea"', to: '{t("locationDesc")}' },
  { from: '"Address"', to: '{t("address")}' },
  { from: '"Phone"', to: '{t("phone")}' },
  { from: '"Distance from Airport"', to: '{t("distanceFromAirport")}' },
  { from: '"Get Directions"', to: '{t("getDirections")}' },
  
  // Footer
  { from: '"5 Star Aparthotel Orbi City"', to: '{t("aparthotelTitle")}' },
  { from: '"Quick Links"', to: '{t("quickLinks")}' },
  { from: '"Legal"', to: '{t("legal")}' },
  { from: '"About Us"', to: '{t("aboutUs")}' },
  { from: '"Purchase Conditions"', to: '{t("purchaseConditions")}' },
  { from: '"Privacy Policy"', to: '{t("privacyPolicy")}' },
  { from: '"Terms and Conditions"', to: '{t("termsConditions")}' },
  { from: '"All rights reserved"', to: '{t("allRightsReserved")}' },
  
  // Chat
  { from: '"Chat with us!"', to: '{t("chatWithUs")}' },
  
  // Common
  { from: '"Loading..."', to: '{t("loading")}' },
];

// Apply replacements
replacements.forEach(({ from, to }) => {
  content = content.replace(new RegExp(from, 'g'), to);
});

writeFileSync(filePath, content, 'utf-8');
console.log('✅ Translations added successfully!');
