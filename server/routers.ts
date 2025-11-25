import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  apartments: router({
    list: publicProcedure.query(async () => {
      const { getAllApartments } = await import("./db");
      return getAllApartments();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getApartmentById } = await import("./db");
        return getApartmentById(input.id);
      }),
    checkAvailability: publicProcedure
      .input(z.object({
        apartmentId: z.number(),
        checkIn: z.string(),
        checkOut: z.string(),
      }))
      .query(async ({ input }) => {
        const { checkAvailability } = await import("./db");
        return checkAvailability(
          input.apartmentId,
          new Date(input.checkIn),
          new Date(input.checkOut)
        );
      }),
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(2, "Name must be at least 2 characters").max(255, "Name is too long"),
        type: z.string().min(2, "Type must be at least 2 characters").max(100, "Type is too long"),
        description: z.string().min(10, "Description must be at least 10 characters"),
        shortDescription: z.string().max(500, "Short description is too long").optional(),
        pricePerNight: z.number().positive("Price must be positive").int("Price must be an integer"),
        maxGuests: z.number().positive("Max guests must be positive").int("Max guests must be an integer"),
        bedrooms: z.number().nonnegative("Bedrooms cannot be negative").int("Bedrooms must be an integer"),
        bathrooms: z.number().nonnegative("Bathrooms cannot be negative").int("Bathrooms must be an integer"),
        area: z.number().positive("Area must be positive").int("Area must be an integer").optional(),
        imageUrl: z.string().url("Invalid image URL"),
        features: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can create apartments'
          });
        }
        const { createApartment } = await import("./db");
        return createApartment(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        type: z.string().optional(),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        pricePerNight: z.number().optional(),
        maxGuests: z.number().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        area: z.number().optional(),
        imageUrl: z.string().optional(),
        features: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { updateApartment } = await import("./db");
        return updateApartment(input.id, input);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { deleteApartment } = await import("./db");
        return deleteApartment(input.id);
      }),
  }),

  gallery: router({
    list: publicProcedure.query(async () => {
      const { getAllGalleryItems } = await import("./db");
      return getAllGalleryItems();
    }),
    listByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        const { getGalleryItemsByCategory } = await import("./db");
        return getGalleryItemsByCategory(input.category);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string(),
        category: z.string(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { createGalleryItem } = await import("./db");
        return createGalleryItem(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        order: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { updateGalleryItem } = await import("./db");
        const { id, ...data } = input;
        return updateGalleryItem(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { deleteGalleryItem } = await import("./db");
        return deleteGalleryItem(input.id);
      }),
    deleteMultiple: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const { deleteMultipleGalleryItems } = await import("./db");
        return deleteMultipleGalleryItems(input.ids);
      }),
  }),

  bookings: router({
    create: protectedProcedure
      .input(z.object({
        apartmentId: z.number().positive("Apartment ID must be positive"),
        guestName: z.string().min(2, "Name must be at least 2 characters").max(255, "Name is too long"),
        guestEmail: z.string().email("Invalid email address").max(320, "Email is too long"),
        checkIn: z.string().datetime("Invalid check-in date format"),
        checkOut: z.string().datetime("Invalid check-out date format"),
        guests: z.number().positive("Number of guests must be positive").int("Number of guests must be an integer"),
        totalPrice: z.number().positive("Total price must be positive").int("Total price must be an integer"),
        guestPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Validate check-in and check-out dates
        const checkIn = new Date(input.checkIn);
        const checkOut = new Date(input.checkOut);
        const now = new Date();
        
        if (checkIn < now) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Check-in date cannot be in the past'
          });
        }
        
        if (checkOut <= checkIn) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Check-out date must be after check-in date'
          });
        }
        
        const { createBooking } = await import("./db");
        return createBooking({
          apartmentId: input.apartmentId,
          userId: ctx.user.id,
          checkIn,
          checkOut,
          guests: input.guests,
          totalPrice: input.totalPrice,
          status: "pending",
          guestName: input.guestName,
          guestEmail: input.guestEmail,
          guestPhone: input.guestPhone || null,
        });
      }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      const { getPublishedBlogPosts } = await import("./db");
      return getPublishedBlogPosts();
    }),
    listAll: protectedProcedure.query(async () => {
      const { getAllBlogPosts } = await import("./db");
      return getAllBlogPosts();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getBlogPostById } = await import("./db");
        return getBlogPostById(input.id);
      }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const { getBlogPostBySlug } = await import("./db");
        return getBlogPostBySlug(input.slug);
      }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(["draft", "published"]).default("draft"),
        publishedAt: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createBlogPost } = await import("./db");
        return createBlogPost({
          ...input,
          authorId: ctx.user!.id,
          publishedAt: input.publishedAt ? new Date(input.publishedAt) : undefined,
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        publishedAt: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { updateBlogPost } = await import("./db");
        const { id, ...data } = input;
        return updateBlogPost(id, {
          ...data,
          publishedAt: input.publishedAt ? new Date(input.publishedAt) : undefined,
        });
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteBlogPost } = await import("./db");
        return deleteBlogPost(input.id);
      }),
  }),

  contactMessages: router({
    list: protectedProcedure.query(async () => {
      const { getAllContactMessages } = await import("./db");
      return getAllContactMessages();
    }),
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        const { createContactMessage } = await import("./db");
        return createContactMessage(input);
      }),
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied"]),
      }))
      .mutation(async ({ input }) => {
        const { updateContactMessageStatus } = await import("./db");
        return updateContactMessageStatus(input.id, input.status);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const { deleteContactMessage } = await import("./db");
        return deleteContactMessage(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
