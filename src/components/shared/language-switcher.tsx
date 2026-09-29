"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  routing,
  localeLabels,
  localeShortLabels,
  type Locale,
} from "@/i18n/routing";

export default function LanguageSwitcher({
  inverted,
  align = "right",
  className = "",
}: {
  inverted: boolean;
  /** Sisi mana dropdown menempel ke tombol. Di mobile dipakai "left" karena tombol ada di kiri header. */
  align?: "left" | "right";
  className?: string;
}) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // pointerdown mencakup mouse + sentuhan (iPad / HP)
    const handleClickOutside = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (nextLocale: Locale) => {
    setIsOpen(false);
    startTransition(() => {
      // pathname from usePathname() is already locale-agnostic
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={t("label")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        className={`flex items-center gap-1 text-[11px] lg:text-[12px] tracking-[0.15em] font-light py-3 md:py-4 cursor-pointer transition-colors hover:opacity-80 ${
          inverted ? "text-primary" : "text-white"
        } ${isPending ? "opacity-50" : ""}`}
      >
        <Globe size={14} />
        {localeShortLabels[locale]}
        <ChevronDown
          size={12}
          className={`opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        role="listbox"
        className={`absolute top-full ${align === "left" ? "left-0" : "right-0"} w-44 bg-white shadow-xl border border-stone-100 py-2 transition-all duration-200 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1"
        }`}
      >
        {routing.locales.map((l) => (
          <button
            key={l}
            type="button"
            role="option"
            aria-selected={l === locale}
            onClick={() => handleSelect(l)}
            className={`block w-full text-left px-4 py-3 md:py-2 text-[13px] tracking-wide transition-colors hover:bg-stone-50 ${
              l === locale
                ? "font-semibold text-primary"
                : "font-light text-primary/80"
            }`}
          >
            {localeLabels[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
