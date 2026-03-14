"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  MapPin,
  Sparkles,
  Heart,
  BookOpen,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  Clock,
  MailOpen,
  Newspaper,
  Hotel,
} from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Open Inquiries",
    value: "3",
    icon: <MailOpen className="w-4 h-4" />,
    href: "/dashboard/inquiry",
    change: "2 unread",
    up: false,
    urgent: true,
  },
  {
    label: "Destinations",
    value: "12",
    icon: <MapPin className="w-4 h-4" />,
    href: "/dashboard/destinations",
    change: "+2 this month",
    up: true,
  },
  {
    label: "Wedding Themes",
    value: "8",
    icon: <Sparkles className="w-4 h-4" />,
    href: "/dashboard/wedding-themes",
    change: "+1 this month",
    up: true,
  },
  {
    label: "Venue",
    value: "24",
    icon: <Hotel className="w-4 h-4" />,
    href: "/dashboard/wedding-themes",
    change: "+1 this month",
    up: true,
  },
  {
    label: "Journal",
    value: "32",
    icon: <BookOpen className="w-4 h-4" />,
    href: "/dashboard/wedding-themes",
    change: "+3 this month",
    up: true,
  },
  {
    label: "Portfolio",
    value: "64",
    icon: <Newspaper className="w-4 h-4" />,
    href: "/dashboard/portfolio",
    change: "+6 this month",
    up: true,
  },
  
];

const quickLinks = [
  {
    label: "Wedding Experiences",
    desc: "Manage curated experience packages",
    icon: <Heart className="w-5 h-5" />,
    href: "/dashboard/wedding-experiences",
  },
  {
    label: "Journal",
    desc: "Publish stories & inspiration posts",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/dashboard/journal",
  },
  {
    label: "Job & Partnership",
    desc: "Review applications & vendor inquiries",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/dashboard/job-partnership",
  },
];

const recentActivity = [
  {
    action: "New inquiry received",
    detail: "Sarah & James — Bali Destination Wedding",
    time: "2 hours ago",
    type: "inquiry",
  },
  {
    action: "Portfolio updated",
    detail: "Added 4 images to Ubud Forest Wedding",
    time: "Yesterday",
    type: "portfolio",
  },
  {
    action: "Journal post published",
    detail: "The Art of Intimate Ceremonies",
    time: "2 days ago",
    type: "journal",
  },
  {
    action: "Partnership application",
    detail: "New vendor: Bali Blooms Floristry",
    time: "3 days ago",
    type: "partnership",
  },
  {
    action: "New inquiry received",
    detail: "Chen & Mei — Romantic Garden Wedding",
    time: "4 days ago",
    type: "inquiry",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* ── Welcome ───────────────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <p className="text-primary/80 tracking-[0.25em] uppercase text-xs mb-1">
            Good morning
          </p>
          <h2 className="text-2xl md:text-3xl text-primary font-semibold leading-tight">
            Welcome back,{" "}
            <span className="italic font-light">Admin</span>
          </h2>
          <div className="mt-3 w-12 h-px bg-primary/50" />
        </motion.div>

        {/* ── Stats Grid ────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white border border-primary/20 p-5 hover:border-primary/50 transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-primary/5 group-hover:border-r-primary/10 transition-colors" />
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-8 h-8 flex items-center justify-center ${
                    stat.urgent
                      ? "bg-amber-50 text-amber-600"
                      : "bg-primary/10 text-primary/60"
                  }`}
                >
                  {stat.icon}
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary/50 group-hover:text-primary/50 transition-colors" />
              </div>
              <p className="text-3xl font-semibold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-primary/80 tracking-[0.1em] uppercase text-sm mb-3">
                {stat.label}
              </p>
              <div
                className={`flex items-center gap-1 text-sm tracking-wide ${
                  stat.urgent
                    ? "text-amber-500"
                    : stat.up
                    ? "text-green-600"
                    : "text-primary/40"
                }`}
              >
                {stat.up && !stat.urgent && <TrendingUp className="w-3 h-3" />}
                <span>{stat.change}</span>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* ── Bottom Grid ───────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-3">
            <p className="text-primary tracking-[0.2em] uppercase text-sm border-b border-primary/20 pb-3">
              Quick Access
            </p>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-4 p-4 bg-white border border-primary/20 hover:border-primary/50 hover:bg-primary/[0.02] transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-primary/10 flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:text-white transition-all duration-200 flex-shrink-0">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-primary text-sm font-medium tracking-[0.1em] uppercase">
                    {link.label}
                  </p>
                  <p className="text-primary/80 text-xs mt-0.5 truncate">
                    {link.desc}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary/50 group-hover:text-primary/50 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="bg-white border border-primary/20 h-full">
              <div className="px-6 py-4 border-b border-primary/20 flex items-center justify-between">
                <p className="text-primary tracking-[0.2em] uppercase text-sm">
                  Recent Activity
                </p>
                <span className="text-primary/80 text-xs tracking-wider uppercase">
                  Last 7 days
                </span>
              </div>
              <ul className="divide-y divide-primary/10">
                {recentActivity.map((item, i) => (
                  <li
                    key={i}
                    className="px-6 py-4 flex items-start gap-4 hover:bg-primary/[0.02] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/80 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-primary text-sm font-medium tracking-wide">
                        {item.action}
                      </p>
                      <p className="text-primary/80 text-xs mt-0.5 truncate">
                        {item.detail}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-primary/80 text-xs tracking-wide flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Footer note ───────────────────────────────────────────────── */}
        <motion.div variants={fadeInUp}>
          <p className="text-primary/20 text-[10px] tracking-widest uppercase text-center">
            Linda Wiryani Events — Studio Portal
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}