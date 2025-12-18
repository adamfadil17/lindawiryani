"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { instagramPosts } from "@/lib/image-src";
import { VideoPlayerModal } from "./video-player-modal";

export default function Instagram() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % instagramPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length
    );
  };

  const handleVideoClick = (index: number, videoUrl: string) => {
    setPlayingVideoId(index);
    setSelectedVideoUrl(videoUrl);
  };

  const handleCloseVideo = () => {
    setPlayingVideoId(null);
    setSelectedVideoUrl("");
  };

  return (
    <section id="instagram" className="bg-white pb-16 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-2xl lg:text-3xl italic text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight">
            Discover What's Blooming — Our Latest Bali Wedding Inspirations on
            Instagram
          </h2>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={staggerContainer}
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative h-[400px] overflow-hidden group cursor-pointer"
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
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="25vw"
              />

              {/* Video Play/Pause Button Overlay */}
              {post.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-primary/70 rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors"
                    animate={playingVideoId === index ? "playing" : "idle"}
                    variants={{
                      idle: { scale: 1 },
                      playing: { scale: 1.1 },
                    }}
                  >
                    {playingVideoId === index ? (
                      <Pause
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                      />
                    )}
                  </motion.div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider */}
        <motion.div
          className="lg:hidden mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={fadeIn}
        >
          <div className="relative">
            {/* Single Image Display */}
            <div
              className="relative h-[400px] overflow-hidden group cursor-pointer"
              onClick={() =>
                instagramPosts[currentSlide].isVideo &&
                instagramPosts[currentSlide].videoUrl &&
                handleVideoClick(
                  currentSlide,
                  instagramPosts[currentSlide].videoUrl
                )
              }
            >
              <Image
                src={instagramPosts[currentSlide].src || "/placeholder.svg"}
                alt={instagramPosts[currentSlide].alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="100vw"
              />

              {/* Video Play/Pause Button Overlay */}
              {instagramPosts[currentSlide].isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-primary/70 rounded-full flex items-center justify-center group-hover:bg-white/90 transition-colors"
                    animate={
                      playingVideoId === currentSlide ? "playing" : "idle"
                    }
                    variants={{
                      idle: { scale: 1 },
                      playing: { scale: 1.1 },
                    }}
                  >
                    {playingVideoId === currentSlide ? (
                      <Pause
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        className="w-6 h-6 text-white ml-1"
                        fill="currentColor"
                      />
                    )}
                  </motion.div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {instagramPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-primary"
                      : "bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Follow Us Section */}
        <motion.div
          className="text-center relative"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
            margin: "0px 0px -100px 0px",
          }}
          variants={staggerContainer}
        >
          {/* Decorative Lines */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex-1 h-px bg-primary max-w-screen"></div>
            <div className="px-8">
              <p className="text-xxl text-primary tracking-wider italic font-semibold">
                FOLLOW US
              </p>
            </div>
            <div className="flex-1 h-px bg-primary max-w-screen"></div>
          </motion.div>

          {/* Instagram Handle */}
          <motion.div variants={fadeInUp} className="mb-8">
            <a
              href="https://instagram.com/lindawiryanievents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-light text-primary hover:cursor-pointer hover:text-primary/80 transition-colors font-serif italic"
            >
              @lindawiryanievents
            </a>
          </motion.div>
        </motion.div>
      </div>

      <VideoPlayerModal
        isOpen={playingVideoId !== null}
        onClose={handleCloseVideo}
        videoUrl={selectedVideoUrl}
      />
    </section>
  );
}
