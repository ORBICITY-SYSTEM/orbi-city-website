import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  Waves, 
  Wifi, 
  Shield, 
  UtensilsCrossed, 
  Sparkles,
  ChevronRight,
  Star,
  MapPin,
  Calendar
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Fetch apartments
  const { data: apartments, isLoading: apartmentsLoading } = trpc.apartments.list.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero animation
  useEffect(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll(".hero-text"), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: apartmentsRef, inView: apartmentsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-primary">ORBI CITY</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#apartments" className="text-foreground hover:text-primary transition-colors">Apartments</a>
              <a href="#amenities" className="text-foreground hover:text-primary transition-colors">Amenities</a>
              <a href="#location" className="text-foreground hover:text-primary transition-colors">Location</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <Link href="/booking"><Button className="bg-primary hover:bg-primary/90">Book Now</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src="/hero-bg.jpg"
            alt="Orbi City Batumi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="hero-text">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Your Perfect
              <span className="block text-accent">Seaside Escape</span>
            </h1>
          </div>
          <div className="hero-text">
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Experience luxury at Orbi City Batumi aparthotel with stunning Black Sea views, 
              private balconies, and premium amenities
            </p>
          </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                <Calendar className="mr-2 w-5 h-5" />
                Book Your Stay
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg">
              <Waves className="mr-2 w-5 h-5" />
              Virtual Tour
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-muted"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              World-Class Amenities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for an unforgettable stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UtensilsCrossed, title: "Fine Dining", desc: "World-class chefs" },
              { icon: Wifi, title: "High-Speed WiFi", desc: "Stay connected" },
              { icon: Shield, title: "24/7 Security", desc: "Your safety first" },
              { icon: Sparkles, title: "Concierge", desc: "At your service" },
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  featuresInView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apartments Section */}
      <section 
        id="apartments"
        ref={apartmentsRef}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Space
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Each apartment is thoughtfully designed to provide an unparalleled experience
            </p>
          </div>

          {apartmentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : apartments && apartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments.slice(0, 6).map((apartment, index) => (
                <Card 
                  key={apartment.id}
                  className={`group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    apartmentsInView ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={apartment.imageUrl}
                      alt={apartment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      ${apartment.pricePerNight / 100}/night
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{apartment.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {apartment.shortDescription || apartment.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{apartment.maxGuests} Guests</span>
                      <span>{apartment.bedrooms} Bedrooms</span>
                      <span>{apartment.area}m²</span>
                    </div>
                    <Link href={`/apartment/${apartment.id}`}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        View Details
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No apartments available at the moment</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Our Guests Say
              </h2>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-secondary text-secondary" />
                ))}
                <span className="ml-2 text-xl font-semibold">4.9/5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="bg-white text-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                        {testimonial.guestName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.guestName}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.guestCountry}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book your stay at Orbi City Batumi and discover the perfect blend of comfort, 
            elegance, and breathtaking sea views
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                <Calendar className="mr-2 w-5 h-5" />
                Book Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <MapPin className="mr-2 w-5 h-5" />
              View Location
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6" />
                <span className="text-xl font-bold">ORBI CITY</span>
              </div>
              <p className="text-background/80">
                Luxury aparthotel in the heart of Batumi
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-background/80">
                <li><a href="#apartments" className="hover:text-background">Apartments</a></li>
                <li><a href="#amenities" className="hover:text-background">Amenities</a></li>
                <li><a href="#location" className="hover:text-background">Location</a></li>
                <li><a href="#contact" className="hover:text-background">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-background/80">
                <li>Khimshiashvili St, Block C</li>
                <li>Batumi, Georgia</li>
                <li>+995 555 19 90 90</li>
                <li>info@orbicitybatumi.com</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/60">
            <p>&copy; 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
