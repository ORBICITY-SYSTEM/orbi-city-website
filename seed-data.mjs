import { drizzle } from "drizzle-orm/mysql2";
import { apartments, amenities, gallery, testimonials } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const apartmentsData = [
  {
    name: "Suite with Sea View",
    type: "Suite",
    description: "An elegant suite offering breathtaking views of the sea, perfect for couples or solo travelers seeking a tranquil escape. Features modern amenities, comfortable furnishings, and a private balcony overlooking the Black Sea.",
    shortDescription: "Elegant suite with breathtaking sea views",
    pricePerNight: 15000, // $150
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    features: JSON.stringify(["Sea View", "Private Balcony", "King Bed", "Mini Bar", "Smart TV", "Free WiFi"]),
    imageUrl: "/suite-deluxe.jpg",
    gallery: JSON.stringify(["/suite-deluxe.jpg", "/balcony-view.jpg"]),
    model3dUrl: null,
    isAvailable: 1,
  },
  {
    name: "Delux Suite with Sea View",
    type: "Delux Suite",
    description: "A more spacious and luxurious suite with enhanced amenities and a prime sea view, designed for an indulgent stay. Includes a separate living area, premium bathroom fixtures, and exclusive access to VIP services.",
    shortDescription: "Spacious luxury suite with enhanced amenities",
    pricePerNight: 22000, // $220
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    features: JSON.stringify(["Sea View", "Living Area", "King Bed", "Jacuzzi", "Premium Minibar", "Smart TV", "Free WiFi", "VIP Services"]),
    imageUrl: "/suite-superior.jpg",
    gallery: JSON.stringify(["/suite-superior.jpg", "/balcony-view.jpg"]),
    model3dUrl: null,
    isAvailable: 1,
  },
  {
    name: "Superior Suite with Sea View",
    type: "Superior Suite",
    description: "Our premium suite featuring a separate living area, top-tier amenities, and the best panoramic views of the sea. Perfect for guests who demand the finest accommodations with luxury finishes throughout.",
    shortDescription: "Premium suite with panoramic sea views",
    pricePerNight: 28000, // $280
    maxGuests: 4,
    bedrooms: 1,
    bathrooms: 2,
    area: 75,
    features: JSON.stringify(["Panoramic Sea View", "Separate Living Room", "King Bed", "2 Bathrooms", "Jacuzzi", "Premium Minibar", "Smart TV", "Free WiFi", "Concierge Service"]),
    imageUrl: "/suite-deluxe.jpg",
    gallery: JSON.stringify(["/suite-deluxe.jpg", "/suite-superior.jpg", "/balcony-view.jpg"]),
    model3dUrl: null,
    isAvailable: 1,
  },
  {
    name: "Superior Family Suite with Sea View",
    type: "Family Suite",
    description: "A generously sized suite with multiple rooms, perfect for families or groups, ensuring comfort and privacy for everyone. Features two bedrooms, spacious living area, and family-friendly amenities.",
    shortDescription: "Spacious family suite with multiple rooms",
    pricePerNight: 35000, // $350
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    features: JSON.stringify(["Sea View", "2 Bedrooms", "Living Room", "Kitchen", "2 Bathrooms", "Balcony", "Smart TV", "Free WiFi", "Family Amenities"]),
    imageUrl: "/suite-superior.jpg",
    gallery: JSON.stringify(["/suite-superior.jpg", "/balcony-view.jpg"]),
    model3dUrl: null,
    isAvailable: 1,
  },
  {
    name: "Two Bedroom Panoramic Suite",
    type: "Panoramic Suite",
    description: "The pinnacle of luxury. This expansive suite features two bedrooms and a stunning panoramic terrace for an unforgettable experience. Includes premium furnishings, state-of-the-art technology, and personalized butler service.",
    shortDescription: "Ultimate luxury with panoramic terrace",
    pricePerNight: 45000, // $450
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 3,
    area: 120,
    features: JSON.stringify(["360° Panoramic View", "2 Bedrooms", "3 Bathrooms", "Living Room", "Dining Area", "Kitchen", "Terrace", "Jacuzzi", "Butler Service", "Premium Amenities"]),
    imageUrl: "/balcony-view.jpg",
    gallery: JSON.stringify(["/balcony-view.jpg", "/suite-superior.jpg", "/suite-deluxe.jpg"]),
    model3dUrl: null,
    isAvailable: 1,
  },
];

const amenitiesData = [
  {
    name: "Fine Dining Restaurant",
    icon: "🍽️",
    description: "Savor exquisite dishes prepared by our world-class chefs in an elegant atmosphere with stunning sea views.",
    category: "Dining",
    imageUrl: "/amenity-restaurant.jpg",
    order: 1,
  },
  {
    name: "High-Speed WiFi",
    icon: "📶",
    description: "Stay connected with complimentary high-speed internet access throughout the hotel and all apartments.",
    category: "Technology",
    imageUrl: null,
    order: 2,
  },
  {
    name: "24/7 Security",
    icon: "🛡️",
    description: "Your safety is our priority with round-the-clock security personnel and comprehensive surveillance systems.",
    category: "Security",
    imageUrl: null,
    order: 3,
  },
  {
    name: "Concierge Service",
    icon: "🎩",
    description: "Our dedicated concierge team is at your service for any request, from restaurant reservations to tour bookings.",
    category: "Services",
    imageUrl: null,
    order: 4,
  },
  {
    name: "Fitness Center",
    icon: "💪",
    description: "State-of-the-art fitness equipment and personal training services available for all guests.",
    category: "Wellness",
    imageUrl: null,
    order: 5,
  },
  {
    name: "Spa & Wellness",
    icon: "🧖",
    description: "Relax and rejuvenate with our premium spa treatments and wellness facilities.",
    category: "Wellness",
    imageUrl: null,
    order: 6,
  },
];

const testimonialsData = [
  {
    guestName: "Sarah Johnson",
    guestCountry: "United Kingdom",
    rating: 5,
    comment: "Absolutely stunning views of the Black Sea! The apartment was luxurious and the staff incredibly welcoming. The balcony breakfast was unforgettable.",
    avatarUrl: null,
    isApproved: 1,
  },
  {
    guestName: "Michael Chen",
    guestCountry: "Singapore",
    rating: 5,
    comment: "Best hotel experience in Georgia! Modern facilities, impeccable service, and the location is perfect. Will definitely return.",
    avatarUrl: null,
    isApproved: 1,
  },
  {
    guestName: "Elena Popov",
    guestCountry: "Russia",
    rating: 5,
    comment: "Превосходный отель! Роскошные номера с видом на море, отличный ресторан и очень дружелюбный персонал. Highly recommended!",
    avatarUrl: null,
    isApproved: 1,
  },
];

async function seed() {
  try {
    console.log("Seeding database...");
    
    // Insert apartments
    for (const apt of apartmentsData) {
      await db.insert(apartments).values(apt);
    }
    console.log("✓ Apartments seeded");
    
    // Insert amenities
    for (const amenity of amenitiesData) {
      await db.insert(amenities).values(amenity);
    }
    console.log("✓ Amenities seeded");
    
    // Insert testimonials
    for (const testimonial of testimonialsData) {
      await db.insert(testimonials).values(testimonial);
    }
    console.log("✓ Testimonials seeded");
    
    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
