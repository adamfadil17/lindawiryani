"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  const [activeService, setActiveService] = useState("WEDDING DESIGN");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLargeImage, setSelectedLargeImage] = useState(0);

  const services = ["WEDDING DESIGN", "PHOTO STYLING", "CREATIVE DIRECTION"];

  const galleryImages = [
    {
      src: "/images/services1.png",
      alt: "Elegant wedding table setting with floral centerpieces",
    },
    {
      src: "/images/services2.png",
      alt: "Beautiful wedding ceremony setup",
    },
    {
      src: "/images/services3.png",
      alt: "Wedding reception with guests celebrating",
    },
    {
      src: "/images/services4.png",
      alt: "Bridal bouquet and wedding details",
    },
  ];

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedLargeImage(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedLargeImage(newIndex);
  };

  return (
    <section className="bg-[#E9E1DC] relative">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center py-16">
        <p className="text-stone-500 text-sm tracking-[0.2em] uppercase mb-4">
          SERVICES
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-700 mb-12 max-w-4xl mx-auto leading-tight">
          Designing Unforgettable Moments, Seamlessly
        </h1>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setActiveService(service)}
              className={`transition-colors pb-1 ${
                activeService === service
                  ? "text-stone-600 border-b border-stone-400"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col xl:flex-row">
        {/* Large Image - Responsive Width */}
        <div className="w-full xl:w-[600px] flex-shrink-0 relative">
          <div className="h-[50vh] md:h-[60vh] xl:h-screen relative">
            <Image
              src={galleryImages[selectedLargeImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedLargeImage].alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 480px"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-stone-100 flex flex-col justify-center min-h-[50vh] xl:min-h-screen">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 lg:py-16">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-700 mb-8 italic">
              {activeService}
            </h2>

            <p className="text-stone-600 leading-relaxed mb-8 text-sm lg:text-base max-w-3xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <Button
              variant="outline"
              className="border-stone-400 text-stone-700 hover:bg-stone-200 px-8 py-3 mb-12 tracking-wider"
            >
              PLAN YOUR DREAM
            </Button>

            {/* Image Gallery */}
            <div className="relative max-w-3xl">
              <div className="flex gap-4 overflow-hidden">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-20 h-24 sm:w-24 sm:h-32 lg:w-32 lg:h-40 xl:w-40 xl:h-48 flex-shrink-0 transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-90"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedLargeImage(index);
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 128px, 160px"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-stone-300 hover:bg-stone-400 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-stone-700" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-stone-300 hover:bg-stone-400 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-stone-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
