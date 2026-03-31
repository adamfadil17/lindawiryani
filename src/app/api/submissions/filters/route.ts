import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";

export async function GET(_req: NextRequest) {
  try {
    const [
      submissionTypeCounts,
      submissionStatusCounts,
      positionTypes,
      positionLevels,
      totalSubmissions,
      totalPositions,
    ] = await Promise.all([
      // Count submissions grouped by type (vendor | career)
      prisma.submission.groupBy({
        by: ["type"],
        _count: { _all: true },
        orderBy: { type: "asc" },
      }),

      // Count submissions grouped by status (new | reviewed | contacted | archived)
      prisma.submission.groupBy({
        by: ["status"],
        _count: { _all: true },
        orderBy: { status: "asc" },
      }),

      // Distinct position types (e.g. "Full-time", "Part-time / Freelance")
      prisma.openPosition.findMany({
        distinct: ["type"],
        select: { type: true },
        orderBy: { type: "asc" },
      }),

      // Distinct position levels (e.g. "Mid–Senior", "Senior")
      prisma.openPosition.findMany({
        distinct: ["level"],
        select: { level: true },
        orderBy: { level: "asc" },
      }),

      // Total submissions (for the "All" stat card)
      prisma.submission.count(),

      // Total positions (for the positions section header)
      prisma.openPosition.count(),
    ]);

    // ── Build type option list with counts ──
    const byType: Record<string, number> = {};
    for (const row of submissionTypeCounts) {
      byType[row.type] = row._count._all;
    }

    // Ensure both types always appear even if count is 0
    const submissionTypes = (["vendor", "career"] as const).map((id) => ({
      id,
      label: id === "vendor" ? "Vendor" : "Career",
      count: byType[id] ?? 0,
    }));

    // ── Build status option list with counts ──
    const byStatus: Record<string, number> = {};
    for (const row of submissionStatusCounts) {
      byStatus[row.status] = row._count._all;
    }

    // Ensure all statuses always appear even if count is 0
    const submissionStatuses = (
      ["new", "reviewed", "contacted", "archived"] as const
    ).map((id) => ({
      id,
      label:
        id === "new"
          ? "New"
          : id === "reviewed"
            ? "Reviewed"
            : id === "contacted"
              ? "Contacted"
              : "Archived",
      count: byStatus[id] ?? 0,
    }));

    return ok({
      submissionTypes,
      submissionStatuses,
      positionTypes: positionTypes.map((p) => p.type),
      positionLevels: positionLevels.map((p) => p.level),
      counts: {
        totalSubmissions,
        byType,
        byStatus,
        totalPositions,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
