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
import Venues from "@/components/shared/venues";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/motion";

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
        className="md:min-h-screen bg-cover bg-center bg-no-repeat relative pt-16 md:pt-32 lg:pt-48"
        style={{
          backgroundImage: `url('/images/hero1.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/24 via-black/10 to-transparent"></div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-24 lg:py-24">
            <div className="max-w-2xl text-white">
              <motion.p
                variants={fadeInUp}
                className="text-sm md:text-base tracking-widest my-2 font-light"
              >
                DESIGN • EVENT PLANNING
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight"
              >
                EVERY DETAIL
                <br />
                REFLECTS YOUR STORY
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-sm md:text-base leading-relaxed mb-8 font-light"
              >
                {`Luxury-inspired Bali wedding styling and event planning with five-star hospitality standards.`}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link href="#instagram">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white hover:text-primary transition-colors duration-300"
                  >
                    JOIN THE EXPERIENCE
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <AboutUs />
      <Services />
      <Venues />
      <Quote />
      <Gallery />
      <Instagram />
      <Contact />
      <Footer />
    </div>
  );
}
