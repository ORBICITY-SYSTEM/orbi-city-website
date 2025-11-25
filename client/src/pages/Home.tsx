import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  Users,
  Bed,
  Maximize,
} from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";
import { MobileMenu } from "@/components/MobileMenu";
import { trackBookingClick } from "@/components/GoogleAnalytics";
import { FooterCarousel } from "@/components/FooterCarousel";
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
  const [editMode, setEditMode] = useState(false);
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
              <span className="flex items-center gap-3 cursor-pointer">
                <img
                  src="/orbi-city-logo-real.webp"
                  alt="Orbi City Logo"
                  className="h-14 w-14 object-contain"
                />
                <span className="text-2xl font-bold text-white">ORBI CITY </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/apartments">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Apartments
                </span>
              </Link>
              <Link href="/amenities">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Amenities
                </span>
              </Link>
              <Link href="/gallery">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Gallery
                </span>
              </Link>
              <Link href="/location">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Location
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Contact
                </span>
              </Link>
              <Link href="/loyalty-program">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Loyalty Program
                </span>
              </Link>
              <Link href="/blog">
                <span className="text-white hover:text-yellow-500 transition-colors cursor-pointer">
                  Blog
                </span>
              </Link>
              <button className="px-4 py-2 border border-white/30 rounded text-white hover:bg-white/10 transition-colors">
                EN
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`px-4 py-2 rounded font-medium transition-all ${
                    editMode
                      ? "bg-yellow-500 text-slate-900 hover:bg-yellow-600"
                      : "border border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  {editMode ? "✓ Edit Mode" : "Edit Mode"}
                </button>
              )}
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPath="/" />
          </div>
        </div>
      </nav>

      {/* Hero Section - Four Seasons Style with Video */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-city-timelapse.mp4" type="video/mp4" />
        </video>
        
        {/* Elegant Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-lg md:text-xl text-gold-400 mb-4 tracking-[0.3em] uppercase font-light">
              Welcome to Orbi City Batumi
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight">
              Your Perfect
              <br />
              <span className="text-gold-400 font-normal">Seaside Escape</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Experience unparalleled luxury on the shores of the Black Sea
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in-up-delay">
            <Link href="/apartments">
              <Button
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-medium px-10 py-7 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Explore Residences
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
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-10 py-7 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Contact Concierge
              </Button>
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronUp className="h-8 w-8 text-white/70 rotate-180" />
          </div>
        </div>
      </section>

      {/* Apartments Section - Four Seasons Luxury */}
      <section className="py-32 bg-gradient-to-b from-white via-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Exclusive Residences
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-navy-900 mb-6">
              Discover Your
              <br />
              <span className="text-gold-gradient">Perfect Sanctuary</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Each residence is meticulously crafted to offer an unparalleled living experience,
              where timeless elegance meets contemporary comfort.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex gap-4 pt-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ))}
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
                    className="luxury-card overflow-hidden bg-white border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500 group"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={apt.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {user?.role === "admin" && editMode && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEditClick(apt);
                          }}
                          className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 animate-pulse"
                          title="Edit Apartment"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-3xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                        {apt.name}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                        {apt.description}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 font-light">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gold-500" />
                          {apt.maxGuests}
                        </span>
                        <span className="text-gold-400">•</span>
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-gold-500" />
                          {apt.bedrooms}
                        </span>
                        <span className="text-gold-400">•</span>
                        <span className="flex items-center gap-1">
                          <Maximize className="h-4 w-4 text-gold-500" />
                          {apt.area}m²
                        </span>
                      </div>
                      <Link href={`/apartment/${apt.id}`}>
                        <Button
                          className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-medium py-6 transition-all duration-300 hover:shadow-lg border-0"
                          variant="default"
                          onClick={() => trackBookingClick(apt.name)}
                        >
                          Discover Residence
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

      {/* Gallery Preview Section - Four Seasons Luxury */}
      <section className="py-32 bg-gradient-to-b from-white to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Visual Journey
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-navy-900 mb-6">
              A Glimpse into Our
              <br />
              <span className="text-gold-gradient">World of Luxury</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-1-balcony-sea.webp"
                alt="Stunning sea view from a balcony"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-2-lobby.webp"
                alt="Elegant hotel lobby"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-3-bedroom.webp"
                alt="Modern bedroom interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-4-night-view.webp"
                alt="Night view of Batumi coastline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-5-bedroom-2.webp"
                alt="Comfortable apartment living area"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative h-96 overflow-hidden rounded-2xl group border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500">
              <img
                src="/gallery-6-aerial-coast.webp"
                alt="Aerial view of Batumi coast"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/gallery">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-medium px-12 py-7 text-lg transition-all duration-300 hover:shadow-xl border-0"
              >
                Explore Full Gallery
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
      </section>      {/* Virtual Tours Section - Four Seasons Luxury */}
      <section className="py-32 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-gold-600 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Immersive Experience
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-navy-900 mb-6">
              Virtual Tours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Take a virtual tour of Orbi City Batumi and explore our stunning apartments and
              facilities from the comfort of your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Video 1 - Orbi City Tour */}
            <div className="luxury-card rounded-2xl overflow-hidden bg-white border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500 group">
              <div className="relative" style={{ paddingBottom: '56.25%', height: '400px' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Orbi City Batumi - Full Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                  Orbi City Batumi - Full Tour
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Explore the entire Orbi City complex, including apartments, amenities,
                  and stunning sea views.
                </p>
              </div>
            </div>

            {/* Video 2 - Apartment Interior */}
            <div className="luxury-card rounded-2xl overflow-hidden bg-white border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500 group">
              <div className="relative" style={{ paddingBottom: '56.25%', height: '400px' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Luxury Apartment Interior Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                  Luxury Apartment Interior
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Step inside our beautifully designed apartments with modern furnishings
                  and panoramic views.
                </p>
              </div>
            </div>

            {/* Video 3 - Batumi Location */}
            <div className="luxury-card rounded-2xl overflow-hidden bg-white border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500 group">
              <div className="relative" style={{ paddingBottom: '56.25%', height: '400px' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Batumi City & Beach Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                  Batumi City & Beach
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Discover the vibrant city of Batumi, its beautiful beaches, and nearby
                  attractions.
                </p>
              </div>
            </div>

            {/* Video 4 - Amenities */}
            <div className="luxury-card rounded-2xl overflow-hidden bg-white border-2 border-gold-200/30 hover:border-gold-400/50 transition-all duration-500 group">
              <div className="relative" style={{ paddingBottom: '56.25%', height: '400px' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Orbi City Amenities & Facilities"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-serif font-light text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                  Amenities & Facilities
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Tour our world-class amenities including pools, gym, restaurant, and
                  entertainment areas.
                </p>
              </div>
            </div>
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

      {/* Footer Carousel - Luxury Media Showcase */}
      <FooterCarousel />

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16">
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
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/apartments">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Apartments
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/amenities">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Amenities
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/gallery">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Gallery
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/location">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Location
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/loyalty-program">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Loyalty Program
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Blog
                    </span>
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
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/purchase-conditions">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Purchase Conditions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions">
                    <span className="text-slate-300 hover:text-yellow-500 transition-colors cursor-pointer">
                      Terms and Conditions
                    </span>
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
