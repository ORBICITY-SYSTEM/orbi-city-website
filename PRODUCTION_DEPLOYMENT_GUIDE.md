# Production Deployment Guide - ORBICITYBATUMI.COM

Complete checklist for launching Orbi City Batumi website to production.

---

## Pre-Launch Checklist

### Content Review

- [ ] All placeholder text replaced with real content
- [ ] All placeholder images replaced with professional photos
- [ ] All apartment descriptions are accurate and compelling
- [ ] Contact information is correct (phone, email, address)
- [ ] Prices are up-to-date and in correct currency
- [ ] Special offers/promotions are current
- [ ] Legal pages complete (Privacy Policy, Terms & Conditions)

### Functional Testing

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Apartments page displays all properties
- [ ] Apartment detail pages load correctly
- [ ] Gallery page shows all photos
- [ ] Location page displays Google Maps correctly
- [ ] Contact form submits successfully
- [ ] Booking modal opens and validates input
- [ ] Language switcher (Georgian/English) works
- [ ] WhatsApp button opens with correct number
- [ ] Footer carousel plays videos smoothly
- [ ] All internal links work (no 404 errors)

### Mobile Responsiveness

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad (Safari)
- [ ] Navigation menu works on mobile
- [ ] Booking modal is usable on small screens
- [ ] Images load and scale properly
- [ ] Text is readable without zooming
- [ ] Buttons are easily tappable (44px minimum)

### Performance Optimization

- [ ] Run Lighthouse audit (target: 90+ performance score)
- [ ] Compress all images (use WebP format)
- [ ] Minify CSS and JavaScript (automatic via Vite)
- [ ] Enable browser caching (automatic via Manus)
- [ ] Lazy load below-fold images
- [ ] Optimize video file sizes (< 10MB each)
- [ ] Remove unused code and dependencies

### SEO Optimization

- [ ] Meta titles are unique and descriptive (< 60 characters)
- [ ] Meta descriptions are compelling (< 160 characters)
- [ ] All images have alt text
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Schema.org structured data is implemented
- [ ] Sitemap.xml is generated and accessible
- [ ] Robots.txt allows search engine crawling
- [ ] Canonical URLs are set correctly
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags for social sharing

### Analytics & Tracking

- [ ] Google Analytics 4 is installed
- [ ] Google Tag Manager is configured
- [ ] Conversion events are tracked (booking submissions)
- [ ] Page view tracking works
- [ ] Event tracking works (button clicks, video plays)
- [ ] Google Search Console is set up
- [ ] Google Business Profile is claimed and verified

### Security & Privacy

- [ ] SSL certificate is active (HTTPS)
- [ ] All external links use HTTPS
- [ ] No sensitive data in client-side code
- [ ] Environment variables are properly secured
- [ ] CORS is configured correctly
- [ ] Privacy Policy mentions Google Analytics
- [ ] Cookie consent banner (if required by law)
- [ ] GDPR compliance (if targeting EU users)

---

## Domain Connection Steps

### Step 1: Add Domain in Manus

1. Open Management UI → Settings → Domains
2. Click "Add Custom Domain"
3. Enter: `orbicitybatumi.com`
4. Copy DNS instructions provided by Manus

### Step 2: Configure DNS Records

Log in to your domain registrar and add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | (IP from Manus) | 3600 |
| CNAME | www | (Target from Manus) | 3600 |

**Common Registrars:**
- **GoDaddy**: DNS Management → Add Record
- **Namecheap**: Advanced DNS → Add New Record
- **Google Domains**: DNS → Custom Records

### Step 3: Wait for DNS Propagation

- **Minimum**: 15 minutes
- **Typical**: 2-4 hours
- **Maximum**: 24-48 hours

Check status: https://dnschecker.org/?domain=orbicitybatumi.com

### Step 4: Enable SSL

