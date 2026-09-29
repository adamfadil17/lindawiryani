"use client";

import { useTranslations } from "next-intl";

import type React from "react";
import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type {
  WeddingLocationInterest,
  WeddingStyle,
  EstimatedBudget,
  ServiceNeeded,
  VenueSecured,
  HowDidYouFindUs,
} from "@/types";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

// ─── Option Lists ────────────────────────────────────────

const weddingLocationOptions: WeddingLocationInterest[] = [
  "Private Villa",
  "Beachfront or Oceanfront",
  "Cliffside",
  "Jungle or Forest",
  "Rice Field",
  "Waterfall",
  "Riverside",
  "Lakeside",
  "Mountain / Volcano Backdrop",
  "Garden",
  "Resort / Hotel",
  "Not sure yet, please recommend",
];

const weddingStyleOptions: WeddingStyle[] = [
  "Elopement",
  "Intimate Wedding",
  "Private Villa Wedding",
  "Luxury Wedding",
  "Full Destination Wedding",
];

const estimatedBudgetOptions: EstimatedBudget[] = [
  "Under IDR 100 million",
  "IDR 100–250 million",
  "IDR 250–500 million",
  "IDR 500 million–1 billion",
  "Above IDR 1 billion",
  "Not sure yet",
];

const servicesNeededOptions: ServiceNeeded[] = [
  "Full Wedding Planning & Coordination",
  "Wedding Styling & Creative Direction",
  "Private Villa Wedding (Specialist)",
  "Concept & Design Consultation",
  "Event & Table Styling",
  "Destination Guest Management",
  "Not sure yet",
];

const venueSecuredOptions: VenueSecured[] = [
  "Yes",
  "No",
  "Currently exploring options",
];

const howDidYouFindUsOptions: HowDidYouFindUs[] = [
  "Google",
  "Instagram",
  "Venue / Hotel Partner",
  "Referral",
  "Other",
];

// ─── Initial Form State ──────────────────────────────────

const initialFormData = {
  fullName: "",
  emailOrWhatsapp: "",
  weddingDate: "",
  numberOfGuests: "",
  weddingLocationInterest: [] as WeddingLocationInterest[],
  weddingStyle: "" as WeddingStyle | "",
  estimatedBudget: "" as EstimatedBudget | "",
  servicesNeeded: [] as ServiceNeeded[],
  venueSecured: "" as VenueSecured | "",
  yourVision: "",
  howDidYouFindUs: "" as HowDidYouFindUs | "",
};

