import { Helmet } from 'react-helmet-async';

/**
 * Schema.org Structured Data for SEO
 * 
 * This component adds JSON-LD structured data to help search engines
 * understand the content and improve search rankings.
 * 
 * Includes:
 * - Hotel/LodgingBusiness schema
 * - LocalBusiness schema
 * - AggregateRating schema
 * - Offer schema
 */

interface StructuredDataProps {
  page?: 'home' | 'apartment' | 'gallery' | 'location' | 'contact';
  apartmentData?: {
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

export function StructuredData({ page = 'home', apartmentData }: StructuredDataProps) {
  // Base organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': 'https://orbicitybatumi.com/#hotel',
    name: 'Orbi City Sea view Aparthotel',
    alternateName: 'Orbi City Batumi',
    description: 'Luxury aparthotel in Batumi with stunning sea views, modern amenities, and prime beachfront location. Experience Four Seasons level hospitality in the heart of Batumi.',
    url: 'https://orbicitybatumi.com',
    telephone: '+995555199090',
    email: 'info@orbicitybatumi.com',
    priceRange: '$$',
    currenciesAccepted: 'USD, GEL, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.5',
      bestRating: '5',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7b Sherif Khimshiashvili St',
      addressLocality: 'Batumi',
      addressRegion: 'Adjara',
      postalCode: '6010',
      addressCountry: 'GE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.6394',
      longitude: '41.6138',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: '24/7 Front Desk',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Swimming Pool',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Fitness Center',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sea View',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Parking',
        value: true,
      },
    ],
    image: [
      'https://orbicitybatumi.com/hero_loop.mp4',
      'https://orbicitybatumi.com/bedroom_luxury.mp4',
      'https://orbicitybatumi.com/city_timelapse.mp4',
    ],
    sameAs: [
      'https://www.facebook.com/orbicitybatumi',
      'https://www.instagram.com/orbicitybatumi',
      'https://www.youtube.com/@orbicitybatumi',
    ],
  };

  // Apartment/Room schema (if on apartment detail page)
  const apartmentSchema = apartmentData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Apartment',
        name: apartmentData.name,
        description: apartmentData.description,
        image: apartmentData.image,
        offers: {
          '@type': 'Offer',
          price: apartmentData.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          validFrom: new Date().toISOString(),
          url: `https://orbicitybatumi.com/apartments/${apartmentData.name.toLowerCase().replace(/\s+/g, '-')}`,
        },
        containedInPlace: {
          '@id': 'https://orbicitybatumi.com/#hotel',
        },
      }
    : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://orbicitybatumi.com',
      },
      page === 'apartment' && {
        '@type': 'ListItem',
        position: 2,
        name: 'Apartments',
        item: 'https://orbicitybatumi.com/apartments',
      },
      page === 'gallery' && {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: 'https://orbicitybatumi.com/gallery',
      },
      page === 'location' && {
        '@type': 'ListItem',
        position: 2,
        name: 'Location',
        item: 'https://orbicitybatumi.com/location',
      },
      page === 'contact' && {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://orbicitybatumi.com/contact',
      },
    ].filter(Boolean),
  };

  return (
    <Helmet>
      {/* Organization/Hotel Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Apartment Schema (if applicable) */}
      {apartmentSchema && (
        <script type="application/ld+json">
          {JSON.stringify(apartmentSchema)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
