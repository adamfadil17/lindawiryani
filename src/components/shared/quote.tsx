"use client";

import { fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";

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
                src="/images/quote/quote4.png"
                alt="Couple embracing in field with flowing veil"
                fill
                loading="lazy"
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
                src="/images/quote/quote2.png"
                alt="Wedding ceremony with guests throwing petals"
                fill
                loading="lazy"
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
                src="/images/quote/quote5.png"
                alt="Couple dancing with flowing wedding dress"
                fill
                loading="lazy"
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
                  src="/images/quote/quote1.png"
                  alt="Couple embracing in field with flowing veil"
                  fill
                  loading="lazy"
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
                  src="/images/quote/quote2.png"
                  alt="Couple dancing with flowing wedding dress"
                  fill
                  loading="lazy"
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
                  src="/images/quote/quote3.png"
                  alt="Wedding ceremony with guests throwing petals"
                  fill
                  loading="lazy"
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
