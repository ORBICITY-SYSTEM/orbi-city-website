# Domain Migration Guide - ORBICITYBATUMI.COM

This guide provides step-by-step instructions for migrating your Orbi City Batumi website to the custom domain **ORBICITYBATUMI.COM**.

---

## Prerequisites

Before starting the migration, ensure you have:

1. ✅ Domain registered: **ORBICITYBATUMI.COM**
2. ✅ Access to your domain registrar's DNS management panel
3. ✅ Current Manus deployment URL (e.g., `xxx.manus.space`)
4. ✅ Latest checkpoint saved in Manus dashboard

---

## Step 1: Configure DNS Settings

Log in to your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare) and add the following DNS records:

### A Record (Recommended)
```
Type: A
Name: @
Value: [Manus IP Address - Get from Manus Support]
TTL: 3600 (or Auto)
```

### CNAME Record (Alternative)
```
Type: CNAME
Name: @
Value: your-project.manus.space
TTL: 3600 (or Auto)
```

### WWW Subdomain
```
Type: CNAME
Name: www
Value: orbicitybatumi.com
TTL: 3600 (or Auto)
```

**Note:** DNS propagation can take 24-48 hours, but often completes within 1-2 hours.

---

## Step 2: Update Manus Project Settings

1. Open your Manus project dashboard
2. Navigate to **Settings → Domains**
3. Click **"Add Custom Domain"**
4. Enter: `orbicitybatumi.com`
5. Click **"Verify"** to confirm DNS configuration
6. Enable **"Redirect www to root domain"** (optional but recommended)

---

## Step 3: SSL Certificate Configuration

Manus automatically provisions SSL certificates for custom domains:

1. After DNS verification, SSL certificate generation begins automatically
2. This process typically takes 5-15 minutes
3. Once complete, your site will be accessible via `https://orbicitybatumi.com`

**Verify SSL:**
- Visit `https://orbicitybatumi.com` in your browser
- Check for the padlock icon in the address bar
- Certificate should be issued by Let's Encrypt or Manus

---

## Step 4: Update Environment Variables (if needed)

If your application uses absolute URLs or domain-specific configurations:

1. Go to **Settings → Secrets** in Manus dashboard
2. Update or add the following variables:
   ```
   VITE_APP_URL=https://orbicitybatumi.com
   VITE_API_URL=https://orbicitybatumi.com/api
   ```
3. Restart the application for changes to take effect

---

## Step 5: Update Google Analytics (if configured)

If you've set up Google Analytics:

1. Log in to Google Analytics
2. Navigate to **Admin → Property Settings**
3. Update **Website URL** to `https://orbicitybatumi.com`
4. Add new property if tracking both old and new domains during transition

---

## Step 6: Test the Migration

### Pre-Launch Checklist

- [ ] Domain resolves to correct IP/CNAME
- [ ] SSL certificate is active (https works)
- [ ] All pages load correctly
- [ ] Images and videos display properly
- [ ] Booking system functions correctly
- [ ] Contact forms submit successfully
- [ ] WhatsApp/Telegram links work
- [ ] Google Analytics tracking fires
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing complete (Chrome, Safari, Firefox)

### Testing Commands

Check DNS propagation:
```bash
nslookup orbicitybatumi.com
dig orbicitybatumi.com
```

Test SSL certificate:
```bash
curl -I https://orbicitybatumi.com
```

---

## Step 7: Update External References

After successful migration, update:

1. **Google My Business** - Update website URL
2. **Social Media Profiles** - Facebook, Instagram, LinkedIn
3. **Booking Platforms** - Booking.com, Airbnb (if applicable)
4. **Email Signatures** - Update team email signatures
5. **Marketing Materials** - Business cards, brochures
6. **Third-party Integrations** - Any APIs or webhooks

---

## Step 8: Set Up Redirects (Optional)

If you want to redirect the old Manus subdomain to the new domain:

1. Contact Manus support to configure 301 redirects
2. Or add redirect logic in your application code:

```typescript
// In server/_core/index.ts or similar
app.use((req, res, next) => {
  const host = req.get('host');
  if (host && host.includes('manus.space')) {
    return res.redirect(301, `https://orbicitybatumi.com${req.url}`);
  }
  next();
});
```

---

## Troubleshooting

### Domain not resolving
- **Solution:** Wait 24-48 hours for DNS propagation
- **Check:** Use `nslookup orbicitybatumi.com` to verify DNS records

### SSL certificate error
- **Solution:** Ensure DNS is fully propagated before SSL provisioning
- **Check:** Contact Manus support if SSL doesn't provision after 24 hours

### Images/videos not loading
- **Solution:** Clear browser cache and CDN cache
- **Check:** Verify all asset URLs use relative paths (e.g., `/hero-loop.mp4`)

### Booking system not working
- **Solution:** Check environment variables and API endpoints
- **Check:** Verify CORS settings allow new domain

---

## Rollback Plan

If issues arise during migration:

1. **Keep old domain active** - Don't delete old Manus subdomain
2. **Revert DNS** - Point domain back to parking page temporarily
3. **Contact Support** - Reach out to Manus support for assistance
4. **Use checkpoint** - Rollback to previous working version if needed

---

## Post-Migration Monitoring

For the first week after migration:

- Monitor Google Analytics for traffic patterns
- Check error logs daily
- Test booking flow regularly
- Monitor page load times
- Verify email notifications work
- Check WhatsApp/Telegram integrations

---

## Support

If you encounter issues during migration:

- **Manus Support:** https://help.manus.im
- **DNS Support:** Contact your domain registrar
- **Emergency Rollback:** Use Manus dashboard to revert to previous checkpoint

---

## Migration Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| DNS Configuration | 15 minutes | Add DNS records at registrar |
| DNS Propagation | 1-48 hours | Wait for global DNS update |
| SSL Provisioning | 5-15 minutes | Automatic certificate generation |
| Testing | 1-2 hours | Comprehensive functionality testing |
| Go-Live | Immediate | Switch traffic to new domain |
| Monitoring | 7 days | Watch for issues and optimize |

---

## Success Criteria

Your migration is successful when:

✅ `https://orbicitybatumi.com` loads with valid SSL
✅ All pages and features work correctly
✅ Google Analytics tracks visitors
✅ Booking system processes reservations
✅ Contact forms send notifications
✅ Mobile experience is optimal
✅ Page load times are acceptable (<3 seconds)

---

**Last Updated:** November 25, 2025  
**Version:** 1.0  
**Contact:** Orbi City IT Team
