# Admin Panel & CMS Development TODO

## Phase 1: Database Schema for CMS
- [x] Create `site_settings` table (hero_title, hero_subtitle, contact_email, contact_phone, etc.)
- [x] Create `blog_posts` table (id, title, slug, content, author, featured_image, published_at, status)
- [x] Create `testimonials` table (id, name, country, rating, comment, image, is_featured)
- [x] Create `amenities` table (id, name, icon, description, is_featured)
- [x] Create `gallery_images` table (id, category, image_url, title, description, sort_order)
- [x] Add `is_published` field to apartments table
- [x] Push database schema changes

## Phase 2: Admin Dashboard Layout
- [x] Create `/admin` route with authentication check
- [x] Build Admin sidebar navigation
- [x] Create Admin dashboard homepage with statistics
- [ ] Add breadcrumb navigation
- [x] Create responsive admin layout

## Phase 3: Apartments Management
- [x] Create apartments list page with search/filter
- [x] Build apartment create form with image upload
- [x] Build apartment edit form
- [x] Add apartment delete functionality
- [ ] Implement apartment publish/unpublish toggle
- [ ] Add bulk actions (delete, publish, unpublish)
- [ ] Add apartment image gallery management

## Phase 4: Gallery Management
- [x] Create gallery images list with categories
- [x] Build image upload component (drag & drop)
- [x] Add image edit (title, description, category)
- [x] Add image delete functionality
- [ ] Implement image reordering (drag & drop)
- [x] Add bulk image upload
- [x] Add image categories management

## Phase 5: Blog Management
- [ ] Create blog posts list page
- [ ] Build blog post create form with rich text editor
- [ ] Build blog post edit form
- [ ] Add featured image upload
- [ ] Add blog post delete functionality
- [ ] Implement publish/draft status
- [ ] Add blog categories/tags management
- [ ] Add SEO fields (meta title, description)

## Phase 6: Site Settings
- [ ] Create settings page with tabs
- [ ] Add Hero section settings (title, subtitle, background image)
- [ ] Add Contact information settings
- [ ] Add Social media links settings
- [ ] Add SEO settings (site title, description, keywords)
- [ ] Add Logo upload
- [ ] Add Favicon upload
- [ ] Add Google Analytics ID field

## Phase 7: Testimonials Management
- [ ] Create testimonials list page
- [ ] Build testimonial create form
- [ ] Build testimonial edit form
- [ ] Add testimonial delete functionality
- [ ] Add featured toggle
- [ ] Add testimonial image upload

## Phase 8: Amenities Management
- [ ] Create amenities list page
- [ ] Build amenity create form
- [ ] Build amenity edit form
- [ ] Add amenity delete functionality
- [ ] Add icon selector/upload
- [ ] Add featured toggle

## Phase 9: User & Role Management
- [ ] Create users list page (admin only)
- [ ] Add user role field (admin/manager/user)
- [ ] Implement role-based access control
- [ ] Add user edit functionality (admin only)
- [ ] Add user delete functionality (admin only)

## Phase 10: Bookings Management
- [ ] Create bookings list page with filters
- [ ] Add booking status management (pending, confirmed, cancelled)
- [ ] Add booking details view
- [ ] Add booking edit functionality
- [ ] Add booking cancellation
- [ ] Add booking export (CSV/Excel)

## Phase 11: Analytics Dashboard
- [ ] Add total bookings widget
- [ ] Add revenue widget
- [ ] Add popular apartments widget
- [ ] Add recent bookings list
- [ ] Add booking chart (daily/weekly/monthly)
- [ ] Add occupancy rate chart

## Phase 12: File Manager
- [ ] Create file manager page
- [ ] Add file upload functionality
- [ ] Add folder creation
- [ ] Add file/folder delete
- [ ] Add file preview
- [ ] Add file search

## Phase 13: Testing & Polish
- [ ] Test all CRUD operations
- [ ] Test file uploads
- [ ] Test role-based access
- [ ] Test responsive design
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success notifications
- [ ] Add confirmation dialogs for delete actions

## Frontend Inline Editing
- [x] Remove prices from apartment cards on Home page
- [ ] Remove prices from Apartments listing page
- [x] Add Edit button to apartment cards (visible only to admins)
- [x] Create inline edit dialog for apartments
- [x] Test inline editing functionality

## Admin Panel Navigation
- [x] Add "View Site" button to Admin Panel header
- [x] Add "Edit Mode" toggle on frontend for admins
- [x] Add visual indicator when Edit Mode is active
- [x] Make edit buttons conditional on Edit Mode state
