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
      // Ambil tinggi dari hero section (umumnya 100vh)
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      // Jika scroll position lebih dari 20% hero height, ubah background
      setIsScrolled(scrollPosition > heroHeight * 0.2);
    };

    // Intersection Observer untuk mendeteksi active section
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px", // Trigger saat section 20% dari atas viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe semua sections
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : isMenuOpen
          ? "bg-primary/90"
          : "bg-transparent"
      }`}
    >
      {/* Top section with logo and social icons */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6">
        <div className="relative flex items-center justify-center">
          {/* Logo */}
          <div className="text-center relative">
            {/* Logo Putih */}
            <Image
              src="/images/logo-white.png"
              alt="Linda Wygant Wedding Planning"
              className={`h-12 md:h-16 lg:h-20 w-auto mx-auto transition-opacity duration-300 ${
                isScrolled ? "opacity-0" : "opacity-100"
              }`}
              width={120}
              height={24}
            />
            {/* Logo Brown */}
            <Image
              src="/images/logo-brown.png"
              alt="Linda Wygant Wedding Planning"
              className={`h-12 md:h-16 lg:h-20 w-auto mx-auto transition-opacity duration-300 absolute top-0 left-1/2 transform -translate-x-1/2 ${
                isScrolled ? "opacity-100" : "opacity-0"
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
                  isScrolled ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/whatsapp-brown.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled ? "opacity-100" : "opacity-0"
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
                  isScrolled ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/email-brown.svg"
                alt="Email"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled ? "opacity-100" : "opacity-0"
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
                  isScrolled ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/instagram-brown.svg"
                alt="Instagram"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled ? "opacity-100" : "opacity-0"
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
                  isScrolled ? "opacity-0" : "opacity-100"
                }`}
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <Image
                src="/images/pinterest-line-brown.svg"
                alt="Pinterest"
                width={24}
                height={24}
                className={`transition-opacity duration-300 absolute top-0 left-0 ${
                  isScrolled ? "opacity-100" : "opacity-0"
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
                isScrolled
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
          isScrolled ? "border-primary/20" : "border-white/20"
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
                    isScrolled
                      ? "text-primary hover:text-primary/80"
                      : "text-white hover:text-white/80"
                  } ${
                    activeSection === item.id
                      ? `border-b-1 ${
                          isScrolled ? "border-primary" : "border-white"
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
                    } ${isScrolled ? "bg-primary" : "bg-white"}`}
                  ></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${
              isScrolled ? "bg-white/95 backdrop-blur-sm" : "bg-primary/90"
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`py-2 text-base font-light tracking-wider transition-colors relative ${
                      isScrolled
                        ? "text-primary hover:text-primary/80"
                        : "text-white hover:text-white/80"
                    } ${activeSection === item.id ? "font-semibold" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Social Icons */}
                <div
                  className={`flex items-center space-x-6 pt-4 border-t ${
                    isScrolled ? "border-primary/20" : "border-white/20"
                  }`}
                >
                  {/* WhatsApp Icons */}
                  <a href="#" aria-label="WhatsApp" className="relative">
                    <Image
                      src="/images/ic_baseline-whatsapp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className={`transition-opacity duration-300 ${
                        isScrolled ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <Image
                      src="/images/whatsapp-brown.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className={`transition-opacity duration-300 absolute top-0 left-0 ${
                        isScrolled ? "opacity-100" : "opacity-0"
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
                        isScrolled ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <Image
                      src="/images/email-brown.svg"
                      alt="Email"
                      width={24}
                      height={24}
                      className={`transition-opacity duration-300 absolute top-0 left-0 ${
                        isScrolled ? "opacity-100" : "opacity-0"
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
                        isScrolled ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <Image
                      src="/images/instagram-brown.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className={`transition-opacity duration-300 absolute top-0 left-0 ${
                        isScrolled ? "opacity-100" : "opacity-0"
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
                        isScrolled ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <Image
                      src="/images/pinterest-line-brown.svg"
                      alt="Pinterest"
                      width={24}
                      height={24}
                      className={`transition-opacity duration-300 absolute top-0 left-0 ${
                        isScrolled ? "opacity-100" : "opacity-0"
                      }`}
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
