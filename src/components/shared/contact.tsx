"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

export default function Contact() {
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
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi reCAPTCHA
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you for your inquiry! We'll get back to you within 24-48 hours.",
        });
        // Reset form
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
        // Reset reCAPTCHA
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
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred. Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pb-16 lg:pb-24 relative">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Image and Contact Info */}
          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            variants={staggerContainer}
          >
            {/* Wedding Photo */}
            <motion.div
              variants={fadeIn}
              className="relative aspect-[4/5] overflow-hidden rounded-lg rounded-t-[3000px]"
            >
              <Image
                src="/images/contact/contact1.png"
                alt="Happy wedding couple with bouquet"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Keep In Touch Section */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-primary italic">
                KEEP IN TOUCH
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-4">
                {/* Email */}
                <div className="flex items-center space-x-3 min-w-0">
                  <Image
                    src="/images/email-brown.svg"
                    alt="Email"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <a
                    href="mailto:lindawiryanievents@gmail.com"
                    className="text-primary text-base md:text-lg hover:text-primary/80 transition-colors break-words sm:break-normal"
                  >
                    lindawiryanievents@gmail.com
                  </a>
                </div>

                {/* Instagram */}
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/instagram-brown.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <a
                    href="https://instagram.com/lindawiryanievents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                  >
                    @lindawiryanievents
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/whatsapp-brown.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <a
                    href="https://wa.me/628113980998"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                  >
                    +62 811 3980 998
                  </a>
                </div>

                {/* Pinterest */}
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/pinterest-line-brown.svg"
                    alt="Pinterest"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <a
                    href="https://pinterest.com/lindawiryanievents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                  >
                    lindawiryanievents
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h2 className="text-2xl text-primary tracking-wider italic font-semibold">
                CONTACT US
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold max-w-4xl mx-auto leading-tight">
                Your Story. Your Style. Let's Design Your Dream Bali Wedding.
              </h3>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Your Name and Your Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Your Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="yourEmail"
                    value={formData.yourEmail}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Your Address */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Your Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="yourAddress"
                  value={formData.yourAddress}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Telephone */}
              <div className="space-y-2">
                <label className="text-primary text-md">Telephone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Name of Groom and Religion of Groom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">Name of Groom</label>
                  <input
                    type="text"
                    name="nameOfGroom"
                    value={formData.nameOfGroom}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Religion of Groom
                  </label>
                  <input
                    type="text"
                    name="religionOfGroom"
                    value={formData.religionOfGroom}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Nationality of Groom */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Nationality of Groom
                </label>
                <input
                  type="text"
                  name="nationalityOfGroom"
                  value={formData.nationalityOfGroom}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Name of Bride and Religion of Bride */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">Name of Bride</label>
                  <input
                    type="text"
                    name="nameOfBride"
                    value={formData.nameOfBride}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Religion of Bride
                  </label>
                  <input
                    type="text"
                    name="religionOfBride"
                    value={formData.religionOfBride}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Nationality of Bride */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Nationality of Bride
                </label>
                <input
                  type="text"
                  name="nationalityOfBride"
                  value={formData.nationalityOfBride}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Wedding Date and Wedding Venue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">Wedding Date</label>
                  <input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Wedding Venue</label>
                  <input
                    type="text"
                    name="weddingVenue"
                    value={formData.weddingVenue}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Number of Attendance */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Number of Attendance
                </label>
                <input
                  type="text"
                  name="numberOfAttendance"
                  placeholder="Including Bride & Groom"
                  value={formData.numberOfAttendance}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Approximate wedding budget */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Approximate wedding budget
                </label>
                <input
                  type="text"
                  name="approximateWeddingBudget"
                  placeholder="Including Currency"
                  value={formData.approximateWeddingBudget}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Hotel Name in Bali */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Hotel Name in Bali
                </label>
                <input
                  type="text"
                  name="hotelNameInBali"
                  value={formData.hotelNameInBali}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Arrival Date and Departure Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">Arrival Date</label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Share your story and the vision for your celebration
                </label>
                <p className="text-primary/80 text-sm italic mt-1 mb-2">
                  This helps us understand your vision and prepare a thoughtful
                  response.
                </p>
                <textarea
                  name="yourMessage"
                  placeholder="Write your story and the vision for your celebration here..."
                  value={formData.yourMessage}
                  onChange={handleInputChange}
                  rows={6}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors resize-vertical disabled:bg-gray-100"
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
                  className={`p-4 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
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
    </section>
  );
}
