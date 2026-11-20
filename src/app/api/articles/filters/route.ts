import { NextRequest } from "next/server";
import { prisma, handleError, ok, requireAuth, requireRole } from "@/lib";
import { ArticleCategory } from "@/../generated/prisma";

export async function GET(req: NextRequest) {
  try {
    const payload = await requireAuth(req);
    requireRole(payload, "admin", "editor");

    const grouped = await prisma.article.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { category: "asc" },
    });

    const categories = grouped.map((row) => ({
      category: row.category as ArticleCategory,
      count: row._count.category,
    }));

    return ok({ categories });
  } catch (error) {
    return handleError(error);
  }
}
