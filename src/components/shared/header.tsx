"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigationItems = [
    { name: "HOME", href: "#home", id: "home" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "SERVICES", href: "#services", id: "services" },
    { name: "VENUES", href: "#venues", id: "venues" },
    { name: "GALLERY", href: "#gallery", id: "gallery" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Set background berdasarkan scroll position
      setIsScrolled(scrollPosition > windowHeight * 0.2);

      // Jika scroll position masih di area hero (home section)
      if (scrollPosition < windowHeight * 0.8) {
        setActiveSection("home");
        return;
      }

      // Check other sections
      const sections = navigationItems.slice(1); // Skip home since we handle it above
      for (const item of sections) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementBottom = elementTop + rect.height;

          // If current scroll position is within this section
          if (
            scrollPosition >= elementTop - windowHeight * 0.3 &&
            scrollPosition < elementBottom - windowHeight * 0.3
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top section with logo and social icons - Hidden on desktop when scrolled */}
      <div
        className={`container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6 transition-all duration-300 ${
          isScrolled
            ? "md:opacity-0 md:invisible md:h-0 md:py-0 md:overflow-hidden"
            : "opacity-100 visible"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Logo */}
          <div className="text-center relative">
            {/* Logo Putih */}
            <Image
              src="/images/logo-white.png"
              alt="Linda Wygant Wedding Planning"
              className={`h-16 md:h-16 lg:h-20 w-auto mx-auto transition-opacity duration-300 ${
                isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
              width={120}
              height={24}
            />
            {/* Logo Brown */}
            <Image
              src="/images/logo-brown.png"
              alt="Linda Wygant Wedding Planning"
              className={`h-16 md:h-16 lg:h-20 w-auto mx-auto transition-opacity duration-300 absolute top-0 left-1/2 transform -translate-x-1/2 ${
                isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              width={120}
              height={24}
            />
          </div>

          {/* Social Icons - Desktop */}
          <div className="absolute right-0 hidden md:flex items-center space-x-4">
            {/* WhatsApp Icons */}
            <a href="#" aria-label="WhatsApp" className="relative">
              <Image
                src="/images/ic_baseline-whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                className={`transition-opacity duration-300 ${
                  isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/whatsapp-brown.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>

            {/* Email Icons */}
            <a href="#" aria-label="Email" className="relative">
              <Image
                src="/images/ic_outline-email.svg"
                alt="Email"
                width={24}
                height={24}
                className={`transition-opacity duration-300 ${
                  isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/email-brown.svg"
                alt="Email"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>

            {/* Instagram Icons */}
            <a href="#" aria-label="Instagram" className="relative">
              <Image
                src="/images/mdi_instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                className={`transition-opacity duration-300 ${
                  isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/instagram-brown.svg"
                alt="Instagram"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>

            {/* Pinterest Icons */}
            <a href="#" aria-label="Pinterest" className="relative">
              <Image
                src="/images/ri_pinterest-line.svg"
                alt="Pinterest"
                width={24}
                height={24}
                className={`transition-opacity duration-300 ${
                  isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/pinterest-line-brown.svg"
                alt="Pinterest"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="absolute right-0 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors ${
                isScrolled || isMenuOpen
                  ? "text-primary hover:text-primary/80 hover:bg-primary/10"
                  : "text-white hover:text-white/80 hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`border-t transition-colors ${
          isScrolled || isMenuOpen ? "border-primary/20" : "border-white/20"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 lg:space-x-12">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`py-3 text-sm lg:text-base font-light tracking-wider transition-colors relative group ${
                    isScrolled || isMenuOpen
                      ? "text-primary hover:text-primary/80"
                      : "text-white hover:text-white/80"
                  } ${
                    activeSection === item.id
                      ? `border-b-0.5 ${
                          isScrolled || isMenuOpen
                            ? "border-primary"
                            : "border-white"
                        }`
                      : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    } ${isScrolled || isMenuOpen ? "bg-primary" : "bg-white"}`}
                  ></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`py-2 text-base font-light tracking-wider transition-colors relative text-primary hover:text-primary/80 ${
                      activeSection === item.id ? "font-semibold" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Social Icons */}
                <div className="flex items-center space-x-6 pt-4 border-t border-primary/20">
                  {/* WhatsApp Icons */}
                  <a href="#" aria-label="WhatsApp" className="relative">
                    <Image
                      src="/images/whatsapp-brown.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                    />
                  </a>

                  {/* Email Icons */}
                  <a href="#" aria-label="Email" className="relative">
                    <Image
                      src="/images/email-brown.svg"
                      alt="Email"
                      width={24}
                      height={24}
                    />
                  </a>

                  {/* Instagram Icons */}
                  <a href="#" aria-label="Instagram" className="relative">
                    <Image
                      src="/images/instagram-brown.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </a>

                  {/* Pinterest Icons */}
                  <a href="#" aria-label="Pinterest" className="relative">
                    <Image
                      src="/images/pinterest-line-brown.svg"
                      alt="Pinterest"
                      width={24}
                      height={24}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
