# Google Search Console Setup Guide
## Orbi City Batumi - orbicitybatumi.com

---

## 📋 Prerequisites

✅ Domain connected: `orbicitybatumi.com`  
✅ DNS verified: A records active  
✅ Sitemap created: `https://orbicitybatumi.com/sitemap.xml`  
✅ Robots.txt active: `https://orbicitybatumi.com/robots.txt`

---

## 🚀 Step-by-Step Setup

### Step 1: Access Google Search Console

1. გადადით: **https://search.google.com/search-console**
2. შედით თქვენი Google Workspace Enterprise account-ით (`info@orbicitybatumi.com`)
3. დააჭირეთ **"Add Property"** (ან "დაამატე თვისება")

---

### Step 2: Choose Domain Property Type

**არჩევანი 1: Domain Property (რეკომენდებული)**
- აირჩიეთ: **"Domain"** tab
- შეიყვანეთ: `orbicitybatumi.com` (without https://)
- დააჭირეთ **"Continue"**

**Verification Method: DNS Record**
- Google მოგაწოდებთ TXT record-ს
- დაამატეთ ეს TXT record Hostinger DNS settings-ში:
  ```
  Type: TXT
  Name: @
  Value: google-site-verification=XXXXXXXXXXXXX
  TTL: 14400
  ```
- დაელოდეთ 5-10 წუთს DNS propagation-ს
- დააჭირეთ **"Verify"**

**ან არჩევანი 2: URL Prefix (უფრო სწრაფი)**
- აირჩიეთ: **"URL prefix"** tab
- შეიყვანეთ: `https://orbicitybatumi.com`
- დააჭირეთ **"Continue"**

**Verification Method: HTML Tag (უმარტივესი)**
- Google მოგაწოდებთ meta tag-ს:
  ```html
  <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
  ```
- ეს უკვე დამატებულია საიტზე `client/index.html`-ში
- დააჭირეთ **"Verify"**

---

### Step 3: Submit Sitemap

როდესაც verification დასრულდება:

1. გადადით **Sitemaps** section-ზე (მარცხენა sidebar)
2. **"Add a new sitemap"** ველში ჩაწერეთ: `sitemap.xml`
3. დააჭირეთ **"Submit"**

✅ **Expected Result:**
```
Status: Success
Discovered URLs: 15
Last read: Today
```

---

### Step 4: Enable Enhanced Features

#### 4.1 URL Inspection
- გამოიყენეთ საიტის ნებისმიერი გვერდის შესამოწმებლად
- შეამოწმეთ indexing status
- Request indexing for new pages

#### 4.2 Performance Report
- ნახეთ რა search queries-ით გეძებენ
- CTR (Click-Through Rate) ანალიზი
- Position tracking

#### 4.3 Coverage Report
- რომელი გვერდები indexed არიან
- რომელი გვერდები errors აქვთ
- რომელი გვერდები excluded არიან

---

## 🔧 Advanced Configuration

### Enable Rich Results

1. გადადით **Enhancements → Rich Results**
2. შეამოწმეთ Schema Markup validation
3. ნახეთ რომელი rich snippets ჩანს Google Search-ში

### Mobile Usability

1. გადადით **Enhancements → Mobile Usability**
2. შეამოწმეთ mobile-friendly issues
3. Fix any reported problems

### Core Web Vitals

1. გადადით **Experience → Core Web Vitals**
2. მონიტორინგი:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

---

## 📊 Expected Timeline

| Action | Time |
|--------|------|
| Verification | 5-10 minutes |
| Sitemap submission | Immediate |
| First crawl | 1-3 days |
| Full indexing | 1-2 weeks |
| Search appearance | 2-4 weeks |

---

## ✅ Verification Checklist

- [ ] Property added to Google Search Console
- [ ] Domain verified (DNS TXT or HTML meta tag)
- [ ] Sitemap submitted successfully
- [ ] No errors in Coverage report
- [ ] Mobile usability: No issues
- [ ] Rich results: Validated
- [ ] Performance data: Tracking started

---

## 🎯 Key Metrics to Monitor

### Week 1-2:
- **Indexed pages**: Should reach 15/15
- **Coverage errors**: Should be 0
- **Mobile usability**: No issues

### Month 1:
- **Impressions**: 100-500 (depends on SEO)
- **Clicks**: 10-50
- **Average position**: 20-50

### Month 3+:
- **Impressions**: 1,000+
- **Clicks**: 100+
- **Average position**: 10-20

---

## 🔗 Important Links

- **Search Console**: https://search.google.com/search-console
- **Sitemap URL**: https://orbicitybatumi.com/sitemap.xml
- **Robots.txt**: https://orbicitybatumi.com/robots.txt
- **Rich Results Test**: https://search.google.com/test/rich-results

---

## 🆘 Troubleshooting

### Issue: "Couldn't verify ownership"
**Solution:**
- Check DNS TXT record is correct
- Wait 10-15 minutes for DNS propagation
- Clear browser cache and try again

### Issue: "Sitemap could not be read"
**Solution:**
- Verify sitemap is accessible: https://orbicitybatumi.com/sitemap.xml
- Check XML syntax is valid
- Ensure no robots.txt blocking

### Issue: "Discovered - currently not indexed"
**Solution:**
- This is normal for new sites
- Request indexing via URL Inspection tool
- Wait 1-2 weeks for Google to crawl

---

## 📱 Google Workspace Enterprise Benefits

Since you have **Google Workspace Enterprise**, you get:

### 1. Priority Support
- Direct access to Google Search Console support team
- Faster issue resolution

### 2. Advanced Analytics
- Integration with Google Analytics 360
- BigQuery export for custom analysis

### 3. Enhanced Security
- Advanced security monitoring
- DDoS protection insights

### 4. Team Collaboration
- Share Search Console access with team members
- Role-based permissions (Owner, Full user, Restricted user)

---

## 👥 Recommended Team Access

**Owner**: info@orbicitybatumi.com  
**Full User**: Add your marketing team  
**Restricted User**: Add content writers (can only view data)

To add users:
1. Go to **Settings** (gear icon)
2. Click **Users and permissions**
3. Click **Add user**
4. Enter email and select permission level

---

## 📈 Next Steps After Setup

1. ✅ **Monitor Coverage Report** - Ensure all pages are indexed
2. ✅ **Track Performance** - See which keywords drive traffic
3. ✅ **Fix Issues** - Address any errors or warnings
4. ✅ **Submit New Content** - Request indexing for blog posts
5. ✅ **Optimize** - Improve CTR by updating meta descriptions

---

**Setup Date**: November 26, 2025  
**Domain**: orbicitybatumi.com  
**Sitemap**: https://orbicitybatumi.com/sitemap.xml  
**Status**: Ready for submission ✅
