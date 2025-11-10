import { drizzle } from "drizzle-orm/mysql2";
import { apartments } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const realApartments = [
  {
    name: "Suite with Sea View",
    type: "Suite",
    description: "An elegant suite offering breathtaking views of the sea, perfect for couples or solo travelers seeking a tranquil escape.",
    pricePerNight: 5500,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: 33,
    features: JSON.stringify([
      "Sea View Balcony",
      "Fully equipped kitchen",
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "King Size Bed with Ceiling Mirrors",
      "SOFA BED"
    ]),
    imageUrl: "/suite-sea-view.webp",
    gallery: JSON.stringify(["/suite-sea-view.webp"])
  },
  {
    name: "Delux Suite with Sea View",
    type: "Deluxe Suite",
    description: "A more spacious and luxurious suite with enhanced amenities and a prime sea view, designed for an indulgent stay.",
    pricePerNight: 6500,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: 42,
    features: JSON.stringify([
      "Large Sea View Balcony",
      "Separate Living Area",
      "Fully equipped kitchen",
      "Free WiFi",
      "King Size Bed with Ceiling Mirrors",
      "SOFA BED"
    ]),
    imageUrl: "/delux-suite-sea-view.webp",
    gallery: JSON.stringify(["/delux-suite-sea-view.webp"])
  },
  {
    name: "Superior Suite with Sea View",
    type: "Superior Suite",
    description: "Our premium suite featuring a separate living area, top-tier amenities, and the best panoramic views of the sea.",
    pricePerNight: 7500,
    maxGuests: 3,
    bedrooms: 2,
    bathrooms: 1,
    area: 42,
    features: JSON.stringify([
      "Corner Sea Views",
      "One Bedroom",
      "Dining Area",
      "One Bathroom",
      "Fully equipped kitchen",
      "Premium Toiletries",
      "King Size Bed with Ceiling Mirrors",
      "SOFA BED"
    ]),
    imageUrl: "/superior-suite-sea-view.webp",
    gallery: JSON.stringify(["/superior-suite-sea-view.webp"])
  },
  {
    name: "Superior Family Suite with Sea View",
    type: "Family Suite",
    description: "A generously sized suite with multiple rooms, perfect for families or groups, ensuring comfort and privacy for everyone.",
    pricePerNight: 9500,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    area: 77,
    features: JSON.stringify([
      "Expansive Balcony",
      "Two Bedrooms",
      "Fully equipped kitchen",
      "Kids' Entertainment",
      "Free WiFi",
      "Air Conditioning",
      "Smart TV"
    ]),
    imageUrl: "/superior-family-suite.webp",
    gallery: JSON.stringify(["/superior-family-suite.webp"])
  },
  {
    name: "Two Bedroom Panoramic Suite",
    type: "Panoramic Suite",
    description: "The pinnacle of luxury. This expansive suite features two bedrooms and a stunning panoramic terrace for an unforgettable experience.",
    pricePerNight: 12000,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    area: 77,
    features: JSON.stringify([
      "Panoramic Terrace",
      "Two Bedrooms",
      "Separate Living Area",
      "Fully equipped kitchen",
      "Premium Toiletries",
      "Free WiFi",
      "Air Conditioning",
      "Smart TV"
    ]),
    imageUrl: "/two-bedroom-panoramic.webp",
    gallery: JSON.stringify(["/two-bedroom-panoramic.webp"])
  }
];

async function seed() {
  console.log("Clearing existing apartments...");
  await db.delete(apartments);
  
  console.log("Seeding real apartment data...");
  for (const apt of realApartments) {
    await db.insert(apartments).values(apt);
    console.log(`✓ Added: ${apt.name}`);
  }
  
  console.log("✅ Database seeded with real Orbi City data!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
