import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface FourSeasonsBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartments?: Array<{
    id: number;
    name: string;
    description: string;
    pricePerNight: number;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl: string;
  }>;
}

export function FourSeasonsBookingModal({
  isOpen,
  onClose,
  apartments = [],
}: FourSeasonsBookingModalProps) {
  const [step, setStep] = useState<"dates" | "rooms" | "details" | "confirmation">("dates");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState<"checkIn" | "checkOut">("checkIn");

  const createBookingMutation = trpc.bookings.create.useMutation();

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const selectedApartment = apartments.find((apt) => apt.id === selectedRoom);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (calendarMode === "checkIn") {
      setCheckIn(date);
      setCheckOut(undefined);
      setCalendarMode("checkOut");
    } else {
      if (checkIn && date > checkIn) {
        setCheckOut(date);
        setShowCalendar(false);
      } else {
        toast.error("Check-out date must be after check-in date");
      }
    }
  };

  const handleCheckRates = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (nights < 1) {
      toast.error("Minimum stay is 1 night");
      return;
    }
    setStep("rooms");
  };

  const handleChooseRoom = (roomId: number) => {
    setSelectedRoom(roomId);
    setStep("details");
  };

  const handleSubmitBooking = async () => {
    if (!selectedApartment || !checkIn || !checkOut) {
      toast.error("Please complete all required fields");
      return;
    }

    if (!guestName || !guestEmail || !guestPhone) {
      toast.error("Please provide your contact information");
      return;
    }

    try {
      const totalPrice = nights * selectedApartment.pricePerNight;
      
      await createBookingMutation.mutateAsync({
        apartmentId: selectedApartment.id,
        guestName,
        guestEmail,
        guestPhone,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: adults + children,
        totalPrice,
        specialRequests,
        contactMethod: "email",
      });

      setStep("confirmation");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit booking request");
    }
  };

  const resetAndClose = () => {
    setStep("dates");
    setCheckIn(undefined);
    setCheckOut(undefined);
    setAdults(2);
    setChildren(0);
    setPromoCode("");
    setSelectedRoom(null);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setSpecialRequests("");
    setShowCalendar(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-light tracking-wide">
            {step === "dates" && "CHECK IN — CHECK OUT"}
            {step === "rooms" && "SELECT YOUR ROOM"}
            {step === "details" && "GUEST INFORMATION"}
            {step === "confirmation" && "BOOKING CONFIRMED"}
          </h2>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Step 1: Date Selection */}
          {step === "dates" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Check In - Check Out */}
                <div className="md:col-span-1">
                  <Label className="text-sm uppercase tracking-wider mb-2 block">
                    CHECK IN — CHECK OUT
                  </Label>
                  <button
                    onClick={() => {
                      setShowCalendar(!showCalendar);
                      setCalendarMode("checkIn");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 text-left hover:border-gray-400 transition-colors"
                  >
                    {checkIn && checkOut
                      ? `${format(checkIn, "MM/dd/yyyy")} - ${format(checkOut, "MM/dd/yyyy")}`
                      : "Select dates"}
                  </button>
                </div>

                {/* Guests */}
                <div className="md:col-span-1">
                  <Label className="text-sm uppercase tracking-wider mb-2 block">GUESTS</Label>
                  <div className="border border-gray-300 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">ADULTS (13+)</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{adults}</span>
                        <button
                          onClick={() => setAdults(adults + 1)}
                          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CHILDREN</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{children}</span>
                        <button
                          onClick={() => setChildren(children + 1)}
                          className="w-8 h-8 border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="md:col-span-1">
                  <Label className="text-sm uppercase tracking-wider mb-2 block">PROMO</Label>
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="border-gray-300 py-3"
                  />
                </div>
              </div>

              {/* Calendar */}
              {showCalendar && (
                <div className="border border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light">
                      {calendarMode === "checkIn" ? "Select Check-In Date" : "Select Check-Out Date"}
                    </h3>
                  </div>
                  <Calendar
                    mode="single"
                    selected={calendarMode === "checkIn" ? checkIn : checkOut}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    className="mx-auto"
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                        <span>CURRENT BEST RATE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                        <span>RESTRICTED</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        <span>UNAVAILABLE</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Check Rates Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleCheckRates}
                  size="lg"
                  className="bg-black hover:bg-gray-900 text-white px-16 py-6 text-sm uppercase tracking-wider font-light"
                >
                  CHECK RATES
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Room Selection */}
          {step === "rooms" && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 text-sm">
                <strong>Selected Dates:</strong> {checkIn && format(checkIn, "MMM dd, yyyy")} -{" "}
                {checkOut && format(checkOut, "MMM dd, yyyy")} ({nights} {nights === 1 ? "night" : "nights"})
                <br />
                <strong>Guests:</strong> {adults + children} ({adults} adults, {children} children)
              </div>

              <h3 className="text-xl font-light uppercase tracking-wider">GUEST ROOMS ({apartments.length})</h3>

              <div className="space-y-6">
                {apartments.map((room) => (
                  <div key={room.id} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      <div className="md:col-span-1">
                        <img
                          loading="lazy"
                          src={room.imageUrl}
                          alt={room.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-lg font-light mb-2">{room.name}</h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{room.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span>{room.area} sq.ft.</span>
                          <span>•</span>
                          <span>{room.maxGuests} adults, or {room.maxGuests - 1} adults and {room.maxGuests - 1} children</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Avg. price per night</div>
                            <div className="text-2xl font-light">USD {room.pricePerNight}</div>
                            <div className="text-xs text-gray-500">before addition of Resort Fee plus taxes per night</div>
                          </div>
                          <Button
                            onClick={() => handleChooseRoom(room.id)}
                            className="bg-black hover:bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider font-light"
                          >
                            CHOOSE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Guest Details */}
          {step === "details" && selectedApartment && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 text-sm">
                <strong>Room:</strong> {selectedApartment.name}
                <br />
                <strong>Dates:</strong> {checkIn && format(checkIn, "MMM dd, yyyy")} -{" "}
                {checkOut && format(checkOut, "MMM dd, yyyy")} ({nights} {nights === 1 ? "night" : "nights"})
                <br />
                <strong>Guests:</strong> {adults + children}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm uppercase tracking-wider mb-2 block">Full Name *</Label>
                  <Input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="John Doe"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-sm uppercase tracking-wider mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-sm uppercase tracking-wider mb-2 block">Phone *</Label>
                  <Input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+995 555 123 456"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm uppercase tracking-wider mb-2 block">Special Requests</Label>
                <Textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or preferences..."
                  rows={4}
                  className="border-gray-300"
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => setStep("rooms")}
                  variant="outline"
                  className="px-8 py-3 text-sm uppercase tracking-wider"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitBooking}
                  disabled={createBookingMutation.isPending}
                  className="bg-black hover:bg-gray-900 text-white px-12 py-3 text-sm uppercase tracking-wider font-light"
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirmation" && (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-light">Your booking request has been received!</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our reservations manager will contact you regarding rates and other details. Thank you for your
                interest in staying with us.
              </p>
              <Button
                onClick={resetAndClose}
                className="bg-black hover:bg-gray-900 text-white px-12 py-3 text-sm uppercase tracking-wider font-light mt-8"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
