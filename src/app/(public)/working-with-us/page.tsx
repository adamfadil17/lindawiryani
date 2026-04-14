"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { vendorCategories, vendorValues } from "@/lib/data/working-with-us";
import {
  vendorSubmissionFormSchema,
  careerSubmissionFormSchema,
  type VendorSubmissionFormData,
  type CareerSubmissionFormData,
} from "@/utils/form-validators";

type Tab = "vendor" | "career";

interface OpenPosition {
  id: string;
  title: string;
  type: string;
  level: string;
  desc: string;
  is_active: boolean;
  created_at: string;
}

type StatusState = { type: "success" | "error" | null; message: string };

export default function WorkingWithUsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("vendor");

  const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);
  const [positionsLoading, setPositionsLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("/api/open-positions", {
          params: { limit: 100, isActive: "true" },
        });
        const data: OpenPosition[] = response.data.data ?? [];
        setOpenPositions(data);
      } catch (err) {
        console.error("Failed to load open positions:", err);
      } finally {
        setPositionsLoading(false);
      }
    };
    fetchPositions();
  }, []);

  const vendorRecaptchaRef = useRef<ReCAPTCHA>(null);
  const [vendorRecaptcha, setVendorRecaptcha] = useState<string | null>(null);
  const [vendorStatus, setVendorStatus] = useState<StatusState>({
    type: null,
    message: "",
  });

  const {
    register: registerVendor,
    handleSubmit: handleSubmitVendor,
    reset: resetVendor,
    formState: { errors: vendorErrors, isSubmitting: vendorSubmitting },
  } = useForm<VendorSubmissionFormData>({
    resolver: zodResolver(vendorSubmissionFormSchema),
    defaultValues: {
      type: "vendor",
      company_name: "",
      contact_person: "",
      email: "",
      phone: "",
      website: "",
      vendor_category: "",
      years_in_business: "",
      portfolio_link: "",
      message: "",
    },
  });

  const careerRecaptchaRef = useRef<ReCAPTCHA>(null);
  const [careerRecaptcha, setCareerRecaptcha] = useState<string | null>(null);
  const [careerStatus, setCareerStatus] = useState<StatusState>({
    type: null,
    message: "",
  });

  const {
    register: registerCareer,
    handleSubmit: handleSubmitCareer,
    reset: resetCareer,
    formState: { errors: careerErrors, isSubmitting: careerSubmitting },
  } = useForm<CareerSubmissionFormData>({
    resolver: zodResolver(careerSubmissionFormSchema),
    defaultValues: {
      type: "career",
      full_name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linked_in: "",
      cover_letter: "",
    },
  });

  const inputBase =
    "w-full px-4 py-3 border bg-transparent focus:outline-none transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/30";
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? "border-red-400 focus:border-red-500" : "border-primary/50 focus:border-primary"}`;
  const selectClass = (hasError: boolean) =>
    `${inputClass(hasError)} appearance-none cursor-pointer`;
  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

  /**
   * Submit vendor:
   * 1. POST /api/submissions  → simpan ke database (public, no auth)
   * 2. POST /api/send-email/working-with-us/vendor-inquiry  → kirim notif email
   * Data dari RHF sudah snake_case sesuai schema, langsung dikirim tanpa mapping.
   * Email gagal tidak membatalkan submission — data sudah aman di database.
   */
  const onVendorSubmit = async (data: VendorSubmissionFormData) => {
    if (!vendorRecaptcha) {
      setVendorStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setVendorStatus({ type: null, message: "" });

    try {
      await axios.post("/api/submissions", data);

      try {
        await fetch("/api/send-email/working-with-us/vendor-inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken: vendorRecaptcha }),
        });
      } catch {}

      setVendorStatus({
        type: "success",
        message:
          "Thank you! We'll review your application and be in touch within 5–7 business days.",
      });
      resetVendor();
      vendorRecaptchaRef.current?.reset();
      setVendorRecaptcha(null);
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong. Please try again.";
      setVendorStatus({ type: "error", message: msg });
    }
  };

  /**
   * Submit career:
   * 1. POST /api/submissions  → simpan ke database (public, no auth)
   * 2. POST /api/send-email/working-with-us/career-application  → kirim notif email
   * Data dari RHF sudah snake_case sesuai schema, langsung dikirim tanpa mapping.
   * Email gagal tidak membatalkan submission — data sudah aman di database.
   */
  const onCareerSubmit = async (data: CareerSubmissionFormData) => {
    if (!careerRecaptcha) {
      setCareerStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setCareerStatus({ type: null, message: "" });

    try {
      await axios.post("/api/submissions", data);

      try {
        await fetch("/api/send-email/working-with-us/career-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken: careerRecaptcha }),
        });
      } catch {}

      setCareerStatus({
        type: "success",
        message:
          "Application received. We'll review your profile carefully and reach out if there's a fit.",
      });
      resetCareer();
      careerRecaptchaRef.current?.reset();
      setCareerRecaptcha(null);
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "An error occurred. Please try again or contact us via WhatsApp.";
      setCareerStatus({ type: "error", message: msg });
    }
  };

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
                Why Work
                <br />
                <span className="italic font-light">With Linda Wiryani</span>
              </h2>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed"
            >
              We believe in building lasting relationships — with our couples,
              our team, and our creative partners. When you work with us, you
              become part of something that truly matters.
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            {vendorValues.map(
              (item: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="flex gap-6 pb-8 border-b border-primary/20 last:border-0 last:pb-0 mb-8 last:mb-0"
                >
                  <span className="text-primary font-mono w-8 flex-shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary/70 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
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
            Join The Team
          </p>
          <h2 className="text-3xl md:text-4xl text-primary font-semibold">
            Open Positions
            <br />
            <span className="italic font-light">At Our Studio</span>
          </h2>
        </motion.div>

        {positionsLoading && (
          <div className="grid md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="border border-primary/10 p-8 space-y-4">
                <div className="h-4 w-24 bg-primary/10 rounded" />
                <div className="h-6 w-48 bg-primary/10 rounded" />
                <div className="h-4 w-full bg-primary/10 rounded" />
                <div className="h-4 w-3/4 bg-primary/10 rounded" />
              </div>
            ))}
          </div>
        )}

        {!positionsLoading && openPositions.length === 0 && (
          <motion.div
            variants={fadeInUp}
            className="border border-primary/20 p-12 text-center"
          >
            <p className="text-primary/50 text-sm tracking-widest uppercase mb-2">
              No open positions at this time
            </p>
            <p className="text-primary/70 text-sm">
              We're not actively hiring, but we're always open to{" "}
              <button
                onClick={() => setActiveTab("career")}
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                open applications
              </button>
              .
            </p>
          </motion.div>
        )}

        {!positionsLoading && openPositions.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((pos, i) => (
              <motion.div
                key={pos.id}
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
        )}
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

                  <div className="lg:col-span-8">
                    <form
                      onSubmit={handleSubmitVendor(onVendorSubmit)}
                      className="space-y-6"
                    >
                      <input type="hidden" {...registerVendor("type")} />

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
                              {...registerVendor("company_name")}
                              disabled={vendorSubmitting}
                              className={inputClass(
                                !!vendorErrors.company_name,
                              )}
                            />
                            {vendorErrors.company_name && (
                              <p className={errorClass}>
                                {vendorErrors.company_name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>
                              Contact Person{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...registerVendor("contact_person")}
                              disabled={vendorSubmitting}
                              className={inputClass(
                                !!vendorErrors.contact_person,
                              )}
                            />
                            {vendorErrors.contact_person && (
                              <p className={errorClass}>
                                {vendorErrors.contact_person.message}
                              </p>
                            )}
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
                              {...registerVendor("email")}
                              disabled={vendorSubmitting}
                              className={inputClass(!!vendorErrors.email)}
                            />
                            {vendorErrors.email && (
                              <p className={errorClass}>
                                {vendorErrors.email.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>
                              Phone / WhatsApp
                            </label>
                            <input
                              type="tel"
                              {...registerVendor("phone")}
                              disabled={vendorSubmitting}
                              className={inputClass(!!vendorErrors.phone)}
                            />
                            {vendorErrors.phone && (
                              <p className={errorClass}>
                                {vendorErrors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className={labelClass}>Website</label>
                          <input
                            type="url"
                            placeholder="https://"
                            {...registerVendor("website")}
                            disabled={vendorSubmitting}
                            className={inputClass(!!vendorErrors.website)}
                          />
                          {vendorErrors.website && (
                            <p className={errorClass}>
                              {vendorErrors.website.message}
                            </p>
                          )}
                        </div>
                      </div>

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
                                {...registerVendor("vendor_category")}
                                disabled={vendorSubmitting}
                                className={selectClass(
                                  !!vendorErrors.vendor_category,
                                )}
                              >
                                <option value="">Select a category</option>
                                {vendorCategories.map((cat: string) => (
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
                            {vendorErrors.vendor_category && (
                              <p className={errorClass}>
                                {vendorErrors.vendor_category.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>
                              Years in Business
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 5 years"
                              {...registerVendor("years_in_business")}
                              disabled={vendorSubmitting}
                              className={inputClass(
                                !!vendorErrors.years_in_business,
                              )}
                            />
                            {vendorErrors.years_in_business && (
                              <p className={errorClass}>
                                {vendorErrors.years_in_business.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className={labelClass}>
                            Portfolio / Instagram Link
                          </label>
                          <input
                            type="url"
                            placeholder="https://"
                            {...registerVendor("portfolio_link")}
                            disabled={vendorSubmitting}
                            className={inputClass(
                              !!vendorErrors.portfolio_link,
                            )}
                          />
                          {vendorErrors.portfolio_link && (
                            <p className={errorClass}>
                              {vendorErrors.portfolio_link.message}
                            </p>
                          )}
                        </div>
                      </div>

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
                          placeholder="Write your introduction here..."
                          {...registerVendor("message")}
                          rows={6}
                          disabled={vendorSubmitting}
                          className={`${inputClass(!!vendorErrors.message)} resize-vertical`}
                        />
                        {vendorErrors.message && (
                          <p className={errorClass}>
                            {vendorErrors.message.message}
                          </p>
                        )}
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

                      {vendorStatus.type === "error" &&
                        vendorStatus.message.includes("reCAPTCHA") && (
                          <p className={errorClass}>{vendorStatus.message}</p>
                        )}

                      {vendorStatus.type &&
                        !vendorStatus.message.includes("reCAPTCHA") && (
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

            {activeTab === "career" && (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
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

                  <div className="lg:col-span-8">
                    <form
                      onSubmit={handleSubmitCareer(onCareerSubmit)}
                      className="space-y-6"
                    >
                      <input type="hidden" {...registerCareer("type")} />

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
                              {...registerCareer("full_name")}
                              disabled={careerSubmitting}
                              className={inputClass(!!careerErrors.full_name)}
                            />
                            {careerErrors.full_name && (
                              <p className={errorClass}>
                                {careerErrors.full_name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              {...registerCareer("email")}
                              disabled={careerSubmitting}
                              className={inputClass(!!careerErrors.email)}
                            />
                            {careerErrors.email && (
                              <p className={errorClass}>
                                {careerErrors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className={labelClass}>Phone / WhatsApp</label>
                          <input
                            type="tel"
                            {...registerCareer("phone")}
                            disabled={careerSubmitting}
                            className={inputClass(!!careerErrors.phone)}
                          />
                          {careerErrors.phone && (
                            <p className={errorClass}>
                              {careerErrors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

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
                              {...registerCareer("position")}
                              disabled={careerSubmitting}
                              className={selectClass(!!careerErrors.position)}
                            >
                              <option value="">Select a position</option>

                              {openPositions.map((p) => (
                                <option key={p.id} value={p.title}>
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
                          {careerErrors.position && (
                            <p className={errorClass}>
                              {careerErrors.position.message}
                            </p>
                          )}
                        </div>

                        <div className="mt-6">
                          <label className={labelClass}>
                            Years of Relevant Experience
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 3 years in wedding planning"
                            {...registerCareer("experience")}
                            disabled={careerSubmitting}
                            className={inputClass(!!careerErrors.experience)}
                          />
                          {careerErrors.experience && (
                            <p className={errorClass}>
                              {careerErrors.experience.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className={labelClass}>
                              LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/"
                              {...registerCareer("linked_in")}
                              disabled={careerSubmitting}
                              className={inputClass(!!careerErrors.linked_in)}
                            />
                            {careerErrors.linked_in && (
                              <p className={errorClass}>
                                {careerErrors.linked_in.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className={labelClass}>
                              Portfolio / Website
                            </label>
                          </div>
                        </div>
                      </div>

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
                          placeholder="Write your cover letter here..."
                          {...registerCareer("cover_letter")}
                          rows={8}
                          disabled={careerSubmitting}
                          className={`${inputClass(!!careerErrors.cover_letter)} resize-vertical`}
                        />
                        {careerErrors.cover_letter && (
                          <p className={errorClass}>
                            {careerErrors.cover_letter.message}
                          </p>
                        )}
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

                      {careerStatus.type === "error" &&
                        careerStatus.message.includes("reCAPTCHA") && (
                          <p className={errorClass}>{careerStatus.message}</p>
                        )}

                      {careerStatus.type &&
                        !careerStatus.message.includes("reCAPTCHA") && (
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
