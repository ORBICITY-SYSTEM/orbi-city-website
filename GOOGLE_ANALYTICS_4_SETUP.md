# Google Analytics 4 (GA4) Setup Guide
## Orbi City Batumi - orbicitybatumi.com

---

## 📋 What is Google Analytics 4?

Google Analytics 4 (GA4) is the latest version of Google Analytics that provides:

- **Real-time visitor tracking**: See who's on your site right now
- **User behavior analysis**: Understand how visitors navigate
- **Conversion tracking**: Measure bookings and inquiries
- **Demographic insights**: Age, gender, location, interests
- **Traffic sources**: Where visitors come from (Google, social media, direct)
- **Device breakdown**: Desktop vs mobile vs tablet usage

---

## 🚀 Step-by-Step Setup

### Step 1: Create GA4 Property

1. გადადით: **https://analytics.google.com/**
2. შედით თქვენი Google Workspace Enterprise account-ით (`info@orbicitybatumi.com`)
3. დააჭირეთ **"Admin"** (gear icon, bottom left)
4. **Account** column-ში დააჭირეთ **"Create Account"** (თუ ახალია)
   - Account name: `Orbi City Batumi`
   - Check all data sharing settings
   - დააჭირეთ **"Next"**

5. **Property** setup:
   - Property name: `Orbi City Batumi Website`
   - Reporting time zone: `(GMT+04:00) Georgia Time - Tbilisi`
   - Currency: `GEL (Georgian Lari)` ან `USD`
   - დააჭირეთ **"Next"**

6. **Business Information**:
   - Industry category: `Travel & Tourism` ან `Real Estate`
   - Business size: `Small (1-10 employees)`
   - Intended use: `Measure customer engagement`, `Optimize advertising ROI`
   - დააჭირეთ **"Create"**

7. Accept Terms of Service

---

### Step 2: Set Up Data Stream

1. **Platform** აირჩიეთ: **"Web"**
2. **Website URL**: `https://orbicitybatumi.com`
3. **Stream name**: `Orbi City Batumi Main Website`
4. **Enhanced measurement**: ✅ Enable all (recommended)
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads
5. დააჭირეთ **"Create stream"**

---

### Step 3: Get Measurement ID

After creating the stream, you'll see:

```
Measurement ID: G-XXXXXXXXXX
```

**📝 Copy this ID** - you'll need it for website integration!

---

### Step 4: Integrate GA4 with Website

#### Option A: Using Environment Variable (Recommended)

1. გადადით **Manus Management UI → Settings → Secrets**
2. დაამატეთ ახალი secret:
   - Key: `VITE_GA4_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX` (თქვენი Measurement ID)
3. დააჭირეთ **"Save"**
4. Restart dev server

#### Option B: Direct Code Integration

თუ გსურთ პირდაპირ კოდში დამატება:

**Edit `client/index.html`:**

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID!**

---

### Step 5: Enable Enhanced Tracking

#### Track Booking Form Submissions

**Edit `client/src/components/BookingModal.tsx`:**

```typescript
// After successful booking
if (window.gtag) {
  window.gtag('event', 'booking_submitted', {
    'event_category': 'Booking',
    'event_label': apartmentName,
    'value': 1
  });
}
```

#### Track Phone Clicks

```typescript
// When user clicks phone number
if (window.gtag) {
  window.gtag('event', 'phone_click', {
    'event_category': 'Contact',
    'event_label': '+995 555 19 90 90'
  });
}
```

#### Track WhatsApp Clicks

```typescript
// When user clicks WhatsApp button
if (window.gtag) {
  window.gtag('event', 'whatsapp_click', {
    'event_category': 'Contact',
    'event_label': 'WhatsApp Chat'
  });
}
```

---

## 📊 Key Reports to Monitor

### 1. Real-time Report
**Path**: Reports → Real-time

**What to watch:**
- Users by country
- Users by page
- Event count by event name
- Conversions

### 2. Acquisition Report
**Path**: Reports → Acquisition → Traffic acquisition

**What to watch:**
- **Organic Search**: Visitors from Google
- **Direct**: Visitors typing URL directly
- **Referral**: Visitors from other websites
- **Social**: Visitors from Facebook, Instagram, etc.

### 3. Engagement Report
**Path**: Reports → Engagement → Pages and screens

**What to watch:**
- Most viewed pages
- Average engagement time
- Bounce rate
- Exit rate

### 4. Conversions Report
**Path**: Reports → Engagement → Conversions

**What to track:**
- `booking_submitted` events
- `phone_click` events
- `whatsapp_click` events
- `email_click` events

---

## 🎯 Set Up Conversions

### Step 1: Mark Events as Conversions

1. გადადით **Admin → Events**
2. იპოვეთ event: `booking_submitted`
3. Toggle **"Mark as conversion"** ✅
4. გაიმეორეთ: `phone_click`, `whatsapp_click`

### Step 2: Set Conversion Values

თუ გსურთ monetary value tracking:

1. გადადით **Admin → Conversions**
2. Click on conversion name
3. **Set value**: 
   - `booking_submitted`: 100 GEL (average booking value)
   - `phone_click`: 10 GEL (lead value)
   - `whatsapp_click`: 10 GEL (lead value)

---

## 🔗 Link GA4 with Google Search Console

1. გადადით **Admin → Property → Product Links**
2. აირჩიეთ **"Search Console Links"**
3. დააჭირეთ **"Link"**
4. აირჩიეთ `orbicitybatumi.com` property
5. დააჭირეთ **"Confirm"**

