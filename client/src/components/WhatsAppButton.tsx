import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "./GoogleAnalytics";

export function WhatsAppButton() {
  const phoneNumber = "995555199090"; // +995 555 19 90 90
  const message = encodeURIComponent(
    "Hello! I'm interested in booking an apartment at Orbi City Batumi. Could you please provide more information?"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
      onClick={() => trackWhatsAppClick()}
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border-2 border-[#25D366] backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
      >
        <MessageCircle className="h-7 w-7 text-[#25D366]" />
      </Button>
      <span className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us!
      </span>
    </a>
  );
}
