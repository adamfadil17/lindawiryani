"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
("lucide-react");

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+62",
    phone: "",
    inquiryType: "",
    date: "",
    budget: "",
    additionalInfo: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Keep In Touch Section */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-primary italic">
                KEEP IN TOUCH
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/email-brown.svg"
                    alt="Email"
                    width={24}
                    height={24}
                  />
                  <a
                    href="mailto: lindawiryanievents@gmail.com"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
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
              <p className="text-2xl text-primary tracking-wider italic font-semibold">
                CONTACT US
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold max-w-4xl mx-auto leading-tight">
                Your Story. Your Style. Let's Design Your Dream Bali Wedding.
              </h2>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Fields */}
              <div className="space-y-2">
                <label className="text-primary text-md">Name (required)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Email (required)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">
                    Phone (required)
                  </label>
                  <div className="flex mt-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="text-primary px-3 py-3 border border-primary border-r-0 rounded-none focus:outline-none focus:border-primary/80 transition-colors bg-white"
                    >
                      <option value="+62">+62</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="xxx-xxxx-xxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full flex-1 px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Inquiry Type and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary text-md">Inquiry Type</label>
                  <input
                    type="text"
                    name="inquiryType"
                    placeholder="Mention Your Inquiry"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-primary text-md">Budget</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Mention Your Budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="text-primary text-md">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  placeholder="Describe The Information"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={6}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors resize-vertical"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer"
              >
                SEND INQUIRY
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
