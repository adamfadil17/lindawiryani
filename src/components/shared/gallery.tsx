"use client";

import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const galleryImages = [
    {
      src: "/images/gallery/gallery1.png",
      alt: "Wedding ceremony with guests throwing confetti",
      orientation: "landscape",
    },
    {
      src: "/images/gallery/gallery2.png",
      alt: "Beautiful bridal bouquet with peach roses",
      orientation: "portrait",
    },
    {
      src: "/images/gallery/gallery3.png",
      alt: "Elegant couple portrait",
      orientation: "portrait",
    },
    {
      src: "/images/gallery/gallery4.png",
      alt: "Elegant outdoor wedding table setting",
      orientation: "portrait",
    },
    {
      src: "/images/gallery/gallery5.png",
      alt: "Romantic couple portrait on the beach",
      orientation: "portrait",
    },
    {
      src: "/images/gallery/gallery6.png",
      alt: "Outdoor wedding ceremony celebration",
      orientation: "landscape",
    },
  ];

  return (
    <section id="gallery" className="bg-white py-16 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8 md:mb-0">
            <h2 className="text-2xl text-primary tracking-wider italic font-semibold">
              GALLERY
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex-1 md:text-right">
            <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-primary leading-tight">
              Bali Wedding Gallery – Real Celebrations, Artful Design, and
              Timeless Inspiration
            </h3>
          </motion.div>
        </motion.div>

        <motion.div
          className="block lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-3 md:space-y-4">
              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>

            <div className="space-y-3 md:space-y-4 pt-20 md:pt-24">
              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="relative h-[280px] md:h-[480px] overflow-hidden group"
              >
                <Image
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block">
          <div className="space-y-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[420px]"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.2,
                margin: "0px 0px -100px 0px",
              }}
              variants={staggerContainer}
            >
              <div className="lg:col-span-2">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[420px]"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.2,
                margin: "0px 0px -100px 0px",
              }}
              variants={staggerContainer}
            >
              <div className="lg:col-span-1">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              <div className="lg:col-span-2">
                <motion.div
                  variants={fadeIn}
                  className="relative h-[420px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={galleryImages[5].src}
                    alt={galleryImages[5].alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
