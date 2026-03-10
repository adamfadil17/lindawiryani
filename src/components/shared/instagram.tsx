"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { instagramPosts } from "@/lib/image-src";
import { VideoPlayerModal } from "./video-player-modal";

export default function Instagram() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % instagramPosts.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length
    );

  const handleVideoClick = (index: number, videoUrl: string) => {
    setPlayingVideoId(index);
    setSelectedVideoUrl(videoUrl);
  };

  const handleCloseVideo = () => {
    setPlayingVideoId(null);
    setSelectedVideoUrl("");
  };

  return (
    <motion.section
      id="instagram"
      className="relative py-20 lg:py-28 overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >


      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header — matches page.tsx section headers */}
        <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
          <p className="text-primary tracking-[0.25em] uppercase mb-3">
            Follow Along
          </p>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                Latest Inspirations
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-primary/80 leading-relaxed text-justify">
                Discover what's blooming — our latest Bali wedding moments,
                behind-the-scenes florals, and real celebration stories,
                curated on Instagram.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop Grid — 4 columns, square-ish cards */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-4 gap-4 mb-16"
          variants={staggerContainer}
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative aspect-square overflow-hidden group cursor-pointer"
              onClick={() =>
                post.isVideo &&
                post.videoUrl &&
                handleVideoClick(index, post.videoUrl)
              }
            >
              <Image
                src={post.src || "/placeholder.svg"}
                alt={post.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Video play button — styled like page.tsx nav buttons */}
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 flex items-center justify-center group-hover:bg-white/40 group-hover:border-white/40 transition-all duration-300">
                    {playingVideoId === index ? (
                      <Pause className="w-5 h-5 text-white group-hover:text-white transition-colors" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-white group-hover:text-white transition-colors ml-0.5" fill="currentColor" />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider — matches page.tsx venue slider pattern */}
        <motion.div className="lg:hidden mb-16" variants={fadeInUp}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                onClick={() =>
                  instagramPosts[currentSlide].isVideo &&
                  instagramPosts[currentSlide].videoUrl &&
                  handleVideoClick(
                    currentSlide,
                    instagramPosts[currentSlide].videoUrl!
                  )
                }
              >
                <Image
                  src={instagramPosts[currentSlide].src || "/placeholder.svg"}
                  alt={instagramPosts[currentSlide].alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {instagramPosts[currentSlide].isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/20 border border-white/40 flex items-center justify-center">
                      {playingVideoId === currentSlide ? (
                        <Pause className="w-5 h-5 text-white" fill="currentColor" />
                      ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons — same style as page.tsx venue slider */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:border-primary group"
            >
              <ArrowLeft className="w-4 h-4 text-white group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40  flex items-center justify-center transition-all duration-300 hover:bg-primary hover:border-primary group"
            >
              <ArrowRight className="w-4 h-4 text-white group-hover:text-white transition-colors" />
            </button>

            {/* Dot indicators — same style as page.tsx */}
            <div className="flex justify-center gap-2 mt-4">
              {instagramPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all hover:cursor-pointer ${
                    currentSlide === index
                      ? "bg-primary w-8"
                      : "bg-primary/30 w-2 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Follow Us CTA — styled like page.tsx button row */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-primary/20 pt-12"
        >
          <div>
            <p className="text-primary/80 tracking-[0.25em] uppercase text-sm mb-1">
              Stay Connected
            </p>
            <a
              href="https://instagram.com/lindawiryanievents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl text-primary font-light italic hover:text-primary/70 transition-colors"
            >
              @lindawiryanievents
            </a>
          </div>

          <a
            href="https://instagram.com/lindawiryanievents"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
              FOLLOW ON INSTAGRAM
            </button>
          </a>
        </motion.div>
      </div>

      <VideoPlayerModal
        isOpen={playingVideoId !== null}
        onClose={handleCloseVideo}
        videoUrl={selectedVideoUrl}
      />
    </motion.section>
  );
}