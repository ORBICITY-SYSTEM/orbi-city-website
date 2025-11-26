import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckCircle2, Phone, Mail, MessageCircle, Loader2 } from "lucide-react";
import { BookingConfirmation } from "./BookingConfirmation";
import { format, differenceInDays } from "date-fns";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  apartmentName: string;
  apartmentId: number;
  pricePerNight?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  apartmentName,
  apartmentId,
  pricePerNight = 150,
}: BookingModalProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [guests, setGuests] = useState(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "telegram" | "email" | "phone">("whatsapp");

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * pricePerNight;

  // Check availability
  const { data: availabilityData } = trpc.apartments.checkAvailability.useQuery(
    {
      apartmentId,
      checkIn: checkIn ? checkIn.toISOString() : new Date().toISOString(),
      checkOut: checkOut ? checkOut.toISOString() : new Date().toISOString(),
    },
    {
      enabled: !!checkIn && !!checkOut,
    }
  );

  const isAvailable = availabilityData ?? true;

  // Create booking mutation
  const createBookingMutation = trpc.bookings.create.useMutation({
    onSuccess: () => {
      setShowConfirmation(true);
      toast.success("ჯავშანი წარმატებით გაიგზავნა!");
    },
    onError: (error) => {
      toast.error(`დაფიქსირდა შეცდომა: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      toast.error("გთხოვთ აირჩიოთ ჩასახლებისა და გასახლების თარიღები");
      return;
    }

    if (!guestName || !guestPhone) {
      toast.error("გთხოვთ შეავსოთ სახელი და ტელეფონის ნომერი");
      return;
    }

    if (!guestEmail) {
      toast.error("გთხოვთ შეავსოთ Email მისამართი");
      return;
    }

    if (!isAvailable) {
      toast.error("სამწუხაროდ, ბინა არ არის ხელმისაწვდომი არჩეულ თარიღებში");
      return;
    }

    // Create booking via tRPC
    createBookingMutation.mutate({
      apartmentId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
      totalPrice,
      contactMethod,
      specialRequests: specialRequests || undefined,
    });
  };

  if (showConfirmation && checkIn && checkOut) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-4xl bg-navy-950 border-2 border-gold-500/30 max-h-[90vh] overflow-y-auto">
          <BookingConfirmation
            bookingDetails={{
              apartmentName,
              checkIn,
              checkOut,
              guests,
              fullName: guestName,
              email: guestEmail,
              phone: guestPhone,
              totalPrice,
              nights,
              preferredContact: contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1),
            }}
            onClose={() => {
              setShowConfirmation(false);
              onClose();
              // Reset form
              setCheckIn(undefined);
              setCheckOut(undefined);
              setGuestName("");
              setGuestEmail("");
              setGuestPhone("");
              setSpecialRequests("");
              setGuests(2);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-3xl bg-white border-2 border-gold-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-serif font-light text-navy-900">
            დაჯავშნა - {apartmentName}
          </DialogTitle>
          {checkIn && checkOut && (
            <div className="flex items-center gap-2 mt-2">
              {isAvailable ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-600">Available</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-600">Not Available</span>
                </>
              )}
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label className="text-navy-900 font-medium mb-2 block">
                ჩასახლების თარიღი
              </Label>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                className="rounded-xl border-2 border-gold-200 w-full"
              />
            </div>
            <div>
              <Label className="text-navy-900 font-medium mb-2 block">
                გასახლების თარიღი
              </Label>
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => !checkIn || date <= checkIn}
                className="rounded-xl border-2 border-gold-200 w-full"
              />
            </div>
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <div className="bg-gold-50 border-2 border-gold-200 rounded-xl p-4 sm:p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">ღამეების რაოდენობა:</span>
                <span className="font-semibold text-navy-900">{nights}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">ფასი ღამეში:</span>
                <span className="font-semibold text-navy-900">${pricePerNight}</span>
              </div>
              <div className="border-t-2 border-gold-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif text-navy-900">სრული ფასი:</span>
                  <span className="text-2xl font-bold text-gold-600">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* Guest Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="guestName" className="text-navy-900 font-medium">
                სახელი და გვარი *
              </Label>
              <Input
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="თქვენი სახელი"
                required
                className="border-2 border-gold-200 focus:border-gold-400"
              />
            </div>

            <div>
              <Label htmlFor="guestEmail" className="text-navy-900 font-medium">
                Email *
              </Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="border-2 border-gold-200 focus:border-gold-400"
              />
            </div>

            <div>
              <Label htmlFor="guestPhone" className="text-navy-900 font-medium">
                ტელეფონის ნომერი *
              </Label>
              <Input
                id="guestPhone"
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+995 555 123 456"
                required
                className="border-2 border-gold-200 focus:border-gold-400"
              />
            </div>

            <div>
              <Label htmlFor="guests" className="text-navy-900 font-medium">
                სტუმრების რაოდენობა
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 2)}
                className="border-2 border-gold-200 focus:border-gold-400"
              />
            </div>

            <div>
              <Label htmlFor="specialRequests" className="text-navy-900 font-medium">
                სპეციალური მოთხოვნები (არასავალდებულო)
              </Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="მაგ: მაღალი სართული, ზღვის ხედით და ა.შ."
                rows={3}
                className="border-2 border-gold-200 focus:border-gold-400"
              />
            </div>
          </div>

          {/* Contact Method Selection */}
          <div>
            <Label className="text-navy-900 font-medium mb-3 block">
              რჩეული კონტაქტის მეთოდი
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setContactMethod("whatsapp")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center ${
                  contactMethod === "whatsapp"
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-200 hover:border-gold-300"
                }`}
              >
                <MessageCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("telegram")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center ${
                  contactMethod === "telegram"
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-200 hover:border-gold-300"
                }`}
              >
                <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm font-medium">Telegram</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("email")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center ${
                  contactMethod === "email"
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-200 hover:border-gold-300"
                }`}
              >
                <Mail className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <span className="text-sm font-medium">Email</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("phone")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 min-h-[80px] flex flex-col items-center justify-center ${
                  contactMethod === "phone"
                    ? "border-gold-500 bg-gold-50"
                    : "border-gray-200 hover:border-gold-300"
                }`}
              >
                <Phone className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <span className="text-sm font-medium">Phone</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 hover:border-gray-400"
              disabled={createBookingMutation.isPending}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              disabled={createBookingMutation.isPending || !isAvailable}
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white py-4 sm:py-6 text-base sm:text-lg font-medium min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createBookingMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  მუშავდება...
                </>
              ) : (
                "დაჯავშნა"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
