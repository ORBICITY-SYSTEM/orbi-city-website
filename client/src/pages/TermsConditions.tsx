export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl text-blue-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Orbi City Batumi website and services, you accept and agree 
              to be bound by these Terms and Conditions. If you do not agree to these terms, please 
              do not use our services.
            </p>

            <h2>2. Reservations and Bookings</h2>
            <h3>2.1 Booking Process</h3>
            <p>
              All reservations are subject to availability and confirmation. We reserve the right to 
              refuse any reservation at our discretion.
            </p>

            <h3>2.2 Payment</h3>
            <p>
              Payment is required at the time of booking unless otherwise specified. We accept major 
              credit cards and other payment methods as indicated on our website.
            </p>

            <h3>2.3 Pricing</h3>
            <p>
              All prices are listed in US Dollars (USD) and are subject to change without notice. 
              The price applicable to your reservation is the price displayed at the time of booking.
            </p>

            <h2>3. Cancellation and Refund Policy</h2>
            <h3>3.1 Cancellation Terms</h3>
            <ul>
              <li>Cancellations made 7+ days before check-in: Full refund</li>
              <li>Cancellations made 3-6 days before check-in: 50% refund</li>
              <li>Cancellations made less than 3 days before check-in: No refund</li>
            </ul>

            <h3>3.2 No-Show Policy</h3>
            <p>
              Failure to arrive on your scheduled check-in date without prior cancellation will result 
              in forfeiture of the full booking amount.
            </p>

            <h3>3.3 Early Departure</h3>
            <p>
              No refunds will be provided for early departures. The full reservation amount remains due.
            </p>

            <h2>4. Check-In and Check-Out</h2>
            <h3>4.1 Check-In Time</h3>
            <p>Standard check-in time is 3:00 PM. Early check-in may be available upon request and subject to availability.</p>

            <h3>4.2 Check-Out Time</h3>
            <p>Standard check-out time is 12:00 PM (noon). Late check-out may be available for an additional fee.</p>

            <h3>4.3 Identification</h3>
            <p>
              Valid government-issued photo identification and a credit card are required at check-in.
            </p>

            <h2>5. Guest Responsibilities</h2>
            <h3>5.1 Property Care</h3>
            <p>
              Guests are responsible for any damage to the apartment or property during their stay. 
              Charges for repairs or replacements will be applied to the guest's account.
            </p>

            <h3>5.2 Occupancy Limits</h3>
            <p>
              The number of guests must not exceed the maximum occupancy stated for the apartment. 
              Unauthorized guests may result in additional charges or termination of stay.
            </p>

            <h3>5.3 Noise and Conduct</h3>
            <p>
              Guests must respect quiet hours (10:00 PM - 8:00 AM) and conduct themselves in a manner 
              that does not disturb other guests.
            </p>

            <h3>5.4 Smoking Policy</h3>
            <p>
              All apartments are non-smoking. Smoking is only permitted in designated outdoor areas. 
              Violation will result in a cleaning fee.
            </p>

            <h2>6. Liability</h2>
            <h3>6.1 Personal Property</h3>
            <p>
              Orbi City Batumi is not responsible for loss, theft, or damage to guests' personal property.
            </p>

            <h3>6.2 Limitation of Liability</h3>
            <p>
              Our liability is limited to the amount paid for your reservation. We are not liable for 
              indirect, incidental, or consequential damages.
            </p>

            <h2>7. Force Majeure</h2>
            <p>
              We are not liable for failure to perform our obligations due to circumstances beyond our 
              reasonable control, including natural disasters, government actions, or other force majeure events.
            </p>

            <h2>8. Privacy</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy 
              Policy to understand our practices.
            </p>

            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be 
              effective immediately upon posting on our website.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of Georgia. Any disputes shall be 
              resolved in the courts of Batumi, Georgia.
            </p>

            <h2>11. Contact Information</h2>
            <p>For questions about these Terms and Conditions, please contact us:</p>
            <ul>
              <li>Email: info@orbicitybatumi.com</li>
              <li>Phone: +995 555 19 90 90</li>
              <li>Address: Orbi City, Block C, Khimshiashvili St, Batumi, Georgia</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
