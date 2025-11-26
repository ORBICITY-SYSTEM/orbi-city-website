import { ENV } from "./env";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email notification using built-in Forge API
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch(`${ENV.forgeApiUrl}/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Email] Failed to send email: ${response.status} ${errorText}`);
      return false;
    }

    console.log(`[Email] Successfully sent email to ${options.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Send booking request notification email to property manager
 */
export async function sendBookingRequestEmail(bookingData: {
  guestName: string;
  guestEmail: string;
  guestPhone?: string | null;
  apartmentName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  specialRequests?: string | null;
  bookingId: number;
}): Promise<boolean> {
  const checkInDate = bookingData.checkIn.toLocaleDateString("en-GB");
  const checkOutDate = bookingData.checkOut.toLocaleDateString("en-GB");
  const nights = Math.ceil(
    (bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #000; color: #fff; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .section { margin-bottom: 25px; }
    .label { font-weight: bold; color: #000; }
    .value { color: #555; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏨 ახალი ჯავშნის მოთხოვნა</h1>
      <p>Orbi City Batumi</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2>სტუმრის ინფორმაცია</h2>
        <p><span class="label">სახელი:</span> <span class="value">${bookingData.guestName}</span></p>
        <p><span class="label">ელ. ფოსტა:</span> <span class="value">${bookingData.guestEmail}</span></p>
        <p><span class="label">ტელეფონი:</span> <span class="value">${bookingData.guestPhone || "არ არის მითითებული"}</span></p>
      </div>
      
      <div class="section">
        <h2>ჯავშნის დეტალები</h2>
        <p><span class="label">აპარტამენტი:</span> <span class="value">${bookingData.apartmentName}</span></p>
        <p><span class="label">დაბინავება:</span> <span class="value">${checkInDate}</span></p>
        <p><span class="label">გასვლა:</span> <span class="value">${checkOutDate}</span></p>
        <p><span class="label">ღამეები:</span> <span class="value">${nights}</span></p>
        <p><span class="label">სტუმრები:</span> <span class="value">${bookingData.guests}</span></p>
      </div>
      
      ${
        bookingData.specialRequests
          ? `
      <div class="section">
        <h2>სპეციალური მოთხოვნები</h2>
        <p class="value">${bookingData.specialRequests}</p>
      </div>
      `
          : ""
      }
      
      <div class="section">
        <p><span class="label">ჯავშნის ID:</span> <span class="value">#${bookingData.bookingId}</span></p>
        <p style="color: #d32f2f; font-size: 14px; margin-top: 20px; font-weight: bold;">
          ⚠️ სტუმარი მოელის ფასის შეთავაზებას WhatsApp-ზე!
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 10px;">
          გთხოვთ დაუკავშირდეთ სტუმარს WhatsApp-ზე (+995555199090) და მიაწოდოთ ფასები, ხელმისაწვდომობა და სხვა დეტალები.
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p>Orbi City Batumi - Luxury Aparthotel</p>
      <p>orbicitybatumi.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: "info@orbicitybatumi.com",
    subject: "ჯავშნის მოთხოვნა - orbicitybatumi.com",
    html,
  });
}
