"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useReviews } from "@/hook/useReviews";
import type { ReviewItem } from "@/hook/useReviews";

interface Props {
  initialReviews?: ReviewItem[];
}

const DESKTOP_CARDS = 3;

export function ReviewsSection({ initialReviews }: Props) {
  const { reviews, isLoading } = useReviews(initialReviews);
  const [reviewSlide, setReviewSlide] = useState(0);

  const maxSlide = Math.max(0, reviews.length - DESKTOP_CARDS);

  if (isLoading || reviews.length === 0) return null;

  return (
    <motion.section
      className="py-20 lg:py-28 bg-primary/15"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Kind Words
          </p>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                What our couples
                <br />
                <span className="italic font-light">share with us</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-primary/80 leading-relaxed text-justify">
                Our couples often speak not only about how their wedding looked,
                but how it felt — calm, meaningful, effortless, personal, and
                unforgettable are words that appear again and again in their
                reflections.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="hidden lg:block overflow-hidden"
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${reviewSlide * (100 / 3)}% - ${reviewSlide * 8}px)`,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="lg:hidden overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-primary/10 p-8 flex flex-col justify-between"
            >
              <QuoteContent text={reviews[reviewSlide].review} />
              <ReviewMeta
                couple={reviews[reviewSlide].couple}
                origin={reviews[reviewSlide].origin}
                muted
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all hover:cursor-pointer ${
                  reviewSlide === i
                    ? "bg-primary w-8"
                    : "bg-primary/30 w-2 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setReviewSlide((p) => Math.max(p - 1, 0))}
              disabled={reviewSlide === 0}
              aria-label="Previous review"
              className="w-10 h-10 border border-primary/40 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => setReviewSlide((p) => Math.min(p + 1, maxSlide))}
              disabled={reviewSlide >= maxSlide}
              aria-label="Next review"
              className="w-10 h-10 border border-primary/40 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="min-w-[calc(33.333%-11px)] bg-white border border-primary/10 p-8 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300">
      <QuoteContent text={review.review} />
      <ReviewMeta couple={review.couple} origin={review.origin} />
    </div>
  );
}

function QuoteContent({ text }: { text: string }) {
  return (
    <div>
      <span className="text-5xl text-primary/20 font-serif leading-none select-none">
        "
      </span>
      <p className="text-primary leading-relaxed italic mt-2 text-justify">
        {text}
      </p>
    </div>
  );
}

function ReviewMeta({
  couple,
  origin,
  muted = false,
}: {
  couple: string;
  origin: string;
  muted?: boolean;
}) {
  return (
    <div className="mt-8 pt-6 border-t border-primary/10">
      <p className="text-primary font-semibold text-sm tracking-wide">
        {couple}
      </p>
      <p
        className={`text-xs tracking-widest uppercase mt-1 ${
          muted ? "text-primary/50" : "text-primary/80"
        }`}
      >
        {origin}
      </p>
    </div>
  );
}
