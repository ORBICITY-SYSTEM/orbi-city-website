import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-300 hover:text-gold-400 hover:bg-gold-50/10 transition-all duration-300"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-navy-950 border-gold-500/20">
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "en"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("ka")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "ka"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          ქართული
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("ru")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "ru"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("tr")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "tr"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("uk")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "uk"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          Українська
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("ar")}
          className={`cursor-pointer font-light transition-colors ${
            i18n.language === "ar"
              ? "text-gold-400 bg-gold-50/10"
              : "text-gray-300 hover:text-gold-400 hover:bg-gold-50/10"
          }`}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
