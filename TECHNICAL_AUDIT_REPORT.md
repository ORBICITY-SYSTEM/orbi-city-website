# 🔍 TECHNICAL AUDIT REPORT - ORBI CITY BOOKING WEBSITE

**Date:** November 25, 2025  
**Status:** Critical Issues Identified  
**Priority:** High - Immediate Action Required

---

## 🚨 CRITICAL ISSUES (Must Fix Immediately)

### 1. **Nested Anchor Tags Error (ACTIVE BUG)**
**Severity:** 🔴 Critical  
**Location:** `client/src/pages/Home.tsx` - Navigation header  
**Issue:** `<Link>` component wrapping `<a>` tags causing React hydration errors  
**Impact:** Console errors, potential SEO issues, invalid HTML

**Current Code:**
```tsx
<Link href="/">
  <a className="flex items-center gap-2">
    ORBI CITY
  </a>
</Link>
```

**Fix Required:**
```tsx
<Link href="/">
  <span className="flex items-center gap-2 cursor-pointer">
    ORBI CITY
  </span>
</Link>
```

**Files to Fix:**
- `client/src/pages/Home.tsx` - All navigation links
- Check all other pages for same pattern

---

### 2. **No Input Validation on Backend**
**Severity:** 🔴 Critical  
**Location:** `server/routers.ts` - All mutation procedures  
**Issue:** Missing validation for:
- Email format validation
- Phone number format
- Date range validation (checkIn < checkOut)
- Price validation (must be positive)
- String length limits
- SQL injection protection (partially handled by Drizzle)

**Example - Booking Creation:**
```typescript
// CURRENT - No validation
bookings: router({
  create: protectedProcedure
    .input(z.object({
      apartmentId: z.number(),
      guestEmail: z.string(), // ❌ No email format check
      checkIn: z.string(), // ❌ No date validation
      checkOut: z.string(), // ❌ No date validation
      totalPrice: z.number(), // ❌ No positive number check
    }))
```

**Required Fixes:**
```typescript
// IMPROVED - With validation
.input(z.object({
  apartmentId: z.number().positive(),
  guestEmail: z.string().email().max(320),
  guestPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  totalPrice: z.number().positive().int(),
}))
.mutation(async ({ input, ctx }) => {
  // Additional business logic validation
  const checkIn = new Date(input.checkIn);
  const checkOut = new Date(input.checkOut);
  
  if (checkOut <= checkIn) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Check-out date must be after check-in date'
    });
  }
  
  if (checkIn < new Date()) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Check-in date cannot be in the past'
    });
  }
  
  // ... rest of logic
})
```

---

### 3. **No Error Handling in Database Functions**
**Severity:** 🔴 Critical  
**Location:** `server/db.ts` - All CRUD functions  
**Issue:** Database operations can fail silently or crash the server

**Current Pattern:**
```typescript
export async function createApartment(apartment: InsertApartment): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(apartments).values(apartment); // ❌ No try-catch
  return result;
}
```

**Required Pattern:**
```typescript
export async function createApartment(apartment: InsertApartment): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const result = await db.insert(apartments).values(apartment);
    return result;
  } catch (error: any) {
    console.error("[Database] Failed to create apartment:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error("An apartment with this name already exists");
    }
    throw new Error("Failed to create apartment. Please try again.");
  }
}
```

**Apply to all functions:**
- `createApartment`, `updateApartment`, `deleteApartment`
- `createBooking`, `updateBooking`
- `createGalleryItem`, `updateGalleryItem`, `deleteGalleryItem`
- `createBlogPost`, `updateBlogPost`, `deleteBlogPost`

---

### 4. **Missing Foreign Key Constraints**
**Severity:** 🔴 Critical  
**Location:** `drizzle/schema.ts`  
**Issue:** No referential integrity between tables

**Current Schema:**
```typescript
export const bookings = mysqlTable("bookings", {
  apartmentId: int("apartmentId").notNull(), // ❌ No foreign key
  userId: int("userId").notNull(), // ❌ No foreign key
  // ...
});
```

