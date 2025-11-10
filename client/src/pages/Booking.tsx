import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Building2,
  Calendar,
  Users,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { toast } from "sonner";

export default function Booking() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  // Form state
  const [apartmentId, setApartmentId] = useState<number>(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [step, setStep] = useState(1);

  // Fetch apartments
  const { data: apartments } = trpc.apartments.list.useQuery();
  const selectedApartment = apartments?.find(apt => apt.id === apartmentId);

  // Check availability
  const { data: availability, isLoading: checkingAvailability } = 
    trpc.apartments.checkAvailability.useQuery(
      {
        apartmentId,
        checkIn,
        checkOut,
      },
      {
        enabled: !!checkIn && !!checkOut && !!apartmentId,
      }
    );

  // Create booking mutation
  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      toast.success("Booking confirmed! Check your email for details.");
      setStep(3);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking");
    },
  });

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(0, differenceInDays(end, start));
  };

  const calculateTotal = () => {
    if (!selectedApartment) return 0;
    const nights = calculateNights();
    return (selectedApartment.pricePerNight / 100) * nights;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (!availability) {
      toast.error("Selected dates are not available");
      return;
    }

    createBooking.mutate({
      apartmentId,
      checkIn,
      checkOut,
      guests,
      totalPrice: calculateTotal() * 100,
      guestName: fullName,
      guestEmail: email,
      guestPhone: phone,
    });
  };

  const minCheckIn = format(new Date(), "yyyy-MM-dd");
  const minCheckOut = checkIn ? format(addDays(new Date(checkIn), 1), "yyyy-MM-dd") : minCheckIn;

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
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {[
                { num: 1, label: "Details" },
                { num: 2, label: "Payment" },
                { num: 3, label: "Confirmation" },
              ].map((s) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                  </div>
                  <span className="ml-2 font-medium">{s.label}</span>
                  {s.num < 3 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        step > s.num ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Apartment Selection */}
                      <div>
                        <Label htmlFor="apartment">Select Apartment</Label>
                        <select
                          id="apartment"
                          value={apartmentId}
                          onChange={(e) => setApartmentId(parseInt(e.target.value))}
                          className="w-full mt-2 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {apartments?.map((apt) => (
                            <option key={apt.id} value={apt.id}>
                              {apt.name} - ${apt.pricePerNight / 100}/night
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkIn">Check-in Date</Label>
                          <div className="relative mt-2">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="checkIn"
                              type="date"
                              value={checkIn}
                              min={minCheckIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="checkOut">Check-out Date</Label>
                          <div className="relative mt-2">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="checkOut"
                              type="date"
                              value={checkOut}
                              min={minCheckOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Availability Check */}
                      {checkIn && checkOut && (
                        <div
                          className={`p-4 rounded-lg flex items-center gap-3 ${
                            availability
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {availability ? (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Available for your dates!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5" />
                              <span className="font-medium">
                                Not available for selected dates
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Guests */}
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <div className="relative mt-2">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <select
                            id="guests"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full pl-10 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            {selectedApartment &&
                              [...Array(selectedApartment.maxGuests)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} {i === 0 ? "Guest" : "Guests"}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* Guest Information */}
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-xl font-semibold">Guest Information</h3>
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="mt-2"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative mt-2">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+995 555 123 456"
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="requests">Special Requests (Optional)</Label>
                          <Textarea
                            id="requests"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Any special requirements or requests..."
                            className="mt-2"
                            rows={4}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={!availability || createBooking.isPending}
                      >
                        {createBooking.isPending ? (
                          "Processing..."
                        ) : (
                          <>
                            <CreditCard className="mr-2 w-5 h-5" />
                            Proceed to Payment
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedApartment && (
                      <>
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={selectedApartment.imageUrl}
                            alt={selectedApartment.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{selectedApartment.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedApartment.shortDescription}
                          </p>
                        </div>
                        <div className="space-y-2 pt-4 border-t">
                          {checkIn && checkOut && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Check-in</span>
                                <span className="font-medium">
                                  {format(new Date(checkIn), "MMM dd, yyyy")}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Check-out</span>
                                <span className="font-medium">
                                  {format(new Date(checkOut), "MMM dd, yyyy")}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Guests</span>
                                <span className="font-medium">{guests}</span>
                              </div>
                              <div className="flex justify-between text-sm pt-2 border-t">
                                <span className="text-muted-foreground">
                                  ${selectedApartment.pricePerNight / 100} × {calculateNights()}{" "}
                                  nights
                                </span>
                                <span className="font-medium">${calculateTotal()}</span>
                              </div>
                              <div className="flex justify-between pt-4 border-t">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-primary text-2xl">
                                  ${calculateTotal()}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 3 && (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for your booking. A confirmation email has been sent to {email}.
                </p>
                <div className="space-y-3">
                  <Link href="/">
                    <Button size="lg" className="w-full">
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/my-bookings">
                    <Button size="lg" variant="outline" className="w-full">
                      View My Bookings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
