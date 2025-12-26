"use client";

import {
  fadeInUp,
  scaleIn,
  slideInRight,
  staggerContainer,
} from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import AboutUsModal from "./about-us-modal";

export default function AboutUs() {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      id="about"
      className="bg-white py-16 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.1,
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
                Luxury Wedding Planner & Designer in Bali
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary leading-tight"
              >
                DESIGNING WEDDINGS WITH INTENTION, EMOTION, AND ART
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-primary text-justify leading-relaxed text-base md:text-base whitespace-pre-line"
              >
                {`At Linda Wiryani Design and Event Planning, each wedding begins with a story - thoughtfully designed, never templated.
                
                Based in Bali, the studio is known for artfully curated weddings shaped by architecture, hospitality, and refined storytelling.
                
                With nearly two decades of experience in five-star luxury hospitality, every celebration is created to feel seamless, calm, and deeply personal — from the first welcome to the final farewell.
                
                Specializing in intimate and private villa weddings in Bali, each celebration is guided by space, emotion, and human connection rather than trends.
                
                Rooted in a design-led approach that blends architecture, fashion, and artful detail, the studio creates weddings that feel timeless, considered, and quietly unforgettable.`}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary hover:cursor-pointer text-white font-semibold px-8 py-4 text-sm tracking-widest hover:bg-primary/90 transition-colors w-full uppercase"
                >
                  ABOUT THE STUDIO
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="relative grid grid-cols-3 gap-4 h-[420px] pl-0 lg:pl-8">
            <motion.div variants={slideInRight} className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us/about-us1.png"
                  alt="Linda Wiryani Assets"
                  fill
                  loading="lazy"
                  className="object-cover object-top"
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
                  src="/images/about-us/about-us2.png"
                  alt="Linda Wiryani Assets"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="col-span-1">
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/about-us/about-us3.png"
                  alt="Linda Wiryani Assets"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {showModal && <AboutUsModal onClose={() => setShowModal(false)} />}
    </motion.section>
  );
}
