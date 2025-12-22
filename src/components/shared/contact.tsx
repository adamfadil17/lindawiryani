"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion"
;("lucide-react")

export default function Contact() {
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
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

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
              <h3 className="text-xl md:text-2xl font-semibold text-primary italic">KEEP IN TOUCH</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Image src="/images/email-brown.svg" alt="Email" width={24} height={24} />
                  <a
                    href="mailto: lindawiryanievents@gmail.com"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                  >
                    lindawiryanievents@gmail.com
                  </a>
                </div>

                {/* Instagram */}
                <div className="flex items-center space-x-3">
                  <Image src="/images/instagram-brown.svg" alt="Instagram" width={24} height={24} />
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
                  <Image src="/images/whatsapp-brown.svg" alt="WhatsApp" width={24} height={24} />
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
                  <Image src="/images/pinterest-line-brown.svg" alt="Pinterest" width={24} height={24} />
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
              <p className="text-2xl text-primary tracking-wider italic font-semibold">CONTACT US</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold max-w-4xl mx-auto leading-tight">
                Your Story. Your Style. Let's Design Your Dream Bali Wedding.
              </h2>
            </motion.div>

            {/* Contact Form - RESTRUCTURED to match the enquiry form */}
            <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-6">
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                />
              </div>

              {/* Telephone - REMOVED country code dropdown */}
              <div className="space-y-2">
                <label className="text-primary text-md">Telephone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Religion of Groom</label>
                  <input
                    type="text"
                    name="religionOfGroom"
                    value={formData.religionOfGroom}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Nationality of Groom */}
              <div className="space-y-2">
                <label className="text-primary text-md">Nationality of Groom</label>
                <input
                  type="text"
                  name="nationalityOfGroom"
                  value={formData.nationalityOfGroom}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Religion of Bride</label>
                  <input
                    type="text"
                    name="religionOfBride"
                    value={formData.religionOfBride}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Nationality of Bride */}
              <div className="space-y-2">
                <label className="text-primary text-md">Nationality of Bride</label>
                <input
                  type="text"
                  name="nationalityOfBride"
                  value={formData.nationalityOfBride}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Wedding Venue</label>
                  <input
                    type="text"
                    name="weddingVenue"
                    value={formData.weddingVenue}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Number of Attendance */}
              <div className="space-y-2">
                <label className="text-primary text-md">Number of Attendance</label>
                <input
                  type="text"
                  name="numberOfAttendance"
                  placeholder="Including Bride & Groom"
                  value={formData.numberOfAttendance}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                />
              </div>

              {/* Approximate wedding budget */}
              <div className="space-y-2">
                <label className="text-primary text-md">Approximate wedding budget</label>
                <input
                  type="text"
                  name="approximateWeddingBudget"
                  placeholder="Including Currency"
                  value={formData.approximateWeddingBudget}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                />
              </div>

              {/* Hotel Name in Bali */}
              <div className="space-y-2">
                <label className="text-primary text-md">Hotel Name in Bali</label>
                <input
                  type="text"
                  name="hotelNameInBali"
                  value={formData.hotelNameInBali}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
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
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary text-md">Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-3 border border-primary rounded-none focus:outline-none focus:border-primary/80 transition-colors"
                  />
                </div>
              </div>

              {/* Additional Information - CHANGED label as requested */}
              <div className="space-y-2">
                <label className="text-primary text-md">Additional Information</label>
                <textarea
                  name="yourMessage"
                  placeholder="Introduce yourself and briefly describe your wedding"
                  value={formData.yourMessage}
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
  )
}
