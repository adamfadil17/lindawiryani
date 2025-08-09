"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Services() {
  const [activeService, setActiveService] = useState("WEDDING DESIGN");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLargeImage, setSelectedLargeImage] = useState(0);

  const loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`;

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
    <section id="services" className="relative">
      {/* Decorative Floral Element */}
      {/* <div className="absolute top-4 right-0 w-32 h-32">
        <Image
          src="/images/floral2.svg"
          alt="Decorative floral element"
          width={120}
          height={120}
          className="object-contain"
        />
      </div> */}
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center py-16">
        <p className="text-2xl text-primary tracking-wider italic font-semibold mb-4">
          SERVICES
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight">
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
                  ? "text-primary border-b border-primary hover:cursor-pointer"
                  : "text-primary hover:text-stone-600 hover:cursor-pointer"
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
        <div className="flex-1 bg-[#E9E1DC] flex flex-col justify-center min-h-[50vh] xl:min-h-screen">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 lg:py-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-8 italic">
              {activeService}
            </h2>

            <p className="text-primary text-justify leading-relaxed mb-8 text-sm lg:text-base max-w-3xl">
              {loremIpsum}
            </p>

            <button className="mb-12 border border-primary text-primary px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300">
              PLAN YOUR DREAM
            </button>

            {/* Image Gallery */}
            {/* Image Gallery */}
            <div className="max-w-3xl">
              <div className="relative inline-block">
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

                {/* Navigation Arrows - Positioned at exact edges of image list */}
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-3 lg:-translate-x-4 w-8 h-8 sm:w-10 sm:h-10 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors hover:cursor-pointer z-10"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 lg:translate-x-4 w-8 h-8 sm:w-10 sm:h-10 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors hover:cursor-pointer z-10"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
