# ORBI CITY WEBSITE - COMPLETE FIX LIST

## CRITICAL FIXES - Must Complete

### Logo & Branding
- [x] Download real circular green Orbi City logo from orbicitybatumi.com
- [x] Replace "OC" logo with real logo in const.ts
- [ ] Replace favicon with real logo

### Hero Section
- [x] Download real aerial Batumi coastline photo
- [x] Replace hero background with real photo
- [x] Add WhatsApp button next to Book Now button
- [x] Ensure WhatsApp button is purple/magenta color

### Navigation
- [x] Add language selector (EN dropdown) to header
- [x] Ensure Gallery link works in main navigation
- [x] Ensure Location link works in main navigation
- [x] Ensure Loyalty Program link works
- [x] Ensure Blog link works

### Apartment Images
- [x] Download real Suite with Sea View bedroom image
- [x] Download real Delux Suite living room image
- [x] Download real Superior Suite seating area image
- [x] Download real Superior Family Suite image
- [x] Download real Two Bedroom Panoramic Suite image
- [x] Replace ALL apartment card images with real photos
- [x] Update apartment detail pages with real photos

### Home Page - Missing Sections
- [x] Add Gallery Preview section (6 images grid)
- [x] Add Loyalty Program section (4 features + image)
- [x] Add About section (text + Orbi City building image)
- [x] Add CTA section before footer (Batumi sunset image + contact button)

### Gallery Section on Home
- [x] Download 6 gallery preview images
- [x] Create gallery grid component
- [x] Add "View Gallery" button
- [x] Link to full Gallery page

### Loyalty Program Section on Home
- [x] Add 4 feature cards with icons (Bonus, Discounts, Earn, Access)
- [x] Add loyalty program image
- [x] Add "Join Now" or similar button
- [x] Link to Loyalty Program page

### About Section on Home
- [x] Add about text/description
- [x] Download Orbi City building image
- [x] Add "Learn More" button

### CTA Section
- [x] Download Batumi sunset/cityscape image
- [x] Add CTA title and subtitle
- [x] Add purple/magenta "Contact Us" button
- [x] Position before footer

### Amenities Section
- [x] Add "Learn More" button at bottom

### Footer
- [x] Add scroll-to-top button
- [x] Verify all footer links work

## TESTING
- [ ] Test all navigation links
- [ ] Test all buttons
- [ ] Test language selector
- [ ] Test WhatsApp integration
- [ ] Test responsive design
- [ ] Test all images load correctly
- [ ] Compare side-by-side with original site


---

## NEW ISSUES FROM COMPREHENSIVE ANALYSIS

### Phase 1: Gallery Images & Database
- [ ] Upload 20 gallery images to S3
- [ ] Seed gallery_images table with uploaded images
- [ ] Verify Gallery page displays images correctly
- [ ] Add Empty State UI when gallery is empty

### Phase 2: Critical Navigation Issues  
- [ ] Add Mobile Navigation Menu (hamburger + drawer)
- [ ] Add Navigation Header to Blog page
- [ ] Fix Book Now links (change /#book to /apartments)
- [ ] Add Book button to Apartment Detail page

### Phase 3: UI Consistency
- [ ] Remove prices from Apartments page
- [ ] Improve Edit Mode button styling (less intrusive)
- [ ] Fix mobile responsive issues on Gallery grid
- [ ] Fix mobile responsive issues on Apartment cards

### Phase 4: Blog Database Integration
- [ ] Create blog tRPC procedures (list, create, update, delete)
- [ ] Add Blog Management page to Admin Panel
- [ ] Connect Blog page to database
- [ ] Seed database with default blog posts
- [ ] Add Edit Mode to Blog page

### Phase 5: Contact & Testimonials
- [ ] Create contact_messages table in schema
- [ ] Add Contact form database integration
- [ ] Add Messages section to Admin Panel
- [ ] Create testimonials table in schema
- [ ] Add Testimonials Management to Admin Panel
- [ ] Connect Home page testimonials to database

### Phase 6: Booking System Improvements
- [ ] Add visual calendar (date picker component)
- [ ] Improve availability checking logic
- [ ] Add Stripe payment integration
- [ ] Add Bookings Dashboard to Admin Panel
- [ ] Add payment_status and payment_method fields to bookings table

### Phase 7: Search & Filters
- [ ] Add search bar for apartments
- [ ] Add price range filter slider
- [ ] Add guests count filter
- [ ] Add amenities checkbox filter

### Phase 8: Legal Pages & SEO
- [ ] Fill About Us page with real content
- [ ] Fill Privacy Policy page
- [ ] Fill Terms & Conditions page
- [ ] Fill Purchase Conditions page
- [ ] Add meta tags to all pages
- [ ] Add Open Graph tags for social sharing
- [ ] Create sitemap.xml
- [ ] Add robots.txt

### Phase 9: Performance & Polish
- [ ] Add image lazy loading attribute
- [ ] Optimize image sizes
- [ ] Add loading skeletons for data fetching
- [ ] Test all pages on mobile devices
- [ ] Final QA testing across all browsers
