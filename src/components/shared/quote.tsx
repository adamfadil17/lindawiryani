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

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function Quote() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Quote Text */}
        <motion.div
          className="text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary leading-relaxed max-w-5xl mx-auto italic">
            Because true elegance is not only seen
            <br className="hidden md:block" />— it's felt, lived, and remembered
          </h2>
        </motion.div>

        {/* Images Layout */}
        <div className="relative">
          {/* Desktop Layout - 3 columns with middle offset */}
          <motion.div
            className="hidden md:grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            variants={staggerContainer}
          >
            {/* Left Image - Couple in field with veil */}
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/quotes1.png"
                alt="Couple embracing in field with flowing veil"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </motion.div>

            {/* Center Image - Wedding ceremony with petals (offset down) */}
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] overflow-hidden transform translate-y-12"
            >
              <Image
                src="/images/quotes2.png"
                alt="Wedding ceremony with guests throwing petals"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </motion.div>

            {/* Right Image - Couple dancing */}
            <motion.div
              variants={fadeInUp}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/quotes3.png"
                alt="Couple dancing with flowing wedding dress"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </motion.div>
          </motion.div>

          {/* Mobile Layout - 2+1 arrangement */}
          <motion.div
            className="md:hidden space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            variants={staggerContainer}
          >
            {/* Top Row - Two images side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Image - Couple in field with veil */}
              <motion.div
                variants={fadeInUp}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src="/images/quotes1.png"
                  alt="Couple embracing in field with flowing veil"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>

              {/* Right Image - Couple dancing */}
              <motion.div
                variants={fadeInUp}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src="/images/quotes2.png"
                  alt="Couple dancing with flowing wedding dress"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </div>

            {/* Bottom Row - Centered single image */}
            <div className="flex justify-center">
              <motion.div
                variants={fadeInUp}
                className="relative aspect-[3/4] overflow-hidden w-1/2"
              >
                <Image
                  src="/images/quotes3.png"
                  alt="Wedding ceremony with guests throwing petals"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
