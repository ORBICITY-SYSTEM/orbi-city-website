# Orbi City Booking Website - TODO

## URGENT: Rebuild with Real Data from orbicitybatumi.com

- [x] Download real apartment images from orbicitybatumi.com
- [x] Update database with correct apartment data (real prices $45-65/night, sizes 33-77sqm)
- [x] Fix apartment names: Suite with Sea View, Delux Suite, Superior Suite, Superior Family Suite, Two Bedroom Panoramic Suite
- [x] Update hero section tagline to "Your Perfect Seaside Escape"
- [x] Match color scheme to original (blue and gold/yellow accents)
- [x] Add correct contact info (Phone: +995 555 19 90 90, Email: info@orbicitybatumi.com)
- [x] Update navigation: Home, Apartments, Amenities, Gallery, Location, Contact, Loyalty Program, Blog
- [x] Add WhatsApp button integration
- [x] Update amenities section with real amenities (Restaurant, WiFi, Security, Concierge)
- [x] Add real testimonial from Sarah Johnson, UK
- [ ] Add loyalty program section
- [x] Update footer with real address: Orbi City, Block C, Khimshiashvili St, Batumi

## Phase 1: Database Schema & Backend
- [x] Design apartments table
- [x] Design bookings table
- [x] Design amenities table
- [x] Design gallery table
- [x] Create tRPC procedures for apartments listing
- [x] Create tRPC procedures for booking management
- [x] Create tRPC procedures for availability checking
- [x] Re-seed database with REAL apartment data

## Phase 2: Landing Page & Hero Section
- [x] Design hero section with parallax
- [x] Implement WebGL background with Three.js
- [x] Add smooth scroll animations with GSAP
- [x] Update hero with REAL tagline and content
- [x] Match original website design

## Phase 3: Apartments Showcase
- [x] Create apartment cards
- [x] Create detailed apartment pages
- [x] Update with REAL apartment photos
- [x] Update with REAL prices and sizes
- [x] Fix apartment names and descriptions

## Phase 4: Booking System
- [x] Design booking flow UI
- [x] Implement interactive calendar with availability
- [x] Add guest counter
- [x] Create price calculator
- [x] Build multi-step booking form
- [x] Add booking confirmation page

## Phase 5: Additional Sections
- [ ] Add Amenities page
- [ ] Add Gallery page
- [ ] Add Location page with map
- [ ] Add Contact page
- [ ] Add Loyalty Program page
- [ ] Add Blog section

## Phase 6: Testing & Deployment
- [ ] Test all functionality
- [ ] Optimize performance
- [ ] Create checkpoint


## NEW FEATURE: 3D Virtual Tour
- [x] Generate 360-degree panoramic images for each premium apartment
- [x] Create VirtualTour component with Three.js for 360° viewing
- [x] Add hotspot navigation between rooms
- [x] Implement zoom and pan controls
- [x] Add "Virtual Tour" button to apartment detail pages
- [x] Create fullscreen mode for immersive experience
- [x] Add loading states and error handling
- [x] Test virtual tour on mobile and desktop


## CRITICAL: Missing Pages for Production
- [x] Create Apartments listing page (separate from home)
- [x] Create Gallery page with lightbox and categories
- [x] Create Amenities page with detailed descriptions
- [x] Create Location page with Google Maps integration
- [x] Create Contact page with contact form
- [ ] Create Loyalty Program page
- [ ] Create Blog page/section
- [x] Fix navigation to link all pages correctly
- [x] Test all page transitions and links
- [x] Ensure mobile responsiveness on all pages


## CRITICAL: Missing Legal & Content Pages
- [x] Create About Us page
- [x] Create Purchase Conditions page
- [x] Create Privacy Policy page
- [x] Create Terms and Conditions page
- [x] Create Loyalty Program page (from navigation)
- [x] Create Blog page (from navigation)
- [x] Update ALL footers to include Legal section with links
- [x] Test all legal page links

## Live Chat Widget
- [x] Create LiveChatWidget component with floating button
- [x] Add chat message UI with message bubbles
- [x] Add database schema for chat_sessions and chat_messages tables
- [x] Create tRPC procedures for sending/receiving messages
- [x] Integrate chat widget globally in App.tsx
- [x] Add admin chat management page at /admin/chat
- [x] Add real-time message notifications for admin
- [x] Test chat functionality end-to-end

