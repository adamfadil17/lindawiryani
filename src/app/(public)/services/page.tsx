"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import {
  serviceDestinations,
  services,
  whyChooseReasons,
} from "@/lib/data/services-data";

function ServiceAccordion({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-primary/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group hover:cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-primary  font-mono w-6 flex-shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-primary font-semibold  md:text-xl group-hover:text-primary/80 transition-colors pr-4">
            {service.name}
          </span>
          {service.tag === "Add-On" && (
            <span className="hidden sm:inline text-sm border border-primary/30 text-primary px-2 py-0.5 tracking-wider flex-shrink-0">
              OPTIONAL
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
              <div className="lg:col-span-5 relative h-[40vh] lg:h-[360px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/80 text-white text-sm tracking-widest px-3 py-1.5">
                    {service.tag.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
                <p className="text-primary text-justify leading-relaxed ">
                  {service.intro}
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-primary font-semibold tracking-widest uppercase mb-4 pb-2 border-b border-primary/20">
                      {service.includes.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {service.includes.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                          <span className="text-primary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <h4 className="text-primary font-semibold tracking-widest uppercase mb-4 pb-2 border-b border-primary/20">
                        {service.bestFor.title}
                      </h4>
                      <p className="text-primary leading-relaxed italic">
                        {service.bestFor.desc}
                      </p>
                    </div>
                    <Link href="https://wa.me/628113980998" target="_blank">
                      <button className="border border-primary text-primary font-semibold px-6 py-2.5 text-sm tracking-widest hover:bg-primary hover:cursor-pointer hover:text-white transition-colors duration-300">
                        INQUIRE NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  const [openServiceId, setOpenServiceId] = useState<string>(services[0].id);

  const handleToggle = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? "" : id));
  };

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311945/header-services_dbqj5l.jpg"
            alt="Linda Wiryani Design and Event Planning Services"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-14 lg:pb-24 text-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-12 mt-6"
          >
            <Link
              href="/services"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Services
            </Link>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] mb-4 uppercase"
          >
            Emotion. Space. Experience.
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Where Refined Hospitality
            <br />
            <span>Meets Artful Design</span>
          </motion.h1>
        </motion.div>
      </section>

      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              Seven services.
              <br />
              <span>One intention.</span>
            </h2>
            <div className="mt-10 w-16 h-px bg-primary/70" />
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <p className="text-primary leading-relaxed text-justify ">
              At Linda Wiryani Design and Event Planning, weddings are
              approached as thoughtful design projects shaped by emotion, space,
              and human experience. We work with couples who seek more than
              coordination — they seek meaning, atmosphere, and a sense of quiet
              refinement. Each service below can stand alone or be combined into
              a fully curated experience.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-primary/15 py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-10">
            <p className="text-primary tracking-[0.25em] uppercase mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              Our Services
            </h2>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white/60 px-6 md:px-10">
            {services.map((service, index) => (
              <ServiceAccordion
                key={service.id}
                service={service}
                index={index}
                isOpen={openServiceId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Our Studio
            </p>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  Why Choose
                  <br />
                  <span className="italic font-light">Linda Wiryani</span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary text-justify leading-relaxed ">
                  A design-led wedding studio for intentional celebrations in
                  Bali. With a background rooted in luxury hospitality and
                  creative direction, our studio offers a calm, structured, and
                  deeply considered approach to wedding planning and design.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {whyChooseReasons.map((reason, i) => (
              <motion.div
                key={reason.number}
                variants={fadeInUp}
                custom={i}
                className={`space-y-4 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span className="text-5xl font-semibold text-primary leading-none block">
                  {reason.number}
                </span>
                <div className="w-10 h-px bg-primary/40" />
                <h3 className="text-primary font-semibold">{reason.title}</h3>
                <p className="text-primary text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeIn}
              className="lg:col-span-5 relative h-[50vh] lg:h-[520px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311967/global_reach_naldd0.jpg"
                alt="Destination weddings in Bali"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>

            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Global Reach
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Serving Destination Weddings in Bali
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                Linda Wiryani Design and Event Planning proudly serves couples
                from around the world seeking a Bali wedding planner and
                designer who offers both creative vision and grounded execution.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-primary">Our studio curates:</p>
                {serviceDestinations.map((dest) => (
                  <div key={dest} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{dest}</span>
                  </div>
                ))}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed italic border-t border-primary/30  pt-6"
              >
                From coastal cliffs and jungle hideaways to refined private
                estates, we design weddings that feel deeply personal,
                beautifully balanced, and connected to their surroundings.
              </motion.p>
            </div>
          </div>
        </div>
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
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773312297/closing-services_szst8w.jpg"
            alt="Begin your wedding journey"
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
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Whether you are planning a destination wedding,a private villa
            celebration, or a quiet elopement.
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              Our role is to guide, design, and orchestrate.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-white/80  max-w-2xl mx-auto leading-relaxed"
          >
            A wedding that feels intentional from beginning to end — quiet,
            beautiful, and entirely your own.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white/90 transition-colors duration-300">
                BEGIN YOUR STORY
              </button>
            </Link>
            <Link href="/wedding-experiences">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white/10 transition-colors duration-300">
                VIEW WEDDING EXPERIENCES
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
