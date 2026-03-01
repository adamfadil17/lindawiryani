"use client";

import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function ContactPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    yourAddress: "",
    telephone: "",
    nameOfGroom: "",
    religionOfGroom: "",
    nationalityOfGroom: "",
    nameOfBride: "",
    religionOfBride: "",
    nationalityOfBride: "",
    weddingDate: "",
    weddingVenue: "",
    numberOfAttendance: "",
    approximateWeddingBudget: "",
    hotelNameInBali: "",
    arrivalDate: "",
    departureDate: "",
    yourMessage: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for your inquiry! We'll get back to you within 24-48 hours.",
        });
        setFormData({
          yourName: "",
          yourEmail: "",
          yourAddress: "",
          telephone: "",
          nameOfGroom: "",
          religionOfGroom: "",
          nationalityOfGroom: "",
          nameOfBride: "",
          religionOfBride: "",
          nationalityOfBride: "",
          weddingDate: "",
          weddingVenue: "",
          numberOfAttendance: "",
          approximateWeddingBudget: "",
          hotelNameInBali: "",
          arrivalDate: "",
          departureDate: "",
          yourMessage: "",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message ||
            "Failed to send your inquiry. Please try again or contact us directly.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred. Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-primary/50 bg-transparent focus:outline-none focus:border-primary transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/30";

  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";

  return (
    <main className="relative overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Contact Linda Wiryani Events"
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
              href="/contact"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Contact
            </Link>
          </motion.div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.p
                variants={fadeInUp}
                className="text-white tracking-[0.3em] uppercase mb-5"
              >
                Begin Your Story
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
              >
                Let Us Design
                <br />
                <span className="italic font-light normal-case">
                  Your Dream Bali Wedding
                </span>
              </motion.h1>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <motion.p
                variants={fadeInUp}
                className="text-white/80 leading-relaxed border-l border-white/80 pl-6"
              >
                Every great wedding begins with a conversation. Share your
                vision with us and let's craft an experience that is entirely,
                beautifully yours.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link href="https://wa.me/628113980998" target="_blank">
                  <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
                    INQUIRE NOW
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Keep In Touch + Form Side by Side ── */}
      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left – Keep In Touch */}
            <div className="lg:col-span-4 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Keep In Touch
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  Reach Us
                  <br />
                  <span className="italic font-light">Anytime, Anywhere</span>
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
                ].map((item, i) => (
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
                      className="text-primary hover:text-primary/70 transition-colors"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right – Form */}
            <motion.div className="lg:col-span-8 space-y-8" variants={fadeInUp}>
              <div className="space-y-4">
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Inquiry Form
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Your Story. Your Style.
                  <br />
                  <span className="italic font-light">
                    Let's Design Your Dream Bali Wedding.
                  </span>
                </h2>
              </div>

              {/* Form */}
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* — Personal Details — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Personal Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="yourName"
                        value={formData.yourName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="yourEmail"
                        value={formData.yourEmail}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className={labelClass}>
                        Your Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="yourAddress"
                        value={formData.yourAddress}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Telephone</label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* — Groom Details — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Groom Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Name of Groom</label>
                      <input
                        type="text"
                        name="nameOfGroom"
                        value={formData.nameOfGroom}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Religion of Groom</label>
                      <input
                        type="text"
                        name="religionOfGroom"
                        value={formData.religionOfGroom}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nationality of Groom</label>
                      <input
                        type="text"
                        name="nationalityOfGroom"
                        value={formData.nationalityOfGroom}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* — Bride Details — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Bride Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Name of Bride</label>
                      <input
                        type="text"
                        name="nameOfBride"
                        value={formData.nameOfBride}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Religion of Bride</label>
                      <input
                        type="text"
                        name="religionOfBride"
                        value={formData.religionOfBride}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nationality of Bride</label>
                      <input
                        type="text"
                        name="nationalityOfBride"
                        value={formData.nationalityOfBride}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* — Wedding Details — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Wedding Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Wedding Date</label>
                      <input
                        type="date"
                        name="weddingDate"
                        value={formData.weddingDate}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Wedding Venue</label>
                      <input
                        type="text"
                        name="weddingVenue"
                        value={formData.weddingVenue}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className={labelClass}>Number of Attendance</label>
                      <input
                        type="text"
                        name="numberOfAttendance"
                        placeholder="Including Bride & Groom"
                        value={formData.numberOfAttendance}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Approximate Wedding Budget
                      </label>
                      <input
                        type="text"
                        name="approximateWeddingBudget"
                        placeholder="Including Currency"
                        value={formData.approximateWeddingBudget}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* — Accommodation & Travel — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Accommodation & Travel
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Hotel Name in Bali</label>
                      <input
                        type="text"
                        name="hotelNameInBali"
                        value={formData.hotelNameInBali}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Arrival Date</label>
                      <input
                        type="date"
                        name="arrivalDate"
                        value={formData.arrivalDate}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Departure Date</label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* — Your Vision — */}
                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Your Vision
                  </p>
                  <label className={labelClass}>
                    Share your story and the vision for your celebration
                  </label>
                  <p className="text-primary text-sm italic mb-3">
                    This helps us understand your vision and prepare a
                    thoughtful response.
                  </p>
                  <textarea
                    name="yourMessage"
                    placeholder="Write your story and the vision for your celebration here..."
                    value={formData.yourMessage}
                    onChange={handleInputChange}
                    rows={6}
                    disabled={isSubmitting}
                    className={`${inputClass} resize-vertical`}
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                  />
                </div>

                {/* Status Message */}
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaToken}
                  className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer disabled:bg-primary/50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "SENDING..." : "SEND INQUIRY"}
                </button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── CTA Section ── */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Your Bali destination wedding"
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
            BEGIN YOUR JOURNEY WITH US
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Reach Us on
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              Our Social Media
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            We're happy to have an initial conversation before you fill out the
            full inquiry form. Reach out and let's begin.
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
