import { NextRequest } from "next/server";
import { prisma, handleError, ok } from "@/lib";
import { ArticleCategory } from "@/../generated/prisma";

export async function GET(_req: NextRequest) {
  try {
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
