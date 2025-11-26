# Schema Markup Enhancement Guide
## Orbi City Batumi - SEO Structured Data

---

## 📋 What is Schema Markup?

Schema Markup (also called Structured Data) is code that helps search engines understand your website content better. It enables **Rich Snippets** in Google Search results:

**Without Schema:**
```
Orbi City Batumi
orbicitybatumi.com
Luxury aparthotel in Batumi with sea views...
```

**With Schema:**
```
⭐⭐⭐⭐⭐ 4.8 (127 reviews)
Orbi City Batumi - Luxury Aparthotel
₾150-300/night · Batumi, Georgia
✓ Free WiFi ✓ Sea View ✓ Pool ✓ Parking
📞 +995 555 19 90 90
```

---

## 🎯 Current Schema Implementation

Your website already has basic Schema Markup in `client/src/pages/Home.tsx`:

### 1. Organization Schema ✅
```json
{
  "@type": "Organization",
  "name": "Orbi City Batumi",
  "url": "https://orbicitybatumi.com",
  "logo": "https://orbicitybatumi.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+995-555-19-90-90",
    "contactType": "customer service"
  }
}
```

### 2. Hotel Schema ✅
```json
{
  "@type": "Hotel",
  "name": "Orbi City Batumi",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sherif Khimshiashvili Street",
    "addressLocality": "Batumi",
    "addressCountry": "GE"
  },
  "priceRange": "₾₾"
}
```

---

## 🚀 Enhanced Schema Recommendations

### 1. Add AggregateRating Schema

**Why**: Shows star rating in Google Search results

**Where to add**: `client/src/pages/Home.tsx` (inside existing schema)

```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Orbi City Batumi",
  "image": [
    "https://orbicitybatumi.com/images/hero-image.jpg",
    "https://orbicitybatumi.com/images/pool.jpg",
    "https://orbicitybatumi.com/images/apartment-view.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sherif Khimshiashvili Street",
    "addressLocality": "Batumi",
    "addressRegion": "Adjara",
    "postalCode": "6010",
    "addressCountry": "GE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.6168",
    "longitude": "41.6367"
  },
  "telephone": "+995-555-19-90-90",
  "email": "info@orbicitybatumi.com",
  "priceRange": "₾₾",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Swimming Pool",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Sea View",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Air Conditioning",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "24/7 Reception",
      "value": true
    }
  ],
  "checkinTime": "14:00",
  "checkoutTime": "12:00",
  "petsAllowed": false,
  "starRating": {
    "@type": "Rating",
    "ratingValue": "4"
  }
}
```

---

### 2. Add Individual Apartment Schema

**Why**: Shows apartment details in search results

**Where to add**: `client/src/pages/ApartmentDetail.tsx`

```typescript
const apartmentSchema = {
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": apartment.name,
  "description": apartment.description,
  "image": apartment.images,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sherif Khimshiashvili Street",
    "addressLocality": "Batumi",
    "addressRegion": "Adjara",
    "postalCode": "6010",
    "addressCountry": "GE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.6168",
    "longitude": "41.6367"
  },
  "numberOfRooms": apartment.bedrooms,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": apartment.size,
    "unitCode": "MTK" // Square meters
  },
  "occupancy": {
    "@type": "QuantitativeValue",
    "value": apartment.maxGuests
  },
  "amenityFeature": apartment.amenities.map(amenity => ({
    "@type": "LocationFeatureSpecification",
    "name": amenity,
    "value": true
  })),
  "offers": {
    "@type": "Offer",
    "price": apartment.pricePerNight,
    "priceCurrency": "GEL",
    "availability": "https://schema.org/InStock",
    "url": `https://orbicitybatumi.com/apartment/${apartment.id}`,
    "priceValidUntil": "2026-12-31"
  }
};
```

---

### 3. Add Review Schema

**Why**: Shows individual reviews in search results

**Where to add**: Create `client/src/pages/Reviews.tsx` or add to Home

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Hotel",
    "name": "Orbi City Batumi"
  },
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "Amazing place with stunning sea views! The apartment was clean, modern, and had everything we needed. Staff was very helpful and friendly.",
  "datePublished": "2025-11-15"
}
```

