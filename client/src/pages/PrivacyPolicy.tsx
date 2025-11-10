export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Introduction</h2>
            <p>
              Orbi City Batumi ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Make a reservation</li>
              <li>Register for an account</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us with inquiries</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information (email, phone number, address)</li>
              <li>Payment information</li>
              <li>Identification documents (for check-in purposes)</li>
              <li>Preferences and special requests</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website addresses</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and manage your reservations</li>
              <li>Provide customer service and support</li>
              <li>Send booking confirmations and updates</li>
              <li>Improve our services and website</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and enhance security</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for transaction processing</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the Internet is 100% secure.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not knowingly 
              collect personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
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