## Domain Connection & SEO Integration
- [ ] Connect orbicitybatumi.com domain via Hostinger DNS
- [ ] Create sitemap.xml for all pages
- [x] Submit sitemap to Google Search Console
- [x] Integrate Google Analytics 4 tracking
- [ ] Enhance Schema Markup for SEO
- [ ] Test domain connection and SSL
- [ ] Verify Google Search Console integration
- [ ] Verify Google Analytics tracking

## Google Search Console & Analytics Setup
- [x] Create comprehensive sitemap.xml
- [x] Create robots.txt file
- [x] Setup Google Search Console
- [x] Submit sitemap to Google Search Console
- [x] Integrate Google Analytics 4 tracking
- [x] Enhance Schema Markup for all pages
- [x] Document Google Workspace Enterprise integration
- [x] Test all SEO integrations

## UX Improvements
- [ ] Remove "Made with Manus" badge
- [x] Optimize website load speed
- [x] Remove popup
- [x] Remove "Explore Residences" button
- [x] Keep only "Book Now" (blue) and "WhatsApp" (green) buttons
- [x] Make apartment cards clickable to detail pages (entire card area, not just buttons)
- [x] Change "Book Now" to "Book Now / Pay Later"
- [x] Add "View Details" button to apartment cards
- [x] Create apartment detail pages with 6-image sliders

## Performance Optimization
- [x] Implement lazy loading for all images across the website
- [x] Add loading="lazy" attribute to all img tags
- [x] Enable code splitting with React.lazy() for page components
- [x] Add Suspense boundaries with loading skeletons
- [x] Test performance improvements on mobile and desktop
- [x] Verify images load progressively during scroll

## Four Seasons Booking System Redesign
- [ ] Replace all "Book Now / Pay Later" buttons with "CHECK RATES"
- [ ] Change button colors from blue to black/white Four Seasons style
- [ ] Update WhatsApp button to transparent green style
- [ ] Create new booking flow with Check In - Check Out date picker
- [ ] Add Guests selector (Adults + Children)
- [ ] Add Promo Code field
- [ ] Implement calendar with availability display
- [ ] Show all room categories with "CHOOSE" button
- [ ] Create confirmation message: "Your booking request has been received! Our reservations manager will contact you regarding rates and other details. Thank you for your interest in staying with us."
- [ ] Save booking requests to database (admin panel)
- [ ] Send email notification to info@orbicitybatumi.com with subject "ჯავშნის მოთხოვნა ვებ საიტი"
- [ ] Test entire booking flow end-to-end

## Four Seasons Booking System Redesign
- [x] Replace all "Book Now / Pay Later" buttons with "CHECK RATES"
- [x] Change button colors from blue to black/white Four Seasons style
- [x] Update WhatsApp button to transparent green style
- [x] Create new booking flow with Check In - Check Out date picker
- [x] Add Guests selector (Adults + Children)
- [x] Add Promo Code field
- [x] Implement calendar with availability display
- [x] Show all room categories with "CHOOSE" button
- [x] Create confirmation message: "Your booking request has been received! Our reservations manager will contact you regarding rates and other details. Thank you for your interest in staying with us."
- [x] Save booking requests to database (admin panel)
- [x] Send email notification to info@orbicitybatumi.com with subject "ჯავშნის მოთხოვნა - orbicitybatumi.com"
- [x] Test entire booking flow end-to-end

## Simplified Booking Flow (WhatsApp Direct)
- [x] Remove price information from room selection (Avg. price per night, USD amount, Resort Fee text)
- [x] Change CHOOSE button to redirect directly to WhatsApp
- [x] WhatsApp message should include: dates, room type, number of guests
- [x] Send booking request notification to admin panel with all details
- [x] Send email to info@orbicitybatumi.com with booking request details
- [x] Admin will manually provide price quotes to guests via WhatsApp
- [x] Test complete flow: select dates → select room → WhatsApp redirect → receive notification

## UI/UX Improvements & Content Updates
- [x] Fix map location - add exact Orbi City Batumi coordinates (single marker only)
- [x] Add hotel room video to hero section as 3rd frame (3-second cycle)
- [ ] Replace duplicate images in "A Glimpse into Our World of Luxury" gallery (section not found on site)
- [x] Remove "World-Class Amenities" section from home page
- [x] Remove "Ready to Experience Luxury?" CTA section with blue button
- [x] Add booking filters to admin panel (date, room type, status)
- [x] Create /admin/bookings page with filters for date, room type, and status
