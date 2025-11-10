import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Apartment types
export const apartments = mysqlTable("apartments", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // Suite, Delux Suite, Superior Suite, etc.
  description: text("description").notNull(),
  shortDescription: text("shortDescription"),
  pricePerNight: int("pricePerNight").notNull(), // Price in USD cents
  maxGuests: int("maxGuests").notNull(),
  bedrooms: int("bedrooms").notNull(),
  bathrooms: int("bathrooms").notNull(),
  area: int("area"), // Square meters
  features: text("features"), // JSON array of features
  imageUrl: text("imageUrl").notNull(),
  gallery: text("gallery"), // JSON array of image URLs
  model3dUrl: text("model3dUrl"), // URL to 3D model file
  isAvailable: int("isAvailable").default(1).notNull(), // 1 = available, 0 = not available
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Apartment = typeof apartments.$inferSelect;
export type InsertApartment = typeof apartments.$inferInsert;

// Bookings
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  apartmentId: int("apartmentId").notNull(),
  userId: int("userId").notNull(),
  guestName: varchar("guestName", { length: 255 }).notNull(),
  guestEmail: varchar("guestEmail", { length: 320 }).notNull(),
  guestPhone: varchar("guestPhone", { length: 50 }),
  checkIn: timestamp("checkIn").notNull(),
  checkOut: timestamp("checkOut").notNull(),
  guests: int("guests").notNull(),
  totalPrice: int("totalPrice").notNull(), // Total price in USD cents
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending").notNull(),
  specialRequests: text("specialRequests"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Amenities
export const amenities = mysqlTable("amenities", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 100 }).notNull(), // Icon name or emoji
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }), // Restaurant, Facilities, Services, etc.
  imageUrl: text("imageUrl"),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Amenity = typeof amenities.$inferSelect;
export type InsertAmenity = typeof amenities.$inferInsert;

// Gallery
export const gallery = mysqlTable("gallery", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Rooms, Views, Facilities, Exterior, etc.
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryItem = typeof gallery.$inferSelect;
export type InsertGalleryItem = typeof gallery.$inferInsert;

// Testimonials
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  guestName: varchar("guestName", { length: 255 }).notNull(),
  guestCountry: varchar("guestCountry", { length: 100 }),
  rating: int("rating").notNull(), // 1-5
  comment: text("comment").notNull(),
  avatarUrl: text("avatarUrl"),
  isApproved: int("isApproved").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
// Blog Posts
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featuredImage"),
  authorId: int("authorId").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: text("metaDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Site Settings
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue").notNull(),
  settingType: varchar("settingType", { length: 50 }).default("text").notNull(), // text, image, json, etc.
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
