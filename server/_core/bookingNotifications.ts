import { Booking } from "../../drizzle/schema";
import { notifyOwner } from "./notification";

/**
 * Send booking notification to property manager via selected channel
 * 
 * Supports:
 * - WhatsApp (via URL scheme)
 * - Telegram (via Bot API - requires TELEGRAM_BOT_TOKEN)
 * - Email (via built-in notification system)
 * - Phone (SMS - requires Twilio or similar)
 */

interface BookingNotificationData {
  booking: Booking;
  apartmentName: string;
  contactMethod: "whatsapp" | "telegram" | "email" | "phone";
}

export async function sendBookingNotification(data: BookingNotificationData): Promise<boolean> {
  const { booking, apartmentName, contactMethod } = data;
  
  // Format dates
  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-GB');
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-GB');
  const nights = Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  
  // Create notification message
  const title = `🏨 New Booking Request - ${apartmentName}`;
  const content = `
**Guest Information:**
- Name: ${booking.guestName}
- Email: ${booking.guestEmail}
- Phone: ${booking.guestPhone || 'Not provided'}
- Preferred Contact: ${contactMethod.toUpperCase()}

**Booking Details:**
- Apartment: ${apartmentName}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Nights: ${nights}
- Guests: ${booking.guests}
- Total Price: $${(booking.totalPrice / 100).toFixed(2)}

**Special Requests:**
${booking.specialRequests || 'None'}

**Status:** ${booking.status.toUpperCase()}
**Booking ID:** #${booking.id}

---
*Please contact the guest within 24 hours to confirm availability and discuss floor/block selection.*
  `.trim();
  
  try {
    // Send notification via built-in system (email to owner)
    const emailSent = await notifyOwner({ title, content });
    
    // Generate WhatsApp link (property manager can click to respond)
    if (contactMethod === 'whatsapp' && booking.guestPhone) {
      const whatsappMessage = encodeURIComponent(
        `Hello ${booking.guestName}! Thank you for your booking request at Orbi City Batumi.\n\n` +
        `We have received your request for ${apartmentName} from ${checkInDate} to ${checkOutDate}.\n\n` +
        `Our reservations manager will contact you shortly to confirm availability and discuss floor/block preferences.\n\n` +
        `Best regards,\nOrbi City Batumi Team`
      );
      console.log(`[Booking Notification] WhatsApp link: https://wa.me/${booking.guestPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`);
    }
    
    // Log Telegram notification (requires bot setup)
    if (contactMethod === 'telegram') {
      console.log(`[Booking Notification] Telegram notification would be sent here (requires TELEGRAM_BOT_TOKEN)`);
      // TODO: Implement Telegram Bot API integration
      // const telegramSent = await sendTelegramMessage(process.env.TELEGRAM_CHAT_ID, content);
    }
    
    // Phone/SMS notification (requires Twilio or similar)
    if (contactMethod === 'phone' && booking.guestPhone) {
      console.log(`[Booking Notification] SMS notification would be sent to ${booking.guestPhone} (requires Twilio setup)`);
      // TODO: Implement SMS via Twilio
      // const smsSent = await sendSMS(booking.guestPhone, `Booking confirmed for ${apartmentName}. Check your email for details.`);
    }
    
    return emailSent;
  } catch (error) {
    console.error('[Booking Notification] Failed to send notification:', error);
    return false;
  }
}

/**
 * Generate WhatsApp message template for property manager
 */
export function generateWhatsAppResponseTemplate(booking: Booking, apartmentName: string): string {
  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-GB');
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-GB');
  
  return `Hello ${booking.guestName}! 👋

Thank you for choosing Orbi City Batumi! 🏨✨

We're pleased to confirm your booking request:
📅 Check-in: ${checkInDate}
📅 Check-out: ${checkOutDate}
🏠 Apartment: ${apartmentName}
👥 Guests: ${booking.guests}

Our reservations manager will contact you within the next few hours to:
✅ Confirm final availability
✅ Discuss your preferred floor and block
✅ Answer any questions you may have

Looking forward to welcoming you!

Best regards,
Orbi City Batumi Team
🌊 Luxury Aparthotel in Batumi`;
}
