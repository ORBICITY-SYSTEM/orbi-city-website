import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: 'en_US' | 'ka_GE';
}

/**
 * SEO Meta Tags Component
 * 
 * Adds proper meta tags for SEO, Open Graph (Facebook), and Twitter Cards
 * 
 * Usage:
 * <SEOHead 
 *   title="Luxury Apartments in Batumi"
 *   description="Book your stay at Orbi City"
 *   image="https://orbicitybatumi.com/og-image.jpg"
 * />
 */
export function SEOHead({
  title = 'Orbi City Batumi - Luxury Sea View Aparthotel',
  description = 'Experience Four Seasons level luxury at Orbi City Batumi. Modern apartments with stunning sea views, premium amenities, and prime beachfront location. Book your perfect getaway today.',
  keywords = 'Batumi apartments, Orbi City, luxury aparthotel, sea view apartments, Batumi accommodation, beachfront apartments, Georgia hotels, Batumi hotels, vacation rentals Batumi',
  image = 'https://orbicitybatumi.com/og-image.jpg',
  url = 'https://orbicitybatumi.com',
  type = 'website',
  locale = 'en_US',
}: SEOHeadProps) {
  const siteName = 'Orbi City Batumi';
  const twitterHandle = '@orbicitybatumi';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {locale === 'en_US' && <meta property="og:locale:alternate" content="ka_GE" />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e3a5f" />
      <meta name="msapplication-TileColor" content="#1e3a5f" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="GE-AJ" />
      <meta name="geo.placename" content="Batumi" />
      <meta name="geo.position" content="41.6423;41.6344" />
      <meta name="ICBM" content="41.6423, 41.6344" />
      
      {/* Language Alternate Links */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="ka" href={`${url}?lang=ka`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
}
