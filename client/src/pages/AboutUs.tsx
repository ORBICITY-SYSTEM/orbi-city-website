import { Building2, FileText, Phone, Shield } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Learn more about Orbi City Batumi and our commitment to excellence
          </p>
        </div>
      </header>

      {/* Company Info */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Company Information</h2>
            <p className="text-lg text-slate-600 mb-12">
              Orbi City Batumi is a premier luxury aparthotel located in the heart of Batumi, Georgia. 
              We offer world-class accommodations with stunning Black Sea views, combining the comfort 
              of home with five-star hotel amenities.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Legal Name */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Legal Name</h3>
                </div>
                <p className="text-slate-600">Orbi City LLC</p>
              </div>

              {/* Registration */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Registration</h3>
                </div>
                <p className="text-slate-600">Registered in Georgia</p>
                <p className="text-slate-600">Business ID: 123456789</p>
              </div>

              {/* Phone */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Contact Phone</h3>
                </div>
                <p className="text-slate-600">+995 555 19 90 90</p>
              </div>

              {/* License */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Licensed Operator</h3>
                </div>
                <p className="text-slate-600">Fully licensed and insured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Services</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-6">
                At Orbi City Batumi, we provide comprehensive aparthotel services designed to make your 
                stay comfortable, convenient, and memorable. Our offerings include:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>Luxury furnished apartments with full kitchens and modern amenities</li>
                <li>24/7 reception and concierge services</li>
                <li>Daily housekeeping and linen service</li>
                <li>On-site restaurant and room service</li>
                <li>High-speed WiFi throughout the property</li>
                <li>Secure parking facilities</li>
                <li>Fitness center and wellness facilities</li>
                <li>Business center and meeting rooms</li>
                <li>Tour and activity booking assistance</li>
                <li>Airport transfer services</li>
              </ul>
              <p className="text-slate-600 mt-6">
                Whether you're visiting for business or leisure, short-term or extended stay, 
                Orbi City Batumi offers the perfect blend of hotel services and apartment comfort.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
