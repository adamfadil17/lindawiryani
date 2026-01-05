"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { name: "HOME", href: "#home", id: "home" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "SERVICES", href: "#services", id: "services" },
    {
      name: "WEDDING CONCEPTS",
      href: "#wedding-concepts",
      id: "wedding-concepts",
      submenu: [
        {
          title: "WEDDING THEMES",
          items: [
            {
              name: "Elopement",
              href: "#wedding-concepts",
              filterType: "theme",
              filterValue: "elopement",
            },
            {
              name: "Intimate",
              href: "#wedding-concepts",
              filterType: "theme",
              filterValue: "intimate",
            },
          ],
        },
        {
          title: "VENUES",
          items: [
            {
              name: "Signature Venues",
              href: "#wedding-concepts",
              filterType: "venue",
              filterValue: "Signature Venues",
            },
            {
              name: "Private Villas",
              href: "#wedding-concepts",
              filterType: "venue",
              filterValue: "Private Villas",
            },
          ],
        },
      ],
    },
    { name: "GALLERY", href: "#gallery", id: "gallery" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const sections = navigationItems.map((item) => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk handle klik submenu
  const handleSubmenuClick = (item: any) => {
    // Tutup dropdown
    setIsDropdownOpen(false);
    setIsMenuOpen(false);

    // Dispatch custom event untuk mengubah filter di wedding-concepts
    if (item.filterType && item.filterValue) {
      window.dispatchEvent(
        new CustomEvent("weddingConceptsFilter", {
          detail: {
            type: item.filterType,
            value: item.filterValue,
          },
        })
      );
    }

    // Scroll ke section yang tepat dengan delay untuk memberi waktu filter bekerja
    setTimeout(() => {
      let targetId = "";

      if (item.filterType === "theme") {
        targetId = "wedding-themes-selector";
      } else if (item.filterType === "venue") {
        targetId = "venue-list-container";
      }

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 100; // Sesuaikan dengan tinggi header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-6 transition-all duration-300 ${
          isScrolled
            ? "md:opacity-0 md:invisible md:h-0 md:py-0 md:overflow-hidden"
            : "opacity-100 visible"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0 hidden md:flex items-center space-x-4">
            {/* WhatsApp & Email Icons */}
          </div>
          <div className="text-center relative">
            <Image
              src="/images/logo-white.png"
              alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
              className={`h-16 w-auto mx-auto transition-opacity ${
                isScrolled || isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
              width={120}
              height={24}
            />
            <Image
              src="/images/logo-gray.png"
              alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
              className={`h-16 w-auto mx-auto transition-opacity absolute top-0 left-1/2 -translate-x-1/2 ${
                isScrolled || isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              width={120}
              height={24}
            />
          </div>
          <div className="absolute right-0 flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Icons */}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${
                isScrolled || isMenuOpen ? "text-primary" : "text-white"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

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
                <div
                  key={item.name}
                  className="relative group py-3"
                  onMouseEnter={() => item.submenu && setIsDropdownOpen(true)}
                  onMouseLeave={() => item.submenu && setIsDropdownOpen(false)}
                >
                  <a
                    href={item.href}
                    className={`text-sm lg:text-base font-light tracking-wider transition-colors flex items-center gap-1 ${
                      isScrolled || isMenuOpen ? "text-primary" : "text-white"
                    } ${activeSection === item.id ? "font-medium" : ""}`}
                  >
                    {item.name}
                    {item.submenu && (
                      <ChevronDown size={14} className="opacity-50" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 w-[450px] bg-white/95 shadow-2xl border border-stone-100 p-8 grid grid-cols-2 gap-8 transition-all duration-300 ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <div key={sub.title}>
                          <span className="block text-[13px] font-bold tracking-[0.2em] text-primary/50 mb-4 uppercase border-b border-stone-100 pb-2">
                            {sub.title}
                          </span>
                          <ul className="space-y-3">
                            {sub.items.map((subItem) => (
                              <li key={subItem.name}>
                                <button
                                  onClick={() => handleSubmenuClick(subItem)}
                                  className="hover:cursor-pointer text-[13px] text-primary hover:text-primary/50 transition-colors block tracking-wide text-left w-full"
                                >
                                  {subItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    } ${isScrolled || isMenuOpen ? "bg-primary" : "bg-white"}`}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm h-screen overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col border-b border-stone-100 pb-2"
                  >
                    <div
                      className="flex items-center justify-between"
                      onClick={() =>
                        item.submenu && setIsDropdownOpen(!isDropdownOpen)
                      }
                    >
                      <a
                        href={item.href}
                        className={`text-lg font-light tracking-wider text-primary py-2 ${
                          activeSection === item.id ? "font-semibold" : ""
                        }`}
                        onClick={() => !item.submenu && setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                      {item.submenu && (
                        <ChevronDown
                          size={20}
                          className={`text-primary transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {item.submenu && isDropdownOpen && (
                      <div className="pl-4 pb-4 mt-2 space-y-6">
                        {item.submenu.map((sub) => (
                          <div key={sub.title}>
                            <span className="block text-[15px] font-bold tracking-widest text-primary/50 uppercase mb-2">
                              {sub.title}
                            </span>
                            <div className="flex flex-col space-y-3">
                              {sub.items.map((subItem) => (
                                <button
                                  key={subItem.name}
                                  onClick={() => handleSubmenuClick(subItem)}
                                  className="hover:cursor-pointer text-primary/80 text-sm text-left"
                                >
                                  {subItem.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
