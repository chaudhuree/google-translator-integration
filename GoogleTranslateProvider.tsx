/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

// transalation working

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function GoogleTranslateProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        if (window.google && !isInitialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,iu,es,de,ar,pt,hi,bn",
              layout:
                window.google.translate.TranslateElement.InlineLayout
                  .HORIZONTAL,
            },
            "google_translate_element"
          );
          setIsInitialized(true);
        }
      };
    };

    addGoogleTranslateScript();
  }, [isInitialized]);

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      {children}
    </>
  );
}

export default GoogleTranslateProvider;

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Fetch stored language from localStorage and set default language if not available
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      setSelectedLanguage(storedLang);
    } else {
      setSelectedLanguage("en"); // Default to English if no language is stored
    }

    // Set the initial googtrans cookie based on stored or default language
    if (storedLang === "en" || !storedLang) {
      document.cookie =
        "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    } else {
      document.cookie = `googtrans=/en/${storedLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }
  }, [selectedLanguage]);

  const handleChange = (newLang: string) => {
    if (!newLang) return;

    if (newLang) {
      setSelectedLanguage(newLang);
      localStorage.setItem("selectedLanguage", newLang);

      if (newLang === "en") {
        // Set the googtrans cookie for English
        document.cookie =
          "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
      } else {
        document.cookie = `googtrans=/en/${newLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
      }

      // Manually trigger the language change in Google Translate
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (select) {
        select.value = newLang;
        select.dispatchEvent(new Event("change"));
      }
    }
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-1 rounded-full px-3 py-1 lang shadow-md z-50 text-white notranslate" data-notranslate>
      <Select onValueChange={handleChange} value={selectedLanguage}>
        <SelectTrigger className="w-fit notranslate" data-notranslate>
          <SelectValue>
            <div className="flex items-center gap-2 notranslate" data-notranslate>
              {/* <Image
                src={selectedLanguage === "en" ? "./circle-flags_uk.png" : "./uae.jpg"}
                alt={selectedLanguage === "en" ? "US Flag" : "UAE Flag"}
                width={20}
                height={15}
                className="rounded-sm"
              /> */}
              {selectedLanguage.toUpperCase()}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="border-none w-full notranslate" data-notranslate>
          <SelectItem value="en">
            <div className="flex items-center gap-2 notranslate" data-notranslate>
              {/* <Image src="./circle-flags_uk.png" alt="US Flag" width={20} height={15} className="rounded-sm" /> */}
              EN
            </div>
          </SelectItem>
          <SelectItem value="ar">
            <div className="flex items-center gap-2 notranslate" data-notranslate>
              {/* <Image
                src="./uae.jpg"
                alt="UAE Flag"
                width={20}
                height={15}
                className="rounded-sm"
              /> */}
              AR
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
