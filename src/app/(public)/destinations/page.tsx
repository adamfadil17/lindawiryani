"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { destinationList } from "@/lib/data/destinations/destination-data";

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Bali" | "Indonesia"
  >("Bali");

  const filteredDestinations = destinationList.filter(
    (d) => d.category === selectedCategory,
  );

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773382245/header-destination_vcrwin.jpg"
            alt="Indonesia Destinations"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-14 lg:pb-24 text-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-10 mt-6"
          >
            <Link
              href="/destinations"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Destinations
            </Link>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] mb-5 uppercase"
          >
            Indonesia Destination Weddings
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Curated Destination Wedding Experiences Rooted in Bali
            <p className="text-white text-sm md:text-base font-light leading-relaxed mt-10 normal-case">
              While rooted in Bali, we curate select destination weddings across
              Indonesia for couples seeking rare landscapes, cultural depth, and
              emotionally meaningful environments.
            </p>
          </motion.h1>
        </motion.div>
      </section>

      {/* Intro Section */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={fadeInUp}>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                Rooted in Bali
                <br />
                <span>Curated Across Indonesia</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-8">
              <p className="text-primary mb-6">Design Philosophy:</p>
              <div className="space-y-4">
                {[
                  "Natural integrity",
                  "Cultural depth",
                  "Emotional atmosphere",
                  "Privacy and seclusion",
                  "Design potential",
                  "Guest experience quality",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                  >
                    <span className="text-primary font-mono w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-6 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary  leading-relaxed text-justify mb-8"
            >
              Bali remains the creative heart of our studio where our planning
              systems, creative process, and core wedding experiences are based.
              From this foundation, we extend our work to select destinations
              across Indonesia that align with our design philosophy.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary  leading-relaxed text-justify"
            >
              We do not approach Indonesia as a list of locations. We approach
              it as a collection of environments, each offering a distinct
              emotional and experiential quality. Every destination is carefully
              assessed for accessibility, guest comfort, production feasibility,
              and environmental responsibility.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Why Indonesia Section */}
      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-14">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Destination Choice
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              Why Indonesia
              <br />
              <span>
                For Destination Weddings
              </span>
            </h2>
          </motion.div>

          <div className="grid items lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-primary mb-6">Indonesia Offers:</h3>
              {[
                "Extraordinary natural diversity",
                "Deep cultural heritage",
                "Spiritually significant landscapes",
                "Remote and exclusive environments",
                "Strong sense of place and ritual",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 pb-4 border-b border-primary/20 last:border-0"
                >
                  <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                  <span className="text-primary">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-primary p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-white font font-semibold tracking-[0.25em] uppercase mb-3">
                    Celebration Styles
                  </p>
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Indonesia Multi-Day Journeys
                  </h3>
                  <p className="text-white  leading-relaxed mb-8">
                    Many Indonesia destination weddings unfold as retreat-style
                    celebrations, multi-day experiences, culturally inspired
                    gatherings, nature-integrated ceremonies, and intimate,
                    emotionally rich journeys.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Retreat-style celebrations",
                      "Multi-day experiences",
                      "Culturally inspired gatherings",
                      "Nature-integrated ceremonies",
                    ].map((item, i) => (
                      <div key={item} className="flex items-center gap-4">
                        <span className="text-white font-mono w-5 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Destinations Grid */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold mb-8">
            Our Destinations
          </h2>

          {/* Category Filter */}
          <div className="flex gap-4">
            {["Bali", "Indonesia"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as "Bali" | "Indonesia")}
                className={`px-6 py-3 text-sm font-semibold tracking-widest uppercase hover:cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "border border-primary/80 text-primary hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 &&
        selectedCategory === "Indonesia" ? (
          <div className="flex flex-col items-center justify-center py-24 text-center max-w-2xl mx-auto">
            <p className="text-primary tracking-[0.25em] uppercase mb-4 text-sm">
              Coming Soon
            </p>
            <h3 className="text-2xl md:text-3xl text-primary font-semibold leading-tight mb-6">
              Curated With Intention
              <br />
              <span className="italic font-light">Not by Volume</span>
            </h3>
            <p className="text-primary/70  leading-relaxed">
              Future curated destinations may include Lombok, Sumba, Yogyakarta,
              and Banyuwangi — developed intentionally and selectively.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div key={destination.slug}>
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={destination.imageUrl}
                      alt={destination.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white/80 text-xs tracking-widest uppercase mb-1">
                        {destination.type}
                      </p>
                      <h3 className="text-white font-semibold text-xl uppercase">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-primary/80 text-sm leading-relaxed line-clamp-2">
                    {destination.description}
                  </p>
                  <span className="inline-block mt-3 text-xs tracking-widest uppercase text-primary border-b border-primary/40 pb-0.5 group-hover:border-primary transition-colors duration-300">
                    Explore Destination
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773318397/destination-closing_eie0gt.png"
            alt="Your Bali destination wedding"
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em]  uppercase mb-4"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Ready to Plan Your
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              Destination Wedding?
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80  max-w-2xl mx-auto leading-relaxed"
          >
            Explore the destinations above or begin a conversation with us to
            shape a destination wedding experience that reflects your vision.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                BEGIN YOUR STORY
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                VIEW PORTFOLIO
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
