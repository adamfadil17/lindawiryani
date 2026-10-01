"use client";

import { useTranslations } from "next-intl";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { useServicesData, type ServicesData } from "@/lib/data/services-data";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

function ServiceAccordion({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: ServicesData["services"][number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("servicesPage");
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
          {service.id === "guest-management" && (
            <span className="hidden sm:inline text-sm border border-primary/30 text-primary px-2 py-0.5 tracking-wider flex-shrink-0">
              {t("optional")}
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
                        {t("inquireNow")}
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
  const t = useTranslations("servicesPage");
  const { services, whyChooseReasons, serviceDestinations } = useServicesData();
  const [openServiceId, setOpenServiceId] = useState<string>(services[0].id);

  const handleToggle = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? "" : id));
  };

  return (
    <main className="relative overflow-hidden">
      <PageHero
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773311945/header-services_dbqj5l.jpg"
        imageAlt="Linda Wiryani Design and Event Planning Services"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/services"
        kicker={t("heroKicker")}
        title={t("heroTitle1")}
        titleSecondLine={t("heroTitle2")}
        spacing="compact"
        overlay="soft"
        breadcrumbSpacing="mb-12"
        kickerSpacing="mb-4"
      />

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
              {t("introTitle1")}
              <br />
              <span>{t("introTitle2")}</span>
            </h2>
            <div className="mt-10 w-16 h-px bg-primary/70" />
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <p className="text-primary leading-relaxed text-justify ">
              {t("introBody")}
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
              {t("studioKicker")}
            </p>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {t("whyChooseTitle1")}
                  <br />
                  <span className="italic font-light">
                    {t("whyChooseTitle2")}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary text-justify leading-relaxed ">
                  {t("whyChooseBody")}
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
                  {t("globalKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("globalTitle")}
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                {t("globalBody")}
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-primary">{t("curatesLead")}</p>
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
                {t("globalFooter")}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773312297/closing-services_szst8w.jpg"
        imageAlt="Begin your wedding journey"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{
          label: t("ctaExperiences"),
          href: "/wedding-experiences",
        }}
        spacing="relaxed"
      />
    </main>
  );
}
