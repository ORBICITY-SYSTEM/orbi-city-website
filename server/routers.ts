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
});

export type AppRouter = typeof appRouter;
