"use client";

import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  openPositions,
  vendorCategories,
  vendorValues,
} from "@/lib/data/working-with-us/working-with-us";

// ─── Types ───────────────────────────────────────────────────────────────────

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
  const [activeTab, setActiveTab] = useState<Tab>("vendor");

  // Vendor form
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

  // Career form
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

  // Handlers
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
        message: "Please complete the reCAPTCHA verification.",
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
          message:
            "Thank you! We'll review your application and be in touch within 5–7 business days.",
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
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setVendorStatus({
        type: "error",
        message:
          "An error occurred. Please try again or contact us via WhatsApp.",
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
        message: "Please complete the reCAPTCHA verification.",
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
          message:
            "Application received. We'll review your profile carefully and reach out if there's a fit.",
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
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setCareerStatus({
        type: "error",
        message:
          "An error occurred. Please try again or contact us via WhatsApp.",
      });
    } finally {
      setCareerSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-primary/50 bg-transparent focus:outline-none focus:border-primary transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/30";
  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <main className="relative overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-10 mt-6"
          >
            <Link
              href="/working-with-us"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Working With Us
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.p
                variants={fadeInUp}
                className="text-white tracking-[0.3em] uppercase mb-5"
              >
                Collaborate & Grow
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
              >
                Build Something
                <br />
                <span className="italic font-light normal-case">
                  Beautiful Together
                </span>
              </motion.h1>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <motion.p
                variants={fadeInUp}
                className="text-white/80 leading-relaxed border-l border-white/80 pl-6"
              >
                Whether you're a talented vendor seeking a trusted creative
                partner or a passionate individual looking to join our studio —
                we'd love to hear from you.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => setActiveTab("vendor")}
                  className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300"
                >
                  VENDOR PARTNERSHIP
                </button>
                <button
                  onClick={() => setActiveTab("career")}
                  className="border border-white/50 text-white/70 font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300"
                >
                  JOIN OUR TEAM
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Why Work With Us ─────────────────────────────────────────────── */}
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
                Our Studio
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                Rooted in Bali
                <br />
                <span className="italic font-light">Driven by Craft</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-primary mb-6">What We Bring:</p>
              {[
                "A curated network of international couples",
                "High-profile, luxury destination weddings",
                "A creative studio that values excellence",
                "Long-term, meaningful collaborations",
                "Transparent and professional processes",
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
              Linda Wiryani Events is a Bali-based luxury wedding studio
              creating emotionally meaningful, beautifully designed celebrations
              for couples from around the world. Our work is rooted in deep
              creative intention, cultural respect, and an unwavering commitment
              to quality.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              We believe that the best weddings are built through genuine
              collaboration — between our studio, the couple, and the vendors
              and team members who bring each vision to life. Every person who
              works with us becomes part of something larger than a single
              event.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              We are selective. We are intentional. We are looking for people
              who share our standards, our values, and our passion for creating
              experiences that couples will carry with them for the rest of
              their lives.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* ── Vendor Values ────────────────────────────────────────────────── */}
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
              Our Standards
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              What We Look For
              <br />
              <span className="italic font-light">In Every Partner</span>
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

      {/* ── Open Positions Preview ───────────────────────────────────────── */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Join The Team
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold">
            Open Positions
            <br />
            <span className="italic font-light">At Our Studio</span>
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
              <p className="text-primary/80 text-sm leading-relaxed">
                {pos.desc}
              </p>
              <button
                onClick={() => setActiveTab("career")}
                className="inline-block mt-2 text-xs tracking-widest uppercase text-primary border-b border-primary/40 pb-0.5 hover:border-primary hover:cursor-pointer transition-colors duration-300"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Tab Forms Section ────────────────────────────────────────────── */}
      <motion.section
        id="apply"
        className="bg-primary/5 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Tab Switcher */}
          <motion.div variants={fadeInUp} className="mb-14">
            <p className="text-primary tracking-[0.25em] uppercase mb-6">
              Get In Touch
            </p>
            <div className="flex gap-0 border-b border-primary/20">
              {(["vendor", "career"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors hover:cursor-pointer duration-300 border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-primary/40 hover:text-primary/70"
                  }`}
                >
                  {tab === "vendor"
                    ? "Vendor Partnership"
                    : "Career Application"}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Vendor Form ── */}
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
                        Vendor Partnership
                      </p>
                      <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                        Partner
                        <br />
                        <span className="italic font-light">
                          With Our Studio
                        </span>
                      </h2>
                    </div>
                    <p className="text-primary leading-relaxed">
                      We work with a select group of vendors who share our
                      commitment to quality, creativity, and care. If you
                      believe your craft aligns with ours, we'd love to learn
                      more about what you do.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Photography & Videography",
                        "Floral & Décor",
                        "Catering & Entertainment",
                        "Hair, Makeup & Styling",
                        "Venues & Accommodation",
                        "And more…",
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

                  {/* Right – form */}
                  <div className="lg:col-span-8">
                    <form onSubmit={handleVendorSubmit} className="space-y-6">
                      {/* — Company Info — */}
                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          Company Information
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              Company / Studio Name{" "}
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
                              Contact Person{" "}
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
                              Email Address{" "}
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
                              Phone / WhatsApp
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
                          <label className={labelClass}>Website</label>
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

                      {/* — Service Details — */}
                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          Service Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              Vendor Category{" "}
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
                                <option value="">Select a category</option>
                                {vendorCategories.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                <svg
                                  className="w-4 h-4 text-primary/50"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>
                              Years in Business
                            </label>
                            <input
                              type="text"
                              name="yearsInBusiness"
                              placeholder="e.g. 5 years"
                              value={vendorForm.yearsInBusiness}
                              onChange={handleVendorChange}
                              disabled={vendorSubmitting}
                              className={inputClass}
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>
                            Portfolio / Instagram Link
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

                      {/* — Message — */}
                      <div>
                        <p className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-6 border-b border-primary/20 pb-3">
                          Tell Us More
                        </p>
                        <label className={labelClass}>
                          Introduce Yourself & Your Work
                        </label>
                        <p className="text-primary italic mb-3">
                          Share what makes your work distinctive, any notable
                          collaborations, and why you'd like to work with our
                          studio.
                        </p>
                        <textarea
                          name="message"
                          placeholder="Write your introduction here..."
                          value={vendorForm.message}
                          onChange={handleVendorChange}
                          rows={6}
                          disabled={vendorSubmitting}
                          className={`${inputClass} resize-vertical`}
                        />
                      </div>

                      {/* reCAPTCHA */}
                      <div className="flex justify-start">
                        <ReCAPTCHA
                          ref={vendorRecaptchaRef}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={setVendorRecaptcha}
                        />
                      </div>

                      {/* Status */}
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
                        {vendorSubmitting ? "SENDING..." : "SUBMIT APPLICATION"}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Career Form ── */}
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
                        Career
                      </p>
                      <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                        Join
                        <br />
                        <span className="italic font-light">
                          Our Creative Team
                        </span>
                      </h2>
                    </div>
                    <p className="text-primary leading-relaxed">
                      We're a small, dedicated team of creative professionals
                      who care deeply about what we do. If you're passionate
                      about weddings, design, and human connection — we'd love
                      to meet you.
                    </p>

                    <div className="space-y-4">
                      <p className="text-primary mb-4">
                        What we value in our team:
                      </p>
                      {[
                        "A genuine love for the craft",
                        "Attention to detail",
                        "Calm under pressure",
                        "Proactive communication",
                        "Adaptability & warmth",
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

                  {/* Right – form */}
                  <div className="lg:col-span-8">
                    <form onSubmit={handleCareerSubmit} className="space-y-6">
                      {/* — Personal Info — */}
                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          Personal Information
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>
                              Full Name <span className="text-red-500">*</span>
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
                              Email Address{" "}
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
                          <label className={labelClass}>Phone / WhatsApp</label>
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

                      {/* — Role Details — */}
                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          Role & Experience
                        </p>
                        <div>
                          <label className={labelClass}>
                            Position Applying For{" "}
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
                              <option value="">Select a position</option>
                              {openPositions.map((p) => (
                                <option key={p.title} value={p.title}>
                                  {p.title}
                                </option>
                              ))}
                              <option value="Open Application">
                                Open Application (not listed above)
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                              <svg
                                className="w-4 h-4 text-primary/50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <label className={labelClass}>
                            Years of Relevant Experience
                          </label>
                          <input
                            type="text"
                            name="experience"
                            placeholder="e.g. 3 years in wedding planning"
                            value={careerForm.experience}
                            onChange={handleCareerChange}
                            disabled={careerSubmitting}
                            className={inputClass}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className={labelClass}>
                              LinkedIn Profile
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
                              Portfolio / Website
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

                      {/* — Cover Letter — */}
                      <div>
                        <p className="text-primary tracking-[0.2em] uppercase text-xs mb-6 border-b border-primary/20 pb-3">
                          Your Story
                        </p>
                        <label className={labelClass}>
                          Cover Letter / Why You'd Like to Join Us{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-primary/50 text-xs italic mb-3">
                          Tell us about yourself, your background, and what
                          draws you to Linda Wiryani Events specifically.
                        </p>
                        <textarea
                          name="coverLetter"
                          placeholder="Write your cover letter here..."
                          value={careerForm.coverLetter}
                          onChange={handleCareerChange}
                          rows={8}
                          required
                          disabled={careerSubmitting}
                          className={`${inputClass} resize-vertical`}
                        />
                      </div>

                      {/* reCAPTCHA */}
                      <div className="flex justify-start">
                        <ReCAPTCHA
                          ref={careerRecaptchaRef}
                          sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                          }
                          onChange={setCareerRecaptcha}
                        />
                      </div>

                      {/* Status */}
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
                        {careerSubmitting ? "SENDING..." : "SUBMIT APPLICATION"}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773494174/closing-working-with-us_zmmtgo.png"
            alt="Work with us"
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Have Questions?
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Let's Start
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              A Conversation
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Not sure which path is right for you? Reach out directly and let's
            figure it out together.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 transition-colors duration-300">
                INQUIRE NOW
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 transition-colors duration-300">
                VIEW CONTACT
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
