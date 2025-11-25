import { eq, sql, inArray, and, gte, lte, ne, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, apartments, InsertApartment, Apartment, bookings, Booking, InsertBooking, amenities, Amenity, InsertAmenity, gallery, GalleryItem, InsertGalleryItem, testimonials, Testimonial, InsertTestimonial, blogPosts, BlogPost, InsertBlogPost } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Apartments
export async function getAllApartments(): Promise<Apartment[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(apartments).where(eq(apartments.isAvailable, 1));
}

export async function getApartmentById(id: number): Promise<Apartment | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(apartments).where(eq(apartments.id, id)).limit(1);
  return result[0];
}

export async function createApartment(apartment: InsertApartment): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(apartments).values(apartment);
  return result;
}

// Bookings
export async function createBooking(booking: InsertBooking): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(bookings).values(booking);
  return result[0].insertId;
}

export async function getUserBookings(userId: number): Promise<Booking[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).where(eq(bookings.userId, userId));
}

export async function getBookingById(id: number): Promise<Booking | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result[0];
}

export async function checkAvailability(apartmentId: number, checkIn: Date, checkOut: Date): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  // Check if there are any overlapping bookings
  const overlapping = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.apartmentId, apartmentId),
        ne(bookings.status, "cancelled"),
        // Check for date overlap
        lte(bookings.checkIn, checkOut),
        gte(bookings.checkOut, checkIn)
      )
    );
  
  return overlapping.length === 0;
}

// Amenities
export async function getAllAmenities(): Promise<Amenity[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(amenities);
}

export async function createAmenity(amenity: InsertAmenity): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(amenities).values(amenity);
}

// Gallery
export async function getGalleryByCategory(category?: string): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(gallery).where(eq(gallery.category, category));
  }
  return db.select().from(gallery);
}

export async function createGalleryItem(item: InsertGalleryItem): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(gallery).values(item);
}

// Testimonials
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.isApproved, 1));
}

export async function createTestimonial(testimonial: InsertTestimonial): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(testimonials).values(testimonial);
}

// Update and Delete Apartment operations
export async function updateApartment(id: number, data: Partial<InsertApartment>): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(apartments).set(data).where(eq(apartments.id, id));
  return result;
}

export async function deleteApartment(id: number): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(apartments).where(eq(apartments.id, id));
  return result;
}

// Gallery Management Functions
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gallery).orderBy(gallery.order, gallery.createdAt);
}

export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gallery).where(eq(gallery.category, category)).orderBy(gallery.order);
}

export async function updateGalleryItem(id: number, data: Partial<InsertGalleryItem>): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(gallery).set(data).where(eq(gallery.id, id));
  return result;
}

export async function deleteGalleryItem(id: number): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(gallery).where(eq(gallery.id, id));
  return result;
}

export async function deleteMultipleGalleryItems(ids: number[]): Promise<any> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(gallery).where(inArray(gallery.id, ids));
  return result;
}


// ============================================
// Blog Posts
// ============================================

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt));
  
  return posts;
}

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));
  
  return posts;
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}
