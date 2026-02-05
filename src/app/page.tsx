"use client";

import { motion } from "framer-motion";
import AboutUs from "@/components/shared/about-us";
import Contact from "@/components/shared/contact";
import Footer from "@/components/shared/footer";
import Gallery from "@/components/shared/gallery";
import Header from "@/components/shared/header";
import Instagram from "@/components/shared/instagram";
import Quote from "@/components/shared/quote";
import Services from "@/components/shared/services";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import WeddingConcepts from "@/components/shared/wedding-concepts";

export default function Page() {
  return (
    <div id="home" className="min-h-screen overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
          margin: "0px 0px -100px 0px",
        }}
        variants={staggerContainer}
        className="min-h-[600px] sm:min-h-[700px] md:min-h-screen bg-cover bg-center bg-no-repeat relative pt-20 sm:pt-24 md:pt-32 lg:pt-48"
        style={{
          backgroundImage: `url('/images/hero1.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/24 via-black/10 to-transparent"></div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24 lg:py-24">
            <div className="max-w-2xl text-white">
              <motion.h1
                variants={fadeInUp}
                className="text-xs sm:text-sm md:text-base tracking-widest my-2 font-light"
              >
                Luxury Wedding Planner & Designer in Bali
              </motion.h1>

              <motion.h2
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-5 md:mb-6 leading-tight italic"
              >
                Destination & Intimate Weddings in Bali – Designed with
                Intention
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-7 md:mb-8 font-light max-w-xl"
              >
                {`This is where you place emotion, art, storytelling, hospitality, philosophy`}
              </motion.p>

              <div className="flex flex-col sm:flex-row justify-start gap-3 sm:gap-4 md:gap-4">
                <motion.div variants={fadeInUp} className="w-full sm:w-auto">
                  <Link href="#wedding-concepts" className="block">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full sm:w-auto border border-white text-white font-semibold px-6 sm:px-7 md:px-8 py-3 sm:py-3 md:py-3 text-xs sm:text-sm tracking-widest hover:cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300"
                    >
                      PLAN YOUR BALI WEDDING
                    </motion.button>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp} className="w-full sm:w-auto">
                  <Link href="#about" className="block">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full sm:w-auto border border-white text-white font-semibold px-6 sm:px-7 md:px-8 py-3 sm:py-3 md:py-3 text-xs sm:text-sm tracking-widest hover:cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300"
                    >
                      EXPLORE OUR APPROACH
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AboutUs />
      <Services />
      <WeddingConcepts />
      <Quote />
      <Gallery />
      <Instagram />
      <Contact />
      <Footer />
    </div>
  );
}