"use client";

import { useTranslations } from "next-intl";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface AboutUsModalProps {
  onClose: () => void;
}

export default function AboutUsModal({ onClose }: AboutUsModalProps) {
  const t = useTranslations("aboutModal");
  const tc = useTranslations("common");
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
          aria-label={tc("closeModal")}
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div className="overflow-y-auto p-4 md:p-8">
          <article className="flex flex-col gap-8">
            {/* Main Header */}
            <div className="flex flex-col gap-4 border-b border-stone-100 pb-8">
              <span className="text-xs text-primary tracking-widest uppercase font-semibold">
                {t("kicker")}
              </span>
              <span className="text-3xl md:text-4xl text-primary font-bold leading-tight">
                {t("title")}
              </span>
              <span className="text-xl md:text-2xl text-primary font-bold leading-tight">
                {t("subtitle")}
              </span>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-10">
              {/* Introduction */}
              <div className="flex flex-col gap-4">
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("intro1")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("intro2")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("intro3")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("intro4")}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-lg md:text-xl text-primary font-bold leading-tight">
                  {t("philosophyTitle")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("philosophy1")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("philosophy2")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("philosophy3")}
                </p>
              </div>

              {/* Intimate Villa Weddings Section */}
              <div className="bg-stone-50 p-6 md:p-8">
                <p className="text-lg md:text-xl text-primary font-bold mb-4 leading-tight">
                  {t("villaTitle")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("villa1")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("villa2")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("villa3")}
                </p>
              </div>

              {/* Architecture & Fashion Section */}
              <div className="flex flex-col gap-4">
                <p className="text-lg md:text-xl text-primary font-bold leading-tight">
                  {t("archTitle")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("arch1")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("arch2")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("arch3")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("arch4")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed italic">
                  {t("arch5")}
                </p>
              </div>

              {/* For Couples Section */}
              <div className="bg-stone-50 p-6 md:p-8">
                <p className="text-base md:text-lg text-primary font-bold mb-4 leading-tight">
                  {t("couplesTitle")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-4">
                  {t("couples1")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-4">
                  {t("couples2")}
                </p>
                <p className="text-sm md:text-base text-primary text-justify leading-relaxed">
                  {t("couples3")}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
