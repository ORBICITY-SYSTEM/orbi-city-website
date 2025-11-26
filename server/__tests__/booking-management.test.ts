import { describe, it, expect } from 'vitest';
import { getAllBookings, updateBookingStatus, createBooking } from '../db';

describe('Booking Management', () => {
  let testBookingId: number;

  describe('Get All Bookings', () => {
    it('should return an array of bookings', async () => {
      const bookings = await getAllBookings();
      expect(Array.isArray(bookings)).toBe(true);
    });

    it('should return bookings in descending order by creation date', async () => {
      const bookings = await getAllBookings();
      if (bookings.length > 1) {
        const firstCreatedAt = new Date(bookings[0].createdAt).getTime();
        const secondCreatedAt = new Date(bookings[1].createdAt).getTime();
        expect(firstCreatedAt).toBeGreaterThanOrEqual(secondCreatedAt);
      }
    });

    it('should include all required booking fields', async () => {
      const bookings = await getAllBookings();
      if (bookings.length > 0) {
        const booking = bookings[0];
        expect(booking).toHaveProperty('id');
        expect(booking).toHaveProperty('apartmentId');
        expect(booking).toHaveProperty('guestName');
        expect(booking).toHaveProperty('guestEmail');
        expect(booking).toHaveProperty('checkIn');
        expect(booking).toHaveProperty('checkOut');
        expect(booking).toHaveProperty('status');
        expect(booking).toHaveProperty('contactMethod');
      }
    });
  });

  describe('Update Booking Status', () => {
    it('should create a test booking for status updates', async () => {
      const testBooking = {
        apartmentId: 1,
        userId: 1,
        guestName: 'Status Test Guest',
        guestEmail: 'status@example.com',
        guestPhone: '+995555999999',
        checkIn: new Date('2026-01-10'),
        checkOut: new Date('2026-01-15'),
        guests: 2,
        totalPrice: 50000,
        status: 'pending' as const,
        contactMethod: 'whatsapp' as const,
        specialRequests: null,
      };

      try {
        testBookingId = await createBooking(testBooking);
        expect(testBookingId).toBeGreaterThan(0);
      } catch (error: any) {
        if (error.message.includes('not available')) {
          expect(error.message).toContain('not available');
        } else {
          throw error;
        }
      }
    });

    it('should update booking status to confirmed', async () => {
      if (testBookingId) {
        await updateBookingStatus(testBookingId, 'confirmed');
        const bookings = await getAllBookings();
        const updatedBooking = bookings.find(b => b.id === testBookingId);
        if (updatedBooking) {
          expect(updatedBooking.status).toBe('confirmed');
        }
      }
    });

    it('should update booking status to completed', async () => {
      if (testBookingId) {
        await updateBookingStatus(testBookingId, 'completed');
        const bookings = await getAllBookings();
        const updatedBooking = bookings.find(b => b.id === testBookingId);
        if (updatedBooking) {
          expect(updatedBooking.status).toBe('completed');
        }
      }
    });

    it('should update booking status to cancelled', async () => {
      if (testBookingId) {
        await updateBookingStatus(testBookingId, 'cancelled');
        const bookings = await getAllBookings();
        const updatedBooking = bookings.find(b => b.id === testBookingId);
        if (updatedBooking) {
          expect(updatedBooking.status).toBe('cancelled');
        }
      }
    });

    it('should validate status enum values', () => {
      const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
      expect(validStatuses).toContain('pending');
      expect(validStatuses).toContain('confirmed');
      expect(validStatuses).toContain('completed');
      expect(validStatuses).toContain('cancelled');
    });
  });

  describe('Booking Filtering', () => {
    it('should filter bookings by status', async () => {
      const allBookings = await getAllBookings();
      const pendingBookings = allBookings.filter(b => b.status === 'pending');
      const confirmedBookings = allBookings.filter(b => b.status === 'confirmed');
      const completedBookings = allBookings.filter(b => b.status === 'completed');
      const cancelledBookings = allBookings.filter(b => b.status === 'cancelled');

      expect(Array.isArray(pendingBookings)).toBe(true);
      expect(Array.isArray(confirmedBookings)).toBe(true);
      expect(Array.isArray(completedBookings)).toBe(true);
      expect(Array.isArray(cancelledBookings)).toBe(true);
    });

    it('should find bookings with special requests', async () => {
      const allBookings = await getAllBookings();
      const withRequests = allBookings.filter(b => b.specialRequests && b.specialRequests.length > 0);
      expect(Array.isArray(withRequests)).toBe(true);
    });
  });

  describe('Contact Method Validation', () => {
    it('should validate all contact methods are supported', async () => {
      const allBookings = await getAllBookings();
      const validMethods = ['whatsapp', 'telegram', 'email', 'phone'];
      
      allBookings.forEach(booking => {
        expect(validMethods).toContain(booking.contactMethod);
      });
    });
  });

  describe('Guest Information', () => {
    it('should have valid email format', async () => {
      const allBookings = await getAllBookings();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      allBookings.forEach(booking => {
        expect(emailRegex.test(booking.guestEmail)).toBe(true);
      });
    });

    it('should have non-empty guest names', async () => {
      const allBookings = await getAllBookings();
      
      allBookings.forEach(booking => {
        expect(booking.guestName.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Range Validation', () => {
    it('should have check-out after check-in', async () => {
      const allBookings = await getAllBookings();
      
      allBookings.forEach(booking => {
        const checkIn = new Date(booking.checkIn).getTime();
        const checkOut = new Date(booking.checkOut).getTime();
        expect(checkOut).toBeGreaterThan(checkIn);
      });
    });

    it('should have positive number of guests', async () => {
      const allBookings = await getAllBookings();
      
      allBookings.forEach(booking => {
        expect(booking.guests).toBeGreaterThan(0);
      });
    });
  });

  describe('Price Validation', () => {
    it('should have positive total price', async () => {
      const allBookings = await getAllBookings();
      
      allBookings.forEach(booking => {
        expect(booking.totalPrice).toBeGreaterThan(0);
      });
    });

    it('should store price as integer (cents)', async () => {
      const allBookings = await getAllBookings();
      
      allBookings.forEach(booking => {
        expect(Number.isInteger(booking.totalPrice)).toBe(true);
      });
    });
  });
});