**Required Schema:**
```typescript
import { foreignKey } from "drizzle-orm/mysql-core";

export const bookings = mysqlTable("bookings", {
  apartmentId: int("apartmentId").notNull().references(() => apartments.id, { onDelete: 'cascade' }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  // ...
});

export const blogPosts = mysqlTable("blog_posts", {
  authorId: int("authorId").notNull().references(() => users.id, { onDelete: 'cascade' }),
  // ...
});
```

**Impact:** Can create bookings for non-existent apartments/users, orphaned records

---

### 5. **No Rate Limiting or CSRF Protection**
**Severity:** 🔴 Critical  
**Location:** Backend API endpoints  
**Issue:** Vulnerable to:
- Brute force attacks on booking creation
- Spam submissions
- DDoS attacks

**Required:** Implement rate limiting middleware
```typescript
import rateLimit from 'express-rate-limit';

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many booking attempts, please try again later'
});

// Apply to booking endpoints
```

---

## ⚠️ HIGH PRIORITY ISSUES

### 6. **No Loading States on Frontend**
**Severity:** 🟡 High  
**Location:** Multiple pages  
**Issue:** Users see blank screens during data loading

**Current:**
```tsx
const { data: apartments } = trpc.apartments.list.useQuery();
// ❌ No loading indicator shown
return <div>{apartments?.map(...)}</div>
```

**Required:**
```tsx
const { data: apartments, isLoading, error } = trpc.apartments.list.useQuery();

if (isLoading) {
  return <div className="flex justify-center p-8">
    <Loader2 className="animate-spin" />
  </div>;
}

if (error) {
  return <div className="text-red-500 p-4">
    Failed to load apartments: {error.message}
  </div>;
}

return <div>{apartments?.map(...)}</div>
```

**Apply to:**
- Home.tsx (apartments list)
- Apartments.tsx (apartments list)
- Gallery.tsx (gallery images)
- Blog.tsx (blog posts)
- Admin pages (all data fetching)

---

### 7. **No Form Validation on Frontend**
**Severity:** 🟡 High  
**Location:** Contact form, Booking form  
**Issue:** Users can submit invalid data

**Required:** Add form validation library
```bash
pnpm add react-hook-form @hookform/resolvers zod
```

**Example:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  checkIn: z.date().min(new Date(), "Check-in must be in the future"),
  checkOut: z.date(),
}).refine(data => data.checkOut > data.checkIn, {
  message: "Check-out must be after check-in",
  path: ["checkOut"]
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(bookingSchema)
});
```

---

### 8. **Missing Error Boundaries**
**Severity:** 🟡 High  
**Location:** React component tree  
**Issue:** One component error crashes entire app

**Current:** Only one ErrorBoundary at App level  
**Required:** Add error boundaries for each major section

```tsx
// Create SectionErrorBoundary component
class SectionErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Section error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">
        Something went wrong in this section. Please refresh the page.
      </div>;
    }
    return this.props.children;
  }
}

// Wrap major sections
<SectionErrorBoundary>
  <ApartmentsList />
</SectionErrorBoundary>
```

---

### 9. **No Booking Conflict Prevention**
**Severity:** 🟡 High  
**Location:** `server/db.ts` - createBooking  
**Issue:** Can double-book same apartment for overlapping dates

**Required:** Add availability check
```typescript
export async function createBooking(booking: InsertBooking): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check for conflicts
  const conflicts = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.apartmentId, booking.apartmentId),
        ne(bookings.status, 'cancelled'),
        or(
          // New booking starts during existing booking
          and(
            lte(bookings.checkIn, booking.checkIn),
            gte(bookings.checkOut, booking.checkIn)
          ),
          // New booking ends during existing booking
          and(
            lte(bookings.checkIn, booking.checkOut),
            gte(bookings.checkOut, booking.checkOut)
          ),
          // New booking encompasses existing booking
          and(
            gte(bookings.checkIn, booking.checkIn),
            lte(bookings.checkOut, booking.checkOut)
          )
        )
      )
    );
  
  if (conflicts.length > 0) {
    throw new Error("This apartment is not available for the selected dates");
  }
  
  try {
    const result = await db.insert(bookings).values(booking);
    return result[0].insertId;
  } catch (error) {
    console.error("[Database] Failed to create booking:", error);
    throw new Error("Failed to create booking. Please try again.");
  }
}
```

---

### 10. **No Image Upload Validation**
**Severity:** 🟡 High  
**Location:** `server/upload.ts`  
**Issue:** Can upload any file type, any size

**Required Validation:**
```typescript
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});
```

---

## 📊 MEDIUM PRIORITY ISSUES

### 11. **No Database Indexes**
**Severity:** 🟠 Medium  
**Impact:** Slow queries as data grows

**Required Indexes:**
```sql
-- Bookings queries
CREATE INDEX idx_bookings_apartment_dates ON bookings(apartmentId, checkIn, checkOut);
CREATE INDEX idx_bookings_user ON bookings(userId);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Gallery queries
CREATE INDEX idx_gallery_category ON gallery(category);

