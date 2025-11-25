import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CheckCircle2, Phone, Mail, MessageCircle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { toast } from "sonner";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "telegram" | "email" | "phone">("whatsapp");

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * pricePerNight;
  const isAvailable = true; // In real app, check against database

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

    // Prepare booking data
    const bookingData = {
      apartmentName,
      apartmentId,
      checkIn: format(checkIn, "PPP"),
      checkOut: format(checkOut, "PPP"),
      nights,
      totalPrice,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      contactMethod,
    };

    // Send notification based on selected method
    const message = `🏨 ახალი ჯავშანი - Orbi City Batumi

📍 ბინა: ${apartmentName}
👤 სტუმარი: ${guestName}
📞 ტელეფონი: ${guestPhone}
📧 Email: ${guestEmail || "არ არის მითითებული"}

📅 Check-in: ${format(checkIn, "PPP")}
📅 Check-out: ${format(checkOut, "PPP")}
🌙 ღამეების რაოდენობა: ${nights}
💰 სრული ფასი: $${totalPrice}

📝 სპეციალური მოთხოვნები:
${specialRequests || "არ არის"}

⏰ დაუკავშირდით სტუმარს რამოდენიმე წუთში სართულისა და ბლოკის არჩევისთვის.`;

    try {
      // Send to selected channel
      if (contactMethod === "whatsapp") {
        // WhatsApp Business API or direct link
        const whatsappNumber = "995555123456"; // Replace with actual number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      } else if (contactMethod === "telegram") {
        // Telegram Bot API (would need backend implementation)
        const telegramBotToken = "YOUR_BOT_TOKEN";
        const telegramChatId = "YOUR_CHAT_ID";
        // This would be done via backend API
        console.log("Sending to Telegram:", message);
      } else if (contactMethod === "email") {
        // Email via backend
        console.log("Sending email:", message);
      } else if (contactMethod === "phone") {
        // Just show phone number to call
        console.log("Call:", guestPhone);
      }

      setShowConfirmation(true);
      toast.success("ჯავშანი წარმატებით გაიგზავნა!");
    } catch (error) {
      toast.error("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა.");
    }
  };

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white border-2 border-gold-400">
          <div className="text-center py-8">
            <CheckCircle2 className="w-20 h-20 text-gold-500 mx-auto mb-6" />
            <h3 className="text-3xl font-serif font-light text-navy-900 mb-4">
              ჯავშანი მიღებულია!
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              რამოდენიმე წუთში დაგირეკავთ რეზერვაციების მენეჯერი
              <br />
              სასურველი სართულისა და ბლოკის არჩევისთვის.
            </p>
            <div className="bg-gold-50 border-2 border-gold-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-700 mb-2">
                <strong>ბინა:</strong> {apartmentName}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>თარიღები:</strong> {checkIn && format(checkIn, "PPP")} - {checkOut && format(checkOut, "PPP")}
              </p>
              <p className="text-sm text-gray-700">
                <strong>სრული ფასი:</strong> ${totalPrice}
              </p>
            </div>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                onClose();
              }}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-6 text-lg"
            >
              დახურვა
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-white border-2 border-gold-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-light text-navy-900">
            დაჯავშნა - {apartmentName}
          </DialogTitle>
          {isAvailable && (
            <div className="flex items-center gap-2 text-green-600 mt-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Available</span>
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-navy-900 font-medium mb-2 block">
                ჩასახლების თარიღი
              </Label>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                className="rounded-xl border-2 border-gold-200"
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
                className="rounded-xl border-2 border-gold-200"
              />
            </div>
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <div className="bg-gold-50 border-2 border-gold-200 rounded-xl p-6">
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
              <Label htmlFor="guestEmail" className="text-navy-900 font-medium">
                Email (არასავალდებულო)
              </Label>
              <Input
                id="guestEmail"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="email@example.com"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setContactMethod("whatsapp")}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
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
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
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
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
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
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
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
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white py-6 text-lg font-medium"
            >
              დაჯავშნა
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