- Automatic via Manus (Let's Encrypt)
- Takes 10-15 minutes after DNS propagation
- Verify: https://orbicitybatumi.com shows padlock icon

### Step 5: Configure Redirects

In Management UI → Settings → Domains:
- ✅ Enable "Redirect www to non-www"
- ✅ Enable "Force HTTPS" (automatic)

---

## Post-Launch Tasks

### Immediate (Day 1)

#### Update Google Business Profile

1. Visit: https://business.google.com
2. Select "Orbi City Sea view Aparthotel in Batumi"
3. Update website URL to: `https://orbicitybatumi.com`
4. Add booking link: `https://orbicitybatumi.com/#book-now`
5. Upload 10+ high-quality photos
6. Respond to all pending reviews (use templates from GOOGLE_REVIEW_RESPONSE_TEMPLATES.md)

#### Submit to Google Search Console

1. Visit: https://search.google.com/search-console
2. Add property: `https://orbicitybatumi.com`
3. Verify ownership (DNS TXT record method)
4. Submit sitemap: `https://orbicitybatumi.com/sitemap.xml`
5. Request indexing for homepage

#### Social Media Announcement

1. **Facebook Page**
   - Post: "🎉 New website launch! Book your luxury stay at orbicitybatumi.com"
   - Update "Website" field in About section

2. **Instagram**
   - Story: Screenshot of new website
   - Bio: Add link to orbicitybatumi.com

3. **TripAdvisor**
   - Update website URL in business profile

### Week 1

#### Monitor Analytics

1. **Google Analytics**
   - Check daily traffic
   - Monitor bounce rate (target: < 50%)
   - Track booking conversion rate
   - Identify top-performing pages

2. **Google Search Console**
   - Monitor indexing status
   - Check for crawl errors
   - Review search queries
   - Track click-through rate

3. **Google Business Profile**
   - Monitor views and clicks
   - Respond to new reviews within 24 hours
   - Add weekly photo updates

#### Test Booking System

1. Submit test booking (use real data)
2. Verify notification email arrives
3. Check booking appears in database
4. Test WhatsApp response flow
5. Confirm confirmation page displays correctly

#### Performance Monitoring

1. Run Lighthouse audit daily
2. Check page load speed (target: < 3 seconds)
3. Monitor Core Web Vitals
4. Fix any performance issues

### Month 1

#### Content Marketing

1. **Blog Posts** (SEO)
   - "Top 10 Things to Do in Batumi"
   - "Orbi City Batumi: Your Guide to Luxury Living"
   - "Best Beaches Near Orbi City"
   - "Batumi Travel Guide 2025"

2. **Guest Reviews**
   - Email past guests for reviews
   - Incentivize with discount code
   - Share positive reviews on social media

3. **Local SEO**
   - Get listed on Booking.com
   - Add to Airbnb (if applicable)
   - Submit to TripAdvisor
   - Add to Google Maps

#### Google Ads Campaign (Optional)

1. **Search Ads**
   - Keywords: "batumi hotel", "orbi city", "batumi aparthotel"
   - Budget: $10-20/day
   - Target: Georgia, Russia, Turkey

2. **Display Ads**
   - Remarketing to website visitors
   - Showcase luxury photos
   - Promote special offers

3. **Performance Max**
   - Automated campaign
   - All Google channels
   - Conversion-focused

---

## Monitoring & Maintenance

### Daily Tasks

- [ ] Check booking notifications
- [ ] Respond to Google Business Profile reviews
- [ ] Monitor website uptime (automatic via Manus)
- [ ] Check Google Analytics for traffic spikes

### Weekly Tasks

- [ ] Review booking conversion rate
- [ ] Update apartment availability
- [ ] Add new photos to gallery
- [ ] Check for broken links
- [ ] Review Google Search Console

### Monthly Tasks

- [ ] Analyze booking patterns
- [ ] Update prices if needed
- [ ] Create blog post for SEO
- [ ] Review competitor websites
- [ ] Run performance audit
- [ ] Update seasonal promotions

### Quarterly Tasks

- [ ] Major content refresh
- [ ] Professional photo shoot
- [ ] Review and update legal pages
- [ ] Analyze year-over-year growth
- [ ] Plan marketing campaigns

---

## Troubleshooting

### Website Not Loading

**Symptoms:** orbicitybatumi.com shows error or blank page

**Solutions:**
1. Check DNS propagation: https://dnschecker.org
2. Verify DNS records match Manus instructions
3. Clear browser cache (Ctrl+Shift+Delete)
4. Wait 24-48 hours for full propagation
5. Contact Manus support if issue persists

### Booking System Not Working

**Symptoms:** Booking modal doesn't submit or shows error

**Solutions:**
1. Check browser console for errors (F12)
2. Verify database connection in Management UI
3. Test with different browser
4. Check notification settings
5. Review server logs in Management UI

### Google Analytics Not Tracking

**Symptoms:** No data in Google Analytics dashboard

**Solutions:**
1. Verify GTM_ID is set in Settings → Secrets
2. Check GTM container is published
3. Use Google Tag Assistant to debug
4. Wait 24-48 hours for data to appear
5. Test in incognito mode (ad blockers can interfere)

### SSL Certificate Error

**Symptoms:** Browser shows "Not Secure" warning

**Solutions:**
1. Wait 15 minutes after DNS propagation
2. Check Management UI → Settings → Domains for SSL status
3. Force HTTPS redirect is enabled
4. Clear browser SSL cache
5. Contact Manus support if error persists after 1 hour

---

## Rollback Plan

If critical issues arise after launch:

### Quick Rollback

1. **Find Last Working Checkpoint**
   - View checkpoint cards in chatbox
   - Identify version before issues started

2. **Click "Rollback" Button**
   - Confirm rollback action
   - Wait 30-60 seconds

3. **Publish Rollback**
   - Create new checkpoint
   - Click "Publish"
   - Verify issue is resolved

### Emergency Maintenance Mode

If you need to take site offline temporarily:

1. **Create Maintenance Page**
   ```tsx
   // client/src/pages/Maintenance.tsx
   export default function Maintenance() {
     return (
       <div className="min-h-screen flex items-center justify-center bg-navy-900">
         <div className="text-center">
           <h1 className="text-4xl font-serif text-gold-400 mb-4">
             Under Maintenance
           </h1>
           <p className="text-white">
             We'll be back shortly. Thank you for your patience.
           </p>
         </div>
       </div>
     );
   }
   ```

2. **Redirect All Traffic**
   ```tsx
   // client/src/App.tsx
   import Maintenance from "./pages/Maintenance";
   
   function App() {
     return <Maintenance />;
   }
   ```

3. **Deploy Quickly**
   - Save changes
   - Create checkpoint
   - Publish

---

## Success Metrics

### Traffic Goals (Month 1)

- **Page Views**: 1,000+
- **Unique Visitors**: 500+
- **Bounce Rate**: < 50%
- **Avg. Session Duration**: > 2 minutes

### Conversion Goals (Month 1)

- **Booking Inquiries**: 20+
- **Conversion Rate**: 2-5%
- **Email Signups**: 50+
- **WhatsApp Contacts**: 10+

### SEO Goals (Month 3)

- **Google Search Impressions**: 5,000+
- **Average Position**: < 20
- **Click-Through Rate**: > 3%
- **Indexed Pages**: All pages

### Google Business Profile Goals

- **Monthly Views**: 1,000+
- **Website Clicks**: 100+
- **Direction Requests**: 50+
- **Average Rating**: 4.0+ stars

---

## Support Resources

### Manus Platform

- **Help Center**: https://help.manus.im
- **Email Support**: support@manus.im
- **Response Time**: 24-48 hours

### External Services

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **Google Tag Manager**: https://tagmanager.google.com
- **Google Business Profile**: https://business.google.com

### Tools

- **DNS Checker**: https://dnschecker.org
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
- **Page Speed**: https://pagespeed.web.dev
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

---

## Final Checklist Before Launch

- [ ] All content reviewed and approved
- [ ] All functional tests passed
- [ ] Mobile responsiveness verified
- [ ] Performance score > 90
- [ ] SEO optimization complete
- [ ] Analytics tracking works
- [ ] SSL certificate active
- [ ] Domain connected and verified
- [ ] Google Business Profile updated
- [ ] Sitemap submitted to Google
- [ ] Backup checkpoint created
- [ ] Rollback plan tested
- [ ] Team trained on Management UI
- [ ] Support contacts documented

---

**Ready to launch?** Follow the steps above and your website will be live on ORBICITYBATUMI.COM!

**Questions?** Contact Manus support at https://help.manus.im
