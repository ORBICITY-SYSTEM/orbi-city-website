import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Wifi,
  UtensilsCrossed,
  Shield,
  Headphones,
  Star,
  Gift,
  DollarSign,
  Award,
  ChevronUp,
  Pencil,
} from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Home() {
  const { user } = useAuth();
  const { data: apartments, isLoading } = trpc.apartments.list.useQuery();
  const [scrolled, setScrolled] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    pricePerNight: 0,
    maxGuests: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
  });

  const utils = trpc.useUtils();
  const updateMutation = trpc.apartments.update.useMutation({
    onSuccess: () => {
      toast.success("Apartment updated successfully");
      utils.apartments.list.invalidate();
      setEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update apartment: ${error.message}`);
    },
  });

  const handleEditClick = (apt: any) => {
    setEditingApartment(apt);
    setEditForm({
      name: apt.name,
      description: apt.description,
      pricePerNight: apt.pricePerNight,
      maxGuests: apt.maxGuests,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      area: apt.area,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (!editingApartment) return;
    updateMutation.mutate({
      id: editingApartment.id,
      ...editForm,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img
                  src="/orbi-city-logo-real.webp"
                  alt="Orbi City Logo"
                  className="h-14 w-14 object-contain"
                />
                <span className="text-2xl font-bold text-white">ORBI CITY </span>
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Home
                </a>
              </Link>
              <Link href="/apartments">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Apartments
                </a>
              </Link>
              <Link href="/amenities">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Amenities
                </a>
              </Link>
              <Link href="/gallery">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Gallery
                </a>
              </Link>
              <Link href="/location">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Location
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Contact
                </a>
              </Link>
              <Link href="/loyalty-program">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Loyalty Program
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-white hover:text-yellow-500 transition-colors">
                  Blog
                </a>
              </Link>
              <button className="px-4 py-2 border border-white/30 rounded text-white hover:bg-white/10 transition-colors">
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url(/hero-batumi-real.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Perfect Seaside Escape
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/apartments">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-6 text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </Link>
            <a
              href="https://wa.me/995555199090"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 px-8 py-6 text-lg"
              >
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Find Your Perfect Space
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each of our apartments is thoughtfully designed to provide an
              unparalleled experience. Explore our offerings and find the one
              that speaks to you.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading apartments...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments?.map((apt, index) => {
                const imageMap: Record<number, string> = {
                  30006: "/apt-suite-sea-view-real.webp",
                  30007: "/apt-delux-suite-real.webp",
                  30008: "/apt-superior-suite-real.webp",
                  30009: "/apt-superior-family-real.webp",
                  30010: "/apt-two-bedroom-real.webp",
                };
                const imageSrc = imageMap[apt.id] || "/hero-bg.jpg";

                return (
                  <Card
                    key={apt.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={apt.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {user?.role === "admin" && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditClick(apt);
                          }}
                          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                          title="Edit Apartment"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {apt.name}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {apt.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span>{apt.maxGuests} Guests</span>
                        <span>•</span>
                        <span>{apt.bedrooms} Bedroom{apt.bedrooms > 1 ? "s" : ""}</span>
                        <span>•</span>
                        <span>{apt.area} m²</span>
                      </div>
                      <Link href={`/apartment/${apt.id}`}>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          variant="default"
                        >
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              A Glimpse into Our World of Luxury
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-1-balcony-sea.webp"
                alt="Stunning sea view from a balcony"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-2-lobby.webp"
                alt="Elegant hotel lobby"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-3-bedroom.webp"
                alt="Modern bedroom interior"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-4-night-view.webp"
                alt="Night view of Batumi coastline"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-5-bedroom-2.webp"
                alt="Comfortable apartment living area"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="/gallery-6-aerial-coast.webp"
                alt="Aerial view of Batumi coast"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              >
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Loyalty Program Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Loyalty Program
            </h2>
            <p className="text-xl text-slate-600">
              Earn points with every stay and enjoy exclusive rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Gift className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Welcome Bonus
                </h3>
                <p className="text-slate-600">
                  Get bonus points when you join our loyalty program
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Exclusive Discounts
                </h3>
                <p className="text-slate-600">
                  Enjoy special rates and early booking privileges
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <DollarSign className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Earn Points
                </h3>
                <p className="text-slate-600">
                  Accumulate points with every booking and stay
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  VIP Access
                </h3>
                <p className="text-slate-600">
                  Priority service and exclusive amenities
                </p>
              </Card>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/loyalty-program-image.webp"
                alt="Orbi City Luxury Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/loyalty-program">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              >
                Join Loyalty Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Discover Orbi City Batumi
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Discover unparalleled luxury at Orbi City, where every apartment
                offers breathtaking Black Sea views and five-star comfort.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Located in the heart of Batumi, our serviced apartments combine
                modern elegance with exceptional hospitality. Whether you're here
                for business or leisure, experience the perfect blend of comfort,
                convenience, and coastal beauty.
              </p>
              <div className="flex gap-4">
                <Link href="/amenities">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
                  >
                    Explore Amenities
                  </Button>
                </Link>
                <Link href="/location">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View Location
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/about-orbi-city-image.webp"
                alt="Orbi City Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">4.9</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              World-Class Amenities
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need for a perfect stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <UtensilsCrossed className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Restaurant
              </h3>
              <p className="text-slate-600">
                Savor exquisite dishes prepared by our world-class chefs.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <Wifi className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                High-Speed WiFi
              </h3>
              <p className="text-slate-600">
                Stay connected with complimentary high-speed internet access
                throughout the hotel.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                24/7 Security
              </h3>
              <p className="text-slate-600">
                Your safety is our priority with round-the-clock security and
                surveillance.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <Headphones className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Concierge Service
              </h3>
              <p className="text-slate-600">
                Our dedicated concierge team is at your service upon request.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/amenities">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What Our Guests Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <p className="text-xl text-slate-700 italic text-center mb-6">
                "The loyalty program is fantastic! Earned points on my stay and
                got a free welcome drink. The sea view from our balcony was
                breathtaking every morning."
              </p>
              <div className="text-center">
                <p className="font-bold text-slate-900">Sarah Johnson</p>
                <p className="text-slate-600">United Kingdom</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-32 text-white"
        style={{
          backgroundImage: "url(/cta-sunset-batumi.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay at Orbi City Batumi and discover the perfect blend of
            comfort, elegance, and breathtaking sea views.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Phone</h3>
              <a
                href="tel:+995555199090"
                className="text-blue-600 hover:underline text-lg"
              >
                +995 555 19 90 90
              </a>
            </Card>

            <Card className="text-center p-8">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email</h3>
              <a
                href="mailto:info@orbicitybatumi.com"
                className="text-blue-600 hover:underline text-lg"
              >
                info@orbicitybatumi.com
              </a>
            </Card>

            <Card className="text-center p-8">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Location
              </h3>
              <p className="text-slate-600 text-lg">
                Orbi City, Block C, Khimshiashvili St, Batumi
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/apartments">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">
                5 Star Aparthotel Orbi City
              </h3>
              <p className="text-slate-300">
                Discover unparalleled luxury at Orbi City, where every apartment
                offers breathtaking Black Sea views and five-star comfort.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/apartments">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Apartments
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/amenities">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Amenities
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/gallery">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Gallery
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/location">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Location
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Contact
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/loyalty-program">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Loyalty Program
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Blog
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about-us">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      About Us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/purchase-conditions">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Purchase Conditions
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    <a className="text-slate-300 hover:text-yellow-500 transition-colors">
                      Terms and Conditions
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">
                Contact
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>Orbi City, Block C, Khimshiashvili St, Batumi</li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@orbicitybatumi.com"
                    className="hover:text-yellow-500"
                  >
                    info@orbicitybatumi.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+995555199090"
                    className="hover:text-yellow-500"
                  >
                    +995 555 19 90 90
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Edit Apartment Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Apartment</DialogTitle>
            <DialogDescription>
              Update the apartment details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Price per Night ($)</Label>
                <Input
                  id="pricePerNight"
                  type="number"
                  value={editForm.pricePerNight}
                  onChange={(e) => setEditForm({ ...editForm, pricePerNight: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxGuests">Max Guests</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  value={editForm.maxGuests}
                  onChange={(e) => setEditForm({ ...editForm, maxGuests: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={editForm.bedrooms}
                  onChange={(e) => setEditForm({ ...editForm, bedrooms: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={editForm.bathrooms}
                  onChange={(e) => setEditForm({ ...editForm, bathrooms: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={editForm.area}
                  onChange={(e) => setEditForm({ ...editForm, area: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