**Benefits:**
- See search queries in GA4
- Understand which keywords drive traffic
- Optimize content based on search data

---

## 📱 Google Workspace Enterprise Benefits

### 1. Google Analytics 360 Integration
თუ გსურთ upgrade to Analytics 360:
- Advanced analysis tools
- Unsampled reports
- BigQuery export
- SLA guarantees

### 2. Data Studio Integration
- Create custom dashboards
- Share reports with team
- Automated reporting

### 3. Google Ads Integration
- Track ad performance
- Measure ROI
- Optimize campaigns

---

## 🎨 Recommended Custom Reports

### 1. Booking Funnel Report

**Path**: Explore → Create new exploration

**Dimensions:**
- Page path
- Event name
- Device category

**Metrics:**
- Event count
- Conversions
- Conversion rate

**Visualization**: Funnel exploration

**Steps:**
1. Homepage view
2. Apartments page view
3. Apartment details view
4. Booking modal open
5. Booking submitted

### 2. Traffic Sources Report

**Dimensions:**
- Source/Medium
- Campaign
- Landing page

**Metrics:**
- Users
- Sessions
- Conversions
- Revenue

### 3. Mobile vs Desktop Report

**Dimensions:**
- Device category
- Operating system
- Screen resolution

**Metrics:**
- Users
- Engagement rate
- Bounce rate
- Conversions

---

## ✅ Verification Checklist

After integration, verify GA4 is working:

- [ ] Open website: https://orbicitybatumi.com
- [ ] Open GA4 Real-time report
- [ ] You should see yourself as "1 user in last 30 minutes"
- [ ] Navigate to different pages
- [ ] Real-time report should show page views
- [ ] Test booking form submission
- [ ] Check if `booking_submitted` event appears
- [ ] Click phone number
- [ ] Check if `phone_click` event appears

---

## 📊 Expected Metrics (First Month)

| Metric | Expected Range |
|--------|----------------|
| Users | 100-500 |
| Sessions | 150-750 |
| Page views | 500-2,500 |
| Avg. session duration | 2-4 minutes |
| Bounce rate | 40-60% |
| Conversions (bookings) | 5-20 |
| Phone clicks | 10-30 |

---

## 🔧 Advanced Configuration

### Enable Google Signals
**Path**: Admin → Data Settings → Data Collection

**Enable:**
- ✅ Google signals data collection

**Benefits:**
- Cross-device tracking
- Demographics and interests
- Remarketing audiences

### Enable User-ID Tracking
If you want to track logged-in users:

**Edit `client/src/lib/trpc.ts`:**

```typescript
// After user logs in
if (window.gtag && user) {
  window.gtag('config', 'G-XXXXXXXXXX', {
    'user_id': user.id
  });
}
```

### Enable Enhanced Ecommerce
If you add online payments later:

```typescript
// When booking is confirmed
if (window.gtag) {
  window.gtag('event', 'purchase', {
    'transaction_id': bookingId,
    'value': totalAmount,
    'currency': 'GEL',
    'items': [{
      'item_id': apartmentId,
      'item_name': apartmentName,
      'quantity': nights,
      'price': pricePerNight
    }]
  });
}
```

---

## 🆘 Troubleshooting

### Issue: "No data in Real-time report"
**Solution:**
- Check Measurement ID is correct
- Verify gtag.js script is loaded (check browser console)
- Disable ad blockers
- Wait 5-10 minutes for data to appear

### Issue: "Events not showing"
**Solution:**
- Check `window.gtag` is defined
- Verify event names match exactly
- Check browser console for errors
- Use GA4 DebugView for testing

### Issue: "Conversions not tracking"
**Solution:**
- Ensure events are marked as conversions in Admin
- Wait 24 hours for conversion data to appear
- Check if events are firing (use Real-time report)

---

## 📈 Monthly Reporting Checklist

Create a monthly report with:

1. **Traffic Overview**
   - Total users
   - New vs returning users
   - Top traffic sources

2. **Engagement Metrics**
   - Most viewed pages
   - Average engagement time
   - Bounce rate trends

3. **Conversions**
   - Total bookings
   - Conversion rate
   - Revenue (if tracking)

4. **Audience Insights**
   - Demographics (age, gender)
   - Geographic distribution
   - Device breakdown

5. **Recommendations**
   - Pages to optimize
   - Traffic sources to focus on
   - Conversion funnel improvements

---

## 🔗 Important Links

- **GA4 Dashboard**: https://analytics.google.com/
- **GA4 Help Center**: https://support.google.com/analytics/answer/10089681
- **GA4 Academy**: https://analytics.google.com/analytics/academy/
- **DebugView**: Admin → DebugView (for testing events)

---

## 👥 Recommended Team Access

**Administrator**: info@orbicitybatumi.com  
**Editor**: Add your marketing manager  
**Viewer**: Add content team, sales team

To add users:
1. Go to **Admin → Property Access Management**
2. Click **"+"** (Add users)
3. Enter email and select role
4. Click **"Add"**

---

## 🎯 Next Steps After Setup

1. ✅ **Monitor Real-time** - Ensure tracking works
2. ✅ **Set up Conversions** - Mark key events
3. ✅ **Create Custom Reports** - Build booking funnel
4. ✅ **Link Search Console** - Get search data
5. ✅ **Enable Alerts** - Get notified of traffic spikes/drops
6. ✅ **Monthly Review** - Analyze trends and optimize

---

**Setup Date**: November 26, 2025  
**Property**: Orbi City Batumi Website  
**Measurement ID**: G-XXXXXXXXXX (to be added)  
**Status**: Ready for integration ✅
