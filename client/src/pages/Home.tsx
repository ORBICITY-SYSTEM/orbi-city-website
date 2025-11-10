import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { HERO_TITLE, HERO_SUBTITLE, CONTACT_INFO } from "@/const";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data: apartments, isLoading } = trpc.apartments.list.useQuery();

  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelector("h1"), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3
      });
      
      gsap.from(heroRef.current.querySelector("p"), {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6
      });
      
      gsap.from(heroRef.current.querySelectorAll(".hero-btn"), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.9
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  OC
                </div>
                <span className="text-xl font-bold text-gray-900">ORBI CITY</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#apartments" className="text-gray-700 hover:text-blue-600 transition">Apartments</a>
              <a href="#amenities" className="text-gray-700 hover:text-blue-600 transition">Amenities</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="home"
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/hero-batumi-aerial.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {HERO_TITLE}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {HERO_SUBTITLE}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="hero-btn bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-6 text-lg font-semibold">
                Book Now
              </Button>
            </Link>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="hero-btn border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-semibold">
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section id="apartments" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Space
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of our apartments is thoughtfully designed to provide an unparalleled experience. 
              Explore our offerings and find the one that speaks to you.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments?.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <img 
                      src={apartment.imageUrl} 
                      alt={apartment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {apartment.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {apartment.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <span>{apartment.maxGuests} Guests</span>
                      <span>{apartment.bedrooms} Bed{apartment.bedrooms > 1 ? 's' : ''}</span>
                      <span>{apartment.bathrooms} Bath{apartment.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                    
                    <Link href={`/apartment/${apartment.id}`}>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for an unforgettable stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Restaurant", desc: "Savor exquisite dishes prepared by our world-class chefs" },
              { title: "Free WiFi", desc: "Stay connected with complimentary high-speed internet access" },
              { title: "24/7 Security", desc: "Your safety is our priority with round-the-clock surveillance" },
              { title: "Concierge", desc: "Our dedicated team is at your service for any request" }
            ].map((amenity, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-gray-600">{amenity.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-1 mb-8">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-yellow-400 text-2xl">★</span>
              ))}
              <span className="ml-2 text-xl">4.9/5</span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white text-gray-900 p-8">
              <CardContent>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg mb-6 italic">
                  "Absolutely stunning views of the Black Sea! The apartment was luxurious and the staff 
                  incredibly welcoming. The balcony breakfast was unforgettable."
                </p>
                <div>
                  <p className="font-bold">Sarah Johnson</p>
                  <p className="text-gray-600">United Kingdom</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-gray-600">
              Book your stay at Orbi City Batumi and discover the perfect blend of comfort, elegance, and breathtaking sea views
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Phone className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-blue-600 hover:underline">
                  {CONTACT_INFO.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-600 hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-gray-600">{CONTACT_INFO.address}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg">
                <Calendar className="mr-2 w-5 h-5" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Orbi City Batumi</h3>
              <p className="text-gray-400">
                Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking 
                Black Sea views and five-star comfort.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/apartments" className="hover:text-white transition">Apartments</a></li>
                <li><a href="/amenities" className="hover:text-white transition">Amenities</a></li>
                <li><a href="/gallery" className="hover:text-white transition">Gallery</a></li>
                <li><a href="/location" className="hover:text-white transition">Location</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/loyalty-program" className="hover:text-white transition">Loyalty Program</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-500">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about-us" className="hover:text-white transition">About Us</a></li>
                <li><a href="/purchase-conditions" className="hover:text-white transition">Purchase Conditions</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms-conditions" className="hover:text-white transition">Terms and Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{CONTACT_INFO.address}</li>
                <li>Email: {CONTACT_INFO.email}</li>
                <li>Phone: {CONTACT_INFO.phone}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
