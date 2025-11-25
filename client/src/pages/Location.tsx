import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { APP_LOGO } from "@/const";
import { MapView } from "@/components/Map";

export default function Location() {
  const handleMapReady = (map: google.maps.Map) => {
    // Add marker for Orbi City
    new google.maps.Marker({
      position: { lat: 41.6168, lng: 41.6367 },
      map: map,
      title: "Orbi City Batumi",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header - Four Seasons Luxury */}
      <header className="bg-navy-950 border-b-2 border-gold-500/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-serif font-light text-gold-400">
              <img src={APP_LOGO} alt="OC" className="w-10 h-10" />
              ORBI CITY
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Home</span></Link>
            <Link href="/apartments"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Apartments</span></Link>
            <Link href="/amenities"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Amenities</span></Link>
            <Link href="/gallery"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Gallery</span></Link>
            <Link href="/location"><span className="text-gold-400 font-medium cursor-pointer">Location</span></Link>
            <Link href="/contact"><span className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-light cursor-pointer">Contact</span></Link>
          </nav>
          <Link href="/apartments">
            <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg hover:shadow-gold-500/50 transition-all duration-300 hover:scale-105">Book Now</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section - Four Seasons Luxury */}
      <section className="relative py-32 bg-navy-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 to-navy-800/95" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-sm text-gold-400 tracking-[0.3em] uppercase mb-4 font-light">FIND US</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6">Our Location</h1>
          <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
            Prime beachfront location in the heart of Batumi, Georgia's stunning Black Sea coast
          </p>
        </div>
      </section>

      {/* Map Section - Four Seasons Luxury */}
      <section className="py-20 bg-gradient-to-b from-white via-cream-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden border-2 border-gold-200/40 shadow-2xl hover:shadow-gold-500/20 transition-all duration-500 h-[600px]">
            <MapView
              initialCenter={{ lat: 41.6168, lng: 41.6367 }}
              initialZoom={15}
              onMapReady={handleMapReady}
            />
          </div>
        </div>
      </section>

      {/* Contact Info - Four Seasons Luxury */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-serif font-light text-center mb-16 text-navy-900">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-gold-200/30 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-serif font-light mb-3 text-navy-900">Address</h3>
                <p className="text-gray-600 font-light">
                  Orbi City, Block C<br />
                  Khimshiashvili St<br />
                  Batumi, Georgia
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold-200/30 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-serif font-light mb-3 text-navy-900">Phone</h3>
                <p className="text-gray-600 font-light">
                  <a href="tel:+995555199090" className="hover:text-primary transition-colors">
                    +995 555 19 90 90
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold-200/30 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-serif font-light mb-3 text-navy-900">Email</h3>
                <p className="text-gray-600 font-light">
                  <a href="mailto:info@orbicitybatumi.com" className="hover:text-primary transition-colors">
                    info@orbicitybatumi.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold-200/30 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-serif font-light mb-3 text-navy-900">Reception</h3>
                <p className="text-gray-600 font-light">
                  24/7<br />
                  Always Available
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nearby Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Batumi Beach</h3>
                    <p className="text-gray-600 mb-2">Direct beach access - 2 min walk</p>
                    <p className="text-sm text-gray-500">Enjoy pristine Black Sea beaches right at your doorstep</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Batumi Boulevard</h3>
                    <p className="text-gray-600 mb-2">5 min walk</p>
                    <p className="text-sm text-gray-500">Scenic seaside promenade with cafes and entertainment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Alphabet Tower</h3>
                    <p className="text-gray-600 mb-2">10 min drive</p>
                    <p className="text-sm text-gray-500">Iconic landmark celebrating Georgian alphabet</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Batumi Botanical Garden</h3>
                    <p className="text-gray-600 mb-2">15 min drive</p>
                    <p className="text-sm text-gray-500">Stunning gardens with exotic plants and sea views</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Batumi Airport</h3>
                    <p className="text-gray-600 mb-2">10 min drive</p>
                    <p className="text-sm text-gray-500">International airport with connections across Europe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Navigation className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">City Center</h3>
                    <p className="text-gray-600 mb-2">5 min drive</p>
                    <p className="text-sm text-gray-500">Shopping, dining, and entertainment district</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the perfect location for your Batumi getaway
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apartments">
              <Button size="lg" variant="secondary" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
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