---

### 4. Add FAQPage Schema

**Why**: Shows FAQ accordion in Google Search

**Where to add**: `client/src/pages/FAQ.tsx` (if you create FAQ page)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the check-in time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check-in time is from 14:00 (2:00 PM). Early check-in may be available upon request."
      }
    },
    {
      "@type": "Question",
      "name": "Is parking available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer free parking for all guests in our underground garage."
      }
    },
    {
      "@type": "Question",
      "name": "How far is the beach?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The beach is just 5 minutes walk from Orbi City Batumi. You can enjoy stunning sea views from your apartment."
      }
    },
    {
      "@type": "Question",
      "name": "Do you accept pets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unfortunately, pets are not allowed in our apartments."
      }
    },
    {
      "@type": "Question",
      "name": "What amenities are included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All apartments include free WiFi, air conditioning, fully equipped kitchen, swimming pool access, gym, and 24/7 reception."
      }
    }
  ]
}
```

---

### 5. Add BreadcrumbList Schema

**Why**: Shows breadcrumb navigation in search results

**Where to add**: All pages

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://orbicitybatumi.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Apartments",
      "item": "https://orbicitybatumi.com/apartments"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": apartment.name,
      "item": `https://orbicitybatumi.com/apartment/${apartment.id}`
    }
  ]
};
```

---

### 6. Add LocalBusiness Schema

**Why**: Shows business info in Google Maps and local search

**Where to add**: `client/src/pages/Home.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Orbi City Batumi",
  "image": "https://orbicitybatumi.com/images/building-exterior.jpg",
  "@id": "https://orbicitybatumi.com",
  "url": "https://orbicitybatumi.com",
  "telephone": "+995-555-19-90-90",
  "email": "info@orbicitybatumi.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sherif Khimshiashvili Street",
    "addressLocality": "Batumi",
    "addressRegion": "Adjara",
    "postalCode": "6010",
    "addressCountry": "GE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.6168,
    "longitude": 41.6367
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "priceRange": "₾₾",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "sameAs": [
    "https://www.facebook.com/orbicitybatumi",
    "https://www.instagram.com/orbicitybatumi",
    "https://www.booking.com/hotel/ge/orbi-city-batumi",
    "https://www.tripadvisor.com/Hotel_Review-g297571-d123456"
  ]
}
```

---

## 🛠️ Implementation Guide

### Step 1: Create Schema Helper Function

**Create `client/src/lib/schema.ts`:**

```typescript
export function generateSchema(type: string, data: any) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Step 2: Add Schema to Pages

**Example: `client/src/pages/ApartmentDetail.tsx`:**

```typescript
import { generateSchema } from "@/lib/schema";

export default function ApartmentDetail() {
  const apartment = // ... fetch apartment data
  
  const apartmentSchema = {
    "@type": "Accommodation",
    "name": apartment.name,
    // ... rest of schema
  };
  
  return (
    <>
      {generateSchema("Accommodation", apartmentSchema)}
      <div>
        {/* Page content */}
      </div>
    </>
  );
}
```

---

## ✅ Testing Schema Markup

### 1. Google Rich Results Test

1. გადადით: **https://search.google.com/test/rich-results**
2. შეიყვანეთ URL: `https://orbicitybatumi.com`
3. დააჭირეთ **"Test URL"**
4. შეამოწმეთ:
   - ✅ No errors
   - ✅ Valid schema detected
   - ✅ Rich results eligible

### 2. Schema Markup Validator

1. გადადით: **https://validator.schema.org/**
2. შეიყვანეთ URL ან paste schema code
3. დააჭირეთ **"Run Test"**
4. Fix any warnings or errors

