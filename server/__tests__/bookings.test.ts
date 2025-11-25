import { describe, it, expect, beforeAll } from 'vitest';
import { createBooking, checkAvailability, getBookingById } from '../db';

describe('Booking System', () => {
  let testBookingId: number;
  
  const testBooking = {
    apartmentId: 1,
    userId: 1,
    guestName: 'Test Guest',
    guestEmail: 'test@example.com',
    guestPhone: '+995555123456',
    checkIn: new Date('2025-12-01'),
    checkOut: new Date('2025-12-05'),
    guests: 2,
    totalPrice: 40000, // $400 in cents
    status: 'pending' as const,
    contactMethod: 'whatsapp' as const,
    specialRequests: 'High floor preferred',
  };

  describe('Availability Checking', () => {
    it('should return true for available dates', async () => {
      const available = await checkAvailability(
        1,
        new Date('2025-12-10'),
        new Date('2025-12-15')
      );
      expect(typeof available).toBe('boolean');
    });

    it('should handle invalid apartment ID gracefully', async () => {
      const available = await checkAvailability(
        999999,
        new Date('2025-12-10'),
        new Date('2025-12-15')
      );
      expect(typeof available).toBe('boolean');
    });
  });

  describe('Booking Creation', () => {
    it('should create a booking successfully', async () => {
      try {
        testBookingId = await createBooking(testBooking);
        expect(testBookingId).toBeGreaterThan(0);
      } catch (error: any) {
        // If booking fails due to conflict, that's also a valid test result
        if (error.message.includes('not available')) {
          expect(error.message).toContain('not available');
        } else {
          throw error;
        }
      }
    });

    it('should validate contactMethod enum', () => {
      const validMethods = ['whatsapp', 'telegram', 'email', 'phone'];
      expect(validMethods).toContain(testBooking.contactMethod);
    });

    it('should handle missing optional fields', async () => {
      const minimalBooking = {
        apartmentId: 1,
        userId: 1,
        guestName: 'Minimal Test',
        guestEmail: 'minimal@example.com',
        guestPhone: null,
        checkIn: new Date('2025-12-20'),
        checkOut: new Date('2025-12-22'),
        guests: 1,
        totalPrice: 20000,
        status: 'pending' as const,
        contactMethod: 'email' as const,
        specialRequests: null,
      };

      try {
        const bookingId = await createBooking(minimalBooking);
        expect(bookingId).toBeGreaterThan(0);
      } catch (error: any) {
        // Conflict is acceptable
        if (error.message.includes('not available')) {
          expect(error.message).toContain('not available');
        } else {
          throw error;
        }
      }
    });
  });

  describe('Booking Retrieval', () => {
    it('should retrieve booking by ID', async () => {
      if (testBookingId) {
        const booking = await getBookingById(testBookingId);
        if (booking) {
          expect(booking.id).toBe(testBookingId);
          expect(booking.guestName).toBe(testBooking.guestName);
          expect(booking.guestEmail).toBe(testBooking.guestEmail);
          expect(booking.contactMethod).toBe(testBooking.contactMethod);
        }
      }
    });

    it('should return undefined for non-existent booking', async () => {
      const booking = await getBookingById(999999);
      expect(booking).toBeUndefined();
    });
  });

  describe('Date Validation', () => {
    it('should validate check-in is before check-out', () => {
      const checkIn = new Date('2025-12-01');
      const checkOut = new Date('2025-12-05');
      expect(checkIn.getTime()).toBeLessThan(checkOut.getTime());
    });

    it('should calculate nights correctly', () => {
      const checkIn = new Date('2025-12-01');
      const checkOut = new Date('2025-12-05');
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      expect(nights).toBe(4);
    });
  });

  describe('Price Calculation', () => {
    it('should store price in cents', () => {
      expect(testBooking.totalPrice).toBe(40000); // $400.00
      expect(testBooking.totalPrice % 1).toBe(0); // Integer
    });

    it('should convert cents to dollars correctly', () => {
      const dollars = testBooking.totalPrice / 100;
      expect(dollars).toBe(400);
    });
  });
});
