# Cloudflare CDN Setup Guide

## Overview
This guide explains how to configure Cloudflare CDN for optimal performance and caching.

## Step 1: Add Domain to Cloudflare

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Click "Add a Site"
3. Enter your domain: `orbicitybatumi.com`
4. Select Free plan
5. Cloudflare will scan your DNS records

## Step 2: Update Nameservers

Update your domain registrar's nameservers to Cloudflare's:
- `ns1.cloudflare.com`
- `ns2.cloudflare.com`

## Step 3: Configure Caching Rules

### Page Rules (Free Plan - 3 rules available)

**Rule 1: Cache Static Assets**
- URL: `*orbicitybatumi.com/*.{jpg,jpeg,png,webp,gif,svg,css,js,woff,woff2,ttf,mp4,webm}`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 month

**Rule 2: Cache HTML Pages**
- URL: `*orbicitybatumi.com/*`
- Settings:
  - Cache Level: Standard
  - Browser Cache TTL: 4 hours

**Rule 3: Bypass Cache for API**
- URL: `*orbicitybatumi.com/api/*`
- Settings:
  - Cache Level: Bypass

### Speed Settings

Navigate to Speed → Optimization:

✅ **Auto Minify**
- JavaScript: ON
- CSS: ON
- HTML: ON

✅ **Brotli**: ON

✅ **Early Hints**: ON

✅ **Rocket Loader**: OFF (can break React apps)

✅ **Mirage**: ON (image optimization)

✅ **Polish**: Lossless (WebP conversion)

### Security Settings

Navigate to Security → Settings:

- Security Level: Medium
- Challenge Passage: 30 minutes
- Browser Integrity Check: ON

### SSL/TLS Settings

Navigate to SSL/TLS → Overview:

- Encryption mode: **Full (strict)**

Navigate to SSL/TLS → Edge Certificates:

✅ Always Use HTTPS: ON
✅ HTTP Strict Transport Security (HSTS): Enable
✅ Minimum TLS Version: TLS 1.2
✅ Automatic HTTPS Rewrites: ON

## Step 4: Add Custom Caching Headers (Server-Side)

The Express server is already configured with optimal caching headers in `server/_core/index.ts`:

```typescript
// Static assets - 1 year cache
app.use('/assets', express.static(path.join(clientDistPath, 'assets'), {
  maxAge: '1y',
  immutable: true
}));

// Public files - 1 day cache
app.use(express.static(publicPath, {
  maxAge: '1d'
}));
```

## Step 5: Verify Setup

1. Check DNS propagation: https://www.whatsmydns.net/
2. Test SSL: https://www.ssllabs.com/ssltest/
3. Test speed: https://www.webpagetest.org/
4. Check caching: Open DevTools → Network → Check response headers for `cf-cache-status`

## Expected Performance Improvements

- **First Load**: 30-50% faster (CDN edge servers)
- **Repeat Visits**: 70-90% faster (browser + edge caching)
- **Global Access**: Consistent speed worldwide
- **Bandwidth Savings**: 60-80% reduction

## Monitoring

Navigate to Analytics → Performance to view:
- Bandwidth saved
- Requests served from cache
- Cache hit ratio
- Geographic distribution

## Troubleshooting

### Images not loading
- Clear Cloudflare cache: Caching → Configuration → Purge Everything
- Check Page Rules order (most specific first)

### API errors
- Verify `/api/*` bypass rule is active
- Check SSL/TLS mode is "Full (strict)"

### Slow updates
- Development mode: Enable for 3 hours to bypass cache
- Or purge specific URLs: Caching → Configuration → Custom Purge
