import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
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
        name: z.string(),
        type: z.string(),
        description: z.string(),
        shortDescription: z.string().optional(),
        pricePerNight: z.number(),
        maxGuests: z.number(),
        bedrooms: z.number(),
        bathrooms: z.number(),
        area: z.number().optional(),
        imageUrl: z.string(),
        features: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
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
        apartmentId: z.number(),
        guestName: z.string(),
        guestEmail: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
        guests: z.number(),
        totalPrice: z.number(),
        guestPhone: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { createBooking } = await import("./db");
        return createBooking({
          apartmentId: input.apartmentId,
          userId: ctx.user.id,
          checkIn: new Date(input.checkIn),
          checkOut: new Date(input.checkOut),
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
});

export type AppRouter = typeof appRouter;
