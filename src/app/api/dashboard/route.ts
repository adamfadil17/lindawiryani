import { NextRequest } from "next/server";

import { prisma, handleError, ok } from "@/lib";

export interface DashboardSummary {
  /** Aggregate counts shown in the 6 stat cards */
  counts: {
    inquiries: number;
    destinations: number;
    themes: number;
    venues: number;
    articles: number;
    portfolios: number;
  };

  /** #1 — Inquiry Pipeline panel: count per status */
  inquiryFunnel: {
    status: "new" | "reviewed" | "quoted" | "booked" | "archived";
    count: number;
  }[];

  /** #2 — Submissions panel: vendor vs career split */
  submissionSplit: {
    vendor: number;
    career: number;
    total: number;
  };

  /** #3 — Articles by Category panel */
  articlesByCategory: {
    category: string; // raw enum value, e.g. "Real_Weddings"
    count: number;
  }[];

  /** #4 — Venues by Destination panel (top 5 destinations with ≥1 venue) */
  venuesByDestination: {
    destinationId: string;
    destinationName: string;
    count: number;
  }[];

  /** #5 — Portfolio by Experience panel */
  portfolioByExperience: {
    experienceId: string;
    experienceName: string;
    count: number;
  }[];

  /** #6 — Booking Trend panel: bookings per month for the last 8 months */
  bookingTrend: {
    /** "YYYY-MM" */
    month: string;
    count: number;
  }[];

  /** Extra scalars needed by stat-card sub-labels */
  meta: {
    /** Number of distinct destination categories */
    destinationCategoryCount: number;
    /** Number of wedding experience types */
    experienceCount: number;
    /** Number of unread (status = "new") inquiries */
    newInquiryCount: number;
    /** Number of distinct article categories that have ≥1 article */
    articleCategoryCount: number;
  };
}

// ─── Helper: build 8-month window ────────────────────────────────────────────