// ─── Component ───────────────────────────────────────────

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const tOpt = useTranslations("contactOptions");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // ── Handlers ──────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    field: "weddingLocationInterest" | "servicesNeeded",
    value: WeddingLocationInterest | ServiceNeeded,
  ) => {
    setFormData((prev) => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleRadioChange = (
    field:
      "weddingStyle" | "estimatedBudget" | "venueSecured" | "howDidYouFindUs",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setSubmitStatus({
        type: "error",
        message: t("recaptchaRequired"),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: t("submitSuccess"),
        });
        setFormData(initialFormData);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || t("submitError"),
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: t("catchError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Style Helpers ─────────────────────────────────────

  const inputClass =
    "w-full px-4 py-3 border border-primary/50 bg-transparent focus:outline-none focus:border-primary transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/50";

  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";

  const sectionTitleClass =
    "text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3";

  const checkboxItemClass = "flex items-center gap-3 cursor-pointer group";

  const checkboxInputClass = "w-4 h-4 accent-primary cursor-pointer shrink-0";

  const checkboxLabelClass =
    "text-primary/80 text-sm group-hover:text-primary transition-colors cursor-pointer";

  // ── Render ────────────────────────────────────────────

  return (
    <main className="relative overflow-hidden">
      {/* ── Hero ── */}
      <PageHero
        image="https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709789/singaraja_mt8hqt.png"
        imageAlt="Contact Linda Wiryani Events"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/contact"
        kicker={t("heroKicker")}
        title={t("heroTitle1")}
        titleSecondLine={t("heroTitle2")}
        secondLineItalic
        subtitle={t("heroSubtitle")}
        layout="split"
        overlay="soft"
        actions={
          <Link href={WHATSAPP_URL} target="_blank">
            <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
              {t("inquireNow")}
            </button>
          </Link>
        }
      />

      {/* ── Form Section ── */}
      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* ── Sidebar ── */}
            <div className="lg:col-span-4 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("keepInTouch")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {t("reachUsTitle1")}
                  <br />
                  <span className="italic font-light">
                    {t("reachUsTitle2")}
                  </span>
                </h2>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  {
                    icon: "/images/email-brown.svg",
                    alt: "Email",
                    label: "hello@lindawiryani.com",
                    href: "mailto:hello@lindawiryani.com",
                  },
                  {
                    icon: "/images/whatsapp-brown.svg",
                    alt: "WhatsApp",
                    label: "+62 811 3980 998",
                    href: "https://wa.me/628113980998",
                  },
                  {
                    icon: "/images/instagram-brown.svg",
                    alt: "Instagram",
                    label: "@lindawiryanievents",
                    href: "https://instagram.com/lindawiryanievents",
                  },
                  {
                    icon: "/images/pinterest-line-brown.svg",
                    alt: "Pinterest",
                    label: "lindawiryanievents",
                    href: "https://pinterest.com/lindawiryanievents",
                  },
                ].map((item) => (
                  <div
                    key={item.alt}
                    className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                  >
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={20}
                      height={20}
                      className="shrink-0"
                    />
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-primary hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Form ── */}
            <motion.div className="lg:col-span-8 space-y-8" variants={fadeInUp}>
              <div className="space-y-4">
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("weddingEnquiryForm")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("formTitle1")}
                  <br />
                  <span className="italic font-light">{t("formTitle2")}</span>
                </h2>
              </div>

              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* ── 1. Contact Info ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("contactInformation")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>
                        {t("fullName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {t("emailWhatsapp")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="emailOrWhatsapp"
                        value={formData.emailOrWhatsapp}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ── 2. Wedding Details ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("weddingDetails")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>
                        {t("weddingDatePreferred")}
                      </label>
                      <input
                        type="text"
                        name="weddingDate"
                        placeholder={t("weddingDatePlaceholder")}
                        value={formData.weddingDate}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {t("numberOfGuests")}
                      </label>
                      <input
                        type="text"
                        name="numberOfGuests"
                        placeholder={t("numberOfGuestsPlaceholder")}
                        value={formData.numberOfGuests}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* ── 3. Wedding Location Interest ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>
                    {t("weddingLocationInterest")}
                    <span className="text-primary/50 font-normal normal-case tracking-normal ml-2 text-xs">
                      {t("selectAllApply")}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {weddingLocationOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="checkbox"
                          className={checkboxInputClass}
                          checked={formData.weddingLocationInterest.includes(
                            option,
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              "weddingLocationInterest",
                              option,
                            )
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`loc_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── 4. Wedding Style ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("weddingStyle")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {weddingStyleOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="radio"
                          name="weddingStyle"
                          className={checkboxInputClass}
                          checked={formData.weddingStyle === option}
                          onChange={() =>
                            handleRadioChange("weddingStyle", option)
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`style_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── 5. Estimated Budget ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("estimatedBudget")}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {estimatedBudgetOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="radio"
                          name="estimatedBudget"
                          className={checkboxInputClass}
                          checked={formData.estimatedBudget === option}
                          onChange={() =>
                            handleRadioChange("estimatedBudget", option)
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`budget_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── 6. Services Needed ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>
                    {t("servicesNeeded")}
                    <span className="text-primary/50 font-normal normal-case tracking-normal ml-2 text-xs">
                      {t("selectAllApply")}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesNeededOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="checkbox"
                          className={checkboxInputClass}
                          checked={formData.servicesNeeded.includes(option)}
                          onChange={() =>
                            handleCheckboxChange("servicesNeeded", option)
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`service_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── 7. Have You Secured a Venue? ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("venueSecuredQ")}</p>
                  <div className="flex flex-wrap gap-6">
                    {venueSecuredOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="radio"
                          name="venueSecured"
                          className={checkboxInputClass}
                          checked={formData.venueSecured === option}
                          onChange={() =>
                            handleRadioChange("venueSecured", option)
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`venue_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── 8. Tell Us About Your Vision ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("tellUsVision")}</p>
                  <label className={labelClass}>{t("visionLabel")}</label>
                  <textarea
                    name="yourVision"
                    placeholder={t("writeVisionPlaceholder")}
                    value={formData.yourVision}
                    onChange={handleInputChange}
                    rows={6}
                    disabled={isSubmitting}
                    className={`${inputClass} resize-vertical`}
                  />
                </div>

                {/* ── 9. How Did You Find Us? ── */}
                <div className="mb-8">
                  <p className={sectionTitleClass}>{t("howDidYouFindUsQ")}</p>
                  <div className="flex flex-wrap gap-6">
                    {howDidYouFindUsOptions.map((option) => (
                      <label key={option} className={checkboxItemClass}>
                        <input
                          type="radio"
                          name="howDidYouFindUs"
                          className={checkboxInputClass}
                          checked={formData.howDidYouFindUs === option}
                          onChange={() =>
                            handleRadioChange("howDidYouFindUs", option)
                          }
                          disabled={isSubmitting}
                        />
                        <span className={checkboxLabelClass}>
                          {tOpt(`find_${option}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── reCAPTCHA ── */}
                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                {/* ── Status Message ── */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaToken}
                  className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? t("sending") : t("beginJourneyBtn")}
                </button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Closing CTA Section ── */}
      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311292/Lake_Buyan_bt7cbw.png"
        imageAlt="Your Bali destination wedding"
        overlayClassName="bg-primary/72"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{ label: t("ctaPortfolio"), href: "/portfolio" }}
      />
    </main>
  );
}
