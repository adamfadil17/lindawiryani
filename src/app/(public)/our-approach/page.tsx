"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import {
  designQualities,
  phases,
  pillars,
  specializations,
} from "@/lib/data/our-approach/our-approach-data";

export default function OurApproachPage() {
  const planningRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773382153/header-our-approach_kcii2q.png"
            alt="Linda Wiryani Design and Event Planning"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>
        \
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
              href="/our-approach"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Our Approach
            </Link>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] mb-5 uppercase"
          >
            The Art of Meaningful Gatherings
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Design-Led Luxury
            <br />
            <span>Wedding Planning in Bali</span>
          </motion.h1>
        </motion.div>
      </section>
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              A wedding is not simply an event.
            </h2>
            <p className="mt-6 text-primary  leading-relaxed">
              It is an experience, an atmosphere, and a story that deserves to
              be designed with intention.
            </p>
            <div className="mt-10 w-16 h-px bg-primary/70" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 space-y-6 text-primary text-justify leading-relaxed"
          >
            <p className="text-primary leading-relaxed text-justify ">
              Based in Bali, we specialize in artfully curated weddings shaped
              by architecture, hospitality, and emotional storytelling. Every
              celebration we create is guided by space, feeling, and human
              connection — never templates, never trends.
            </p>
            <p className="text-primary leading-relaxed text-justify ">
              Our approach blends five-star hospitality standards, design
              methodology, and deep local knowledge of Bali to create weddings
              that feel seamless, elevated, and quietly unforgettable.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Our Studio
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  A Design Wedding Planning Studio
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                Unlike traditional wedding organizers, Linda Wiryani Design and
                Event Planning was built as a design-led studio. This means
                every wedding begins not with decoration, but with the
                atmosphere you want to feel, the story you want your guests to
                experience, the environment where your wedding takes place, and
                the emotional rhythm of your day.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                From private villa weddings and intimate elopements to multi-day
                destination weddings, we design each celebration as a complete
                visual and emotional journey.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary  mb-4 italic">
                  This design-first approach is what allows us to create
                  weddings that feel:
                </p>
                <div className="flex flex-wrap gap-3">
                  {designQualities.map((q) => (
                    <span
                      key={q}
                      className="border border-primary/50 text-primary text-sm tracking-widest hover:bg-primary transition-colors hover:text-white px-4 py-2"
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-primary  italic">
                  Not crowded. Not generic. Not over-styled.
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[60vh] lg:h-[550px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773493721/our-studio-our-approach1_b6vweo.png"
                alt="Design-led wedding studio"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeIn}
              className="lg:col-span-5 relative h-[50vh] lg:h-[500px] overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311285/our-roots_ibpu3e.jpg"
                alt="Bali landscape and nature"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>

            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Our Roots
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Rooted in Bali, Crafted for the World
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                Bali is not just our location — it is part of our creative
                language. We work deeply with Bali's landscapes, light, natural
                materials, and cultural sensitivity to design weddings that feel
                naturally connected to their surroundings.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                While rooted in Bali, Linda Wiryani Design and Event Planning
                serves international couples seeking a refined, emotionally
                meaningful destination wedding experience.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-3">
                {[
                  "Private villas in Bali",
                  "Clifftop and oceanfront venues",
                  "Jungle and riverside locations",
                  "Boutique resorts and hidden estates",
                ].map((venue) => (
                  <div key={venue} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{venue}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={planningRef}
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 lg:mb-20"
          >
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold">
              Hospitality-Driven Planning &amp; Execution
            </h2>
            <p className="mt-6 text-primary  max-w-xl mx-auto text-center leading-relaxed">
              With nearly two decades of experience in five-star luxury
              hospitality, our planning system is built on one foundation: calm,
              precision, and care.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                variants={fadeInUp}
                custom={i}
                className="border border-primary/30 p-8 flex flex-col gap-6 hover:border-primary/80 transition-colors duration-300"
              >
                <span className="text-5xl font-semibold text-primary leading-none">
                  {phase.number}
                </span>
                <h3 className="text-primary font-semibold ">{phase.title}</h3>
                <p className="text-primary leading-relaxed flex-1">
                  {phase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Our Difference
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  What Makes Us Different
                </h2>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-primary/15 p-8 border-l-2 border-primary"
              >
                <p className="text-primary  italic leading-relaxed">
                  "Many wedding planners organize logistics.
                  <br />
                  We design experiences."
                </p>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary  text-justify leading-relaxed"
              >
                Our studio is chosen by couples who value artistry over
                administration. We intentionally limit the number of weddings we
                take each year to ensure every celebration receives full
                creative focus and personal involvement.
              </motion.p>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary mb-6">
                  Our studio is chosen by couples who value:
                </p>
                <div className="space-y-4">
                  {pillars.map((pillar, i) => (
                    <motion.div
                      key={pillar}
                      variants={fadeInUp}
                      custom={i}
                      className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                    >
                      <span className="text-primary font-mono w-6 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{pillar}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Expertise
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Our Specializations
                </h2>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-primary">
                Internationally recognized for:
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                {specializations.map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary italic border-t border-primary/20 pt-6"
              >
                Each wedding is custom-built, never packaged.
              </motion.p>
            </div>

            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[50vh] lg:h-[480px] overflow-hidden"
            >
              <Image
                src="/images/service/service4.png"
                alt="Luxury Bali wedding specialization"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>
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
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311704/closing_fjcftu.jpg"
            alt="A wedding that feels like you"
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
            A Wedding That Feels Like You
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Your wedding should not feel like a production.
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              It should feel like a moment that belongs only to you.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-white/80  max-w-2xl mx-auto text-center leading-relaxed"
          >
            Our role is to listen deeply, design thoughtfully, and execute
            precisely — so your wedding day unfolds with beauty, emotion, and
            ease. If you are looking for a Bali wedding planner and designer who
            values artistry, atmosphere, and human experience, we would be
            honored to create with you.
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
            <Link href="/services">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer  hover:bg-white/10 transition-colors duration-300">
                VIEW SERVICES
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
