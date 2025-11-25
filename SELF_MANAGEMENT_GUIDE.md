# Self-Management Guide - Orbi City Batumi Website

Complete guide for managing your website independently without developer assistance.

---

## Overview

Your Orbi City Batumi website is built with modern technology that allows you to:
- ✅ Edit code directly in browser (no technical skills required)
- ✅ Manage database (apartments, bookings, gallery) via visual interface
- ✅ Update content (text, images, videos) easily
- ✅ Deploy changes with one click
- ✅ Rollback to previous versions if needed
- ✅ Access everything via GitHub for version control

---

## Management UI Overview

### How to Access

1. **From Chatbox**
   - Click settings icon (⚙️) in top-right corner of chatbox
   - Or click "Dashboard" button on any checkpoint card

2. **Main Panels**
   - **Preview** - Live website preview
   - **Code** - Browse and edit all files
   - **Dashboard** - Analytics, visibility, status
   - **Database** - Manage apartments, bookings, gallery
   - **Settings** - Domain, secrets, notifications, favicon

---

## Editing Content

### Method 1: Management UI (Easiest)

#### Update Text Content

1. **Open Code Panel**
   - Click "Code" in Management UI
   - Navigate to file you want to edit

2. **Common Files to Edit**
   ```
   client/src/pages/Home.tsx          → Homepage content
   client/src/pages/Apartments.tsx    → Apartments page
   client/src/pages/Gallery.tsx       → Gallery page
   client/src/pages/Contact.tsx       → Contact information
   client/src/const.ts                → Site title, logo
   ```

3. **Make Changes**
   - Click file to open editor
   - Find text you want to change
   - Edit directly in browser
   - Click "Save" (Ctrl+S)

4. **Preview Changes**
   - Switch to "Preview" panel
   - Refresh to see updates
   - If looks good, create checkpoint

#### Update Images

1. **Upload New Image**
   - Use image hosting service (Imgur, Cloudinary)
   - Or upload to `/client/public/` folder via Code panel

2. **Update Image URL**
   - Find component using old image
   - Replace `src="/old-image.jpg"` with new URL
   - Save file

3. **Example: Change Hero Video**
   ```tsx
   // In client/src/pages/Home.tsx
   <video src="/hero_loop.mp4" />
   
   // Change to:
   <video src="/new-hero-video.mp4" />
   ```

### Method 2: GitHub (For Advanced Users)

1. **Access Repository**
   - Visit: https://github.com/ORBICITY-SYSTEM/orbi-ai-nexus
   - All checkpoints are automatically synced

2. **Clone Repository**
   ```bash
   git clone https://github.com/ORBICITY-SYSTEM/orbi-ai-nexus.git
   cd orbi-ai-nexus
   ```

3. **Make Changes Locally**
   ```bash
   # Edit files in your favorite editor
   code client/src/pages/Home.tsx
   
   # Test locally
   pnpm install
   pnpm dev
   ```

4. **Push Changes**
   ```bash
   git add .
   git commit -m "Update homepage hero section"
   git push origin main
   ```

5. **Deploy via Management UI**
   - Changes appear in Code panel
   - Create checkpoint to deploy

---

## Database Management

### Apartments

#### Add New Apartment

1. **Open Database Panel**
   - Click "Database" in Management UI
   - Select "apartments" table

2. **Click "Add Row"**
   - Fill in fields:
     - **name**: "Deluxe Sea View Suite"
     - **type**: "Suite"
     - **description**: Full description
     - **shortDescription**: Brief summary
     - **pricePerNight**: 15000 (in cents, = $150)
     - **maxGuests**: 4
     - **bedrooms**: 2
     - **bathrooms**: 2
     - **area**: 85 (square meters)
     - **imageUrl**: https://...
     - **features**: "Sea View, Balcony, Kitchen"

3. **Save**
   - Click "Save" button
   - New apartment appears on website immediately

#### Edit Existing Apartment

1. **Find Apartment**
   - Search by name or ID
   - Click row to open editor

2. **Update Fields**
   - Change price: Update `pricePerNight`
   - Change description: Edit `description` field
   - Add features: Update `features` (comma-separated)

3. **Save Changes**
   - Click "Save"
   - Changes reflect immediately

#### Delete Apartment

1. **Select Apartment**
   - Click checkbox next to apartment
   - Click "Delete" button

2. **Confirm**
   - Confirm deletion
   - Apartment removed from website

### Bookings

#### View All Bookings

1. **Open Database Panel**
   - Select "bookings" table
   - See all reservations

2. **Booking Information**
   - Guest name, email, phone
   - Check-in/check-out dates
   - Apartment booked
   - Total price
   - Contact method preference
   - Special requests
   - Status (pending/confirmed/completed)

#### Update Booking Status

1. **Find Booking**
   - Search by guest name or date
   - Click to open

2. **Change Status**
   - **pending** → **confirmed** (after calling guest)
   - **confirmed** → **completed** (after checkout)
   - **pending** → **cancelled** (if guest cancels)

3. **Save**
   - Status updates immediately

### Gallery

#### Add Photos

1. **Upload Image**
   - Use image hosting or `/client/public/`
   - Get image URL

2. **Add to Database**
   - Open "gallery_items" table
   - Click "Add Row"
   - Fields:
     - **title**: "Luxury Pool Area"
     - **description**: Optional description
     - **imageUrl**: https://...
     - **category**: "amenities" (or "apartments", "exterior", "dining")
     - **order**: 1 (display order)

3. **Save**
   - Photo appears in Gallery page

#### Organize Photos

1. **Change Order**
   - Edit `order` field (1, 2, 3...)
   - Lower numbers appear first

2. **Categorize**
   - Update `category` field
   - Categories: apartments, amenities, exterior, dining, views

