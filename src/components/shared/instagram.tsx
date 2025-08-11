"use client";

import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Instagram() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const instagramPosts = [
    {
      src: "/images/instagram1.png",
      alt: "Wedding couple on beach",
      isVideo: true,
    },
    {
      src: "/images/instagram2.png",
      alt: "Wedding rings with bouquet",
      isVideo: true,
    },
    {
      src: "/images/instagram3.png",
      alt: "Happy couple at reception",
      isVideo: true,
    },
    {
      src: "/images/instagram4.png",
      alt: "Outdoor wedding ceremony",
      isVideo: true,
    },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % instagramPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length
    );
  };

  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl italic text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight">
            SEE WHAT'S BLOOMING LATELY ON OUR INSTAGRAM
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-16">
          {instagramPosts.map((post, index) => (
            <div
              key={index}
              className="relative h-[400px] overflow-hidden group cursor-pointer"
            >
              <Image
                src={post.src || "/placeholder.svg"}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="25vw"
              />

              {/* Video Play Button Overlay */}
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/70 rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                    <Play
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden mb-16">
          <div className="relative">
            {/* Single Image Display */}
            <div className="relative h-[400px] overflow-hidden group cursor-pointer">
              <Image
                src={instagramPosts[currentSlide].src || "/placeholder.svg"}
                alt={instagramPosts[currentSlide].alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="100vw"
              />

              {/* Video Play Button Overlay */}
              {instagramPosts[currentSlide].isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/70 rounded-full flex items-center justify-center group-hover:bg-white/90 transition-colors">
                    <Play
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {instagramPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-primary"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="text-center relative">
          {/* Decorative Lines */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 h-px bg-primary max-w-screen"></div>
            <div className="px-8">
              <p className="text-xxl text-primary tracking-wider italic font-semibold">
                FOLLOW US
              </p>
            </div>
            <div className="flex-1 h-px bg-primary max-w-screen"></div>
          </div>

          {/* Instagram Handle */}
          <div className="mb-8">
            <a
              href="https://instagram.com/lindawiryanievent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light text-primary hover:cursor-pointer hover:text-primary/80 transition-colors font-serif italic"
            >
              @lindawiryanievent
            </a>
          </div>

          {/* Decorative Floral Element
          <div className="absolute bottom-0 left-0 w-20 h-20 opacity-30">
            <Image
              src="/placeholder.svg?height=80&width=80&text=Floral+Decoration"
              alt="Decorative floral element"
              width={80}
              height={80}
              className="object-contain"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
