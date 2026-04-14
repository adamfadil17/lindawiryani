"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  inquirySubmissionFormSchema,
  type InquirySubmissionFormData,
} from "@/utils/form-validators";

export default function ContactPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquirySubmissionFormData>({
    resolver: zodResolver(inquirySubmissionFormSchema),
    defaultValues: {
      your_name: "",
      your_email: "",
      your_address: "",
      telephone: "",
      name_of_groom: "",
      religion_of_groom: "",
      nationality_of_groom: "",
      name_of_bride: "",
      religion_of_bride: "",
      nationality_of_bride: "",
      wedding_date: "",
      wedding_venue: "",
      number_of_attendance: "",
      approximate_wedding_budget: "",
      hotel_name_in_bali: "",
      arrival_date: "",
      departure_date: "",
      your_message: "",
    },
  });

  /**
   * Submit inquiry:
   * 1. POST /api/inquiries  → simpan ke database (public, no auth)
   * 2. POST /api/send-email/contact  → kirim notifikasi email
   * Email gagal tidak membatalkan submission — data sudah aman di database.
   */
  const onSubmit = async (data: InquirySubmissionFormData) => {
    if (!recaptchaToken) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    setSubmitStatus({ type: null, message: "" });

    try {
      await axios.post("/api/inquiries", data);

      try {
        await fetch("/api/send-email/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, recaptchaToken }),
        });
      } catch {}

      setSubmitStatus({
        type: "success",
        message:
          "Thank you for your inquiry! We'll get back to you within 24-48 hours.",
      });
      reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to send your inquiry. Please try again or contact us directly.";
      setSubmitStatus({ type: "error", message: msg });
    }
  };

  const inputBase =
    "w-full px-4 py-3 border bg-transparent focus:outline-none transition-colors disabled:bg-primary/5 text-primary placeholder:text-primary/30";
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? "border-red-400 focus:border-red-500" : "border-primary/50 focus:border-primary"}`;
  const labelClass =
    "block text-primary tracking-[0.15em] uppercase text-xs mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773709789/singaraja_mt8hqt.png"
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

      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
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
                      className="text-primary hover:text-primary/70 transition-colors"
                    >
                      {item.label}
                    </a>
                  </div>
                ))}
              </motion.div>
            </div>

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

              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                        {...register("your_name")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.your_name)}
                      />
                      {errors.your_name && (
                        <p className={errorClass}>{errors.your_name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("your_email")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.your_email)}
                      />
                      {errors.your_email && (
                        <p className={errorClass}>
                          {errors.your_email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className={labelClass}>
                        Your Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("your_address")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.your_address)}
                      />
                      {errors.your_address && (
                        <p className={errorClass}>
                          {errors.your_address.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Telephone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register("telephone")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.telephone)}
                      />
                      {errors.telephone && (
                        <p className={errorClass}>{errors.telephone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Groom Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>
                        Name of Groom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name_of_groom")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.name_of_groom)}
                      />
                      {errors.name_of_groom && (
                        <p className={errorClass}>
                          {errors.name_of_groom.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Religion of Groom{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("religion_of_groom")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.religion_of_groom)}
                      />
                      {errors.religion_of_groom && (
                        <p className={errorClass}>
                          {errors.religion_of_groom.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nationality of Groom{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("nationality_of_groom")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.nationality_of_groom)}
                      />
                      {errors.nationality_of_groom && (
                        <p className={errorClass}>
                          {errors.nationality_of_groom.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Bride Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>
                        Name of Bride <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("name_of_bride")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.name_of_bride)}
                      />
                      {errors.name_of_bride && (
                        <p className={errorClass}>
                          {errors.name_of_bride.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Religion of Bride{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("religion_of_bride")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.religion_of_bride)}
                      />
                      {errors.religion_of_bride && (
                        <p className={errorClass}>
                          {errors.religion_of_bride.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nationality of Bride{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("nationality_of_bride")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.nationality_of_bride)}
                      />
                      {errors.nationality_of_bride && (
                        <p className={errorClass}>
                          {errors.nationality_of_bride.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Wedding Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>
                        Wedding Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("wedding_date")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.wedding_date)}
                      />
                      {errors.wedding_date && (
                        <p className={errorClass}>
                          {errors.wedding_date.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Wedding Venue <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("wedding_venue")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.wedding_venue)}
                      />
                      {errors.wedding_venue && (
                        <p className={errorClass}>
                          {errors.wedding_venue.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className={labelClass}>
                        Number of Attendance{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Including Bride & Groom"
                        {...register("number_of_attendance")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.number_of_attendance)}
                      />
                      {errors.number_of_attendance && (
                        <p className={errorClass}>
                          {errors.number_of_attendance.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Approximate Wedding Budget{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Including Currency"
                        {...register("approximate_wedding_budget")}
                        disabled={isSubmitting}
                        className={inputClass(
                          !!errors.approximate_wedding_budget,
                        )}
                      />
                      {errors.approximate_wedding_budget && (
                        <p className={errorClass}>
                          {errors.approximate_wedding_budget.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Accommodation & Travel
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>
                        Hotel Name in Bali{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("hotel_name_in_bali")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.hotel_name_in_bali)}
                      />
                      {errors.hotel_name_in_bali && (
                        <p className={errorClass}>
                          {errors.hotel_name_in_bali.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Arrival Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("arrival_date")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.arrival_date)}
                      />
                      {errors.arrival_date && (
                        <p className={errorClass}>
                          {errors.arrival_date.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Departure Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        {...register("departure_date")}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.departure_date)}
                      />
                      {errors.departure_date && (
                        <p className={errorClass}>
                          {errors.departure_date.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-6 border-b border-primary/20 pb-3">
                    Your Vision
                  </p>
                  <label className={labelClass}>
                    Share your story and the vision for your celebration{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-primary text-sm italic mb-3">
                    This helps us understand your vision and prepare a
                    thoughtful response.
                  </p>
                  <textarea
                    placeholder="Write your story and the vision for your celebration here..."
                    {...register("your_message")}
                    rows={6}
                    disabled={isSubmitting}
                    className={`${inputClass(!!errors.your_message)} resize-vertical`}
                  />
                  {errors.your_message && (
                    <p className={errorClass}>{errors.your_message.message}</p>
                  )}
                </div>

                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={setRecaptchaToken}
                  />
                </div>

                {submitStatus.type === "error" &&
                  submitStatus.message.includes("reCAPTCHA") && (
                    <p className={errorClass}>{submitStatus.message}</p>
                  )}

                {submitStatus.type &&
                  !submitStatus.message.includes("reCAPTCHA") && (
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

      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1775311292/Lake_Buyan_bt7cbw.png"
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