function last8MonthsWindow(): { gte: Date; lte: Date; months: string[] } {
  const now = new Date();
  // Start of the month 7 months ago
  const start = new Date(now.getFullYear(), now.getMonth() - 7, 1);
  // End of the current month
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  const months: string[] = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - 7 + i, 1);
    months.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }

  return { gte: start, lte: end, months };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { gte, lte, months } = last8MonthsWindow();

    // ── Fire all queries in parallel ──────────────────────────────────────────
    const [
      // Counts (for stat cards)
      inquiryCount,
      destinationCount,
      themeCount,
      venueCount,
      articleCount,
      portfolioCount,

      // Inquiry funnel: group by status
      inquiryGroupByStatus,

      // Submissions: group by type
      submissionGroupByType,

      // Articles: group by category
      articleGroupByCategory,

      // Venues with only destination_id (for grouping)
      venueDestinations,

      // Destinations: id + name only
      destinations,

      // Destination categories: count only
      destinationCategoryCount,

      // Wedding experiences: id + name only
      experiences,

      // Portfolios: experience_id only
      portfolioExperiences,

      // Booked inquiries within last 8 months (for trend chart)
      bookedInquiries,

      // New inquiry count (for "X unread" sub-label)
      newInquiryCount,
    ] = await Promise.all([
      // ── Stat card counts ────────────────────────────────────────────────────
      prisma.inquirySubmission.count(),
      prisma.destination.count(),
      prisma.weddingTheme.count(),
      prisma.venue.count(),
      prisma.article.count(),
      prisma.portfolio.count(),

      // ── #1 Inquiry funnel ───────────────────────────────────────────────────
      prisma.inquirySubmission.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),

      // ── #2 Submission split ─────────────────────────────────────────────────
      prisma.submission.groupBy({
        by: ["type"],
        _count: { _all: true },
      }),

      // ── #3 Articles by category ─────────────────────────────────────────────
      prisma.article.groupBy({
        by: ["category"],
        _count: { _all: true },
      }),

      // ── #4 Venues by destination ────────────────────────────────────────────
      // Only fetch the FK, no need for full venue row
      prisma.venue.findMany({
        select: { destination_id: true },
      }),

      // Destination names (for label lookup)
      prisma.destination.findMany({
        select: { id: true, name: true },
      }),

      // ── Destination category count (for stat card sub-label) ────────────────
      prisma.destinationCategory.count(),

      // ── #5 Portfolio by experience ──────────────────────────────────────────
      prisma.weddingExperience.findMany({
        select: { id: true, name: true },
      }),

      prisma.portfolio.findMany({
        select: { experience_id: true },
      }),

      // ── #6 Booking trend ────────────────────────────────────────────────────
      prisma.inquirySubmission.findMany({
        where: {
          status: "booked",
          submitted_at: { gte, lte },
        },
        select: { submitted_at: true },
      }),

      // ── New inquiry count ───────────────────────────────────────────────────
      prisma.inquirySubmission.count({ where: { status: "new" } }),
    ]);

    // ── Process: Inquiry funnel ───────────────────────────────────────────────

    const ALL_STATUSES = [
      "new",
      "reviewed",
      "quoted",
      "booked",
      "archived",
    ] as const;
    const funnelMap = Object.fromEntries(
      inquiryGroupByStatus.map((r) => [r.status, r._count._all]),
    );
    const inquiryFunnel = ALL_STATUSES.map((s) => ({
      status: s,
      count: funnelMap[s] ?? 0,
    }));

    // ── Process: Submission split ─────────────────────────────────────────────

    const subMap = Object.fromEntries(
      submissionGroupByType.map((r) => [r.type, r._count._all]),
    );
    const submissionSplit = {
      vendor: subMap["vendor"] ?? 0,
      career: subMap["career"] ?? 0,
      total: (subMap["vendor"] ?? 0) + (subMap["career"] ?? 0),
    };

    // ── Process: Articles by category ─────────────────────────────────────────

    const articlesByCategory = articleGroupByCategory
      .map((r) => ({ category: r.category as string, count: r._count._all }))
      .sort((a, b) => b.count - a.count);

    // ── Process: Venues by destination (top 5) ────────────────────────────────

    const destMap = new Map(destinations.map((d) => [d.id, d.name]));
    const venueCountByDest = new Map<string, number>();
    for (const v of venueDestinations) {
      venueCountByDest.set(
        v.destination_id,
        (venueCountByDest.get(v.destination_id) ?? 0) + 1,
      );
    }
    const venuesByDestination = Array.from(venueCountByDest.entries())
      .map(([id, count]) => ({
        destinationId: id,
        destinationName: destMap.get(id) ?? id,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // ── Process: Portfolio by experience ──────────────────────────────────────

    const portCountByExp = new Map<string, number>();
    for (const p of portfolioExperiences) {
      if (!p.experience_id) continue;
      portCountByExp.set(
        p.experience_id,
        (portCountByExp.get(p.experience_id) ?? 0) + 1,
      );
    }
    const portfolioByExperience = experiences
      .map((exp) => ({
        experienceId: exp.id,
        experienceName: exp.name,
        count: portCountByExp.get(exp.id) ?? 0,
      }))
      .filter((e) => e.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // ── Process: Booking trend ────────────────────────────────────────────────

    const trendMap = new Map<string, number>(months.map((m) => [m, 0]));
    for (const inq of bookedInquiries) {
      const d = inq.submitted_at;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (trendMap.has(key)) {
        trendMap.set(key, (trendMap.get(key) ?? 0) + 1);
      }
    }
    const bookingTrend = months.map((m) => ({
      month: m,
      count: trendMap.get(m) ?? 0,
    }));

    // ── Assemble response ─────────────────────────────────────────────────────

    const summary: DashboardSummary = {
      counts: {
        inquiries: inquiryCount,
        destinations: destinationCount,
        themes: themeCount,
        venues: venueCount,
        articles: articleCount,
        portfolios: portfolioCount,
      },
      inquiryFunnel,
      submissionSplit,
      articlesByCategory,
      venuesByDestination,
      portfolioByExperience,
      bookingTrend,
      meta: {
        destinationCategoryCount,
        experienceCount: experiences.length,
        newInquiryCount,
        articleCategoryCount: articlesByCategory.length,
      },
    };

    return ok(summary);
  } catch (error) {
    return handleError(error);
  }
}
