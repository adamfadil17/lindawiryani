"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

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

export default function AboutUs() {
  return (
    <motion.section
      id="about"
      className="bg-white py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
        margin: "0px 0px -100px 0px",
      }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Centered Vertical Divider Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary transform -translate-x-1/2 z-10"></div>

          {/* Left Content */}
          <div className="space-y-6 relative pr-0 lg:pr-8">
            <motion.div variants={scaleIn} className="w-24 h-24 mb-8">
              <Image
                src="/images/floral1.png"
                alt="Floral Element"
                width={120}
                height={120}
              />
            </motion.div>

            <div className="space-y-4">
              <motion.p
                variants={fadeInUp}
                className="text-2xl text-primary tracking-wider italic font-semibold"
              >
                ABOUT US
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary leading-tight"
              >
                WHERE ARCHITECTURE, ART, AND HOSPITALITY
                <br />
                CREATE TIMELESS WEDDINGS
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-primary text-justify leading-relaxed text-base md:text-base"
              >
                {`At Linda Wiryani Design & Event Planning, every celebration begins with a story — yours. With nearly two decades in Bali’s five-star hospitality industry, Linda combines her expertise in luxury events, public relations, sales and marketing with her refined eye for detail to create weddings defined by grace, warmth, and seamless execution. Her deep knowledge of Bali’s villa industry allows her to design intimate private villa weddings that blend exclusivity with authenticity. As the Creative Director of her fashion brand, My Lindway, Linda brings artistry and local craftsmanship into every element, from curated table settings to bespoke visual concepts , often enriched through creative collaboration with her architect husband. Beyond her professional world, she finds joy in family life with her two sons and their cheerful fur baby, a balance of love and inspiration that shines through every timeless celebration she designs.`}
              </motion.p>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="relative grid grid-cols-3 gap-4 h-[420px] pl-0 lg:pl-8">
            <motion.div variants={slideInRight} className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us1.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="col-span-1 transform translate-y-12"
            >
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us2.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us3.png"
                  alt="Linda Wiryani Assets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
