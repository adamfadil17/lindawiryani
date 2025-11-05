"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { loremIpsum, services } from "@/lib/text-src";
import { galleryImages } from "@/lib/image-src";

export default function Services() {
  const [activeService, setActiveService] = useState(
    "Full Wedding Planning & Coordination"
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLargeImage, setSelectedLargeImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Auto slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Ganti gambar setiap 3 detik

    return () => clearInterval(interval);
  }, [currentImageIndex, isAutoPlaying]);

  const scrollToImage = (index: number) => {
    if (galleryRef.current) {
      const container = galleryRef.current;
      const imageElements = container.children;
      if (imageElements[index]) {
        const imageElement = imageElements[index] as HTMLElement;
        const containerWidth = container.offsetWidth;
        const imageWidth = imageElement.offsetWidth;
        const scrollPosition =
          imageElement.offsetLeft - containerWidth / 2 + imageWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToMainContent = () => {
    if (mainContentRef.current) {
      const elementPosition =
        mainContentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleServiceClick = (serviceName: string) => {
    setActiveService(serviceName);
    // Delay scroll sedikit untuk memberikan waktu state update
    setTimeout(() => {
      scrollToMainContent();
    }, 100);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedLargeImage(newIndex);
    scrollToImage(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedLargeImage(newIndex);
    scrollToImage(newIndex);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedLargeImage(index);
    scrollToImage(index);
    setIsAutoPlaying(false); // Stop auto play when user manually clicks
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="services" className="relative">
      {/* Header Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
          margin: "0px 0px -100px 0px",
        }}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeInUp}
          className="text-2xl text-primary tracking-wider italic font-semibold mb-4"
        >
          SERVICES
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight"
        >
          WHERE REFINED HOSPITALITY MEETS ARTFUL DESIGN
        </motion.h1>

        {/* Service Categories */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.name!)}
              className={`transition-colors pb-1 ${
                activeService === service.name
                  ? "text-primary border-b border-primary hover:cursor-pointer"
                  : "text-primary hover:text-primary/80 hover:cursor-pointer"
              }`}
            >
              {service.name}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Main Content Section - Container with 2 Columns */}
      <motion.div
        ref={mainContentRef}
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-12 lg:py-16 bg-[#E9E1DC]"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
          margin: "0px 0px -100px 0px",
        }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Large Image Column - Takes more space (60%) */}
          <motion.div variants={fadeIn} className="lg:col-span-7 relative">
            <div className="h-[30vh] md:h-[35vh] lg:h-[450px] xl:h-[500px] relative overflow-hidden">
              <Image
                key={selectedLargeImage}
                src={
                  galleryImages[selectedLargeImage].src ||
                  "https://placehold.net/default.svg"
                }
                alt={galleryImages[selectedLargeImage].alt}
                fill
                loading="lazy"
                className="object-cover animate-fadeIn"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </motion.div>

          {/* Content Column - Takes less space (40%) */}
          <motion.div
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col justify-between h-auto lg:h-[450px] xl:h-[500px]"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-primary mb-4 lg:mb-6 italic"
            >
              {activeService}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-primary text-justify leading-relaxed mb-6 lg:mb-8 text-sm lg:text-sm xl:text-base flex-1"
            >
              {services.find((service) => service.name === activeService)
                ?.desc || loremIpsum}
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-6 lg:mb-8">
              <Link href="https://wa.me/628113980998" target="_blank">
                <button className="border border-primary text-primary font-semibold px-6 lg:px-8 py-2.5 lg:py-3 text-xs lg:text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300">
                  PLAN YOUR DREAM
                </button>
              </Link>
            </motion.div>

            {/* Image Gallery */}
            <motion.div variants={scaleIn} className="w-full overflow-hidden">
              <div className="relative">
                {/* Auto play toggle button */}
                <button
                  onClick={toggleAutoPlay}
                  className="absolute -top-10 right-2 w-8 h-8 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-colors hover:cursor-pointer z-10 shadow-lg"
                  aria-label={
                    isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                  }
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  )}
                </button>

                <div
                  ref={galleryRef}
                  className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-2 py-2"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-24 sm:w-24 sm:h-32 lg:w-28 lg:h-36 flex-shrink-0 transition-all duration-300 cursor-pointer ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-90"
                      }`}
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-colors hover:cursor-pointer z-10 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-colors hover:cursor-pointer z-10 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
