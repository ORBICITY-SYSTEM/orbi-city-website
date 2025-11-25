import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { APP_LOGO } from "@/const";

interface MobileMenuProps {
  currentPath?: string;
}

export function MobileMenu({ currentPath = "/" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Apartments", href: "/apartments" },
    { label: "Amenities", href: "/amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Location", href: "/location" },
    { label: "Contact", href: "/contact" },
    { label: "Loyalty Program", href: "/loyalty-program" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <img src={APP_LOGO} alt="OC" className="w-8 h-8" />
            <span>ORBI CITY</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  currentPath === item.href
                    ? "bg-primary text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
          <div className="mt-4 px-4">
            <Link href="/apartments">
              <Button
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
