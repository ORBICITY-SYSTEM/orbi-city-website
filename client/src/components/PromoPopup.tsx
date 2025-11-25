import { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPromoCodeCopy } from "./GoogleAnalytics";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const promoCode = "ORBI20";
  const discount = "20%";

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPromo = localStorage.getItem("orbi-promo-seen");
    
    if (!hasSeenPromo) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("orbi-promo-seen", "true");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      trackPromoCodeCopy(promoCode);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              🎉 მიიღე {discount} ფასდაკლება!
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-base mt-2">
            გამოიყენე ვაუჩერი პირველი ჯავშნისთვის
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 bg-blue-50 border-2 border-blue-500 rounded-lg px-4 py-3 text-center">
              <span className="text-2xl font-bold text-blue-600 tracking-wider">
                {promoCode}
              </span>
            </div>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              className="h-12 w-12"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            * ფასდაკლება მოქმედებს 3 ღამე ან მეტი ხნით დაჯავშნაზე
          </p>

          <div className="flex gap-2 w-full">
            <Button
              onClick={handleCopy}
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white"
            >
              BOOK NOW
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              დახურვა
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
