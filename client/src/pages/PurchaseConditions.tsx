export default function PurchaseConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Purchase Conditions</h1>
          <p className="text-xl text-blue-100">
            Booking and payment terms for Orbi City Batumi
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Booking Confirmation</h2>
            <p>
              A booking is considered confirmed only after full payment has been received and a 
              confirmation email has been sent to the guest. The confirmation email will include:
            </p>
            <ul>
              <li>Booking reference number</li>
              <li>Apartment details and type</li>
              <li>Check-in and check-out dates</li>
              <li>Total amount paid</li>
              <li>Guest information</li>
            </ul>

            <h2>2. Payment Methods</h2>
            <h3>2.1 Accepted Payment Methods</h3>
            <p>We accept the following payment methods:</p>
            <ul>
              <li>Credit Cards (Visa, Mastercard, American Express)</li>
              <li>Debit Cards</li>
              <li>Bank Transfer</li>
              <li>PayPal</li>
            </ul>

            <h3>2.2 Payment Security</h3>
            <p>
              All online transactions are processed through secure, encrypted payment gateways. 
              We do not store your complete credit card information on our servers.
            </p>

            <h3>2.3 Currency</h3>
            <p>
              All prices are quoted in US Dollars (USD). If paying in a different currency, the 
              exchange rate applied will be that of your bank or payment provider.
            </p>

            <h2>3. Deposit and Full Payment</h2>
            <h3>3.1 Immediate Payment</h3>
            <p>
              For reservations made within 30 days of arrival, full payment is required at the time 
              of booking.
            </p>

            <h3>3.2 Advance Bookings</h3>
            <p>
              For reservations made more than 30 days in advance:
            </p>
            <ul>
              <li>A 30% deposit is required at the time of booking</li>
              <li>The remaining balance is due 30 days before check-in</li>
            </ul>

            <h2>4. Pricing and Fees</h2>
            <h3>4.1 Room Rates</h3>
            <p>
              Room rates vary based on:
            </p>
            <ul>
              <li>Season and demand</li>
              <li>Length of stay</li>
              <li>Apartment type</li>
              <li>Special offers or promotions</li>
            </ul>

            <h3>4.2 Additional Fees</h3>
            <p>The following additional fees may apply:</p>
            <ul>
              <li>Tourism tax (if applicable)</li>
              <li>Extra guest charges</li>
              <li>Pet fees (where applicable)</li>
              <li>Parking fees</li>
              <li>Late check-out fees</li>
            </ul>

            <h3>4.3 Taxes</h3>
            <p>
              All applicable taxes are included in the quoted price unless otherwise stated.
            </p>

            <h2>5. Cancellation and Refund Policy</h2>
            <h3>5.1 Standard Cancellation Policy</h3>
            <ul>
              <li><strong>7+ days before arrival:</strong> Full refund minus 5% processing fee</li>
              <li><strong>3-6 days before arrival:</strong> 50% refund</li>
              <li><strong>Less than 3 days:</strong> No refund</li>
            </ul>

            <h3>5.2 Non-Refundable Rates</h3>
            <p>
              Some promotional rates are non-refundable. This will be clearly indicated at the time 
              of booking.
            </p>

            <h3>5.3 Refund Processing</h3>
            <p>
              Approved refunds will be processed within 7-10 business days to the original payment method.
            </p>

            <h2>6. Modifications to Reservations</h2>
            <h3>6.1 Date Changes</h3>
            <p>
              Requests to change reservation dates are subject to availability and may incur additional 
              charges if the new dates have different rates.
            </p>

            <h3>6.2 Apartment Upgrades</h3>
            <p>
              Upgrades to a higher category apartment are available subject to availability and payment 
              of the price difference.
            </p>

            <h3>6.3 Modification Fees</h3>
            <p>
              Modifications made within 7 days of arrival may incur a $25 administrative fee.
            </p>

            <h2>7. Group Bookings</h2>
            <p>
              Bookings of 3 or more apartments are considered group bookings and may be subject to 
              different terms and conditions. Please contact us directly for group booking inquiries.
            </p>

            <h2>8. Long-Term Stays</h2>
            <p>
              Stays of 30 days or more qualify for long-term rates. Special payment terms may apply. 
              Please contact us for long-term stay arrangements.
            </p>

            <h2>9. Price Guarantee</h2>
            <p>
              The price you pay is the price confirmed at the time of booking. We will not increase 
              the price after your booking is confirmed, except in cases of:
            </p>
            <ul>
              <li>Additional services requested by the guest</li>
              <li>Changes to government taxes</li>
              <li>Modifications to the original booking</li>
            </ul>

            <h2>10. Disputes and Chargebacks</h2>
            <p>
              If you have any concerns about charges, please contact us directly before initiating a 
              chargeback. We are committed to resolving all disputes fairly and promptly.
            </p>

            <h2>11. Contact for Purchase Inquiries</h2>
            <p>For questions about purchase conditions or billing, please contact us:</p>
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
