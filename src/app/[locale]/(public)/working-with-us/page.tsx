"use client";

import { useTranslations } from "next-intl";

import type React from "react";
import { useState, useRef } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  useWorkingWithUsData,
  getWorkingWithUsData,
} from "@/lib/data/working-with-us";
import { ChevronDown } from "lucide-react";

type Tab = "vendor" | "career";

interface VendorForm {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  vendorCategory: string;
  yearsInBusiness: string;
  portfolioLink: string;
  message: string;
}

interface CareerForm {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  linkedIn: string;
  portfolioLink: string;
  coverLetter: string;
}

export default function WorkingWithUsPage() {
  const t = useTranslations("workingWithUsPage");
  const { openPositions, vendorCategories, vendorValues } =
    useWorkingWithUsData();
  // Values sent to the backend/admin stay in English regardless of locale.
  const enData = getWorkingWithUsData("en");
  const [activeTab, setActiveTab] = useState<Tab>("vendor");

  const vendorRecaptchaRef = useRef<ReCAPTCHA>(null);
  const [vendorForm, setVendorForm] = useState<VendorForm>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    vendorCategory: "",
    yearsInBusiness: "",
    portfolioLink: "",
    message: "",
  });
  const [vendorSubmitting, setVendorSubmitting] = useState(false);
  const [vendorStatus, setVendorStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [vendorRecaptcha, setVendorRecaptcha] = useState<string | null>(null);

  const careerRecaptchaRef = useRef<ReCAPTCHA>(null);
  const [careerForm, setCareerForm] = useState<CareerForm>({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    linkedIn: "",
    portfolioLink: "",
    coverLetter: "",
  });
  const [careerSubmitting, setCareerSubmitting] = useState(false);
  const [careerStatus, setCareerStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [careerRecaptcha, setCareerRecaptcha] = useState<string | null>(null);

  const handleVendorChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setVendorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCareerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setCareerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorRecaptcha) {
      setVendorStatus({
        type: "error",
        message: t("recaptchaRequired"),
      });
      return;
    }
    setVendorSubmitting(true);
    setVendorStatus({ type: null, message: "" });
    try {
      const response = await fetch(
        "/api/send-email/working-with-us/vendor-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...vendorForm,
            recaptchaToken: vendorRecaptcha,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setVendorStatus({
          type: "success",
          message: t("vendorSuccess"),
        });
        setVendorForm({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          vendorCategory: "",
          yearsInBusiness: "",
          portfolioLink: "",
          message: "",
        });
        vendorRecaptchaRef.current?.reset();
        setVendorRecaptcha(null);
      } else {
        setVendorStatus({
          type: "error",
          message: data.message || t("genericError"),
        });
      }
    } catch {
      setVendorStatus({
        type: "error",
        message: t("catchError"),
      });
    } finally {
      setVendorSubmitting(false);
    }
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerRecaptcha) {
      setCareerStatus({
        type: "error",
        message: t("recaptchaRequired"),
      });
      return;
    }
    setCareerSubmitting(true);
    setCareerStatus({ type: null, message: "" });
    try {
      const response = await fetch(
        "/api/send-email/working-with-us/career-application",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...careerForm,
            recaptchaToken: careerRecaptcha,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setCareerStatus({
          type: "success",
          message: t("careerSuccess"),
        });
        setCareerForm({
          fullName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          linkedIn: "",
          portfolioLink: "",
          coverLetter: "",
        });
        careerRecaptchaRef.current?.reset();
        setCareerRecaptcha(null);
      } else {
        setCareerStatus({
          type: "error",
          message: data.message || t("genericError"),
        });
      }
    } catch {
      setCareerStatus({
        type: "error",
        message: t("catchError"),
      });
    } finally {
      setCareerSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-primary/50 bg-transparent focus:outline-none focus:border-primary transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/50";
  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="/images/service/service1.png"
            alt="Working With Us"
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
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-10 mt-6"
          >
            <Link
              href="/working-with-us"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              {t("breadcrumb")}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.p
                variants={fadeInUp}
                className="text-white tracking-[0.3em] uppercase mb-5"
              >
                {t("heroKicker")}
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
              >
                {t("heroTitle1")}
                <br />
                <span className="italic font-light normal-case">
                  {t("heroTitle2")}
                </span>
              </motion.h1>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <motion.p
                variants={fadeInUp}
                className="text-white/80 leading-relaxed border-l border-white/80 pl-6"
              >
                {t("heroSubtitle")}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setActiveTab("vendor")}
                  className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300"
                >
                  {t("vendorPartnershipBtn")}
                </button>
                <button
                  onClick={() => setActiveTab("career")}
                  className="border border-white/50 text-white/70 font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300"
                >
                  {t("joinTeamBtn")}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={fadeInUp}>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                {t("studioKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {t("studioTitle1")}
                <br />
                <span className="italic font-light">{t("studioTitle2")}</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-primary mb-6">{t("whatWeBring")}</p>
              {[
                t("bring1"),
                t("bring2"),
                t("bring3"),
                t("bring4"),
                t("bring5"),
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
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("studioP1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("studioP2")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("studioP3")}
            </motion.p>
          </div>
        </div>
      </motion.section>

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
              {t("standardsKicker")}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              {t("standardsTitle1")}
              <br />
              <span className="italic font-light">{t("standardsTitle2")}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendorValues.map((v) => (
              <motion.div
                key={v.no}
                variants={fadeInUp}
                className="flex flex-col gap-6 bg-white/60 p-8"
              >
                <span className="text-primary font-semibold text-3xl tracking-widest">
                  {v.no}
                </span>
                <h3 className="text-primary font-semibold text-lg">
                  {v.title}
                </h3>
                <p className="text-primary leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            {t("joinTeamKicker")}
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold">
            {t("openPositionsTitle1")}
            <br />
            <span className="italic font-light">
              {t("openPositionsTitle2")}
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {openPositions.map((pos, i) => (
            <motion.div
              key={pos.title}
              variants={fadeInUp}
              className="border border-primary/20 p-8 space-y-4 group hover:border-primary/60 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-primary text-lg font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-2 flex-wrap justify-end">
                  <span className="text-sm tracking-widest uppercase text-primary border border-primary/50 px-3 py-1">
                    {pos.type}
                  </span>
                  <span className="text-sm tracking-widest uppercase text-primary border border-primary/50 px-3 py-1">
                    {pos.level}
                  </span>
                </div>
              </div>
              <h3 className="text-primary font-semibold text-xl">
                {pos.title}
              </h3>
              <p className="text-primary text-sm leading-relaxed">{pos.desc}</p>
              <button
                onClick={() => setActiveTab("career")}
                className="inline-block mt-2 text-xs tracking-widest uppercase text-primary border-b border-primary/40 pb-0.5 hover:border-primary hover:cursor-pointer transition-colors duration-300"
              >
                {t("applyNow")}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>
      <motion.section
        id="apply"
        className="bg-primary/5 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-14">
            <p className="text-primary tracking-[0.25em] uppercase mb-6">
              {t("getInTouch")}
            </p>
            <div className="flex gap-0 border-b border-primary/20">
              {(["vendor", "career"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors hover:cursor-pointer duration-300 border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-primary/80 hover:text-primary"
                  }`}
                >
                  {tab === "vendor"
                    ? t("vendorPartnershipTab")
                    : t("careerApplicationTab")}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "vendor" && (
              <motion.div
                key="vendor"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                  {/* Left – info */}
                  <div className="lg:col-span-4 space-y-10">
                    <div>
                      <p className="text-primary tracking-[0.25em] uppercase mb-3">
                        {t("vendorPartnershipKicker")}
                      </p>
                      <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                        {t("vendorFormTitle1")}
                        <br />
                        <span className="italic font-light">
                          {t("vendorFormTitle2")}
                        </span>
                      </h2>
                    </div>
                    <p className="text-primary leading-relaxed">
                      {t("vendorFormIntro")}
                    </p>
                    <div className="space-y-4">
                      {[
                        t("vendorCat1"),
                        t("vendorCat2"),
                        t("vendorCat3"),
                        t("vendorCat4"),
                        t("vendorCat5"),
                        t("vendorCat6"),
                      ].map((cat, i) => (
                        <div
                          key={cat}
                          className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                        >
                          <span className="text-primary font-mono w-6 flex-shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-primary">{cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <form onSubmit={handleVendorSubmit} className="space-y-6">
                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          {t("companyInfo")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              {t("companyName")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={vendorForm.companyName}
                              onChange={handleVendorChange}
                              required
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              {t("contactPerson")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="contactPerson"
                              value={vendorForm.contactPerson}
                              onChange={handleVendorChange}
                              required
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className={labelClass}>
                              {t("emailAddress")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={vendorForm.email}
                              onChange={handleVendorChange}
                              required
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              {t("phoneWhatsapp")}
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={vendorForm.phone}
                              onChange={handleVendorChange}
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>{t("website")}</label>
                          <input
                            type="url"
                            name="website"
                            placeholder="https://"
                            value={vendorForm.website}
                            onChange={handleVendorChange}
                            disabled={vendorSubmitting}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          {t("serviceDetails")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              {t("vendorCategory")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                name="vendorCategory"
                                value={vendorForm.vendorCategory}
                                onChange={handleVendorChange}
                                required
                                disabled={vendorSubmitting}
                                className={selectClass}
                              >
                                <option value="">{t("selectCategory")}</option>
                                {vendorCategories.map((cat, idx) => (
                                  <option
                                    key={cat}
                                    value={enData.vendorCategories[idx]}
                                  >
                                    {cat}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <ChevronDown className="w-4 h-4 text-primary/80" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>
                              {t("yearsInBusiness")}
                            </label>
                            <input
                              type="text"
                              name="yearsInBusiness"
                              placeholder={t("yearsInBusinessPlaceholder")}
                              value={vendorForm.yearsInBusiness}
                              onChange={handleVendorChange}
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>
                            {t("portfolioInstagramLink")}
                          </label>
                          <input
                            type="url"
                            name="portfolioLink"
                            placeholder="https://"
                            value={vendorForm.portfolioLink}
                            onChange={handleVendorChange}
                            disabled={vendorSubmitting}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          {t("tellUsMore")}
                        </p>
                        <label className={labelClass}>
                          {t("introduceYourself")}
                        </label>
                        <p className="text-primary italic mb-3">
                          {t("vendorMessageIntro")}
                        </p>
                        <textarea
                          name="message"
                          placeholder={t("writeIntroPlaceholder")}
                          value={vendorForm.message}
                          onChange={handleVendorChange}
                          rows={6}
                          disabled={vendorSubmitting}
                          className={`${inputClass} resize-vertical`}
                        />
                      </div>
                      <div className="flex justify-start">
                        <ReCAPTCHA
                          ref={vendorRecaptchaRef}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={setVendorRecaptcha}
                        />
                      </div>

                      {vendorStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 ${
                            vendorStatus.type === "success"
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {vendorStatus.message}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={vendorSubmitting || !vendorRecaptcha}
                        className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed transition-all"
                      >
                        {vendorSubmitting
                          ? t("sending")
                          : t("submitApplication")}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
            {activeTab === "career" && (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                  {/* Left – info */}
                  <div className="lg:col-span-4 space-y-10">
                    <div>
                      <p className="text-primary tracking-[0.25em] uppercase mb-3">
                        {t("careerKicker")}
                      </p>
                      <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                        {t("careerFormTitle1")}
                        <br />
                        <span className="italic font-light">
                          {t("careerFormTitle2")}
                        </span>
                      </h2>
                    </div>
                    <p className="text-primary leading-relaxed">
                      {t("careerFormIntro")}
                    </p>

                    <div className="space-y-4">
                      <p className="text-primary mb-4">{t("whatWeValue")}</p>
                      {[
                        t("val1"),
                        t("val2"),
                        t("val3"),
                        t("val4"),
                        t("val5"),
                      ].map((val, i) => (
                        <div
                          key={val}
                          className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                        >
                          <span className="text-primary font-mono w-6 flex-shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-primary">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <form onSubmit={handleCareerSubmit} className="space-y-6">
                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          {t("personalInfo")}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              {t("fullName")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={careerForm.fullName}
                              onChange={handleCareerChange}
                              required
                              disabled={careerSubmitting}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              {t("emailAddress")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={careerForm.email}
                              onChange={handleCareerChange}
                              required
                              disabled={careerSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>
                            {t("phoneWhatsapp")}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={careerForm.phone}
                            onChange={handleCareerChange}
                            disabled={careerSubmitting}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          {t("roleExperience")}
                        </p>
                        <div>
                          <label className={labelClass}>
                            {t("positionApplyingFor")}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="position"
                              value={careerForm.position}
                              onChange={handleCareerChange}
                              required
                              disabled={careerSubmitting}
                              className={selectClass}
                            >
                              <option value="">{t("selectPosition")}</option>
                              {openPositions.map((p, idx) => (
                                <option
                                  key={p.title}
                                  value={enData.openPositions[idx].title}
                                >
                                  {p.title}
                                </option>
                              ))}
                              <option value="Open Application">
                                {t("openApplication")}
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                              <ChevronDown className="w-4 h-4 text-primary/80" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>
                            {t("yearsRelevantExperience")}
                          </label>
                          <input
                            type="text"
                            name="experience"
                            placeholder={t("experiencePlaceholder")}
                            value={careerForm.experience}
                            onChange={handleCareerChange}
                            disabled={careerSubmitting}
                            className={inputClass}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className={labelClass}>
                              {t("linkedinProfile")}
                            </label>
                            <input
                              type="url"
                              name="linkedIn"
                              placeholder="https://linkedin.com/in/"
                              value={careerForm.linkedIn}
                              onChange={handleCareerChange}
                              disabled={careerSubmitting}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              {t("portfolioWebsite")}
                            </label>
                            <input
                              type="url"
                              name="portfolioLink"
                              placeholder="https://"
                              value={careerForm.portfolioLink}
                              onChange={handleCareerChange}
                              disabled={careerSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          {t("yourStory")}
                        </p>
                        <label className={labelClass}>
                          {t("coverLetterLabel")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-primary/80 text-sm mb-3">
                          {t("coverLetterIntro")}
                        </p>
                        <textarea
                          name="coverLetter"
                          placeholder={t("writeCoverLetterPlaceholder")}
                          value={careerForm.coverLetter}
                          onChange={handleCareerChange}
                          rows={8}
                          required
                          disabled={careerSubmitting}
                          className={`${inputClass} resize-vertical`}
                        />
                      </div>

                      <div className="flex justify-start">
                        <ReCAPTCHA
                          ref={careerRecaptchaRef}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={setCareerRecaptcha}
                        />
                      </div>

                      {careerStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 ${
                            careerStatus.type === "success"
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {careerStatus.message}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={careerSubmitting || !careerRecaptcha}
                        className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed transition-all"
                      >
                        {careerSubmitting
                          ? t("sending")
                          : t("submitApplication")}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773708862/closing-working-with-us2_domko4.png"
            alt="Work with us"
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
            {t("haveQuestions")}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            {t("closingTitle1")}
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              {t("closingTitle2")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t("closingBody")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 transition-colors duration-300">
                {t("inquireNow")}
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 transition-colors duration-300">
                {t("viewContact")}
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
