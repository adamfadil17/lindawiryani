"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  elopementThemes,
  intimateThemes,
  elopementCategoryImages,
  intimateCategoryImages,
} from "@/lib/wedding-themes-data";

interface ThemeCardProps {
  title: string;
  venue: string;
  image: string;
}

function ThemeCard({ title, venue, image }: ThemeCardProps) {
  return (
    <article className="relative overflow-hidden cursor-pointer group aspect-[16/9]">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2">
          {title}
        </h3>
        <p className="text-md text-white/90">{venue}</p>
      </div>
    </article>
  );
}

interface CategoryCardProps {
  title: string;
  description: string;
  onClick: () => void;
  isActive: boolean;
  images: string[];
}

function CategoryCard({
  title,
  description,
  onClick,
  isActive,
  images,
}: CategoryCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.article
      onClick={onClick}
      variants={fadeInUp}
      className={`relative overflow-hidden cursor-pointer group aspect-[3/4] transition-all ${
        isActive ? "ring-2 ring-primary" : ""
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="50vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h3>
        <p className="text-md md:text-md text-white/90 leading-relaxed px-6">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

export default function WeddingThemes() {
  const [selectedCategory, setSelectedCategory] = useState<
    "elopement" | "intimate"
  >("elopement");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory]);

  const currentThemes =
    selectedCategory === "elopement" ? elopementThemes : intimateThemes;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentThemes.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + currentThemes.length) % currentThemes.length
    );
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleCategoryClick = (category: "elopement" | "intimate") => {
    setSelectedCategory(category);

    // Scroll to bottom of section after a short delay
    setTimeout(() => {
      if (sectionRef.current) {
        const sectionBottom = sectionRef.current.getBoundingClientRect().bottom + window.scrollY;
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = sectionBottom - sectionTop;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll position to show the bottom of the section
        const scrollTo = sectionBottom - viewportHeight;
        
        window.scrollTo({
          top: Math.max(sectionTop, scrollTo),
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <section ref={sectionRef} id="wedding-themes" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="text-2xl text-primary tracking-wider italic font-semibold mb-4"
          >
            WEDDING THEMES
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-16 max-w-4xl mx-auto leading-tight"
          >
            PERSONALIZED WEDDING THEMES CRAFTED TO TELL YOUR JOURNEY
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <CategoryCard
              title="Elopement Weddings"
              description="Intimate ceremonies designed for couples seeking a deeply personal and meaningful exchange of vows."
              onClick={() => handleCategoryClick("elopement")}
              isActive={selectedCategory === "elopement"}
              images={elopementCategoryImages}
            />
            <CategoryCard
              title="Intimate Weddings"
              description="Elegant celebrations for close family and friends in stunning settings that reflect your unique love story."
              onClick={() => handleCategoryClick("intimate")}
              isActive={selectedCategory === "intimate"}
              images={intimateCategoryImages}
            />
          </motion.div>
        </motion.header>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="text-lg md:text-lg text-primary tracking-wider uppercase font-semibold">
            WEDDING THEMES
          </span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-base md:text-lg text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium"
              aria-label="Select wedding theme category"
              aria-expanded={isDropdownOpen}
            >
              {selectedCategory === "elopement" ? "Elopement" : "Intimate"}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[140px]">
                <button
                  onClick={() => {
                    setSelectedCategory("elopement");
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                    selectedCategory === "elopement"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-stone-100"
                  }`}
                >
                  Elopement
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("intimate");
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                    selectedCategory === "intimate"
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-stone-100"
                  }`}
                >
                  Intimate
                </button>
              </div>
            )}
          </div>
        </div>

        <motion.div
          className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12"
          key={selectedCategory}
          initial="hidden"
          animate="visible"
          variants={gridVariants}
        >
          {currentThemes.map((theme, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ThemeCard
                title={theme.title}
                venue={theme.venue}
                image={theme.image}
              />
            </motion.div>
          ))}
        </motion.div>

        {currentThemes.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="lg:hidden mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="relative group overflow-hidden aspect-[16/9]">
                  <Image
                    src={
                      currentThemes[currentSlide].image || "/placeholder.svg"
                    }
                    alt={currentThemes[currentSlide].title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="100vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2">
                      {currentThemes[currentSlide].title}
                    </h3>
                    <p className="text-md text-white/90">
                      {currentThemes[currentSlide].venue}
                    </p>
                  </div>
                </div>

                {currentThemes.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
                      aria-label="Previous theme"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
                      aria-label="Next theme"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>

              {currentThemes.length > 1 && (
                <div
                  className="flex justify-center mt-6 space-x-2"
                  role="tablist"
                  aria-label="Theme slides"
                >
                  {currentThemes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide
                          ? "bg-primary"
                          : "bg-stone-300 hover:bg-stone-400"
                      }`}
                      role="tab"
                      aria-selected={index === currentSlide}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}