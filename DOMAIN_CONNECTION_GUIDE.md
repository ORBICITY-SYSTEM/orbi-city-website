# ORBICITYBATUMI.COM Domain Connection Guide

Complete guide for connecting your custom domain to the Orbi City Batumi website.

---

## Prerequisites

Before starting, ensure you have:
- ✅ Access to your domain registrar (where you purchased ORBICITYBATUMI.COM)
- ✅ Manus Management UI access (click icon in chatbox header)
- ✅ Latest checkpoint saved (version: 4b20ede7)

---

## Step 1: Configure DNS Records

Log in to your domain registrar (e.g., GoDaddy, Namecheap, Google Domains) and add these DNS records:

### Required DNS Records

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | (Provided by Manus after domain setup) | 3600 |
| CNAME | www | (Provided by Manus after domain setup) | 3600 |

**Note:** The exact IP address and CNAME target will be provided by Manus when you add the custom domain in Management UI.

---

## Step 2: Add Domain in Manus Management UI

1. **Open Management UI**
   - Click the settings icon in chatbox header (top-right)
   - Or click "Dashboard" button on any checkpoint card

2. **Navigate to Domains**
   - Click "Settings" in left sidebar
   - Select "Domains" tab

3. **Add Custom Domain**
   - Click "Add Custom Domain" button
   - Enter: `orbicitybatumi.com`
   - Click "Save"

4. **Copy DNS Instructions**
   - Manus will display exact DNS records
   - Copy the A record IP address
   - Copy the CNAME target

5. **Update DNS Records**
   - Return to your domain registrar
   - Update the DNS records with values from Manus
   - Save changes

---

## Step 3: Wait for DNS Propagation

DNS changes can take **24-48 hours** to propagate globally. You can check status at:
- https://dnschecker.org (enter: orbicitybatumi.com)
- https://www.whatsmydns.net

**Typical timeline:**
- 15 minutes: Some regions see changes
- 2-4 hours: Most regions updated
- 24-48 hours: Fully propagated worldwide

---

## Step 4: Enable SSL Certificate

Once DNS is propagated:

1. **Automatic SSL**
   - Manus automatically provisions SSL certificate
   - This happens within 10-15 minutes after DNS propagation
   - Certificate is from Let's Encrypt (trusted by all browsers)

2. **Verify HTTPS**
   - Visit: https://orbicitybatumi.com
   - Check for padlock icon in browser
   - Certificate should show "Valid" status

---

## Step 5: Configure Redirects

Set up automatic redirects for SEO:

1. **WWW → Non-WWW**
   - In Management UI → Settings → Domains
   - Enable "Redirect www to non-www"
   - This ensures `www.orbicitybatumi.com` → `orbicitybatumi.com`

2. **HTTP → HTTPS**
   - Automatically enabled by Manus
   - All HTTP traffic redirects to HTTPS

---

## Step 6: Update External Services

After domain is live, update these services:

### Google Business Profile
1. Visit: https://business.google.com
2. Select "Orbi City Sea view Aparthotel in Batumi"
3. Click "Edit profile"
4. Update "Website" field to: `https://orbicitybatumi.com`
5. Save changes

### Google Search Console
1. Visit: https://search.google.com/search-console
2. Click "Add property"
3. Enter: `https://orbicitybatumi.com`
4. Verify ownership (DNS TXT record method)
5. Submit sitemap: `https://orbicitybatumi.com/sitemap.xml`

### Google Analytics
1. Visit: https://analytics.google.com
2. Navigate to Admin → Property Settings
3. Update "Default URL" to: `https://orbicitybatumi.com`
4. Save changes

### Social Media Profiles
Update website links on:
- Facebook Page
- Instagram Bio
- TripAdvisor Listing
- Booking.com Profile

---

## Step 7: Test Everything

### Functional Testing Checklist

- [ ] Homepage loads at https://orbicitybatumi.com
- [ ] All internal links work (Apartments, Gallery, Location, Contact)
- [ ] Booking modal opens and submits successfully
- [ ] Google Maps displays correct location
- [ ] Language switcher (Georgian/English) works
- [ ] WhatsApp button opens with correct number
- [ ] Footer carousel plays videos
- [ ] Mobile responsive design works
- [ ] SSL certificate is valid (padlock icon)
- [ ] Google Analytics tracking fires

### Performance Testing

Run Lighthouse audit:
1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Click "Analyze page load"
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

---

## Troubleshooting

### Domain Not Loading

**Problem:** orbicitybatumi.com shows "Site not found"

**Solutions:**
1. Check DNS propagation at dnschecker.org
2. Verify DNS records match Manus instructions exactly
3. Wait 24-48 hours for full propagation
4. Clear browser cache (Ctrl+Shift+Delete)

### SSL Certificate Error

**Problem:** Browser shows "Not Secure" warning

**Solutions:**
1. Wait 15 minutes after DNS propagation
2. Check Management UI → Settings → Domains for SSL status
3. If still failing after 1 hour, contact Manus support

### Redirect Loop

**Problem:** Page keeps redirecting infinitely

**Solutions:**
1. Disable "Redirect www to non-www" temporarily
2. Clear browser cache and cookies
3. Check DNS records for duplicate entries

---

## Post-Launch Checklist

After domain is live and working:

### Immediate (Day 1)
- [ ] Test booking system with real reservation
- [ ] Monitor Google Analytics for traffic
- [ ] Check Google Business Profile views
- [ ] Respond to any pending reviews
- [ ] Share new website URL on social media

### Week 1
- [ ] Monitor booking conversion rate
- [ ] Check Google Search Console for indexing
- [ ] Review Google Analytics user behavior
- [ ] Optimize slow-loading pages (if any)
- [ ] Add more high-quality photos to Google Business Profile

### Month 1
- [ ] Analyze booking patterns (peak days, popular apartments)
- [ ] Review and respond to all guest reviews
- [ ] Create first blog post for SEO
- [ ] Run Google Ads campaign (if budget allows)
- [ ] Monitor Google Business Profile ranking

---

## Support Resources

### Manus Support
- Help Center: https://help.manus.im
- Email: support@manus.im
- Response time: 24-48 hours

### Domain Registrar Support
- GoDaddy: https://www.godaddy.com/help
- Namecheap: https://www.namecheap.com/support
- Google Domains: https://support.google.com/domains

### DNS Tools
- DNS Checker: https://dnschecker.org
- What's My DNS: https://www.whatsmydns.net
- DNS Propagation: https://www.whatsmydns.net

---

## Next Steps

Once domain is live:
1. **Create Admin Dashboard** - Build `/admin/bookings` page to manage reservations
2. **Add Payment Integration** - Enable Stripe for online deposits
3. **Content Marketing** - Start blog with Batumi travel guides for SEO

---

**Need help?** Contact Manus support at https://help.manus.im
