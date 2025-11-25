import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary">
              <img src={APP_LOGO} alt="OC" className="w-10 h-10" />
              ORBI CITY
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Home</span></Link>
            <Link href="/apartments"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Apartments</span></Link>
            <Link href="/amenities"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Amenities</span></Link>
            <Link href="/gallery"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Gallery</span></Link>
            <Link href="/location"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Location</span></Link>
            <Link href="/contact"><span className="text-primary font-semibold cursor-pointer">Contact</span></Link>
          </nav>
          <Link href="/apartments">
            <Button>Book Now</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            We're here to help. Get in touch with our team for any questions or assistance
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Address</h3>
                <p className="text-gray-600">
                  Orbi City, Block C<br />
                  Khimshiashvili St<br />
                  Batumi, Georgia
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+995555199090" className="hover:text-primary transition-colors">
                    +995 555 19 90 90
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-2">WhatsApp Available</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@orbicitybatumi.com" className="hover:text-primary transition-colors">
                    info@orbicitybatumi.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Reception</h3>
                <p className="text-gray-600">
                  24/7<br />
                  Always Available
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+995 555 123 456"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Booking Inquiry"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg py-6"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't wait! Secure your luxury apartment at Orbi City Batumi today
          </p>
          <Link href="/apartments">
            <Button size="lg" variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ORBI CITY Batumi</h3>
              <p className="text-gray-400">
                Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</span></Link>
                <Link href="/apartments"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Apartments</span></Link>
                <Link href="/amenities"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Amenities</span></Link>
                <Link href="/contact"><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</span></Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Orbi City, Block C, Khimshiashvili St, Batumi</p>
              <p className="text-gray-400 mb-2">Email: info@orbicitybatumi.com</p>
              <p className="text-gray-400">Phone: +995 555 19 90 90</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
