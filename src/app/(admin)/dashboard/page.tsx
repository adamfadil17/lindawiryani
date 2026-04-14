"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  MapPin,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  MailOpen,
  Newspaper,
  Hotel,
  BookOpen,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import type { DashboardSummary } from "@/app/api/dashboard/route";

const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: +(cx + r * Math.cos(rad)).toFixed(3),
    y: +(cy + r * Math.sin(rad)).toFixed(3),
  };
};
const describeArc = (
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
) => {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
};

function Panel({
  title,
  href,
  badge,
  children,
  loading,
}: {
  title: string;
  href?: string;
  badge?: string;
  children: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="bg-white border border-primary/35 flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-primary/25 flex items-center justify-between shrink-0">
        <p className="text-primary/75 tracking-[0.18em] uppercase text-xs font-semibold">
          {title}
        </p>
        <div className="flex items-center gap-2">
          {loading && (
            <Loader2 className="w-3 h-3 text-primary/40 animate-spin" />
          )}
          {href ? (
            <Link
              href={href}
              className="text-primary/55 hover:text-primary/85 transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : badge ? (
            <span className="text-primary/60 text-xs tracking-widest uppercase">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="px-5 py-4 flex-1 flex flex-col">{children}</div>
    </div>
  );
}

const INQUIRY_STYLES: Record<
  string,
  { fill: string; stroke: string; label: string }
> = {
  new: { fill: "#EFF6FF", stroke: "#3B82F6", label: "#1D4ED8" },
  reviewed: { fill: "#F0FDF4", stroke: "#22C55E", label: "#15803D" },
  quoted: { fill: "#FFFBEB", stroke: "#F59E0B", label: "#B45309" },
  booked: { fill: "#FAF5FF", stroke: "#A855F7", label: "#7E22CE" },
  archived: { fill: "#F9FAFB", stroke: "#9CA3AF", label: "#6B7280" },
};

const CATEGORY_LABELS: Record<string, string> = {
  Real_Weddings: "Real Weddings",
  Guides: "Guides",
  Planning_Advice: "Planning Advice",
  Venue_and_Location: "Venue & Location",
  Design_and_Concept: "Design & Concept",
  Destination_Knowledge: "Destination Knowledge",
};

const EXP_COLORS = ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    axios
      .get<{ data: DashboardSummary }>("/api/dashboard")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error("Dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const inquiryFunnel = (data?.inquiryFunnel ?? []).map((step) => ({
    ...step,
    ...INQUIRY_STYLES[step.status],
  }));

  const {
    vendor: vendorCount = 0,
    career: careerCount = 0,
    total: submissionTotal = 0,
  } = data?.submissionSplit ?? {};
  const vendorDeg =
    submissionTotal > 0 ? Math.round((vendorCount / submissionTotal) * 360) : 0;

  const articleCategories = (data?.articlesByCategory ?? []).map(
    ({ category, count }) => ({
      name: CATEGORY_LABELS[category] ?? category,
      count,
    }),
  );
  const maxArticle = articleCategories[0]?.count ?? 1;

  const venuesByDest = data?.venuesByDestination ?? [];
  const maxVenue = venuesByDest[0]?.count ?? 1;

  const portfolioByExp = (data?.portfolioByExperience ?? []).map((p, i) => ({
    short: p.experienceName.replace(/ Weddings?$/i, ""),
    count: p.count,
    color: EXP_COLORS[i % EXP_COLORS.length],
  }));
  const maxPortfolio = portfolioByExp[0]?.count ?? 1;

  const timelineData = (data?.bookingTrend ?? []).map(({ month, count }) => ({
    month: MONTHS[parseInt(month.split("-")[1], 10) - 1],
    val: count,
  }));
  const maxTL = Math.max(...timelineData.map((d) => d.val), 1);
  const lastVal = timelineData[timelineData.length - 1]?.val ?? 0;
  const firstVal = timelineData[0]?.val ?? 0;

  const CW = 460,
    CH = 80,
    CPX = 28,
    CPY = 14;
  const tx = (i: number) =>
    +(
      CPX +
      (i / Math.max(timelineData.length - 1, 1)) * (CW - CPX * 2)
    ).toFixed(1);
  const ty = (v: number) =>
    +(CH - CPY - (v / maxTL) * (CH - CPY * 2)).toFixed(1);
  const linePts = timelineData.map((d, i) => `${tx(i)},${ty(d.val)}`).join(" ");
  const areaPath =
    `M ${tx(0)},${ty(timelineData[0]?.val ?? 0)} ` +
    timelineData.map((d, i) => `L ${tx(i)},${ty(d.val)}`).join(" ") +
    ` L ${tx(timelineData.length - 1)},${CH - CPY} L ${tx(0)},${CH - CPY} Z`;

  const m = data?.meta;
  const stats = [
    {
      label: "Open Inquiries",
      value: data
        ? data.inquiryFunnel
            .filter((s) => ["new", "reviewed", "quoted"].includes(s.status))
            .reduce((a, b) => a + b.count, 0)
        : "—",
      icon: <MailOpen className="w-4 h-4" />,
      href: "/dashboard/inquiry",
      change: `${m?.newInquiryCount ?? 0} unread`,
      up: false,
      urgent: (m?.newInquiryCount ?? 0) > 0,
      sub: "new · reviewed · quoted",
    },
    {
      label: "Destinations",
      value: data?.counts.destinations ?? "—",
      icon: <MapPin className="w-4 h-4" />,
      href: "/dashboard/destinations",
      change: `${m?.destinationCategoryCount ?? 0} regions`,
      up: true,
      sub: `across ${m?.destinationCategoryCount ?? 0} region${m?.destinationCategoryCount !== 1 ? "s" : ""}`,
    },
    {
      label: "Themes",
      value: data?.counts.themes ?? "—",
      icon: <Sparkles className="w-4 h-4" />,
      href: "/dashboard/wedding-themes",
      change: `${m?.experienceCount ?? 0} experience${m?.experienceCount !== 1 ? "s" : ""}`,
      up: true,
      sub: `linked to ${m?.experienceCount ?? 0} experience${m?.experienceCount !== 1 ? "s" : ""}`,
    },
    {
      label: "Venues",
      value: data?.counts.venues ?? "—",
      icon: <Hotel className="w-4 h-4" />,
      href: "/dashboard/venues",
      change: "across all destinations",
      up: true,
      sub: "across all destinations",
    },
    {
      label: "Articles",
      value: data?.counts.articles ?? "—",
      icon: <BookOpen className="w-4 h-4" />,
      href: "/dashboard/journal",
      change: `${m?.articleCategoryCount ?? 0} categories`,
      up: true,
      sub: `${m?.articleCategoryCount ?? 0} categories`,
    },
    {
      label: "Portfolio",
      value: data?.counts.portfolios ?? "—",
      icon: <Newspaper className="w-4 h-4" />,
      href: "/dashboard/portfolio",
      change: `${m?.experienceCount ?? 0} experience types`,
      up: true,
      sub: `${m?.experienceCount ?? 0} experience types`,
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <p className="text-primary/60 tracking-[0.3em] uppercase text-xs mb-1">
            Good morning
          </p>
          <h2 className="text-2xl md:text-3xl text-primary font-semibold leading-tight">
            Welcome back, <span className="italic font-light">Admin</span>
          </h2>
          <div className="mt-3 w-10 h-px bg-primary/40" />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group bg-white border border-primary/30 px-6 py-5 hover:bg-primary/[0.02] transition-colors duration-150 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className={stat.urgent ? "text-amber-500" : "text-primary/60"}
                >
                  {stat.icon}
                </div>
                <ArrowUpRight className="w-3 h-3 text-primary/40 group-hover:text-primary/75 transition-colors" />
              </div>

              <div>
                <p
                  className={`text-4xl font-bold leading-none tabular-nums ${
                    stat.urgent ? "text-amber-500" : "text-primary"
                  }`}
                >
                  {loading ? (
                    <span className="inline-block w-8 h-8 bg-primary/10 animate-pulse rounded" />
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="text-primary/80 uppercase tracking-[0.1em] text-xs mt-2 font-semibold">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="text-primary/60 text-xs mt-1 truncate">
                    {stat.sub}
                  </p>
                )}
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-semibold mt-auto ${
                  stat.urgent
                    ? "text-amber-500"
                    : stat.up
                      ? "text-emerald-600"
                      : "text-primary/60"
                }`}
              >
                {stat.up && !stat.urgent && <TrendingUp className="w-3 h-3" />}
                <span>{stat.change}</span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4">
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <Panel
              title="Inquiry Pipeline"
              href="/dashboard/inquiry"
              loading={loading}
            >
              <div className="space-y-2 flex-1">
                {inquiryFunnel.map((step) => {
                  const total = inquiryFunnel.reduce((a, b) => a + b.count, 0);
                  const pct =
                    total > 0 ? Math.round((step.count / total) * 100) : 0;
                  const maxCount = Math.max(
                    ...inquiryFunnel.map((s) => s.count),
                    1,
                  );
                  const barW = Math.round((step.count / maxCount) * 100);
                  return (
                    <div key={step.status} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 w-[86px] flex-shrink-0">
                        <span
                          className="w-[3px] h-3.5 rounded-full flex-shrink-0"
                          style={{ background: step.stroke }}
                        />
                        <span className="text-xs text-primary/75 capitalize">
                          {step.status}
                        </span>
                      </div>
                      <div className="flex-1 h-[22px] bg-primary/[0.08] rounded-[3px] overflow-hidden relative">
                        <div
                          className="absolute inset-y-0 left-0 rounded-[3px]"
                          style={{
                            width: `${barW}%`,
                            background: step.fill,
                            borderRight: `2px solid ${step.stroke}`,
                          }}
                        />
                        <span
                          className="absolute left-2.5 inset-y-0 flex items-center text-xs font-semibold tabular-nums"
                          style={{ color: step.label }}
                        >
                          {step.count}
                        </span>
                      </div>
                      <span className="text-xs text-primary/60 w-7 text-right flex-shrink-0 tabular-nums">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-primary/25 flex items-center justify-between">
                <span className="text-xs text-primary/60 uppercase tracking-widest">
                  Total inquiries
                </span>
                <span className="text-sm font-semibold text-primary tabular-nums">
                  {inquiryFunnel.reduce((a, b) => a + b.count, 0)}
                </span>
              </div>
            </Panel>

            <Panel
              title="Submissions"
              href="/dashboard/job-partnership"
              loading={loading}
            >
              <div className="flex items-center gap-5 flex-1">
                <svg
                  width="76"
                  height="76"
                  viewBox="0 0 76 76"
                  style={{ flexShrink: 0 }}
                >
                  <circle
                    cx="38"
                    cy="38"
                    r="28"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="11"
                  />
                  {submissionTotal > 0 && (
                    <>
                      <path
                        d={describeArc(38, 38, 28, 0, vendorDeg)}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="11"
                        strokeLinecap="butt"
                      />
                      <path
                        d={describeArc(38, 38, 28, vendorDeg, 360)}
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="11"
                        strokeLinecap="butt"
                      />
                    </>
                  )}
                  <circle cx="38" cy="38" r="20" fill="white" />
                  <text
                    x="38"
                    y="35"
                    textAnchor="middle"
                    fontSize="0.75rem"
                    fontWeight="600"
                    fill="#374151"
                  >
                    {submissionTotal}
                  </text>
                  <text
                    x="38"
                    y="47"
                    textAnchor="middle"
                    fontSize="0.625rem"
                    fill="#6B7280"
                  >
                    total
                  </text>
                </svg>

                <div className="flex-1 space-y-3">
                  {[
                    { label: "Vendor", count: vendorCount, color: "#10B981" },
                    { label: "Career", count: careerCount, color: "#8B5CF6" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-[3px] h-3 rounded-full inline-block"
                            style={{ background: item.color }}
                          />
                          <span className="text-xs text-primary/75">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-primary tabular-nums">
                          {item.count}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden bg-primary/15">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width:
                              submissionTotal > 0
                                ? `${(item.count / submissionTotal) * 100}%`
                                : "0%",
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel
              title="Articles by Category"
              href="/dashboard/journal"
              loading={loading}
            >
              <div className="space-y-[9px] flex-1">
                {articleCategories.map((cat) => {
                  const pct = Math.round((cat.count / maxArticle) * 100);
                  return (
                    <div key={cat.name} className="flex items-center gap-3">
                      <span className="text-xs text-primary/70 w-[120px] text-right flex-shrink-0 truncate leading-none">
                        {cat.name}
                      </span>
                      <div className="flex-1 h-[20px] bg-primary/[0.08] rounded-[3px] overflow-hidden relative">
                        <div
                          className="absolute inset-y-0 left-0 rounded-[3px]"
                          style={{
                            width: `${pct}%`,
                            background: `rgba(217,90,48,${0.3 + (pct / 100) * 0.6})`,
                          }}
                        />
                        <span
                          className="absolute inset-0 flex items-center justify-end pr-2.5 text-xs tabular-nums font-semibold"
                          style={{
                            color: pct > 20 ? "white" : "rgba(217,90,48,0.7)",
                          }}
                        >
                          {cat.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Panel
                title="Venues by Destination"
                href="/dashboard/venues"
                loading={loading}
              >
                <div className="space-y-[10px] flex-1">
                  {venuesByDest.map((d) => (
                    <div
                      key={d.destinationId}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs text-primary/70 w-[58px] flex-shrink-0 leading-none truncate">
                        {d.destinationName}
                      </span>
                      <div className="flex-1 h-[20px] bg-primary/[0.08] rounded-[3px] overflow-hidden relative">
                        <div
                          className="absolute inset-y-0 left-0 rounded-[3px]"
                          style={{
                            width: `${(d.count / maxVenue) * 100}%`,
                            background: `rgba(37,99,235,${0.2 + (d.count / maxVenue) * 0.55})`,
                          }}
                        />
                        <span
                          className="absolute inset-0 flex items-center justify-end pr-2.5 text-xs font-semibold tabular-nums"
                          style={{
                            color:
                              (d.count / maxVenue) * 100 > 20
                                ? "white"
                                : "rgba(37,99,235,0.7)",
                          }}
                        >
                          {d.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel
                title="Portfolio by Experience"
                href="/dashboard/portfolio"
                loading={loading}
              >
                <div className="flex items-end justify-around gap-2 flex-1 pb-1">
                  {portfolioByExp.map((p) => (
                    <div
                      key={p.short}
                      className="flex flex-col items-center gap-1.5 flex-1"
                    >
                      <span className="text-xs font-semibold text-primary/75 tabular-nums">
                        {p.count}
                      </span>
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: Math.round((p.count / maxPortfolio) * 88),
                          background: p.color,
                        }}
                      />
                      <span className="text-xs text-primary/60 text-center leading-tight">
                        {p.short}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-primary/25 flex items-center justify-between">
                  <span className="text-xs text-primary/60 uppercase tracking-widest">
                    Total
                  </span>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {portfolioByExp.reduce((a, b) => a + b.count, 0)}
                  </span>
                </div>
              </Panel>
            </div>

            <Panel
              title="Booking Trend"
              badge="Last 8 months"
              loading={loading}
            >
              <div className="flex items-end gap-6 mb-4">
                <div>
                  <span className="text-3xl font-semibold text-primary tabular-nums leading-none">
                    {lastVal}
                  </span>
                  <span className="text-xs text-primary/60 uppercase tracking-wider ml-2">
                    bookings
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">
                    {lastVal >= firstVal ? "+" : ""}
                    {lastVal - firstVal} vs {timelineData[0]?.month}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <svg
                  width="100%"
                  viewBox={`0 0 ${CW + CPX} ${CH + 22}`}
                  style={{ display: "block", overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[0, maxTL].map((val) => {
                    const t = val / maxTL;
                    const y = CH - CPY - t * (CH - CPY * 2);
                    return (
                      <g key={val}>
                        <text
                          x={CPX - 4}
                          y={y + 3}
                          textAnchor="end"
                          fontSize="0.625rem"
                          fill="currentColor"
                          fillOpacity="0.55"
                          fontFamily="inherit"
                        >
                          {val}
                        </text>
                        <line
                          x1={CPX}
                          y1={y}
                          x2={CW}
                          y2={y}
                          stroke="currentColor"
                          strokeOpacity="0.18"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}

                  <path d={areaPath} fill="url(#trendGrad)" />
                  <polyline
                    points={linePts}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {timelineData.map((d, i) => {
                    const x = tx(i);
                    const y = ty(d.val);
                    const isLast = i === timelineData.length - 1;
                    return (
                      <g key={d.month}>
                        {isLast ? (
                          <>
                            <circle
                              cx={x}
                              cy={y}
                              r={5.5}
                              fill="white"
                              stroke="#10B981"
                              strokeWidth="2"
                            />
                            <circle cx={x} cy={y} r={2.5} fill="#10B981" />
                          </>
                        ) : (
                          <circle
                            cx={x}
                            cy={y}
                            r={2.5}
                            fill="#10B981"
                            fillOpacity="0.55"
                          />
                        )}
                        <text
                          x={x}
                          y={CH + 17}
                          textAnchor="middle"
                          fontSize="0.625rem"
                          fill="currentColor"
                          fillOpacity={isLast ? 0.75 : 0.5}
                          fontWeight={isLast ? "600" : "400"}
                        >
                          {d.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </Panel>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp}>
          <p className="text-primary/45 text-xs tracking-[0.35em] uppercase text-center">
            Linda Wiryani Events — Studio Portal
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
