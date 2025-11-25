import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const defaultPosts = [
  {
    title: "Welcome to Orbi City Batumi",
    slug: "welcome-to-orbi-city-batumi",
    content: `Welcome to Orbi City Batumi, your premier destination for luxury aparthotel living in the heart of Georgia's coastal gem. Our modern complex offers stunning views of the Black Sea and the vibrant cityscape of Batumi.

Whether you're here for business or pleasure, our fully-equipped apartments provide all the comforts of home with the amenities of a five-star hotel. From our rooftop infinity pool to our state-of-the-art fitness center, every detail has been designed with your comfort in mind.

Explore our blog for travel tips, local insights, and updates about what's happening at Orbi City Batumi.`,
    excerpt: "Discover luxury living in the heart of Batumi at Orbi City, where modern comfort meets stunning Black Sea views.",
    featuredImage: "/hero-batumi-aerial.jpg",
    authorId: 1,
    status: "published" as const,
    publishedAt: new Date("2025-01-15"),
    metaTitle: "Welcome to Orbi City Batumi - Luxury Aparthotel",
    metaDescription: "Discover luxury aparthotel living at Orbi City Batumi with stunning Black Sea views and world-class amenities.",
  },
  {
    title: "Top 10 Things to Do in Batumi",
    slug: "top-10-things-to-do-in-batumi",
    content: `Batumi is a vibrant coastal city with something for everyone. Here are our top 10 recommendations:

1. **Batumi Boulevard** - Stroll along the beautiful seaside promenade
2. **Ali and Nino Statue** - Watch the moving sculpture at sunset
3. **Batumi Botanical Garden** - Explore diverse flora from around the world
4. **Alphabet Tower** - Admire the unique architecture celebrating Georgian script
5. **Batumi Dolphinarium** - Enjoy a family-friendly show
6. **Piazza Square** - Experience Italian-inspired architecture and cafes
7. **Cable Car** - Take in panoramic views of the city
8. **Batumi Beach** - Relax on the pebble beach
9. **Gonio Fortress** - Visit the ancient Roman fortification
10. **Local Cuisine** - Try traditional Georgian dishes at local restaurants

All of these attractions are easily accessible from Orbi City Batumi!`,
    excerpt: "From the seaside boulevard to ancient fortresses, discover the best attractions and activities Batumi has to offer.",
    featuredImage: "/hero-batumi-aerial.jpg",
    authorId: 1,
    status: "published" as const,
    publishedAt: new Date("2025-01-20"),
    metaTitle: "Top 10 Things to Do in Batumi - Travel Guide",
    metaDescription: "Discover the best attractions and activities in Batumi, from the Boulevard to ancient fortresses and local cuisine.",
  },
  {
    title: "Why Choose Orbi City for Your Batumi Stay",
    slug: "why-choose-orbi-city-batumi",
    content: `When planning your visit to Batumi, choosing the right accommodation is crucial. Here's why Orbi City stands out:

**Prime Location**
Located in the heart of Batumi, we offer easy access to the beach, shopping centers, and major attractions.

**Modern Amenities**
- Infinity pool with sea views
- Fully-equipped fitness center
- 24/7 security and concierge
- High-speed WiFi throughout
- Underground parking

**Flexible Options**
Whether you need a studio for a weekend getaway or a family suite for an extended stay, we have options to suit every need.

**Value for Money**
Enjoy hotel-quality service and amenities at apartment prices, with the added benefit of a full kitchen and living space.

**Local Expertise**
Our team knows Batumi inside and out and is always ready to help you discover hidden gems and plan unforgettable experiences.

Book your stay at Orbi City Batumi and experience the perfect blend of comfort, convenience, and luxury.`,
    excerpt: "Discover what makes Orbi City the perfect choice for your Batumi accommodation - from prime location to world-class amenities.",
    featuredImage: "/hero-batumi-aerial.jpg",
    authorId: 1,
    status: "published" as const,
    publishedAt: new Date("2025-01-25"),
    metaTitle: "Why Choose Orbi City Batumi - Aparthotel Benefits",
    metaDescription: "Learn why Orbi City is the perfect accommodation choice in Batumi with prime location, modern amenities, and exceptional value.",
  },
];

async function seed() {
  console.log("Seeding blog posts...");
  
  for (const post of defaultPosts) {
    try {
      await db.insert(blogPosts).values(post);
      console.log(`✓ Created: ${post.title}`);
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        console.log(`- Skipped (already exists): ${post.title}`);
      } else {
        console.error(`✗ Error creating ${post.title}:`, error.message);
      }
    }
  }
  
  console.log("Blog seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
