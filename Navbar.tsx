"use client";
import { LanguageSwitcher } from "@/lib/GoogleTranslateProvider";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/Home/ffLogo.png"


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated active state logic
  const isActive = (path: string): string =>
    pathName === path ? "text-[#FFFFFF] font-bold" : "text-[#FFFFFF96]";

  return (
    <div className="container mx-auto">
      {/* Navbar */}
      <div
        className={cn(
          "w-full flex justify-center px-4 py-3 transition-all duration-300 ",
          scrolled ? "bg-[#051124]/80 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="w-full container rounded-full border border-[#DFDFDF] bg-[#5454540D] backdrop-blur-[100px] px-6 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-24">
              {/* Using a placeholder SVG instead of the imported logo */}
              <Image
                src={logo}
                alt="Styler Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-10">
            <Link href="/" className={`font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link
              href="/features"
              className={`font-medium hover:text-white transition-colors ${isActive(
                "/features"
              )}`}
            >
              Features
            </Link>
            <Link
              href="/about-us"
              className={`font-medium hover:text-white transition-colors ${isActive(
                "/about-us"
              )}`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-white transition-colors ${isActive(
                "/contact"
              )}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right side with language selector */}
          <div className="flex items-center">
            <LanguageSwitcher/>
            {/* <LanguageSelector /> */}

            {/* Mobile menu button */}
            <button
              type="button"
              className="ml-4 text-white md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            "fixed top-0 left-0 h-full bg-[#051124] z-50 md:hidden w-[280px] transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full p-6">
            {/* Drawer Header with Close Button */}
            <div className="flex justify-between items-center mb-8">
              <div className="relative h-8 w-24">
                {/* Using a placeholder SVG instead of the imported logo */}
                <Image
                  src={logo}
                  alt="Styler Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Menu Items */}
            <div className="flex flex-col space-y-6 mt-8">
              <Link
                href="/"
                className={`font-medium text-xl ${isActive("/")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className={`font-medium text-xl hover:text-white transition-colors ${isActive(
                  "/features"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/about-us"
                className={`font-medium text-xl hover:text-white transition-colors ${isActive(
                  "/about-us"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`font-medium text-xl hover:text-white transition-colors ${isActive(
                  "/contact"
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay when drawer is open */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
