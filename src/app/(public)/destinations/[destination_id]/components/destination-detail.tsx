"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { Destination } from "@/lib/types/destinations/destination-types";
import { destinationList } from "@/lib/data/destinations/destination-data";

interface DestinationDetailProps {
  destination: Destination;
}

export default function DestinationDetail({
  destination,
}: DestinationDetailProps) {
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const otherDestinations = destinationList.filter(
    (d) => d.slug !== destination.slug,
  );

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 lg:pb-28"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-12 mt-6"
          >
            <Link
              href="/destinations"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Destinations
            </Link>
            <span className="text-white text-sm">/</span>
            <span className="text-white text-sm font-simbold tracking-widest uppercase truncate max-w-[200px]">
              {destination.name}
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Bali Destination
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            {destination.name}
            <br />
            <span>
              {destination.type}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-white/80  max-w-3xl leading-relaxed mt-6"
          >
            {destination.description}
          </motion.p>

          {/* Location */}
          <motion.div variants={fadeInUp} className="mt-12">
            <p className="text-white tracking-[0.25em] uppercase mb-2">
              Location
            </p>
            <p className="text-white ">{destination.location}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Atmosphere & Highlights */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <motion.div variants={slideInLeft} className="space-y-8">
            <div>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Atmosphere
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight mb-6">
                The Spirit of This Place
              </h2>
              <p className="text-primary  leading-relaxed">
                {destination.atmosphere}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-primary font-semibold tracking-[0.25em] uppercase mb-4">
                Why Couples Choose {destination.name}
              </p>
              {destination.bestFor.map((reason, index) => (
                <div
                  key={reason}
                  className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                >
                  <span className="text-primary font-mono w-6 flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-primary">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={slideInRight} className="space-y-8">
            <div className="bg-primary/10 p-8 lg:p-10">
              <p className="text-primary font-semibold  tracking-[0.25em] uppercase mb-4">
                Highlights
              </p>
              <div className="space-y-4">
                {destination.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 pb-4 border-b border-primary/20 last:border-0"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/80 flex-shrink-0 mt-2.5" />
                    <span className="text-primary">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white p-8 lg:p-10">
              <p className="text-white font-semibold tracking-[0.25em] uppercase mb-4">
                Guest Capacity
              </p>
              <p className="text-3xl font-semibold mb-6">
                {destination.guestCapacity}
              </p>
              <p className="text-white/80  leading-relaxed">
                Flexible capacity to accommodate intimate gatherings or larger
                celebrations, depending on the venue selected.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Planning Details Section */}
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
              Planning Guide
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              Important Considerations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-8 md:items-stretch">
            {/* Accessibility & Transportation */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 flex flex-col"
            >
              <h3 className="font-semibold text-primary mb-4">
                Accessibility & Transportation
              </h3>
              <p className="text-primary leading-relaxed">
                {destination.accessibilityNotes}
              </p>
            </motion.div>

            {/* Ceremony Options */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 cursor-pointer flex flex-col"
              onClick={() => setIsOptionsExpanded((prev) => !prev)}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-semibold text-primary">Ceremony Options</h3>
                {destination.ceremonyOptions.length > 2 && (
                  <span className="hidden sm:inline text-sm border border-primary/50 text-primary px-2 py-0.5 tracking-wider flex-shrink-0">
                    {isOptionsExpanded ? "SHOW LESS" : "VIEW MORE OPTIONS"}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {destination.ceremonyOptions.slice(0, 2).map((option) => (
                  <li
                    key={option}
                    className="text-primary flex items-start gap-4"
                  >
                    <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                    <span className="text-primary">{option}</span>
                  </li>
                ))}
              </ul>
              {isOptionsExpanded && (
                <ul className="space-y-2 mt-3 pt-3 border-t border-primary/20">
                  {destination.ceremonyOptions.slice(2).map((option) => (
                    <li
                      key={option}
                      className="text-primary flex items-start gap-4"
                    >
                      <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                      <span className="text-primary">{option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Seasonal Considerations */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 flex flex-col"
            >
              <h3 className="font-semibold text-primary mb-4">
                Seasonal Considerations
              </h3>
              <p className="text-primary leading-relaxed">
                {destination.seasonalConsiderations}
              </p>
            </motion.div>

            {/* Reception Options */}
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 cursor-pointer flex flex-col"
              onClick={() => setIsOptionsExpanded((prev) => !prev)}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-semibold text-primary">
                  Reception Options
                </h3>
                {destination.receptionOptions.length > 2 && (
                  <span className="hidden sm:inline text-sm border border-primary/50 text-primary px-2 py-0.5 tracking-wider flex-shrink-0">
                    {isOptionsExpanded ? "SHOW LESS" : "VIEW MORE OPTIONS"}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {destination.receptionOptions.slice(0, 2).map((option) => (
                  <li
                    key={option}
                    className="text-primary flex items-start gap-4"
                  >
                    <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                    <span className="text-primary">{option}</span>
                  </li>
                ))}
              </ul>
              {isOptionsExpanded && (
                <ul className="space-y-2 mt-3 pt-3 border-t border-primary/20">
                  {destination.receptionOptions.slice(2).map((option) => (
                    <li
                      key={option}
                      className="text-primary flex items-start gap-4"
                    >
                      <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                      <span className="text-primary">{option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experience Details */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Complete Experience
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold">
            What We Offer in {destination.name}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-primary tracking-[0.25em] uppercase font-semibold">
              Accommodation Nearby
            </p>
            <ul className="space-y-3">
              {destination.accommodationNearby.map((place) => (
                <li key={place} className="text-primary flex items-start gap-3">
                  <span className="text-primary/80  flex-shrink-0">◆</span>
                  {place}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-primary tracking-[0.25em] uppercase font-semibold">
              Dining Experiences
            </p>
            <ul className="space-y-3">
              {destination.diningExperiences.map((dining) => (
                <li
                  key={dining}
                  className="text-primary flex items-start gap-3"
                >
                  <span className="text-primary/80  flex-shrink-0">◆</span>
                  {dining}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <p className="text-primary tracking-[0.25em] uppercase font-semibold">
              Unique Features
            </p>
            <ul className="space-y-3">
              {destination.uniqueFeatures.map((feature) => (
                <li
                  key={feature}
                  className="text-primary flex items-start gap-3"
                >
                  <span className="text-primary/80  flex-shrink-0">◆</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/72" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Ready to Plan
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              in {destination.name}?
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80  max-w-2xl mx-auto leading-relaxed"
          >
            Our studio is ready to guide you through creating a meaningful,
            design-led wedding experience that honors this beautiful
            destination.
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
            <Link href="/destinations">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                VIEW PORTFOLIO
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      {/* Other Destinations */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Explore More
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold">
            Other Destinations
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherDestinations.map((dest) => (
            <motion.div key={dest.slug} variants={fadeInUp}>
              <Link href={`/destinations/${dest.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-xs tracking-widest uppercase mb-1">
                      {dest.type}
                    </p>
                    <h3 className="text-white font-semibold text-xl uppercase">
                      {dest.name}
                    </h3>
                  </div>
                </div>
                <p className="text-primary/80 text-sm leading-relaxed line-clamp-2">
                  {dest.description}
                </p>
                <span className="inline-block mt-3 text-xs tracking-widest uppercase text-primary border-b border-primary/40 pb-0.5 group-hover:border-primary transition-colors duration-300">
                  Explore Destination
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
