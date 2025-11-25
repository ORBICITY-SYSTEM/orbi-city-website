# Google Analytics 4 Setup Guide

This document explains how to set up Google Analytics 4 (GA4) for the Orbi City Booking website.

## 📋 Prerequisites

Before deploying to production, you need to:

1. **Create a Google Analytics 4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" (bottom left)
   - Click "Create Property"
   - Enter property name: "Orbi City Batumi"
   - Select timezone: Georgia (GMT+4)
   - Select currency: USD or GEL
   - Click "Next" and complete the setup

2. **Get Your Measurement ID**
   - In your GA4 property, go to Admin → Data Streams
   - Click "Add stream" → "Web"
   - Enter website URL: `https://orbicitybatumi.com`
   - Enter stream name: "Orbi City Website"
   - Click "Create stream"
   - Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

## 🔧 Configuration

### Environment Variable Setup

Add the following environment variable to your production deployment:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** Replace `G-XXXXXXXXXX` with your actual Measurement ID from Google Analytics.

### Where to Add the Environment Variable

- **Manus Dashboard:** Go to Settings → Secrets → Add new secret
  - Key: `VITE_GA_MEASUREMENT_ID`
  - Value: Your actual GA4 Measurement ID

- **For local testing:** Create a `.env` file in the project root:
  ```
  VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

## 📊 Events Being Tracked

The website automatically tracks the following events:

### Automatic Events
- **Page Views:** Tracked on every route change
- **First Visit:** Automatically tracked by GA4
- **Session Start:** Automatically tracked by GA4

### Custom Conversion Events
- **booking_click:** When user clicks "View Details" on apartment cards
- **contact_form_submit:** When contact form is successfully submitted

### Custom Engagement Events
- **whatsapp_click:** When WhatsApp floating button is clicked
- **apartment_view:** When user views apartment detail page
- **virtual_tour_click:** When user clicks on virtual tour videos
- **gallery_view:** When user views gallery images by category
- **promo_code_copy:** When user copies the AMERIA20 promo code

## 🎯 Setting Up Conversion Goals

To track conversions in GA4:

1. Go to **Admin → Events**
2. Click **Create event** or mark existing events as conversions
3. Mark these events as conversions:
   - `booking_click`
   - `contact_form_submit`

## 📈 Recommended Reports

### 1. **Realtime Report**
- View current active users
- See which pages they're viewing
- Monitor events as they happen

### 2. **Acquisition Report**
- See where visitors are coming from
- Track organic search, direct, referral traffic
- Monitor social media performance

### 3. **Engagement Report**
- View most popular pages
- See average engagement time
- Track event counts

### 4. **Conversions Report**
- Monitor booking clicks
- Track contact form submissions
- Calculate conversion rates

## 🔍 Testing GA4 Integration

### In Development Mode

1. The GA4 integration includes debug mode when running locally
2. Open browser console to see GA4 debug messages
3. Check for initialization and event tracking logs

### Using GA4 Debug View

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Enable the extension
3. Visit your website
4. Go to GA4 → Admin → DebugView
5. You should see events in real-time

### Using GA4 Realtime Report

1. Visit your website
2. Go to GA4 → Reports → Realtime
3. Perform actions (click buttons, submit forms, etc.)
4. Events should appear within 30 seconds

## 🚀 Production Deployment Checklist

- [ ] Created GA4 property for orbicitybatumi.com
- [ ] Obtained Measurement ID (G-XXXXXXXXXX)
- [ ] Added `VITE_GA_MEASUREMENT_ID` to production environment variables
- [ ] Deployed website with GA4 integration
- [ ] Verified tracking in GA4 Realtime report
- [ ] Set up conversion events (booking_click, contact_form_submit)
- [ ] Configured custom reports and dashboards
- [ ] Set up email alerts for important metrics

## 📱 Privacy & GDPR Compliance

The current implementation:
- ✅ Does not collect personally identifiable information (PII)
- ✅ Uses Google's default cookie consent
- ⚠️ **TODO:** Add cookie consent banner for GDPR compliance (if targeting EU users)

For GDPR compliance, consider adding a cookie consent banner using a library like:
- `react-cookie-consent`
- `@cookiehub/cookiehub`

## 🔗 Useful Resources

- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Documentation](https://support.google.com/analytics/answer/9267735)
- [GA4 Debug Mode](https://support.google.com/analytics/answer/7201382)
- [GA4 Conversions](https://support.google.com/analytics/answer/9267568)

## 📞 Support

For questions about GA4 setup, contact the development team or refer to Google Analytics documentation.

---

**Last Updated:** November 25, 2025  
**Version:** 1.0
