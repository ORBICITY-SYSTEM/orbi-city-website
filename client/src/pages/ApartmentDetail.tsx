import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import {
  Building2,
  Users,
  Bed,
  Bath,
  Maximize,
  Star,
  ChevronLeft,
  Calendar,
  Check,
  X,
  MapPin,
  Wifi,
  UtensilsCrossed,
  Shield,
  Sparkles,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function ApartmentDetail() {
  const [, params] = useRoute("/apartment/:id");
  const apartmentId = params?.id ? parseInt(params.id) : 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const { data: apartment, isLoading } = trpc.apartments.getById.useQuery(
    { id: apartmentId },
    { enabled: apartmentId > 0 }
  );

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Apartment Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const gallery = apartment.gallery ? JSON.parse(apartment.gallery as string) : [apartment.imageUrl];
  const features = apartment.features ? JSON.parse(apartment.features as string) : [];

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? (apartment.pricePerNight / 100) * nights : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Building2 className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary">ORBI CITY</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{apartment.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Batumi, Georgia</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-semibold">4.9</span>
                    <span>(127 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  ${apartment.pricePerNight / 100}
                </div>
                <div className="text-muted-foreground">per night</div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden group">
                <img
                  src={gallery[selectedImage]}
                  alt={apartment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                  {selectedImage + 1} / {gallery.length}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {gallery.slice(0, 4).map((img: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-[140px] rounded-xl overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index
                      ? "ring-4 ring-primary"
                      : "hover:ring-2 ring-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{apartment.maxGuests}</div>
                        <div className="text-sm text-muted-foreground">Guests</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bed className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{apartment.bedrooms}</div>
                        <div className="text-sm text-muted-foreground">Bedrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bath className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{apartment.bathrooms}</div>
                        <div className="text-sm text-muted-foreground">Bathrooms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Maximize className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{apartment.area}</div>
                        <div className="text-sm text-muted-foreground">m²</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold mb-4">About This Apartment</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {apartment.description}
                </p>
              </div>

              {/* Features */}
              <div ref={featuresRef}>
                <h2 className="text-3xl font-bold mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 bg-muted rounded-lg ${
                        featuresInView ? "animate-in fade-in slide-in-from-left" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotel Amenities */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Hotel Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Wifi, label: "Free WiFi" },
                    { icon: UtensilsCrossed, label: "Restaurant" },
                    { icon: Shield, label: "24/7 Security" },
                    { icon: Sparkles, label: "Concierge" },
                  ].map((amenity, index) => (
                    <Card key={index} className="text-center">
                      <CardContent className="p-6">
                        <amenity.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium">{amenity.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-2xl">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${apartment.pricePerNight / 100}
                    </div>
                    <div className="text-muted-foreground">per night</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[...Array(apartment.maxGuests)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {checkIn && checkOut && (
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">
                          ${apartment.pricePerNight / 100} × {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                        </span>
                        <span className="font-semibold">${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-primary text-xl">${calculateTotal()}</span>
                      </div>
                    </div>
                  )}

                  <Link href="/booking">
                    <Button className="w-full" size="lg">
                      <Calendar className="mr-2 w-5 h-5" />
                      Reserve Now
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    You won't be charged yet
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
