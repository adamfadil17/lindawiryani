"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AboutUsModalProps {
  onClose: () => void;
}

export default function AboutUsModal({ onClose }: AboutUsModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-30 p-2 hover:cursor-pointer bg-white/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div className="overflow-y-auto p-4 md:p-8">
          <article className="flex flex-col gap-8">
            {/* Main Header */}
            <div className="flex flex-col gap-4 border-b border-stone-100 pb-8">
              <span className="text-xs text-primary tracking-widest uppercase font-semibold">
                About The Studio
              </span>
              <h1 className="text-3xl md:text-4xl text-primary font-bold leading-tight">
                About Linda Wiryani Design and Event Planning
              </h1>
              <h2 className="text-xl md:text-2xl text-primary font-bold leading-tight">
                Designing Weddings with Intention, Emotion, and Art
              </h2>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-10">
              {/* Introduction */}
              <div className="flex flex-col gap-4">
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  At Linda Wiryani Design and Event Planning, every celebration
                  begins with a story — yours.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  The studio is a Bali-based wedding planning and design
                  practice, known for artfully designed weddings shaped by
                  architecture, hospitality, and thoughtful storytelling.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  Each celebration is approached as a unique design project
                  "never a template" guided by sensitivity to space, emotion,
                  and human connection.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  Rooted in a design-led philosophy, the work is influenced by
                  architectural balance, refined materiality, and the flow of
                  experience. With nearly two decades of experience in Bali's
                  five-star luxury hospitality industry, every wedding is
                  curated not only to look beautiful, but to feel seamless — for
                  both couples and their guests.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  From the first welcome to the final farewell, each detail is
                  considered with care and intention.
                </p>
              </div>

              {/* Intimate Villa Weddings Section */}
              <div className="bg-stone-50 p-6 md:p-8">
                <h2 className="text-lg md:text-xl text-primary font-bold mb-4 leading-tight">
                  Intimate and Private Villa Weddings in Bali
                </h2>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-4">
                  Rather than repeating concepts, each wedding is curated
                  individually. Every celebration is designed specifically for
                  the couple, shaped by the chosen space and its surroundings,
                  and guided by emotion rather than trends.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  This approach allows the studio to create intimate private
                  villa weddings in Bali that feel personal, calm, and timeless
                  — experiences remembered long after the day has passed.
                </p>
              </div>

              {/* Architecture & Fashion Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-lg md:text-xl text-primary font-bold leading-tight">
                  Where Architecture, Fashion, and Artful Design Meet
                </h2>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  The studio's aesthetic favors clarity over excess, restraint
                  over spectacle, and warmth over performance. Architectural
                  sensibility, refined textures, and subtle details come
                  together to create celebrations that feel intimate and
                  considered.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  As the Creative Director of fashion brand My Lindway, Linda
                  Wiryani brings an artistic sensibility and appreciation for
                  local craftsmanship into each celebration — from bespoke
                  styling to visual storytelling.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  This vision is often enriched through creative collaboration
                  with her architect husband, resulting in weddings that feel
                  cohesive, intentional, and visually timeless.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed italic">
                  Design exists to support emotion — never to overpower it.
                </p>
              </div>

              {/* For Couples Section */}
              <div className="bg-stone-50 p-6 md:p-8">
                <h3 className="text-base md:text-lg text-primary font-bold mb-4 leading-tight">
                  For Couples Who Value Meaning Over Excess
                </h3>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-4">
                  Linda Wiryani Design and Event Planning works with couples who
                  appreciate thoughtful design, subtle luxury, and authentic
                  experiences, those who seek weddings that feel personal,
                  unforced, and deeply connected to their story.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-4">
                  Weddings are moments where people gather, connect, and
                  remember.
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  The role of the studio is to design those moments with care,
                  transforming them into experiences that feel honest, refined,
                  and deeply personal.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
