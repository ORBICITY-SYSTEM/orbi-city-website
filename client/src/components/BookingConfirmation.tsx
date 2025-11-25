import { Check, Calendar, MapPin, Users, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface BookingConfirmationProps {
  bookingDetails: {
    apartmentName: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    fullName: string;
    email: string;
    phone: string;
    totalPrice: number;
    nights: number;
    preferredContact: string;
  };
  onClose: () => void;
}

export function BookingConfirmation({ bookingDetails, onClose }: BookingConfirmationProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-gold-500 to-gold-600 rounded-full p-6 shadow-2xl">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif font-light text-gold-400 mb-4 tracking-wide">
          Booking Request Received
        </h2>
        <p className="text-gray-300 text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Thank you for choosing Orbi City Batumi. Your luxury experience awaits.
        </p>
      </div>

      {/* Reservation Summary */}
      <Card className="bg-navy-900/60 border-2 border-gold-500/30 shadow-2xl shadow-gold-500/10 backdrop-blur-md mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif font-light text-gold-400 mb-6 tracking-wide border-b border-gold-500/20 pb-4">
            Reservation Summary
          </h3>

          <div className="space-y-6">
            {/* Apartment */}
            <div className="flex items-start gap-4">
              <div className="bg-gold-500/10 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-gold-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-light mb-1">Apartment</p>
                <p className="text-white text-lg font-light">{bookingDetails.apartmentName}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-light mb-1">Check-in</p>
                  <p className="text-white font-light">{formatDate(bookingDetails.checkIn)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-light mb-1">Check-out</p>
                  <p className="text-white font-light">{formatDate(bookingDetails.checkOut)}</p>
                </div>
              </div>
            </div>

            {/* Guests & Nights */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-light mb-1">Guests</p>
                  <p className="text-white font-light">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-sm font-light mb-1">Duration</p>
                  <p className="text-white font-light">{bookingDetails.nights} {bookingDetails.nights === 1 ? 'Night' : 'Nights'}</p>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="border-t border-gold-500/20 pt-6 mt-6">
              <h4 className="text-lg font-serif font-light text-gold-400 mb-4">Guest Information</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-gold-400" />
                  <p className="text-white font-light">{bookingDetails.fullName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gold-400" />
                  <p className="text-white font-light">{bookingDetails.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gold-400" />
                  <p className="text-white font-light">{bookingDetails.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-5 h-5 text-gold-400" />
                  <p className="text-white font-light">Preferred Contact: {bookingDetails.preferredContact}</p>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-lg p-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-lg font-light">Estimated Total</span>
                <span className="text-3xl font-serif font-light text-gold-400">${bookingDetails.totalPrice}</span>
              </div>
              <p className="text-gray-400 text-sm font-light mt-2">Final price will be confirmed by our reservations team</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-navy-900/60 border-2 border-gold-500/30 shadow-2xl shadow-gold-500/10 backdrop-blur-md mb-8">
        <CardContent className="p-8">
          <h3 className="text-2xl font-serif font-light text-gold-400 mb-6 tracking-wide">
            What Happens Next?
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center border border-gold-500/40">
                <span className="text-gold-400 font-serif">1</span>
              </div>
              <div>
                <p className="text-white font-light mb-1">Confirmation Call</p>
                <p className="text-gray-400 text-sm font-light">
                  რამოდენიმე წუთში დაგირეკავთ რეზერვაციების მენეჯერი სართულისა და ბლოკის არჩევისთვის
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center border border-gold-500/40">
                <span className="text-gold-400 font-serif">2</span>
              </div>
              <div>
                <p className="text-white font-light mb-1">Personalized Service</p>
                <p className="text-gray-400 text-sm font-light">
                  Our concierge will help you select your preferred floor and block
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center border border-gold-500/40">
                <span className="text-gold-400 font-serif">3</span>
              </div>
              <div>
                <p className="text-white font-light mb-1">Final Confirmation</p>
                <p className="text-gray-400 text-sm font-light">
                  You'll receive a booking confirmation via your preferred contact method
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 font-serif font-light tracking-wide"
        >
          Return to Home
        </Button>
        <Button
          onClick={() => window.open('https://wa.me/995555199090', '_blank')}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 font-serif font-light tracking-wide"
        >
          Contact via WhatsApp
        </Button>
      </div>
    </div>
  );
}
