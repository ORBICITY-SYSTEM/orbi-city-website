import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
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
      .input((val: unknown) => {
        if (typeof val === "object" && val !== null && "id" in val) {
          return val as { id: number };
        }
        throw new Error("Invalid input");
      })
      .query(async ({ input }) => {
        const { getApartmentById } = await import("./db");
        return getApartmentById(input.id);
      }),
    checkAvailability: publicProcedure
      .input((val: unknown) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "apartmentId" in val &&
          "checkIn" in val &&
          "checkOut" in val &&
          typeof val.apartmentId === "number" &&
          typeof val.checkIn === "string" &&
          typeof val.checkOut === "string"
        ) {
          return {
            apartmentId: val.apartmentId,
            checkIn: val.checkIn,
            checkOut: val.checkOut,
          };
        }
        throw new Error("Invalid input");
      })
      .query(async ({ input }) => {
        const { checkAvailability } = await import("./db");
        return checkAvailability(
          input.apartmentId,
          new Date(input.checkIn),
          new Date(input.checkOut)
        );
      }),
  }),

  bookings: router({
    create: protectedProcedure
      .input((val: unknown) => {
        if (
          typeof val === "object" &&
          val !== null &&
          "apartmentId" in val &&
          "guestName" in val &&
          "guestEmail" in val &&
          "checkIn" in val &&
          "checkOut" in val &&
          "guests" in val &&
          "totalPrice" in val
        ) {
          return val as {
            apartmentId: number;
            guestName: string;
            guestEmail: string;
            guestPhone?: string;
            checkIn: string;
            checkOut: string;
            guests: number;
            totalPrice: number;
            specialRequests?: string;
          };
        }
        throw new Error("Invalid booking input");
      })
      .mutation(async ({ input, ctx }: { input: any; ctx: any }) => {
        const { createBooking, checkAvailability } = await import("./db");
        
        // Check availability first
        const isAvailable = await checkAvailability(
          input.apartmentId,
          new Date(input.checkIn),
          new Date(input.checkOut)
        );
        
        if (!isAvailable) {
          throw new Error("Apartment not available for selected dates");
        }
        
        const bookingId = await createBooking({
          apartmentId: input.apartmentId,
          userId: ctx.user.id,
          guestName: input.guestName,
          guestEmail: input.guestEmail,
          guestPhone: input.guestPhone,
          checkIn: new Date(input.checkIn),
          checkOut: new Date(input.checkOut),
          guests: input.guests,
          totalPrice: input.totalPrice,
          specialRequests: input.specialRequests,
          status: "pending",
        });
        
        return { success: true, bookingId };
      }),
    myBookings: protectedProcedure.query(async ({ ctx }: { ctx: any }) => {
      const { getUserBookings } = await import("./db");
      return getUserBookings(ctx.user.id);
    }),
  }),

  amenities: router({
    list: publicProcedure.query(async () => {
      const { getAllAmenities } = await import("./db");
      return getAllAmenities();
    }),
  }),

  gallery: router({
    list: publicProcedure
      .input((val: unknown) => {
        if (val === undefined || val === null) {
          return { category: undefined };
        }
        if (typeof val === "object" && "category" in val) {
          return { category: val.category as string | undefined };
        }
        return { category: undefined };
      })
      .query(async ({ input }) => {
        const { getGalleryByCategory } = await import("./db");
        return getGalleryByCategory(input.category);
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => {
      const { getApprovedTestimonials } = await import("./db");
      return getApprovedTestimonials();
    }),
  }),
});

export type AppRouter = typeof appRouter;