### 3. Google Search Console

1. გადადით: **Search Console → Enhancements**
2. შეამოწმეთ:
   - **Rich Results**: No issues
   - **Unparsable structured data**: 0 errors

---

## 📊 Expected Rich Results

After implementing enhanced schema:

### 1. Hotel Rich Snippet
```
⭐⭐⭐⭐⭐ 4.8 (127 reviews)
Orbi City Batumi - Luxury Aparthotel
₾150-300/night · Batumi, Georgia
✓ Free WiFi ✓ Pool ✓ Parking ✓ Sea View
📞 +995 555 19 90 90
```

### 2. FAQ Rich Results
```
❓ What is the check-in time?
   Check-in time is from 14:00 (2:00 PM)...

❓ Is parking available?
   Yes, we offer free parking...
```

### 3. Breadcrumb Navigation
```
Home › Apartments › Deluxe Sea View Apartment
```

### 4. Local Business Panel
Shows in Google Maps with:
- Business hours
- Phone number
- Reviews
- Photos
- Directions

---

## 🎯 Priority Implementation Order

### Phase 1: Essential (Do First)
1. ✅ Organization Schema (already done)
2. ✅ Hotel Schema (already done)
3. 🔄 Add AggregateRating to Hotel Schema
4. 🔄 Add Amenities to Hotel Schema

### Phase 2: Important (Do Next)
5. 🔄 Individual Apartment Schema
6. 🔄 LocalBusiness Schema
7. 🔄 BreadcrumbList Schema

### Phase 3: Nice to Have
8. 🔄 Review Schema
9. 🔄 FAQPage Schema
10. 🔄 Event Schema (for special offers)

---

## 📈 SEO Impact Timeline

| Timeframe | Expected Impact |
|-----------|----------------|
| Week 1-2 | Schema validated, no errors |
| Week 3-4 | Rich results start appearing |
| Month 2 | Star ratings show in search |
| Month 3 | CTR increases by 20-30% |
| Month 6 | Higher rankings for local searches |

---

## 🆘 Common Issues

### Issue: "Invalid schema detected"
**Solution:**
- Check JSON syntax (missing commas, brackets)
- Validate with schema.org validator
- Ensure all required properties are present

### Issue: "Rich results not showing"
**Solution:**
- Wait 2-4 weeks for Google to process
- Ensure schema is in `<head>` or top of `<body>`
- Check if page is indexed in Search Console

### Issue: "Rating not showing"
**Solution:**
- Ensure `aggregateRating` has all required fields
- `reviewCount` must be > 0
- `ratingValue` must be between `worstRating` and `bestRating`

---

## 🔗 Useful Resources

- **Schema.org Documentation**: https://schema.org/
- **Google Rich Results Guide**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/

---

## 📱 Google Workspace Enterprise Benefits

### 1. Advanced Search Features
- Enhanced visibility in Google Search
- Priority indexing
- Faster rich results processing

### 2. Google My Business Integration
- Automatic schema sync
- Review aggregation
- Business profile enhancement

### 3. Google Ads Integration
- Use schema data for ad extensions
- Automated sitelink extensions
- Location extensions

---

## ✅ Implementation Checklist

- [ ] Add AggregateRating to Hotel Schema
- [ ] Add Amenities list to Hotel Schema
- [ ] Add Geo coordinates to Hotel Schema
- [ ] Create Accommodation Schema for apartments
- [ ] Add BreadcrumbList to all pages
- [ ] Create LocalBusiness Schema
- [ ] Add FAQPage Schema (if FAQ page exists)
- [ ] Test all schema with Rich Results Test
- [ ] Validate with Schema.org validator
- [ ] Monitor Search Console for errors
- [ ] Track CTR improvements in GA4

---

**Last Updated**: November 26, 2025  
**Schema Version**: Schema.org v15.0  
**Status**: Ready for enhancement ✅