-- Blog queries
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status_published ON blog_posts(status, publishedAt);
```

---

### 12. **No Caching Strategy**
**Severity:** 🟠 Medium  
**Issue:** Every page load hits database

**Recommended:** Add React Query caching
```typescript
// In main.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

---

### 13. **No Logging System**
**Severity:** 🟠 Medium  
**Issue:** Hard to debug production issues

**Recommended:** Add structured logging
```bash
pnpm add winston
```

```typescript
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Usage
logger.info('Booking created', { bookingId, userId, apartmentId });
logger.error('Database error', { error: error.message, stack: error.stack });
```

---

### 14. **No Email Notifications**
**Severity:** 🟠 Medium  
**Issue:** Users don't receive booking confirmations

**Required:** Implement email service
```typescript
// After booking creation
await sendBookingConfirmation({
  to: booking.guestEmail,
  bookingDetails: {
    apartmentName,
    checkIn,
    checkOut,
    totalPrice,
  }
});
```

---

### 15. **No SEO Optimization**
**Severity:** 🟠 Medium  
**Issue:** Poor search engine visibility

**Required:**
- Add meta tags to all pages
- Implement sitemap.xml
- Add robots.txt
- Use semantic HTML
- Add structured data (JSON-LD)

```tsx
// Add to each page
<Helmet>
  <title>Luxury Aparthotel in Batumi | Orbi City</title>
  <meta name="description" content="Book your luxury apartment..." />
  <meta property="og:title" content="..." />
  <meta property="og:image" content="..." />
</Helmet>
```

---

## 🔧 RECOMMENDED IMPROVEMENTS

### 16. **Add TypeScript Strict Mode**
**File:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### 17. **Add API Documentation**
Use tRPC's built-in documentation or add Swagger

### 18. **Add Unit Tests**
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

### 19. **Add E2E Tests**
```bash
pnpm add -D playwright
```

### 20. **Add Performance Monitoring**
- Add Lighthouse CI
- Monitor Core Web Vitals
- Add error tracking (Sentry)

---

## 📋 IMPLEMENTATION PRIORITY

### Phase 1 (Immediate - This Week)
1. ✅ Fix nested anchor tags error
2. ✅ Add input validation to all tRPC procedures
3. ✅ Add try-catch to all database functions
4. ✅ Add loading states to all pages
5. ✅ Add booking conflict prevention

### Phase 2 (High Priority - Next Week)
6. ✅ Add foreign key constraints to schema
7. ✅ Add form validation with react-hook-form
8. ✅ Add error boundaries to major sections
9. ✅ Add image upload validation
10. ✅ Add rate limiting

### Phase 3 (Medium Priority - This Month)
11. ✅ Add database indexes
12. ✅ Implement caching strategy
13. ✅ Add logging system
14. ✅ Add email notifications
15. ✅ SEO optimization

### Phase 4 (Long Term)
16. ✅ TypeScript strict mode
17. ✅ API documentation
18. ✅ Unit tests
19. ✅ E2E tests
20. ✅ Performance monitoring

---

## 🎯 SUMMARY

**Total Issues Found:** 20  
**Critical:** 5 🔴  
**High:** 5 🟡  
**Medium:** 5 🟠  
**Improvements:** 5 🔧

**Estimated Time to Fix Critical Issues:** 2-3 days  
**Estimated Time for All Fixes:** 2-3 weeks

---

**Next Steps:**
1. Start with Phase 1 (critical security and stability issues)
2. Test thoroughly after each fix
3. Deploy fixes incrementally
4. Monitor for new issues

**Contact:** Ready to implement these fixes step by step!
