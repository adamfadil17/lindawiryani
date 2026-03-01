"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "OUR APPROACH", href: "/our-approach" },
  { name: "SERVICES", href: "/services" },
  {
    name: "WEDDING EXPERIENCES",
    href: "/wedding-experiences",
    submenu: [
      {
        name: "Private Villa Weddings",
        href: "/wedding-experiences/private-villa-weddings",
      },
      {
        name: "Intimate Weddings",
        href: "/wedding-experiences/intimate-weddings",
      },
      {
        name: "Elopement Weddings",
        href: "/wedding-experiences/elopement-weddings",
      },
      { name: "Luxury Weddings", href: "/wedding-experiences/luxury-weddings" },
      // {
      //   name: "Destination Weddings",
      //   href: "/wedding-experiences/bali-destination-wedding",
      // },
    ],
  },
  { name: "WEDDING CONCEPTS", href: "/wedding-concepts" },
  { name: "DESTINATIONS", href: "/destinations" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "JOURNAL", href: "/journal" },
  { name: "WORKING WITH US", href: "/working-with-us" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const inverted = isScrolled || isMenuOpen;

  const isActive = (item: (typeof navigationItems)[number]) => {
    if (item.href === "/") return pathname === "/";
    if (pathname === item.href) return true;
    if (item.submenu) {
      return item.submenu.some((sub) => pathname.startsWith(sub.href));
    }
    return pathname.startsWith(item.href);
  };

  const navLinkClass = (item: (typeof navigationItems)[number]) => {
    const active = isActive(item);
    const color = inverted ? "text-primary" : "text-white";
    const weight = active ? "font-semibold" : "font-light";
    return `flex items-center gap-0.5 text-[11px] lg:text-[12px] tracking-[0.15em] ${weight} py-4 cursor-pointer transition-colors hover:opacity-80 ${color}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        inverted ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Logo row — hidden when scrolled on desktop */}
      <div
        className={`container mx-auto px-6 py-5 transition-all duration-300 ${
          isScrolled
            ? "md:opacity-0 md:invisible md:h-0 md:py-0 md:overflow-hidden"
            : "opacity-100 visible"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <Image
              src="/images/logo-white.png"
              alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
              className={`h-14 w-auto mx-auto transition-opacity ${inverted ? "opacity-0" : "opacity-100"}`}
              width={120}
              height={56}
            />
            <Image
              src="/images/logo-gray.png"
              alt="Linda Wiryani | Luxury Wedding Planner & Designer in Bali"
              className={`h-14 w-auto mx-auto absolute top-0 left-1/2 -translate-x-1/2 transition-opacity ${inverted ? "opacity-100" : "opacity-0"}`}
              width={120}
              height={56}
            />
          </div>

          {/* Mobile menu toggle */}
          <div className="absolute right-0 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={inverted ? "text-primary" : "text-white"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav
        className={`hidden md:block border-t transition-colors ${inverted ? "border-primary/15" : "border-white/20"}`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex justify-center items-center flex-wrap gap-x-6 lg:gap-x-8">
            {navigationItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeave()}
              >
                <Link href={item.href} className={navLinkClass(item)}>
                  {item.name}
                  {item.submenu && (
                    <ChevronDown size={12} className="opacity-60 mt-px" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white shadow-xl border border-stone-100 py-3 transition-all duration-200 ${
                      activeDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    }`}
                  >
                    {item.submenu.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`block px-5 py-2.5 text-[12px] tracking-wide text-primary hover:bg-stone-50 transition-colors ${subActive ? "font-semibold" : "font-light"}`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 max-h-[80vh] overflow-y-auto">
          <ul className="px-6 py-4 space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item);
              return (
                <li
                  key={item.name}
                  className="border-b border-stone-50 last:border-0"
                >
                  {item.submenu ? (
                    <>
                      <button
                        className={`flex items-center justify-between w-full py-3 text-sm tracking-widest text-primary ${active ? "font-semibold" : "font-light"}`}
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.name ? null : item.name,
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown
                          size={16}
                          className={`opacity-50 transition-transform ${mobileExpanded === item.name ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileExpanded === item.name && (
                        <ul className="pl-3 pb-3 space-y-2">
                          {item.submenu.map((sub) => {
                            const subActive = pathname === sub.href;
                            return (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className={`block text-[13px] py-1.5 tracking-wide ${subActive ? "text-primary font-semibold" : "text-primary/70 font-light"}`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-3 text-sm tracking-widest text-primary ${active ? "font-semibold" : "font-light"}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}