---

## Deployment Workflow

### Creating Checkpoints

**Checkpoints** are snapshots of your website. Think of them as "Save Points" in a video game.

1. **When to Create Checkpoint**
   - After adding new feature
   - After fixing bug
   - Before making risky changes
   - Before deploying to production

2. **How to Create**
   - In Management UI, click "Create Checkpoint"
   - Add description: "Updated apartment prices"
   - Click "Save"

3. **Checkpoint Benefits**
   - Version history
   - Easy rollback
   - Required for publishing

### Publishing to Production

1. **Create Checkpoint First**
   - Must have checkpoint to publish
   - Latest checkpoint will be deployed

2. **Click "Publish" Button**
   - Located in Management UI header (top-right)
   - Only appears after creating checkpoint

3. **Confirm**
   - Review changes
   - Click "Publish"
   - Website updates in 30-60 seconds

4. **Verify**
   - Visit https://orbicitybatumi.com
   - Check changes are live
   - Test booking system

### Rolling Back

If something goes wrong after deployment:

1. **Find Previous Checkpoint**
   - Scroll through checkpoint cards in chatbox
   - Or view in Management UI → Dashboard

2. **Click "Rollback" Button**
   - Appears on older checkpoints
   - Confirm rollback

3. **Publish Again**
   - Create new checkpoint
   - Click "Publish"

---

## Common Tasks

### Change Website Title

1. **Edit const.ts**
   ```tsx
   // client/src/const.ts
   export const APP_TITLE = "Orbi City Batumi - Luxury Aparthotel";
   
   // Change to:
   export const APP_TITLE = "Your New Title";
   ```

2. **Save and Deploy**

### Change Logo

1. **Upload New Logo**
   - Add to `/client/public/new-logo.png`

2. **Update const.ts**
   ```tsx
   // client/src/const.ts
   export const APP_LOGO = "/new-logo.png";
   ```

3. **Update Favicon**
   - Management UI → Settings → General
   - Upload new favicon image
   - Save

### Update Contact Information

1. **Edit Contact.tsx**
   ```tsx
   // client/src/pages/Contact.tsx
   
   // Find contact details section
   <p>+995 555 123 456</p>
   
   // Change to your number
   <p>+995 XXX XXX XXX</p>
   ```

2. **Update Google Maps**
   ```tsx
   // client/src/components/OrbiCityMap.tsx
   
   // Update coordinates if location changes
   center: { lat: 41.6394, lng: 41.6138 }
   ```

### Add New Page

1. **Create Page File**
   ```tsx
   // client/src/pages/NewPage.tsx
   export default function NewPage() {
     return (
       <div className="min-h-screen">
         <h1>New Page</h1>
         <p>Content here</p>
       </div>
     );
   }
   ```

2. **Add Route**
   ```tsx
   // client/src/App.tsx
   import NewPage from "./pages/NewPage";
   
   // Add route
   <Route path="/new-page" component={NewPage} />
   ```

3. **Add to Navigation**
   ```tsx
   // client/src/pages/Home.tsx (or navigation component)
   <Link href="/new-page">New Page</Link>
   ```

### Update Prices

1. **Database Method** (Recommended)
   - Open Database → apartments
   - Edit `pricePerNight` field
   - Remember: prices are in cents (15000 = $150)

2. **Code Method**
   - If prices are hardcoded in components
   - Search for price values
   - Update and save

---

## Troubleshooting

### Changes Not Appearing

**Problem:** Made changes but website looks the same

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check if you created checkpoint and published
4. Wait 1-2 minutes for deployment

### Database Changes Not Saving

**Problem:** Edited database but changes don't persist

**Solutions:**
1. Check if you clicked "Save" button
2. Verify no validation errors (red text)
3. Check required fields are filled
4. Try refreshing Database panel

### Website Broken After Edit

**Problem:** Made code change and now website shows error

**Solutions:**
1. Check browser console for error message (F12)
2. Rollback to previous checkpoint
3. Review syntax errors (missing brackets, quotes)
4. Ask for help with specific error message

---

## Best Practices

### Before Making Changes

1. ✅ Create checkpoint (backup)
2. ✅ Test in Preview panel first
3. ✅ Make small changes incrementally
4. ✅ Document what you changed

### After Making Changes

1. ✅ Test thoroughly in Preview
2. ✅ Check mobile responsiveness
3. ✅ Create descriptive checkpoint
4. ✅ Publish during low-traffic hours

### Database Management

1. ✅ Never delete bookings (archive instead)
2. ✅ Backup data before bulk changes
3. ✅ Use consistent naming conventions
4. ✅ Test booking flow after apartment changes

---

## Getting Help

### Manus Support

- **Help Center**: https://help.manus.im
- **Email**: support@manus.im
- **Response Time**: 24-48 hours

### GitHub Issues

- **Repository**: https://github.com/ORBICITY-SYSTEM/orbi-ai-nexus
- **Create Issue**: Click "Issues" → "New Issue"
- **Include**: Error message, steps to reproduce, screenshots

### Community Resources

- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **tRPC**: https://trpc.io/docs

---

## Next Steps

Now that you can manage the website independently:

1. **Practice Editing**
   - Make small text changes
   - Update an apartment price
   - Add a photo to gallery

2. **Monitor Performance**
   - Check Google Analytics weekly
   - Review booking conversion rate
   - Respond to guest reviews

3. **Continuous Improvement**
   - Add new apartments as available
   - Update photos seasonally
   - Create blog posts for SEO
   - Run promotions via promo popup

---

**Remember:** You have full control! Don't be afraid to experiment - you can always rollback to a previous checkpoint.

**Questions?** Contact Manus support at https://help.manus.im
