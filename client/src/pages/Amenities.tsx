import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Utensils,
  Wifi,
  Shield,
  Headphones,
  Dumbbell,
  Waves,
  Car,
  Coffee,
  Wind,
  Tv,
  Sparkles,
  Users,
} from "lucide-react";
import { APP_LOGO } from "@/const";

const amenities = [
  {
    icon: Utensils,
    title: "Restaurant & Bar",
    description: "Savor exquisite dishes prepared by world-class chefs in our elegant restaurant, or enjoy cocktails at our rooftop bar with panoramic sea views.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary high-speed WiFi throughout the property, perfect for both leisure and business travelers.",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Your safety is our priority. Our property features round-the-clock security personnel, CCTV surveillance, and secure access control.",
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    description: "Our dedicated concierge team is available 24/7 to assist with reservations, tours, transportation, and any special requests.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Maintain your fitness routine in our state-of-the-art gym equipped with modern cardio and strength training equipment.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Relax and unwind in our stunning infinity pool overlooking the Black Sea, complete with a sundeck and poolside service.",
  },
  {
    icon: Car,
    title: "Parking",
    description: "Secure underground parking available for guests, with valet service and electric vehicle charging stations.",
  },
  {
    icon: Coffee,
    title: "Room Service",
    description: "Enjoy in-room dining 24/7 with our extensive menu featuring local and international cuisine delivered to your door.",
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    description: "Individual climate control in every apartment ensures your perfect comfort year-round.",
  },
  {
    icon: Tv,
    title: "Smart Entertainment",
    description: "Smart TVs with international channels, streaming services, and high-quality sound systems in every apartment.",
  },
  {
    icon: Sparkles,
    title: "Housekeeping",
    description: "Daily housekeeping service with premium toiletries, fresh linens, and meticulous attention to detail.",
  },
  {
    icon: Users,
    title: "Business Center",
    description: "Fully equipped business center with meeting rooms, high-speed internet, and professional support services.",
  },
];

export default function Amenities() {
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
            <Link href="/"><a className="text-gray-600 hover:text-primary transition-colors">Home</a></Link>
            <Link href="/apartments"><a className="text-gray-600 hover:text-primary transition-colors">Apartments</a></Link>
            <Link href="/amenities"><a className="text-primary font-semibold">Amenities</a></Link>
            <Link href="/gallery"><a className="text-gray-600 hover:text-primary transition-colors">Gallery</a></Link>
            <Link href="/location"><a className="text-gray-600 hover:text-primary transition-colors">Location</a></Link>
            <Link href="/contact"><a className="text-gray-600 hover:text-primary transition-colors">Contact</a></Link>
          </nav>
          <Link href="/#book">
            <Button>Book Now</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">World-Class Amenities</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Everything you need for an unforgettable stay, from luxury dining to state-of-the-art facilities
          </p>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{amenity.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">In-Apartment Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Living Spaces</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Fully equipped modern kitchen with premium appliances</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Spacious living area with designer furniture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Private balcony with breathtaking sea views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Floor-to-ceiling windows for natural light</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Elegant dining area perfect for entertaining</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Bedroom & Bath</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>King-size beds with premium linens and ceiling mirrors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Luxury bathroom with rain shower and bathtub</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Premium toiletries and plush towels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Ample closet space with safe</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>Blackout curtains for perfect sleep</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Luxury Living</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your stay at Orbi City Batumi and enjoy all these premium amenities and more
          </p>
          <Link href="/#book">
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
                <Link href="/"><a className="text-gray-400 hover:text-white transition-colors">Home</a></Link>
                <Link href="/apartments"><a className="text-gray-400 hover:text-white transition-colors">Apartments</a></Link>
                <Link href="/amenities"><a className="text-gray-400 hover:text-white transition-colors">Amenities</a></Link>
                <Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact</a></Link>
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
