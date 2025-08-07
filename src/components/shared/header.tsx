"use client";

import { useState } from "react";
import { Menu, X} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "VENUES", href: "#venues" },
    { name: "GALLERY", href: "#gallery" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`relative w-full ${
        isMenuOpen ? "bg-primary/90" : "bg-transparent"
      }`}
    >
      {/* Top section with logo and social icons */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6">
        <div className="relative flex items-center justify-center">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/images/logo-white.png"
              alt="Linda Wygant Wedding Planning"
              className="h-12 md:h-16 lg:h-20 w-auto mx-auto"
            />
          </div>

          {/* Social Icons - Desktop */}
          <div className="absolute right-0 hidden md:flex items-center space-x-4">
            <a href="#" aria-label="WhatsApp">
              <Image
                src={"/images/ic_baseline-whatsapp.svg"}
                alt="WhatsApp"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Email">
              <Image
                src={"/images/ic_outline-email.svg"}
                alt="Email"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Instagram">
              <Image
                src={"/images/mdi_instagram.svg"}
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a href="#" aria-label="Pinterest">
              <Image
                src={"/images/ri_pinterest-line.svg"}
                alt="Pinterest"
                width={24}
                height={24}
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="absolute right-0 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-white/20">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 lg:space-x-12">
              {navigationItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`py-4 text-sm lg:text-base font-light tracking-wider text-white hover:text-white/80 transition-colors relative group ${
                    index === 0 ? "border-b-2 border-white" : ""
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary/90">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="py-2 text-base font-light tracking-wider text-white hover:text-white/80 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Social Icons */}
                <div className="flex items-center space-x-6 pt-4 border-t border-white/20">
                  <a href="#" aria-label="WhatsApp">
                    <Image
                      src={"/images/ic_baseline-whatsapp.svg"}
                      alt="WhatsApp"
                      width={24}
                      height={24}
                    />
                  </a>
                  <a href="#" aria-label="Email">
                    <Image
                      src={"/images/ic_outline-email.svg"}
                      alt="Email"
                      width={24}
                      height={24}
                    />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Image
                      src={"/images/mdi_instagram.svg"}
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </a>
                  <a href="#" aria-label="Pinterest">
                    <Image
                      src={"/images/ri_pinterest-line.svg"}
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
