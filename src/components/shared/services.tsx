"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as any,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any,
      delay: 0.2,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      staggerDirection: -1,
      delay: 0.3,
    },
  },
};

export default function Services() {
  const [activeService, setActiveService] = useState(
    "Full Wedding Planning & Coordination"
  );
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

  const services = [
    "Full Wedding Planning & Coordination",
    "Wedding Styling & Creative Direction",
    "Private Villa Weddings",
    "Intimate Weddings & Elopements",
    "Concept & Design Consultation",
    "Event & Table Styling",
    "Destination Guest Management (Optional Add-On)",
  ];

  const descServices = [
    {
      services: "Full Wedding Planning & Coordination",
      desc: "From the first idea to the final toast, we guide you through every step of your wedding journey – venue selection, vendor management,timeline creation, and on-the-day coordination. With our five-star hospitality background, every detail is executed with care, precision, and grace to ensure your celebration unfolds effortlessly.",
    },
    {
      services: "Wedding Styling & Creative Direction",
      desc: "Your wedding should feel like you. We craft bespoke design concepts inspired by your story – from mood boards and colour palettes to tablestyling and floral direction. Each element is curated to create a cohesive atmosphere that reflects your personality, style, and emotion.",
    },
    {
      services: "Private Villa Weddings",
      desc: "Drawing from our expertise in Bali's villa industry, we design and manage intimate celebrations in exclusive private villas. Each setting is thoughtfully transformed into an elegant, comfortable, and romantic space – ideal for couples seeking privacy and authenticity.",
    },
    {
      services: "Intimate Weddings & Elopements",
      desc: "For those who believe less can mean more – we create intimate, heartfelt celebrations that focus on connection and meaning. Whether it's just the two of you or a few cherished guests, your day will feel personal, timeless, and beautifully yours.",
    },
    {
      services: "Concept & Design Consultation",
      desc: "For couples who already have some plans but need creative direction, we offer personalized consultations. From visual storytelling and spatial flow to bespoke design sketches, we help refine your ideas into a cohesive and elevated concept.",
    },
    {
      services: "Event & Table Styling",
      desc: "We believe beauty is found in the details. Our team curates table settings, décor elements, and visual compositions that harmonize with youroverall theme – turning each celebration into an artful expression of style and atmosphere.",
    },
    {
      services: "Destination Guest Management (Optional Add-On)",
      desc: "Ensure your guests experience Bali at its best. From accommodation arrangements to airport transfers and itinerary planning, our team handles the details so everyone enjoys a seamless and memorable stay.",
    },
  ];

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
              key={service}
              onClick={() => setActiveService(service)}
              className={`transition-colors pb-1 ${
                activeService === service
                  ? "text-primary border-b border-primary hover:cursor-pointer"
                  : "text-primary hover:text-primary/80 hover:cursor-pointer"
              }`}
            >
              {service}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Main Content Section */}
      <div className="flex flex-col xl:flex-row">
        {/* Large Image - Responsive Width */}
        <motion.div
          className="w-full xl:w-[600px] flex-shrink-0 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={fadeIn}
        >
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
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex-1 bg-[#E9E1DC] flex flex-col justify-center min-h-[50vh] xl:min-h-screen"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={staggerContainer}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 lg:py-16">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-semibold text-primary mb-8 italic"
            >
              {activeService}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-primary text-justify leading-relaxed mb-8 text-sm lg:text-base max-w-3xl"
            >
              {descServices.find((item) => item.services === activeService)
                ?.desc || loremIpsum}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="#contact">
                <button className="mb-12 border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300">
                  PLAN YOUR DREAM
                </button>
              </Link>
            </motion.div>

            {/* Image Gallery */}
            <motion.div variants={scaleIn} className="max-w-3xl">
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
                        className="object-cover"
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
